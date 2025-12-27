/**
 * Smart Work Tracker - Main Process
 *
 * This is the main Electron process that manages:
 * - Application window creation
 * - System-level input tracking (mouse & keyboard)
 * - IPC communication with renderer process
 * - macOS Accessibility permissions
 *
 * PRIVACY NOTE: This app tracks activity counts only, not content.
 * No keystrokes, mouse coordinates, or screen content are recorded.
 */

const {
  app,
  BrowserWindow,
  ipcMain,
  systemPreferences,
  screen,
  powerMonitor,
} = require("electron");
const path = require("path");
const { uIOhook, UiohookKey } = require("uiohook-napi");
const { exec } = require("child_process");
const config = require("./config");
const https = require("https");

let mainWindow;
let trackingInterval;
let idleCheckInterval;
let keyboardListener;

// Activity tracking state
let activityData = {
  mouseEvents: 0,
  keyboardEvents: 0,
  activeTime: 0, // in seconds
  idleTime: 0, // in seconds
  lastActivityTime: Date.now(),
  isTracking: false,
  sessionStartTime: null,
  hourlyData: [], // For AI analysis
  currentApp: "", // Current active app name
};

let allowedApps = []; // List of apps to track
let currentActiveApp = ""; // Currently active app name

// Idle threshold in milliseconds (2 minutes of no activity = idle)
const IDLE_THRESHOLD = 120000;

/**
 * Check and request macOS Accessibility permissions
 * Required for system-level input monitoring
 */
function checkAccessibilityPermissions() {
  const isTrusted = systemPreferences.isTrustedAccessibilityClient(false);

  if (!isTrusted) {
    console.log("⚠️  Accessibility permissions not granted");
    // Prompt user to grant permissions
    systemPreferences.isTrustedAccessibilityClient(true);
  } else {
    console.log("✅ Accessibility permissions granted");
  }

  return isTrusted;
}

/**
 * Create the main application window
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: "Smart Work Tracker",
    backgroundColor: "#1a1a2e",
  });

  mainWindow.loadFile("index.html");

  // Open DevTools in development
  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
    stopTracking();
  });
}

/**
 * Track mouse movement using global mouse listeners
 * Note: We only count movements, not record coordinates
 * This is handled in the renderer process and reported via IPC
 */
function trackMouseActivity() {
  // Mouse tracking is now handled in renderer process
  // This function sets up the tracking interval for updates
  trackingInterval = setInterval(() => {
    if (!activityData.isTracking) return;

    // Check active app every second
    checkActiveApp();

    // Send periodic updates to renderer
    if (mainWindow) {
      mainWindow.webContents.send("activity-update", activityData);
    }
  }, 1000); // Update every second
}

/**
 * Check currently active app (macOS only)
 */
function checkActiveApp() {
  const appleScript =
    'tell application "System Events" to get name of first application process whose frontmost is true';

  exec(`osascript -e '${appleScript}'`, (error, stdout, stderr) => {
    if (error) {
      // Silently fail or log debug
      return;
    }

    currentActiveApp = stdout.trim();
    activityData.currentApp = currentActiveApp;
    // console.log("Active App:", currentActiveApp); // Debug enabled
  });
}

/**
 * Track keyboard activity using global keyboard listener
 * Note: We only count key presses, not record what keys were pressed
 */
function trackKeyboardActivity() {
  try {
    // Remove listeners if any exist to avoid duplicates
    uIOhook.removeAllListeners("keydown");

    // Track which keys are currently pressed to avoid repeat events
    const pressedKeys = new Set();

    uIOhook.on("keydown", (e) => {
      if (!activityData.isTracking) return;

      // Filter by app
      if (allowedApps.length > 0 && !allowedApps.includes(currentActiveApp)) {
        return;
      }

      // Ignore modifier keys (Shift, Ctrl, Alt, Cmd, etc.)
      const modifierKeys = [
        UiohookKey.Shift,
        UiohookKey.ShiftRight,
        UiohookKey.Ctrl,
        UiohookKey.CtrlRight,
        UiohookKey.Alt,
        UiohookKey.AltRight,
        UiohookKey.Meta,
        UiohookKey.MetaRight,
        UiohookKey.CapsLock,
        UiohookKey.NumLock,
        UiohookKey.ScrollLock,
      ];

      if (modifierKeys.includes(e.keycode)) {
        return; // Skip modifier keys
      }

      // Prevent counting key repeat events (when key is held down)
      const keyId = `${e.keycode}`;
      if (pressedKeys.has(keyId)) {
        return; // Already counted this key press
      }

      pressedKeys.add(keyId);

      // Count the key press
      activityData.keyboardEvents++;
      activityData.lastActivityTime = Date.now();

      if (mainWindow) {
        mainWindow.webContents.send("activity-update", activityData);
      }
    });

    // Remove key from pressed set when released
    uIOhook.on("keyup", (e) => {
      const keyId = `${e.keycode}`;
      pressedKeys.delete(keyId);
    });

    // Add global mouse tracking
    let lastMouseTime = 0;
    uIOhook.on("mousemove", (e) => {
      if (!activityData.isTracking) return;

      // Filter by app
      if (allowedApps.length > 0 && !allowedApps.includes(currentActiveApp)) {
        return;
      }

      const now = Date.now();
      if (now - lastMouseTime > 100) {
        // Throttle 100ms
        activityData.mouseEvents++;
        activityData.lastActivityTime = now;
        lastMouseTime = now;

        if (mainWindow) {
          mainWindow.webContents.send("activity-update", activityData);
        }
      }
    });
    uIOhook.start();
    console.log("✅ Global keyboard tracking started using uIOhook");
  } catch (error) {
    console.error("❌ Error starting keyboard tracking:", error);
    console.log("Make sure Accessibility permissions are granted");
  }
}

/**
 * Monitor idle vs active time
 */
function trackIdleTime() {
  idleCheckInterval = setInterval(() => {
    if (!activityData.isTracking) return;

    const timeSinceLastActivity = Date.now() - activityData.lastActivityTime;

    if (timeSinceLastActivity > IDLE_THRESHOLD) {
      // User is idle
      activityData.idleTime++;
    } else {
      // User is active
      activityData.activeTime++;
    }

    // Record hourly data for AI analysis
    recordHourlyData();

    // Send update to renderer
    if (mainWindow) {
      mainWindow.webContents.send("activity-update", activityData);
    }
  }, 1000); // Check every second
}

/**
 * Record activity data by hour for AI analysis
 */
function recordHourlyData() {
  const currentHour = new Date().getHours();
  const existingHourData = activityData.hourlyData.find(
    (h) => h.hour === currentHour
  );

  if (existingHourData) {
    existingHourData.mouseEvents = activityData.mouseEvents;
    existingHourData.keyboardEvents = activityData.keyboardEvents;
    existingHourData.activeTime = activityData.activeTime;
    existingHourData.idleTime = activityData.idleTime;
  } else {
    activityData.hourlyData.push({
      hour: currentHour,
      mouseEvents: activityData.mouseEvents,
      keyboardEvents: activityData.keyboardEvents,
      activeTime: activityData.activeTime,
      idleTime: activityData.idleTime,
    });
  }
}

/**
 * Start tracking user activity
 */
function startTracking() {
  // Check permissions first
  if (!checkAccessibilityPermissions()) {
    if (mainWindow) {
      mainWindow.webContents.send("permission-error");
    }
    return;
  }

  activityData.isTracking = true;
  activityData.sessionStartTime = Date.now();
  activityData.lastActivityTime = Date.now();

  trackMouseActivity();
  trackKeyboardActivity();
  trackIdleTime();

  console.log("🚀 Tracking started");
}

/**
 * Stop tracking user activity
 */
function stopTracking() {
  activityData.isTracking = false;

  if (trackingInterval) {
    clearInterval(trackingInterval);
    trackingInterval = null;
  }

  if (idleCheckInterval) {
    clearInterval(idleCheckInterval);
    idleCheckInterval = null;
  }

  try {
    uIOhook.stop();
  } catch (error) {
    console.error("Error stopping uIOhook:", error);
  }

  console.log("⏸️  Tracking stopped");
}

/**
 * Reset all tracking data
 */
function resetData() {
  activityData = {
    mouseEvents: 0,
    keyboardEvents: 0,
    activeTime: 0,
    idleTime: 0,
    lastActivityTime: Date.now(),
    isTracking: activityData.isTracking,
    sessionStartTime: activityData.sessionStartTime,
    hourlyData: [],
  };

  if (mainWindow) {
    mainWindow.webContents.send("activity-update", activityData);
  }
}

/**
 * Generate sample data for demo purposes
 * Simulates 9 hours of work activity (9 AM to 6 PM) with 1-hour lunch break
 */
function generateSampleData() {
  const sampleData = {
    mouseEvents: 0,
    keyboardEvents: 0,
    activeTime: 0,
    idleTime: 0,
    hourlyData: [],
  };

  // Simulate 9 hours (9 AM to 6 PM)
  for (let hour = 9; hour <= 18; hour++) {
    // Vary activity levels throughout the day
    let activityLevel = 1.0;

    // Lunch break (12-1 PM) - Almost no activity
    if (hour === 12) {
      activityLevel = 0.05; // Rất ít hoạt động (nghỉ trưa)
    }

    // Morning warm-up (9 AM)
    if (hour === 9) {
      activityLevel = 0.6; // Bắt đầu chậm
    }

    // Peak productivity hours (10-11 AM, 2-4 PM)
    if (
      hour === 10 ||
      hour === 11 ||
      hour === 14 ||
      hour === 15 ||
      hour === 16
    ) {
      activityLevel = 1.3; // Giờ vàng
    }

    // After lunch dip (1 PM)
    if (hour === 13) {
      activityLevel = 0.8; // Hơi buồn ngủ sau ăn trưa
    }

    // Late afternoon fatigue (5-6 PM)
    if (hour === 17 || hour === 18) {
      activityLevel = 0.7; // Mệt cuối ngày
    }

    const hourlyMouse = Math.floor(Math.random() * 1000 * activityLevel) + 500;
    const hourlyKeyboard =
      Math.floor(Math.random() * 500 * activityLevel) + 200;
    const hourlyActive = Math.floor(Math.random() * 40 * activityLevel) + 20; // minutes
    const hourlyIdle = 60 - hourlyActive;

    sampleData.mouseEvents += hourlyMouse;
    sampleData.keyboardEvents += hourlyKeyboard;
    sampleData.activeTime += hourlyActive * 60; // convert to seconds
    sampleData.idleTime += hourlyIdle * 60;

    sampleData.hourlyData.push({
      hour: hour,
      mouseEvents: hourlyMouse,
      keyboardEvents: hourlyKeyboard,
      activeTime: hourlyActive * 60,
      idleTime: hourlyIdle * 60,
    });
  }

  return sampleData;
}

// IPC Handlers
ipcMain.on("start-tracking", () => {
  startTracking();
});

ipcMain.on("stop-tracking", () => {
  stopTracking();
});

ipcMain.on("reset-data", () => {
  resetData();
});

ipcMain.on("get-activity-data", (event) => {
  event.reply("activity-update", activityData);
});

ipcMain.on("generate-sample-data", (event) => {
  const sampleData = generateSampleData();
  event.reply("sample-data-generated", sampleData);
});

ipcMain.on("check-permissions", (event) => {
  const hasPermissions = checkAccessibilityPermissions();
  event.reply("permissions-status", hasPermissions);
});

ipcMain.on("mouse-activity", () => {
  if (activityData.isTracking) {
    activityData.mouseEvents++;
    activityData.lastActivityTime = Date.now();
  }
});

ipcMain.on("keyboard-activity", () => {
  if (activityData.isTracking) {
    activityData.keyboardEvents++;
    activityData.lastActivityTime = Date.now();
  }
});

ipcMain.on("update-allowed-apps", (event, apps) => {
  allowedApps = apps;
  console.log("Updated allowed apps:", allowedApps);
});

/**
 * Analyze productivity data with OpenAI API
 */
ipcMain.handle("analyze-with-openai", async (event, summary) => {
  try {
    if (!config.OPENAI_API_KEY) {
      throw new Error(
        "OpenAI API key not configured. Please add your API key to config.js or .env file."
      );
    }

    console.log("🤖 Analyzing with OpenAI...");

    // Construct the prompt for OpenAI
    const prompt = `Bạn là chuyên gia phân tích năng suất chuyên về quy trình làm việc của developer. Hãy phân tích dữ liệu phiên làm việc sau đây của một developer đang sử dụng Cursor IDE (một code editor được hỗ trợ bởi AI).

**Dữ Liệu Phiên Làm Việc:**
- Tổng Số Sự Kiện Chuột: ${summary.totalMouseEvents.toLocaleString()}
- Tổng Số Sự Kiện Bàn Phím: ${summary.totalKeyboardEvents.toLocaleString()}
- Thời Gian Hoạt Động: ${summary.activeTimeMinutes} phút
- Thời Gian Nghỉ: ${summary.idleTimeMinutes} phút
- Tỷ Lệ Hoạt Động: ${summary.activePercentage}%
- Phân Tích Theo Giờ: ${JSON.stringify(summary.hourlyBreakdown)}

**Nhiệm Vụ:**
Cung cấp phân tích năng suất toàn diện bằng định dạng JSON với cấu trúc sau (TẤT CẢ NỘI DUNG PHẢI BẰNG TIẾNG VIỆT):
{
  "productivityScore": <số từ 0-100>,
  "peakHours": [<mảng các giờ làm việc hiệu quả nhất>],
  "patterns": [
    {"type": "positive|warning|info", "text": "<nhận xét về mô hình làm việc BẰNG TIẾNG VIỆT>"}
  ],
  "recommendations": [
    "<đề xuất hành động 1 BẰNG TIẾNG VIỆT>",
    "<đề xuất hành động 2 BẰNG TIẾNG VIỆT>",
    ...
  ],
  "summary": "<tóm tắt ngắn gọn 2-3 câu về năng suất tổng thể BẰNG TIẾNG VIỆT>"
}

Tập trung vào:
1. Thông tin chi tiết dành riêng cho developer (mô hình coding, thời gian tập trung, v.v.)
2. Mô hình sử dụng Cursor IDE
3. Cân bằng công việc - cuộc sống
4. Các đề xuất hành động để cải thiện

CHỈ trả lời bằng JSON hợp lệ, KHÔNG có văn bản bổ sung. TẤT CẢ NỘI DUNG TRONG JSON PHẢI BẰNG TIẾNG VIỆT.`;

    // Call OpenAI API
    const response = await callOpenAI(prompt);

    console.log("✅ OpenAI analysis complete");

    // Parse and return the response
    const insights = JSON.parse(response);
    insights.aiGenerated = true;

    return insights;
  } catch (error) {
    console.error("❌ OpenAI API error:", error.message);
    throw error;
  }
});

/**
 * Call OpenAI API
 */
function callOpenAI(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: config.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "Bạn là chuyên gia phân tích năng suất. LUÔN LUÔN trả lời bằng tiếng Việt và chỉ trả về JSON hợp lệ. Tất cả nội dung trong JSON phải bằng tiếng Việt.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: config.OPENAI_TEMPERATURE,
      max_tokens: config.OPENAI_MAX_TOKENS,
    });

    const options = {
      hostname: "api.openai.com",
      port: 443,
      path: "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${config.OPENAI_API_KEY}`,
        "Content-Length": Buffer.byteLength(data, "utf8"),
      },
    };

    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        try {
          const jsonResponse = JSON.parse(responseData);

          if (jsonResponse.error) {
            reject(new Error(jsonResponse.error.message));
            return;
          }

          const content = jsonResponse.choices[0].message.content;
          resolve(content);
        } catch (error) {
          reject(
            new Error(`Failed to parse OpenAI response: ${error.message}`)
          );
        }
      });
    });

    req.on("error", (error) => {
      reject(new Error(`OpenAI API request failed: ${error.message}`));
    });

    req.write(data);
    req.end();
  });
}

// App lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  stopTracking();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  stopTracking();
});

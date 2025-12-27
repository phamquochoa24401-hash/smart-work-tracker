/**
 * Smart Work Tracker - Renderer Process
 *
 * Handles UI updates, user interactions, and AI analysis
 */

const { ipcRenderer } = require("electron");

// DOM Elements
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const sampleBtn = document.getElementById("sampleBtn");
const analyzeBtn = document.getElementById("analyzeBtn");

const mouseCount = document.getElementById("mouseCount");
const keyboardCount = document.getElementById("keyboardCount");
const activeTime = document.getElementById("activeTime");
const idleTime = document.getElementById("idleTime");
const trackingStatus = document.getElementById("trackingStatus");
const currentAppName = document.getElementById("currentAppName");

const permissionStatus = document.getElementById("permissionStatus");
const statusIndicator = document.getElementById("statusIndicator");
const statusText = document.getElementById("statusText");

const aiInsights = document.getElementById("aiInsights");
const aiLoading = document.getElementById("aiLoading");
const insightsContent = document.getElementById("insightsContent");
const insightsTimestamp = document.getElementById("insightsTimestamp");

// Chart
let activityChart;
let currentData = null;

/**
 * Initialize the application
 */
function init() {
  setupEventListeners();
  setupChart();
  checkPermissions();
  requestInitialData();
}

/**
 * Setup event listeners for buttons
 */
function setupEventListeners() {
  startBtn.addEventListener("click", () => {
    ipcRenderer.send("start-tracking");
    updateTrackingUI(true);
    // Local tracing disabled in favor of global uIOhook
    // enableMouseTracking();
    // enableKeyboardTracking();
  });

  stopBtn.addEventListener("click", () => {
    ipcRenderer.send("stop-tracking");
    updateTrackingUI(false);
    // disableMouseTracking();
    // disableKeyboardTracking();
  });

  resetBtn.addEventListener("click", () => {
    if (confirm("Bạn có chắc chắn muốn đặt lại tất cả dữ liệu?")) {
      ipcRenderer.send("reset-data");
      aiInsights.classList.add("hidden");
    }
  });

  sampleBtn.addEventListener("click", () => {
    ipcRenderer.send("generate-sample-data");
  });

  analyzeBtn.addEventListener("click", () => {
    analyzeWithAI();
  });

  // App Filter Logic
  const appCheckboxes = document.querySelectorAll('input[name="app"]');

  const appList = document.getElementById("appList");

  function sendAllowedApps() {
    const allowedApps = Array.from(
      document.querySelectorAll('input[name="app"]:checked')
    ).map((cb) => cb.value);
    ipcRenderer.send("update-allowed-apps", allowedApps);
  }

  // Initial send
  sendAllowedApps();

  // Listen for changes
  appCheckboxes.forEach((cb) => {
    cb.addEventListener("change", sendAllowedApps);
  });

  // Add custom app
  // Listen for changes
  appCheckboxes.forEach((cb) => {
    cb.addEventListener("change", sendAllowedApps);
  });
}

// Mouse tracking variables
let mouseTrackingEnabled = false;
let lastMouseReport = 0;
const MOUSE_REPORT_THROTTLE = 100; // Report every 100ms max

/**
 * Enable mouse movement tracking
 */
function enableMouseTracking() {
  mouseTrackingEnabled = true;
  document.addEventListener("mousemove", handleMouseMove);
}

/**
 * Disable mouse movement tracking
 */
function disableMouseTracking() {
  mouseTrackingEnabled = false;
  document.removeEventListener("mousemove", handleMouseMove);
}

/**
 * Handle mouse movement events
 */
function handleMouseMove() {
  if (!mouseTrackingEnabled) return;

  const now = Date.now();
  if (now - lastMouseReport > MOUSE_REPORT_THROTTLE) {
    ipcRenderer.send("mouse-activity");
    lastMouseReport = now;
  }
}

/**
 * Enable keyboard tracking in app window
 */
function enableKeyboardTracking() {
  document.addEventListener("keydown", handleKeyDown);
}

/**
 * Disable keyboard tracking in app window
 */
function disableKeyboardTracking() {
  document.removeEventListener("keydown", handleKeyDown);
}

/**
 * Handle keyboard events in app window
 */
function handleKeyDown(event) {
  // Send keyboard activity to main process
  ipcRenderer.send("keyboard-activity");
}

/**
 * Setup activity chart using Chart.js
 */
function setupChart() {
  const ctx = document.getElementById("activityChart").getContext("2d");

  activityChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Mouse Activity",
          data: [],
          borderColor: "#6366f1",
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Keyboard Activity",
          data: [],
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "#e2e8f0",
            font: {
              size: 12,
              family: "'Inter', sans-serif",
            },
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          titleColor: "#e2e8f0",
          bodyColor: "#cbd5e1",
          borderColor: "#334155",
          borderWidth: 1,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(51, 65, 85, 0.3)",
          },
          ticks: {
            color: "#94a3b8",
          },
        },
        x: {
          grid: {
            color: "rgba(51, 65, 85, 0.3)",
          },
          ticks: {
            color: "#94a3b8",
          },
        },
      },
    },
  });
}

/**
 * Update tracking UI state
 */
function updateTrackingUI(isTracking) {
  if (isTracking) {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    sampleBtn.disabled = true; // Disable sample data button while tracking
    trackingStatus.innerHTML =
      '<span class="status-badge status-active">Đang Theo Dõi</span>';
  } else {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    sampleBtn.disabled = false; // Enable sample data button when not tracking
    trackingStatus.innerHTML = '<span class="status-badge">Chờ</span>';
  }
}

/**
 * Format seconds to human-readable time
 */
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

/**
 * Format number with commas
 */
function formatNumber(num) {
  return num.toLocaleString();
}

/**
 * Update statistics display
 */
function updateStats(data) {
  currentData = data;

  mouseCount.textContent = formatNumber(data.mouseEvents);
  keyboardCount.textContent = formatNumber(data.keyboardEvents);
  activeTime.textContent = formatTime(data.activeTime);
  idleTime.textContent = formatTime(data.idleTime);

  if (data.currentApp) {
    currentAppName.textContent = `Ứng dụng hiện tại: ${data.currentApp}`;
  } else {
    currentAppName.textContent = "";
  }

  // Update chart if hourly data is available
  if (data.hourlyData && data.hourlyData.length > 0) {
    updateChart(data.hourlyData);
  }
}

/**
 * Update activity chart
 */
function updateChart(hourlyData) {
  const labels = hourlyData.map((h) => `${h.hour}:00`);
  const mouseData = hourlyData.map((h) => h.mouseEvents);
  const keyboardData = hourlyData.map((h) => h.keyboardEvents);

  activityChart.data.labels = labels;
  activityChart.data.datasets[0].data = mouseData;
  activityChart.data.datasets[1].data = keyboardData;
  activityChart.update();
}

/**
 * Check accessibility permissions
 */
function checkPermissions() {
  ipcRenderer.send("check-permissions");
}

/**
 * Request initial activity data
 */
function requestInitialData() {
  ipcRenderer.send("get-activity-data");
}

/**
 * Analyze productivity with AI
 */
async function analyzeWithAI() {
  if (!currentData) {
    alert(
      "Không có dữ liệu để phân tích. Hãy bắt đầu theo dõi hoặc tạo dữ liệu mẫu trước."
    );
    return;
  }

  // Show loading state
  aiLoading.classList.remove("hidden");
  aiInsights.classList.add("hidden");

  try {
    // Prepare data summary for AI
    const summary = prepareDataSummary(currentData);

    // Simulate AI analysis (in production, this would call an actual AI API)
    const insights = await simulateAIAnalysis(summary);

    // Display insights
    displayInsights(insights);
  } catch (error) {
    console.error("AI Analysis error:", error);
    alert("Không thể phân tích dữ liệu. Vui lòng thử lại.");
  } finally {
    aiLoading.classList.add("hidden");
  }
}

/**
 * Prepare data summary for AI analysis
 */
function prepareDataSummary(data) {
  const totalTime = data.activeTime + data.idleTime;
  const activePercentage =
    totalTime > 0 ? ((data.activeTime / totalTime) * 100).toFixed(1) : 0;

  return {
    totalMouseEvents: data.mouseEvents,
    totalKeyboardEvents: data.keyboardEvents,
    activeTimeMinutes: Math.floor(data.activeTime / 60),
    idleTimeMinutes: Math.floor(data.idleTime / 60),
    activePercentage: activePercentage,
    hourlyBreakdown: data.hourlyData || [],
  };
}

/**
 * Analyze productivity with OpenAI API
 * Sends real data to OpenAI for intelligent analysis
 */
async function simulateAIAnalysis(summary) {
  try {
    // Call the main process to analyze with OpenAI
    const insights = await ipcRenderer.invoke("analyze-with-openai", summary);
    return insights;
  } catch (error) {
    console.error("OpenAI API error:", error);

    // Fallback to local analysis if API fails
    console.log("Falling back to local analysis...");
    return {
      productivityScore: calculateProductivityScore(summary),
      peakHours: findPeakHours(summary.hourlyBreakdown),
      patterns: analyzePatterns(summary),
      recommendations: generateRecommendations(summary),
      aiGenerated: false,
      error: error.message,
    };
  }
}

/**
 * Calculate productivity score (0-100)
 */
function calculateProductivityScore(summary) {
  const activeRatio = parseFloat(summary.activePercentage) / 100;
  const activityLevel = Math.min(
    (summary.totalMouseEvents + summary.totalKeyboardEvents) / 10000,
    1
  );

  // Weighted score: 60% active time, 40% activity level
  const score = Math.round((activeRatio * 0.6 + activityLevel * 0.4) * 100);

  return Math.min(Math.max(score, 0), 100);
}

/**
 * Find peak productivity hours
 */
function findPeakHours(hourlyData) {
  if (!hourlyData || hourlyData.length === 0) {
    return [];
  }

  // Calculate activity score for each hour
  const hoursWithScores = hourlyData.map((h) => ({
    hour: h.hour,
    score: h.mouseEvents + h.keyboardEvents * 2, // Weight keyboard higher
  }));

  // Sort by score and get top 3
  const topHours = hoursWithScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((h) => h.hour);

  return topHours.sort((a, b) => a - b);
}

/**
 * Analyze work patterns
 */
function analyzePatterns(summary) {
  const patterns = [];

  // Check active percentage
  const activePercent = parseFloat(summary.activePercentage);
  if (activePercent > 75) {
    patterns.push({
      type: "positive",
      text: "High engagement level - you maintain focus well",
    });
  } else if (activePercent < 50) {
    patterns.push({
      type: "warning",
      text: "Low engagement detected - consider reducing distractions",
    });
  }

  // Check keyboard vs mouse ratio
  const kbRatio = summary.totalKeyboardEvents / (summary.totalMouseEvents + 1);
  if (kbRatio > 0.5) {
    patterns.push({
      type: "positive",
      text: "Heavy keyboard use suggests deep work (coding, writing)",
    });
  } else if (kbRatio < 0.2) {
    patterns.push({
      type: "info",
      text: "Mouse-heavy activity - possibly browsing or design work",
    });
  }

  // Check for long idle periods
  if (summary.idleTimeMinutes > 60) {
    patterns.push({
      type: "warning",
      text: "Extended idle time detected - ensure regular breaks are intentional",
    });
  }

  return patterns;
}

/**
 * Generate personalized recommendations
 */
function generateRecommendations(summary) {
  const recommendations = [];

  const activePercent = parseFloat(summary.activePercentage);

  // Recommendations based on active time
  if (activePercent > 85) {
    recommendations.push("Consider taking more breaks to prevent burnout");
    recommendations.push(
      "Try the Pomodoro Technique: 25 min work, 5 min break"
    );
  } else if (activePercent < 50) {
    recommendations.push("Minimize distractions during work sessions");
    recommendations.push("Use website blockers during focus time");
  }

  // Recommendations based on work duration
  if (summary.activeTimeMinutes > 240) {
    recommendations.push("Great focus! Remember to stretch and rest your eyes");
  }

  // General recommendations
  recommendations.push("Stay hydrated - keep water nearby");
  recommendations.push(
    "Follow the 20-20-20 rule: every 20 min, look 20 feet away for 20 seconds"
  );

  return recommendations;
}

/**
 * Display AI insights
 */
function displayInsights(insights) {
  const timestamp = new Date().toLocaleString();
  const aiSource = insights.aiGenerated
    ? "🤖 AI-Powered Analysis"
    : "📊 Local Analysis";
  insightsTimestamp.textContent = `${aiSource} - Generated at ${timestamp}`;

  let html = "";

  // AI Summary (if available)
  if (insights.summary) {
    html += `
      <div class="insight-section">
        <h4>📝 Summary</h4>
        <p class="ai-summary">${insights.summary}</p>
      </div>
    `;
  }

  // Productivity Score
  const scoreClass =
    insights.productivityScore >= 70
      ? "score-high"
      : insights.productivityScore >= 50
      ? "score-medium"
      : "score-low";

  html += `
    <div class="insight-section">
      <h4>📊 Productivity Score</h4>
      <div class="productivity-score ${scoreClass}">
        <div class="score-value">${insights.productivityScore}</div>
        <div class="score-label">out of 100</div>
      </div>
    </div>
  `;

  // Peak Hours
  if (insights.peakHours && insights.peakHours.length > 0) {
    const peakHoursText = insights.peakHours.map((h) => `${h}:00`).join(", ");
    html += `
      <div class="insight-section">
        <h4>⏰ Peak Productivity Hours</h4>
        <p>Giờ làm việc hiệu quả nhất của bạn: <strong>${peakHoursText}</strong></p>
        <p class="insight-tip">Hãy sắp xếp các công việc quan trọng nhất trong khoảng thời gian này.</p>
      </div>
    `;
  }

  // Patterns
  if (insights.patterns && insights.patterns.length > 0) {
    html += `
      <div class="insight-section">
        <h4>🔍 Work Patterns</h4>
        <ul class="pattern-list">
    `;
    insights.patterns.forEach((pattern) => {
      const icon =
        pattern.type === "positive"
          ? "✅"
          : pattern.type === "warning"
          ? "⚠️"
          : "ℹ️";
      html += `<li class="pattern-${pattern.type}">${icon} ${pattern.text}</li>`;
    });
    html += `
        </ul>
      </div>
    `;
  }

  // Recommendations
  if (insights.recommendations && insights.recommendations.length > 0) {
    html += `
      <div class="insight-section">
        <h4>💡 Recommendations</h4>
        <ul class="recommendation-list">
    `;
    insights.recommendations.forEach((rec) => {
      html += `<li>${rec}</li>`;
    });
    html += `
        </ul>
      </div>
    `;
  }

  // Error message if fallback was used
  if (insights.error) {
    html += `
      <div class="insight-section">
        <p class="ai-error">⚠️ Note: Using local analysis due to API error: ${insights.error}</p>
      </div>
    `;
  }

  insightsContent.innerHTML = html;
  aiInsights.classList.remove("hidden");
}

// IPC Event Listeners
ipcRenderer.on("activity-update", (event, data) => {
  updateStats(data);
  if (data.isTracking) {
    updateTrackingUI(true);
  }
});

ipcRenderer.on("sample-data-generated", (event, data) => {
  updateStats(data);
  alert("Dữ liệu mẫu đã được tạo! Mô phỏng 8 giờ làm việc.");
});

ipcRenderer.on("permissions-status", (event, hasPermissions) => {
  if (hasPermissions) {
    statusIndicator.className = "status-indicator status-ok";
    statusText.textContent = "Đã cấp quyền truy cập";
  } else {
    statusIndicator.className = "status-indicator status-error";
    statusText.textContent = "Cần cấp quyền truy cập";
  }
});

ipcRenderer.on("permission-error", () => {
  alert(
    "Cần cấp quyền truy cập để theo dõi hoạt động hệ thống.\n\nVui lòng cấp quyền trong System Preferences > Security & Privacy > Privacy > Accessibility"
  );
  checkPermissions();
});

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", init);

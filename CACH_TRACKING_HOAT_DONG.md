# 🔍 Giải Thích Chi Tiết: Cách Smart Work Tracker Hoạt Động

## 📋 Tổng Quan

Smart Work Tracker sử dụng **2 phương pháp tracking** chính:

1. **Keyboard Tracking** - Theo dõi bàn phím
2. **Mouse Tracking** - Theo dõi chuột

Cả hai đều **KHÔNG ghi lại nội dung**, chỉ đếm số lượng sự kiện!

---

## ⌨️ 1. KEYBOARD TRACKING - Theo Dõi Bàn Phím

### Công Nghệ Sử Dụng

- **Library**: `node-global-key-listener`
- **Cấp độ**: System-level (toàn hệ thống)
- **Yêu cầu**: macOS Accessibility permissions

### Cách Hoạt Động

#### Bước 1: Khởi tạo listener

```javascript
// Trong main.js
const { GlobalKeyboardListener } = require("node-global-key-listener");
let keyboardListener = new GlobalKeyboardListener();
```

#### Bước 2: Lắng nghe sự kiện

```javascript
keyboardListener.addListener((e, down) => {
  if (!activityData.isTracking) return;

  // Chỉ đếm khi phím được NHẤN XUỐNG
  if (down && down.state === "DOWN") {
    activityData.keyboardEvents++; // Tăng bộ đếm
    activityData.lastActivityTime = Date.now(); // Cập nhật thời gian

    // Gửi update đến UI
    mainWindow.webContents.send("activity-update", activityData);
  }
});
```

### Điều Gì Được Theo Dõi?

✅ **Được theo dõi:**

- Số lần nhấn phím (count)
- Thời điểm nhấn (timestamp)

❌ **KHÔNG được theo dõi:**

- Phím nào được nhấn (A, B, C, Enter, Space...)
- Nội dung bạn gõ
- Ứng dụng nào đang active
  đâsdsasad

### Ví Dụ Thực Tế

```
Bạn gõ: "Hello World"
App ghi: keyboardEvents = 11 (10 chữ + 1 space)
App KHÔNG biết: Bạn gõ gì
```

---

## 🖱️ 2. MOUSE TRACKING - Theo Dõi Chuột

### Công Nghệ Sử Dụng

- **Method**: DOM Event Listeners
- **Cấp độ**: Application window
- **Throttling**: 100ms (tối đa 10 events/giây)

### Cách Hoạt Động

#### Bước 1: Renderer process lắng nghe

```javascript
// Trong renderer.js
function enableMouseTracking() {
  mouseTrackingEnabled = true;
  document.addEventListener("mousemove", handleMouseMove);
}
```

#### Bước 2: Throttle và gửi đến main process

```javascript
function handleMouseMove() {
  if (!mouseTrackingEnabled) return;

  const now = Date.now();
  // Chỉ gửi mỗi 100ms để tránh quá tải
  if (now - lastMouseReport > 100) {
    ipcRenderer.send("mouse-activity"); // Gửi signal
    lastMouseReport = now;
  }
}
```

#### Bước 3: Main process nhận và đếm

```javascript
// Trong main.js
ipcMain.on("mouse-activity", () => {
  if (activityData.isTracking) {
    activityData.mouseEvents++; // Tăng bộ đếm
    activityData.lastActivityTime = Date.now();
  }
});
```

### Điều Gì Được Theo Dõi?

✅ **Được theo dõi:**

- Số lần di chuyển chuột (throttled)
- Thời điểm di chuyển

❌ **KHÔNG được theo dõi:**

- Tọa độ chuột (x, y)
- Vị trí click
- Element nào được click

### Ví Dụ Thực Tế

```
Bạn di chuyển chuột liên tục trong 1 giây
App ghi: mouseEvents += 10 (do throttle 100ms)
App KHÔNG biết: Chuột ở đâu, click vào gì
```

---

## ⏱️ 3. IDLE TIME DETECTION - Phát Hiện Thời Gian Nghỉ

### Cách Hoạt Động

#### Theo dõi hoạt động cuối cùng

```javascript
// Mỗi khi có keyboard hoặc mouse event
activityData.lastActivityTime = Date.now();
```

#### Kiểm tra idle mỗi giây

```javascript
setInterval(() => {
  const timeSinceLastActivity = Date.now() - activityData.lastActivityTime;

  if (timeSinceLastActivity > 120000) {
    // 2 phút = 120,000ms
    activityData.idleTime++; // Tăng idle time (giây)
  } else {
    activityData.activeTime++; // Tăng active time (giây)
  }
}, 1000); // Chạy mỗi giây
```

### Logic

```
Nếu không có keyboard/mouse event trong 2 phút
  → Coi như IDLE (nghỉ)
Ngược lại
  → Coi như ACTIVE (đang làm việc)
```

---

## 📊 4. HOURLY DATA - Dữ Liệu Theo Giờ

### Mục Đích

Lưu dữ liệu theo từng giờ để AI phân tích patterns

### Cách Hoạt Động

```javascript
function recordHourlyData() {
  const currentHour = new Date().getHours(); // 0-23

  // Tìm xem giờ này đã có data chưa
  const existingHourData = activityData.hourlyData.find(
    (h) => h.hour === currentHour
  );

  if (existingHourData) {
    // Cập nhật data giờ hiện tại
    existingHourData.mouseEvents = activityData.mouseEvents;
    existingHourData.keyboardEvents = activityData.keyboardEvents;
    existingHourData.activeTime = activityData.activeTime;
    existingHourData.idleTime = activityData.idleTime;
  } else {
    // Tạo entry mới cho giờ này
    activityData.hourlyData.push({
      hour: currentHour,
      mouseEvents: activityData.mouseEvents,
      keyboardEvents: activityData.keyboardEvents,
      activeTime: activityData.activeTime,
      idleTime: activityData.idleTime,
    });
  }
}
```

### Kết Quả

```javascript
hourlyData = [
  {
    hour: 9,
    mouseEvents: 500,
    keyboardEvents: 200,
    activeTime: 3000,
    idleTime: 600,
  },
  {
    hour: 10,
    mouseEvents: 1200,
    keyboardEvents: 450,
    activeTime: 3300,
    idleTime: 300,
  },
  {
    hour: 11,
    mouseEvents: 800,
    keyboardEvents: 350,
    activeTime: 2800,
    idleTime: 800,
  },
  // ...
];
```

---

## 🔄 5. LUỒNG DỮ LIỆU (Data Flow)

### Kiến Trúc 2 Process

```
┌─────────────────────────────────────────────────────────┐
│                    MAIN PROCESS                         │
│  (main.js - Chạy Node.js, có quyền system-level)       │
│                                                         │
│  • Keyboard Listener (global)                          │
│  • Activity Data Storage                               │
│  • Idle Time Calculator                                │
│  • Hourly Data Recorder                                │
└─────────────────┬───────────────────────────────────────┘
                  │
                  │ IPC (Inter-Process Communication)
                  │
┌─────────────────▼───────────────────────────────────────┐
│                 RENDERER PROCESS                        │
│  (renderer.js + index.html - Chạy trong window)        │
│                                                         │
│  • Mouse Listener (DOM events)                         │
│  • UI Updates                                          │
│  • Charts Rendering                                    │
│  • AI Analysis                                         │
└─────────────────────────────────────────────────────────┘
```

### Chi Tiết Luồng

#### 1. User nhấn "Start Tracking"

```
Renderer Process:
  ├─ User click button
  ├─ ipcRenderer.send("start-tracking")
  └─ enableMouseTracking()

Main Process:
  ├─ Nhận "start-tracking" event
  ├─ Kiểm tra Accessibility permissions
  ├─ Khởi động keyboard listener
  ├─ Khởi động idle checker
  └─ Set isTracking = true
```

#### 2. User di chuyển chuột

```
Renderer Process:
  ├─ mousemove event fired
  ├─ Kiểm tra throttle (100ms)
  └─ ipcRenderer.send("mouse-activity")

Main Process:
  ├─ Nhận "mouse-activity"
  ├─ mouseEvents++
  ├─ Cập nhật lastActivityTime
  └─ Send "activity-update" về renderer
```

#### 3. User nhấn phím

```
Main Process (Global Listener):
  ├─ Keyboard event detected
  ├─ keyboardEvents++
  ├─ Cập nhật lastActivityTime
  └─ Send "activity-update" về renderer
```

#### 4. Cập nhật UI

```
Renderer Process:
  ├─ Nhận "activity-update" event
  ├─ Cập nhật số liệu (mouseCount, keyboardCount)
  ├─ Cập nhật thời gian (activeTime, idleTime)
  └─ Cập nhật chart (nếu có hourly data)
```

---

## 🧮 6. AI ANALYSIS - Phân Tích AI

### Input Data

```javascript
{
  totalMouseEvents: 5000,
  totalKeyboardEvents: 2000,
  activeTimeMinutes: 240,      // 4 giờ
  idleTimeMinutes: 60,         // 1 giờ
  activePercentage: 80,
  hourlyBreakdown: [
    { hour: 9, mouseEvents: 500, keyboardEvents: 200, ... },
    { hour: 10, mouseEvents: 1200, keyboardEvents: 450, ... },
    // ...
  ]
}
```

### Các Thuật Toán

#### 1. Productivity Score (0-100)

```javascript
function calculateProductivityScore(summary) {
  // Tỷ lệ active time (60% trọng số)
  const activeRatio = summary.activePercentage / 100;

  // Mức độ hoạt động (40% trọng số)
  const activityLevel = Math.min(
    (summary.totalMouseEvents + summary.totalKeyboardEvents) / 10000,
    1
  );

  // Tính điểm
  const score = (activeRatio * 0.6 + activityLevel * 0.4) * 100;

  return Math.round(score);
}
```

**Ví dụ:**

- Active 80%, 7000 events → Score: 76/100 ✅
- Active 50%, 3000 events → Score: 42/100 ⚠️

#### 2. Peak Hours Detection

```javascript
function findPeakHours(hourlyData) {
  // Tính điểm cho mỗi giờ
  const hoursWithScores = hourlyData.map((h) => ({
    hour: h.hour,
    score: h.mouseEvents + h.keyboardEvents * 2, // Keyboard quan trọng hơn
  }));

  // Sắp xếp và lấy top 3
  return hoursWithScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((h) => h.hour);
}
```

**Ví dụ:**

```
Giờ 10: 1200 mouse + 450 keyboard = 2100 điểm
Giờ 14: 1000 mouse + 500 keyboard = 2000 điểm
Giờ 11: 800 mouse + 350 keyboard = 1500 điểm

→ Peak hours: 10, 14, 11
```

#### 3. Pattern Analysis

```javascript
// Phát hiện deep work (làm việc sâu)
const kbRatio = keyboardEvents / (mouseEvents + 1);
if (kbRatio > 0.5) {
  return "Heavy keyboard use → Deep work (coding, writing)";
}

// Phát hiện browsing
if (kbRatio < 0.2) {
  return "Mouse-heavy activity → Browsing or design work";
}

// Cảnh báo quá tải
if (activePercentage > 85) {
  return "Very high engagement → Risk of burnout";
}
```

---

## 🔐 7. PRIVACY & SECURITY

### Dữ Liệu Được Lưu

```javascript
activityData = {
  mouseEvents: 5000,           // ✅ Chỉ số lượng
  keyboardEvents: 2000,        // ✅ Chỉ số lượng
  activeTime: 14400,           // ✅ Giây (4 giờ)
  idleTime: 3600,              // ✅ Giây (1 giờ)
  lastActivityTime: 1703577600000,  // ✅ Timestamp
  hourlyData: [...]            // ✅ Tổng hợp theo giờ
}
```

### Dữ Liệu KHÔNG Được Lưu

```javascript
// ❌ KHÔNG BAO GIỜ có trong code
const keystrokeContent = "password123"; // ❌
const mousePosition = { x: 100, y: 200 }; // ❌
const activeApp = "Chrome"; // ❌
const windowTitle = "Facebook - Google Chrome"; // ❌
const screenshot = captureScreen(); // ❌
```

### Nơi Lưu Trữ

- **In-Memory**: Dữ liệu chỉ tồn tại trong RAM
- **No Database**: Không có SQLite, MongoDB, etc.
- **No Files**: Không ghi ra file
- **Reset on Close**: Xóa hết khi đóng app

---

## 🎯 8. VÍ DỤ THỰC TẾ

### Scenario: Bạn làm việc 1 giờ

```
09:00 - Mở app, nhấn "Start Tracking"
09:01 - Gõ email (200 phím)
       → keyboardEvents = 200
       → mouseEvents = 50 (di chuyển, click)

09:15 - Đọc tài liệu (ít gõ, nhiều scroll)
       → keyboardEvents = 220
       → mouseEvents = 300

09:30 - Code (nhiều gõ)
       → keyboardEvents = 1500
       → mouseEvents = 450

09:45 - Nghỉ uống nước (2 phút không động)
       → idleTime tăng lên

10:00 - Nhấn "Stop Tracking"

Kết quả:
- Mouse Events: 450
- Keyboard Events: 1500
- Active Time: 58 phút
- Idle Time: 2 phút
- Productivity Score: 78/100 ✅
- Peak Hour: 9 (giờ 9-10)
```

---

## 💡 TÓM TẮT

### Cách Tracking Hoạt Động:

1. **Keyboard**:

   - Global listener đếm mỗi lần nhấn phím
   - KHÔNG biết phím nào

2. **Mouse**:

   - DOM listener đếm di chuyển (throttled)
   - KHÔNG biết vị trí

3. **Idle Detection**:

   - Nếu >2 phút không có event → Idle
   - Ngược lại → Active

4. **Hourly Recording**:

   - Lưu tổng hợp mỗi giờ
   - Dùng cho AI analysis

5. **AI Analysis**:
   - Tính productivity score
   - Tìm peak hours
   - Phát hiện patterns
   - Đưa ra recommendations

### Privacy:

- ✅ Đếm số lượng events
- ❌ KHÔNG ghi nội dung
- ✅ Dữ liệu local only
- ❌ KHÔNG gửi đi đâu

---

**Có câu hỏi gì khác không? 😊**

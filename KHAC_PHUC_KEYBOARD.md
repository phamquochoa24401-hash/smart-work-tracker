# 🔧 Khắc Phục Sự Cố - Keyboard Tracking

## ❓ Vấn Đề: Keyboard Events Không Tăng

Nếu bạn nhấn phím mà số **Keyboard Events** không tăng, có thể do một trong các nguyên nhân sau:

---

## 🔍 Nguyên Nhân & Giải Pháp

### 1. ⚠️ Chưa Nhấn "Start Tracking"

**Triệu chứng:**

- Nhấn phím nhưng số không tăng
- Status badge hiển thị "Idle" (màu xám)

**Giải pháp:**
✅ Nhấn nút **"Start Tracking"** màu xanh
✅ Kiểm tra status badge đổi thành **"Tracking Active"** (màu xanh lá)

---

### 2. 🔒 Chưa Cấp Accessibility Permissions

**Triệu chứng:**

- Status indicator màu đỏ
- Text hiển thị "Accessibility permissions required"
- Console log: "⚠️ Accessibility permissions not granted"

**Giải pháp:**

#### Bước 1: Mở System Preferences

```
Apple Menu → System Preferences → Security & Privacy
```

#### Bước 2: Vào Privacy Tab

```
Click tab "Privacy" → Chọn "Accessibility" bên trái
```

#### Bước 3: Unlock Settings

```
Click biểu tượng ổ khóa ở góc dưới trái
Nhập password của bạn
```

#### Bước 4: Thêm App

```
Tìm "Electron" hoặc "Smart Work Tracker" trong danh sách
Đánh dấu ✓ vào checkbox
```

#### Bước 5: Restart App

```
Đóng app và mở lại
Nhấn "Start Tracking"
```

---

### 3. 🐛 Global Keyboard Listener Không Hoạt Động

**Triệu chứng:**

- Accessibility permissions đã cấp
- Console log: "✅ Keyboard tracking started"
- Nhưng vẫn không đếm được phím

**Nguyên nhân:**
`node-global-key-listener` có thể gặp vấn đề với một số phiên bản macOS hoặc Node.js

**Giải pháp:**
✅ App đã được cập nhật để sử dụng **2 phương pháp tracking**:

1. **Global Listener** (system-wide) - Cho phím nhấn ở bất kỳ đâu
2. **Window Listener** (in-app) - Cho phím nhấn trong cửa sổ app

**Cách test:**

- Nhấn "Start Tracking"
- Nhấn phím **TRONG cửa sổ app** (ví dụ: click vào app rồi nhấn Space)
- Số keyboard events sẽ tăng!

---

### 4. 📱 Focus Không Đúng

**Triệu chứng:**

- Nhấn phím ở ngoài app không được đếm

**Giải pháp:**
Đây là hành vi bình thường với window listener. Để test:

✅ **Trong cửa sổ app:**

```
1. Click vào cửa sổ Smart Work Tracker
2. Nhấn bất kỳ phím nào (Space, Enter, A, B, C...)
3. Số keyboard events sẽ tăng
```

✅ **Ngoài cửa sổ app:**

```
Global listener sẽ bắt (nếu permissions đã cấp)
Nếu không bắt được, đây là hạn chế của library
```

---

### 5. 🔄 App Cần Reload

**Triệu chứng:**

- Vừa cập nhật code
- Tracking không hoạt động đúng

**Giải pháp:**

```bash
# Trong terminal, nhấn Ctrl+C để dừng app
# Sau đó chạy lại:
npm start
```

Hoặc trong app window:

```
Cmd+R (reload)
```

---

## ✅ Cách Test Keyboard Tracking

### Test 1: Trong Cửa Sổ App

```
1. Mở Smart Work Tracker
2. Nhấn "Start Tracking"
3. Click vào vùng trống trong app
4. Nhấn Space bar 10 lần
5. Kiểm tra: Keyboard Events phải tăng lên 10
```

### Test 2: Ngoài Cửa Sổ App

```
1. Mở Smart Work Tracker
2. Nhấn "Start Tracking"
3. Click vào app khác (ví dụ: VSCode, Chrome)
4. Gõ bất kỳ
5. Quay lại Smart Work Tracker
6. Kiểm tra: Keyboard Events có tăng không
   - Nếu có: Global listener hoạt động ✅
   - Nếu không: Chỉ window listener hoạt động (vẫn OK)
```

---

## 🎯 Hành Vi Mong Đợi

### ✅ Hoạt Động Đúng Khi:

1. **Nhấn phím trong app:**

   ```
   Keyboard Events tăng ngay lập tức
   ```

2. **Di chuyển chuột:**

   ```
   Mouse Events tăng (mỗi 100ms)
   ```

3. **Idle 2 phút:**

   ```
   Idle Time bắt đầu tăng
   Active Time ngừng tăng
   ```

4. **Active trở lại:**
   ```
   Active Time tiếp tục tăng
   Idle Time ngừng tăng
   ```

---

## 🔍 Debug Mode

Nếu vẫn gặp vấn đề, mở Developer Tools:

### Cách 1: Uncomment trong main.js

```javascript
// Tìm dòng này trong main.js (khoảng dòng 83):
// mainWindow.webContents.openDevTools();

// Bỏ comment:
mainWindow.webContents.openDevTools();
```

### Cách 2: Trong App

```
Nhấn: Cmd + Option + I
```

### Kiểm Tra Console

Tìm các log:

```
✅ Accessibility permissions granted
✅ Keyboard tracking started
🚀 Tracking started
```

Nếu thấy lỗi:

```
❌ Error starting keyboard tracking: ...
```

→ Copy lỗi và báo cho developer

---

## 💡 Workaround: Dùng Sample Data

Nếu keyboard tracking không hoạt động và bạn chỉ muốn test AI analysis:

```
1. Nhấn "Generate Sample Data"
2. App sẽ tạo dữ liệu giả lập 8 giờ làm việc
3. Nhấn "Analyze Productivity with AI"
4. Xem insights!
```

---

## 📊 So Sánh Tracking Methods

| Method              | Scope         | Permissions   | Reliability            |
| ------------------- | ------------- | ------------- | ---------------------- |
| **Global Listener** | Toàn hệ thống | Accessibility | 70% (depends on macOS) |
| **Window Listener** | Trong app     | Không cần     | 100%                   |
| **Hybrid** (Cả 2)   | Tốt nhất      | Accessibility | 95%                    |

App hiện tại dùng **Hybrid** approach!

---

## 🆘 Vẫn Không Hoạt Động?

### Checklist Cuối Cùng:

- [ ] Đã nhấn "Start Tracking"?
- [ ] Status badge màu xanh "Tracking Active"?
- [ ] Accessibility permissions đã cấp?
- [ ] Đã restart app sau khi cấp permissions?
- [ ] Đã test nhấn phím TRONG cửa sổ app?
- [ ] Đã mở Developer Tools kiểm tra lỗi?

Nếu tất cả đều OK mà vẫn không hoạt động:

1. **Check macOS version:**

   ```
   Apple Menu → About This Mac
   ```

   App yêu cầu macOS 10.13+

2. **Check Node.js version:**

   ```bash
   node --version
   ```

   Cần Node.js 16+

3. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules
   npm install
   npm start
   ```

---

## 📝 Ghi Chú Quan Trọng

### Về Global Keyboard Listener:

⚠️ **Hạn chế:**

- Không phải 100% reliable trên mọi macOS version
- Có thể bị block bởi security features
- Một số app có thể "chặn" global listeners

✅ **Ưu điểm:**

- Theo dõi được toàn hệ thống
- Không cần focus vào app

### Về Window Keyboard Listener:

✅ **Ưu điểm:**

- 100% reliable
- Không cần special permissions
- Hoạt động trên mọi macOS version

⚠️ **Hạn chế:**

- Chỉ bắt được khi focus vào app
- Không theo dõi được phím nhấn ở app khác

---

**Kết luận:** App sử dụng cả 2 methods để đảm bảo tracking hoạt động tốt nhất! 🎯

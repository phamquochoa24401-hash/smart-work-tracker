# ✈️ Hướng Dẫn Đẩy App Lên TestFlight

## ⚠️ Lưu Ý Quan Trọng

App này sử dụng `uiohook-napi` (theo dõi bàn phím/chuột toàn hệ thống).

- **TestFlight bắt buộc bật Sandbox.**
- **Sandbox sẽ chặn tracking bàn phím/chuột.**
- App có thể chạy trên TestFlight nhưng tính năng chính (đếm phím/chuột) có thể **không hoạt động**.

---

## 📋 Bước 1: Chuẩn Bị (Bắt Buộc)

1.  **Tài Khoản Apple Developer** (99$/năm).
2.  **App ID**: Tạo trên [developer.apple.com](https://developer.apple.com)
    - Bundle ID phải khớp với `package.json` (hiện tại là `com.smartworktracker.app` - bạn cần đổi lại nếu muốn).
    - Bật Capability: **App Sandbox**.
3.  **Certificates**:
    - **Mac App Distribution** (để ký build).
    - **Mac Installer Distribution** (để ký installer).
4.  **Provisioning Profile**: Tạo profile **Mac App Store** cho App ID trên.

---

## 🛠️ Bước 2: Chỉ Định Certificates

Bạn cần tìm ID của chứng chỉ Distribution trong Keychain Access hoặc chạy:

```bash
security find-identity -v
```

Copy dãy mã (ví dụ `A1B2C3D4...`) của chứng chỉ "3rd Party Mac Developer Application".

Export biến môi trường:

```bash
export CSC_LINK="path/to/certificate.p12" # Hoặc để electron-builder tự tìm
export CSC_KEY_PASSWORD="your-p12-password"
```

---

## 📦 Bước 3: Build Ứng Dụng

Chạy lệnh build cho Mac App Store:

```bash
npm run build:mas
```

Nếu thành công, file output sẽ nằm ở:
`dist/mas/Smart Work Tracker-1.0.0.pkg`

---

## 📤 Bước 4: Upload Lên App Store Connect

1.  Tải **Transporter** từ Mac App Store.
2.  Đăng nhập bằng Apple ID.
3.  Kéo file `.pkg` vừa tạo vào Transporter.
4.  Bấm **Deliver**.

---

## 🧪 Bước 5: Kích Hoạt TestFlight

1.  Vào [App Store Connect](https://appstoreconnect.apple.com).
2.  Vào **My Apps** -> Chọn App.
3.  Vào tab **TestFlight**.
4.  Bạn sẽ thấy build vừa upload đang "Processing".
5.  Sau khi Processing xong:
    - Tạo Group Tester (ví dụ: Internal Team).
    - Thêm email của bạn vào.
6.  Mở ứng dụng **TestFlight** trên máy Mac, bạn sẽ thấy App để cài đặt.

---

## ❓ Troubleshooting

### Lỗi Ký (Signing Error)

- Đảm bảo Certificate "3rd Party Mac Developer Application" đã cài trong Keychain.
- Đảm bảo Provisioning Profile hợp lệ.

### Lỗi "Asset validation failed"

- Kiểm tra lại Bundle ID có khớp 100% với App Store Connect không.
- Version number (1.0.0) phải cao hơn version cũ đã upload.

### App Crash Ngay Khi Mở

- Do Sandbox chặn truy cập file hệ thống hoặc module native.
- Check Console.app để xem logs.

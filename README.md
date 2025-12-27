# Theo Dõi Năng Suất Làm Việc

## 🎯 Giới Thiệu

Ứng dụng theo dõi và phân tích năng suất làm việc cho developers sử dụng Cursor IDE, được hỗ trợ bởi AI (OpenAI GPT).

## ✨ Tính Năng

- ✅ **Theo dõi hoạt động thời gian thực** cho Cursor IDE
- ✅ **Phân tích năng suất bằng AI** với OpenAI GPT
- ✅ **Giao diện đẹp mắt, hiện đại**
- ✅ **Tự động fallback** sang phân tích local nếu API lỗi
- ✅ **Bảo mật tối đa** - chỉ theo dõi số lượng, không theo dõi nội dung
- ✅ **Tạo dữ liệu mẫu** để test

## 🚀 Cài Đặt

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình OpenAI API Key (Tùy chọn)

Nếu muốn sử dụng phân tích AI:

1. Lấy API key từ [OpenAI Platform](https://platform.openai.com/api-keys)
2. Thêm vào file `.env`:

```bash
OPENAI_API_KEY=sk-proj-your-key-here
```

Hoặc thêm trực tiếp vào `config.js`:

```javascript
OPENAI_API_KEY: 'sk-proj-your-key-here',
```

### 3. Chạy ứng dụng

```bash
npm start
```

## 📖 Hướng Dẫn Sử Dụng

1. **Bắt Đầu Theo Dõi**: Click "Bắt Đầu Theo Dõi" để bắt đầu monitor hoạt động Cursor
2. **Tạo Dữ Liệu Mẫu**: Hoặc click "Tạo Dữ Liệu Mẫu" để demo
3. **Phân Tích Với AI**: Click "Phân Tích Năng Suất Với AI"
4. **Xem Kết Quả**: AI sẽ phân tích và đưa ra:
   - Điểm năng suất (0-100)
   - Giờ làm việc hiệu quả nhất
   - Phân tích mô hình làm việc
   - Đề xuất cá nhân hóa
   - Tóm tắt do AI tạo

## 🔒 Quyền Riêng Tư

### Dữ Liệu Được Thu Thập:

- ✅ Số lượng di chuyển chuột (KHÔNG lưu tọa độ)
- ✅ Số lượng sự kiện bàn phím (KHÔNG ghi phím bấm)
- ✅ Thời gian hoạt động vs nghỉ

### Dữ Liệu KHÔNG Thu Thập:

- ❌ Nội dung phím bấm
- ❌ Tọa độ chuột
- ❌ Nội dung màn hình
- ❌ Tên file hoặc code

### Dữ Liệu Gửi Đến OpenAI:

Chỉ gửi thống kê tổng hợp:

- Tổng số sự kiện chuột/bàn phím
- Thời gian active/idle
- Phân tích theo giờ

**KHÔNG BAO GIỜ** gửi nội dung thực tế, keystrokes, hoặc thông tin cá nhân.

## 💰 Chi Phí OpenAI

- Sử dụng **GPT-4o-mini** mặc định (rất rẻ, ~$0.15/1M tokens)
- Mỗi lần phân tích: ~$0.001-0.002
- Có thể đổi model trong `config.js`

## ⚙️ Cấu Hình

Chỉnh sửa `config.js`:

```javascript
{
  OPENAI_API_KEY: '',           // API key của bạn
  OPENAI_MODEL: 'gpt-4o-mini',  // Model sử dụng
  OPENAI_MAX_TOKENS: 1000,      // Độ dài response tối đa
  OPENAI_TEMPERATURE: 0.7,      // Độ sáng tạo (0-1)
}
```

## 🛠️ Yêu Cầu Hệ Thống

- **macOS** (cần quyền Accessibility)
- **Node.js** 14+
- **Cursor IDE** (hoặc app khác để theo dõi)

## 📝 Cấp Quyền Accessibility (macOS)

1. Mở **System Preferences**
2. Vào **Security & Privacy** > **Privacy** > **Accessibility**
3. Thêm ứng dụng vào danh sách cho phép

## ❓ Xử Lý Sự Cố

### "Cần cấp quyền OpenAI API key"

- Đảm bảo đã thêm API key vào `.env` hoặc `config.js`
- Restart app sau khi thêm key

### "OpenAI API request failed"

- Kiểm tra kết nối internet
- Xác minh API key hợp lệ
- Kiểm tra credits trong tài khoản OpenAI
- App sẽ tự động dùng phân tích local làm fallback

### "Không thể phân tích dữ liệu"

- Thử lại
- Kiểm tra console để xem lỗi chi tiết

## 🎨 Screenshots

App bao gồm:

- Dashboard theo dõi thời gian thực
- Biểu đồ hoạt động
- Phân tích AI chi tiết
- Giao diện dark mode đẹp mắt

## 📄 License

MIT License - Tự do sử dụng và chỉnh sửa!

## 🙏 Credits

- Sử dụng [OpenAI GPT](https://openai.com) cho phân tích AI
- Được xây dựng với [Electron](https://electronjs.org)
- Charts bởi [Chart.js](https://chartjs.org)

---

Được tạo với ❤️ cho developers muốn tối ưu hóa năng suất làm việc

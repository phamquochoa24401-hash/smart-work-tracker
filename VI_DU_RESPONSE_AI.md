# Ví Dụ Response Từ OpenAI (Tiếng Việt)

Khi bạn click "Phân Tích Năng Suất Với AI", OpenAI sẽ trả về JSON như sau:

```json
{
  "productivityScore": 78,
  "peakHours": [10, 14, 15],
  "patterns": [
    {
      "type": "positive",
      "text": "Tỷ lệ sử dụng bàn phím cao cho thấy bạn đang tập trung vào việc coding và viết code"
    },
    {
      "type": "info",
      "text": "Hoạt động chuột vừa phải, cho thấy sự cân bằng giữa coding và navigation"
    },
    {
      "type": "warning",
      "text": "Thời gian nghỉ hơi cao, hãy đảm bảo các khoảng nghỉ là có chủ đích"
    }
  ],
  "recommendations": [
    "Hãy tận dụng khung giờ 10h-11h và 14h-16h để làm các task quan trọng nhất",
    "Áp dụng kỹ thuật Pomodoro: 25 phút làm việc, 5 phút nghỉ",
    "Sử dụng các tính năng AI của Cursor để tăng tốc độ coding",
    "Đặt mục tiêu cụ thể cho mỗi phiên làm việc để tăng focus",
    "Uống đủ nước và nghỉ mắt theo quy tắc 20-20-20"
  ],
  "summary": "Bạn có năng suất tốt với điểm 78/100. Giờ làm việc hiệu quả nhất là 10h, 14h và 15h. Tỷ lệ sử dụng bàn phím cao cho thấy bạn đang tập trung vào coding. Hãy tối ưu hóa thời gian nghỉ và tận dụng khung giờ vàng để đạt hiệu quả cao nhất."
}
```

## Giải Thích Các Trường:

### `productivityScore` (0-100)

Điểm đánh giá tổng thể về năng suất làm việc:

- **0-49**: Cần cải thiện
- **50-69**: Trung bình
- **70-84**: Tốt
- **85-100**: Xuất sắc

### `peakHours`

Mảng các giờ trong ngày bạn làm việc hiệu quả nhất (dựa trên số lượng keyboard/mouse events)

### `patterns`

Các mô hình làm việc được phát hiện:

- **positive** ✅: Điểm mạnh, thói quen tốt
- **warning** ⚠️: Cần chú ý, có thể cải thiện
- **info** ℹ️: Thông tin trung lập

### `recommendations`

Các đề xuất cụ thể để cải thiện năng suất

### `summary`

Tóm tắt ngắn gọn 2-3 câu về tổng quan năng suất

## Lưu Ý:

1. **Tất cả nội dung đều bằng tiếng Việt** - từ patterns, recommendations đến summary
2. **Phân tích dành riêng cho developers** - tập trung vào coding patterns, Cursor IDE usage
3. **Cá nhân hóa** - dựa trên dữ liệu thực tế của bạn
4. **Hành động cụ thể** - recommendations có thể áp dụng ngay

## Test Ngay:

1. Click "Tạo Dữ Liệu Mẫu"
2. Click "Phân Tích Năng Suất Với AI"
3. Đợi 3-5 giây
4. Xem kết quả phân tích bằng tiếng Việt!

---

**Lưu ý**: Cần có OpenAI API key trong file `.env` để sử dụng tính năng này.

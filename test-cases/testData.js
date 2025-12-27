// Test Cases Data - Tiếng Việt cho Manual Tester
const testCases = [
  {
    id: "TC-001",
    title: "Khởi Động Ứng Dụng",
    priority: "high",
    category: "Kiểm Thử Khói",
    duration: "1 phút",
    steps: [
      {
        action: "Mở ứng dụng Smart Work Tracker từ desktop hoặc Applications",
        expected: "Ứng dụng mở ra thành công",
      },
      {
        action: "Kiểm tra tiêu đề cửa sổ",
        expected: 'Hiển thị "Smart Work Tracker"',
      },
      {
        action: "Kiểm tra các nút bấm hiển thị",
        expected:
          "Tất cả nút: Bắt Đầu Theo Dõi, Tạo Dữ Liệu Mẫu, Reset, Phân Tích AI đều hiển thị",
      },
      {
        action: "Kiểm tra giá trị ban đầu",
        expected:
          "Số sự kiện chuột = 0, Số sự kiện bàn phím = 0, Thời gian hoạt động = 0:00:00, Thời gian nghỉ = 0:00:00",
      },
      {
        action: "Kiểm tra biểu đồ",
        expected: "Biểu đồ trống hoặc không có dữ liệu",
      },
    ],
    testData: "Không cần",
    precondition: "Ứng dụng đã được cài đặt trên máy Mac",
    status: "pending",
  },
  {
    id: "TC-002",
    title: "Bắt Đầu Theo Dõi Hoạt Động",
    priority: "high",
    category: "Kiểm Thử Chức Năng",
    duration: "2 phút",
    steps: [
      { action: "Mở ứng dụng", expected: "Ứng dụng sẵn sàng" },
      {
        action: 'Click nút "Bắt Đầu Theo Dõi"',
        expected: 'Nút đổi thành "Dừng Theo Dõi" với màu khác',
      },
      {
        action: "Kiểm tra trạng thái",
        expected: 'Hiển thị "Đang theo dõi..." hoặc trạng thái tương tự',
      },
      {
        action: "Di chuyển chuột nhiều lần",
        expected: "Số sự kiện chuột tăng lên",
      },
      {
        action: "Gõ phím bất kỳ nhiều lần",
        expected: "Số sự kiện bàn phím tăng lên",
      },
      {
        action: "Đợi 10 giây",
        expected: "Thời gian hoạt động tăng lên ~10 giây",
      },
      { action: "Kiểm tra biểu đồ", expected: "Biểu đồ hiển thị dữ liệu mới" },
    ],
    testData: "Không cần",
    precondition: "Ứng dụng đang mở",
    status: "pending",
  },
  {
    id: "TC-003",
    title: "Dừng Theo Dõi Hoạt Động",
    priority: "high",
    category: "Kiểm Thử Chức Năng",
    duration: "2 phút",
    steps: [
      {
        action: "Thực hiện TC-002 để bắt đầu theo dõi",
        expected: "Đang trong trạng thái theo dõi",
      },
      {
        action: "Ghi nhớ số liệu hiện tại",
        expected: "Ghi lại số sự kiện chuột, bàn phím, thời gian",
      },
      {
        action: 'Click nút "Dừng Theo Dõi"',
        expected: 'Nút đổi lại thành "Bắt Đầu Theo Dõi"',
      },
      {
        action: "Kiểm tra trạng thái",
        expected: 'Hiển thị "Chưa bắt đầu theo dõi" hoặc trạng thái tương tự',
      },
      {
        action: "Di chuyển chuột và gõ phím",
        expected: "Các số liệu KHÔNG tăng thêm",
      },
      {
        action: "So sánh với số liệu đã ghi",
        expected: "Số liệu giữ nguyên như lúc dừng",
      },
    ],
    testData: "Không cần",
    precondition: "Đã thực hiện TC-002",
    status: "pending",
  },
  {
    id: "TC-004",
    title: "Phát Hiện Thời Gian Nghỉ",
    priority: "high",
    category: "Kiểm Thử Chức Năng",
    duration: "5 phút",
    steps: [
      { action: "Bắt đầu theo dõi", expected: "Đang theo dõi" },
      {
        action: "Hoạt động liên tục trong 1 phút (di chuột, gõ phím)",
        expected: "Thời gian hoạt động tăng lên ~60 giây",
      },
      {
        action: "KHÔNG chạm vào chuột và bàn phím",
        expected: "Ngồi yên không làm gì",
      },
      {
        action: "Đợi 2 phút 30 giây",
        expected: "Thời gian nghỉ bắt đầu tăng lên",
      },
      {
        action: "Di chuyển chuột hoặc gõ phím",
        expected: "Thời gian hoạt động lại tiếp tục tăng",
      },
      {
        action: "Kiểm tra cả 2 số liệu",
        expected: "Cả thời gian hoạt động và thời gian nghỉ đều được ghi nhận",
      },
    ],
    testData: "Ngưỡng nghỉ = 2 phút",
    precondition: "Có thời gian để đợi 5 phút",
    status: "pending",
  },
  {
    id: "TC-005",
    title: "Tạo Dữ Liệu Mẫu",
    priority: "medium",
    category: "Kiểm Thử Chức Năng",
    duration: "1 phút",
    steps: [
      { action: "Mở ứng dụng mới", expected: "Ứng dụng sẵn sàng, dữ liệu = 0" },
      {
        action: 'Click nút "Tạo Dữ Liệu Mẫu"',
        expected: "Nút có thể click được",
      },
      { action: "Đợi vài giây", expected: "Dữ liệu mẫu được tạo tự động" },
      {
        action: "Kiểm tra số sự kiện chuột",
        expected: "Hiển thị khoảng 15,000 - 20,000 sự kiện",
      },
      {
        action: "Kiểm tra số sự kiện bàn phím",
        expected: "Hiển thị khoảng 8,000 - 12,000 sự kiện",
      },
      {
        action: "Kiểm tra thời gian hoạt động",
        expected: "Hiển thị khoảng 7-8 giờ",
      },
      {
        action: "Kiểm tra thời gian nghỉ",
        expected: "Hiển thị khoảng 30-60 phút",
      },
      {
        action: "Kiểm tra biểu đồ",
        expected: "Biểu đồ hiển thị dữ liệu cho 8 giờ làm việc",
      },
    ],
    testData: "Dữ liệu mô phỏng 8 giờ làm việc",
    precondition: "Không cần",
    status: "pending",
  },
  {
    id: "TC-006",
    title: "Xóa Dữ Liệu (Reset)",
    priority: "medium",
    category: "Kiểm Thử Chức Năng",
    duration: "1 phút",
    steps: [
      {
        action: "Tạo dữ liệu mẫu hoặc theo dõi một lúc",
        expected: "Có dữ liệu hiển thị",
      },
      {
        action: 'Click nút "Reset"',
        expected: "Có thể có hộp thoại xác nhận (nếu có thì click OK)",
      },
      { action: "Kiểm tra số sự kiện chuột", expected: "Về 0" },
      { action: "Kiểm tra số sự kiện bàn phím", expected: "Về 0" },
      { action: "Kiểm tra thời gian hoạt động", expected: "Về 0:00:00" },
      { action: "Kiểm tra thời gian nghỉ", expected: "Về 0:00:00" },
      {
        action: "Kiểm tra biểu đồ",
        expected: "Biểu đồ trống, không có dữ liệu",
      },
    ],
    testData: "Không cần",
    precondition: "Đã có dữ liệu trong ứng dụng",
    status: "pending",
  },
  {
    id: "TC-007",
    title: "Phân Tích AI - Có Kết Nối Internet",
    priority: "high",
    category: "Kiểm Thử Chức Năng",
    duration: "30 giây",
    steps: [
      {
        action: "Đảm bảo máy có kết nối internet",
        expected: "Internet hoạt động bình thường",
      },
      { action: "Tạo dữ liệu mẫu", expected: "Có đủ dữ liệu để phân tích" },
      {
        action: 'Click nút "Phân Tích Năng Suất Với AI"',
        expected: "Nút có thể click",
      },
      { action: "Đợi vài giây", expected: "Có thể hiện loading/đang xử lý" },
      { action: "Kiểm tra điểm năng suất", expected: "Hiển thị điểm từ 0-100" },
      {
        action: "Kiểm tra giờ làm việc hiệu quả",
        expected: "Hiển thị top 3 giờ làm việc tốt nhất",
      },
      {
        action: "Kiểm tra phân tích mô hình làm việc",
        expected: "Có mô tả về cách làm việc",
      },
      {
        action: "Kiểm tra đề xuất",
        expected: "Có các gợi ý cải thiện năng suất",
      },
      {
        action: "Kiểm tra tóm tắt AI",
        expected: "Có đoạn văn tóm tắt do AI tạo",
      },
    ],
    testData: "Cần có internet và API key (nếu được cấu hình)",
    precondition: "Máy có internet, đã có dữ liệu",
    status: "pending",
  },
  {
    id: "TC-008",
    title: "Phân Tích AI - Không Có Internet",
    priority: "high",
    category: "Kiểm Thử Chức Năng",
    duration: "10 giây",
    steps: [
      {
        action: "Ngắt kết nối internet (tắt WiFi)",
        expected: "Máy không có internet",
      },
      { action: "Tạo dữ liệu mẫu", expected: "Có dữ liệu" },
      {
        action: 'Click nút "Phân Tích Năng Suất Với AI"',
        expected: "Nút có thể click",
      },
      {
        action: "Đợi vài giây",
        expected: "Phân tích chạy bằng thuật toán nội bộ",
      },
      {
        action: "Kiểm tra điểm năng suất",
        expected: "Vẫn hiển thị điểm từ 0-100",
      },
      {
        action: "Kiểm tra giờ làm việc hiệu quả",
        expected: "Vẫn hiển thị top 3 giờ",
      },
      {
        action: "Kiểm tra đề xuất",
        expected: "Vẫn có đề xuất (có thể đơn giản hơn)",
      },
      {
        action: "Kiểm tra không có lỗi",
        expected: "Không hiện thông báo lỗi về internet",
      },
    ],
    testData: "Không cần internet",
    precondition: "Đã có dữ liệu, tắt internet",
    status: "pending",
  },
  {
    id: "TC-009",
    title: "Phân Tích AI - Dữ Liệu Không Đủ",
    priority: "medium",
    category: "Kiểm Thử Tiêu Cực",
    duration: "2 phút",
    steps: [
      { action: "Mở ứng dụng mới (không có dữ liệu)", expected: "Dữ liệu = 0" },
      {
        action: 'Click nút "Phân Tích Năng Suất Với AI"',
        expected: "Nút có thể click",
      },
      {
        action: "Kiểm tra phản hồi",
        expected: "Hiện thông báo lỗi hoặc cảnh báo",
      },
      {
        action: "Đọc nội dung thông báo",
        expected: "Thông báo nói rằng cần thêm dữ liệu",
      },
      { action: "Theo dõi trong 5 phút", expected: "Thu thập ít dữ liệu" },
      {
        action: "Thử phân tích lại",
        expected: "Phân tích chạy nhưng kết quả có thể hạn chế",
      },
    ],
    testData: "Ít hơn 1 giờ dữ liệu",
    precondition: "Ứng dụng mới hoặc đã reset",
    status: "pending",
  },
  {
    id: "TC-010",
    title: "Biểu Đồ Cập Nhật Theo Thời Gian Thực",
    priority: "medium",
    category: "Kiểm Thử Giao Diện",
    duration: "3 phút",
    steps: [
      { action: "Bắt đầu theo dõi", expected: "Đang theo dõi" },
      { action: "Thực hiện hoạt động liên tục", expected: "Số liệu tăng lên" },
      {
        action: "Quan sát biểu đồ trong 1 phút",
        expected: "Biểu đồ tự động cập nhật",
      },
      {
        action: "Kiểm tra cột giờ hiện tại",
        expected: "Cột của giờ hiện tại hiển thị hoạt động",
      },
      {
        action: "Kiểm tra màu sắc",
        expected: "Các cột có màu rõ ràng, dễ nhìn",
      },
      {
        action: "Kiểm tra trục X",
        expected: "Hiển thị giờ (0-23 hoặc giờ hiện tại)",
      },
      { action: "Kiểm tra trục Y", expected: "Hiển thị số lượng sự kiện" },
    ],
    testData: "Không cần",
    precondition: "Đang theo dõi hoạt động",
    status: "pending",
  },
  {
    id: "TC-011",
    title: "Định Dạng Hiển Thị Thời Gian",
    priority: "low",
    category: "Kiểm Thử Giao Diện",
    duration: "2 phút",
    steps: [
      { action: "Bắt đầu theo dõi", expected: "Đang theo dõi" },
      {
        action: "Đợi 30 giây",
        expected: "Thời gian hoạt động hiển thị dạng 0:00:30",
      },
      {
        action: "Đợi thêm 30 giây (tổng 1 phút)",
        expected: "Thời gian hiển thị 0:01:00",
      },
      {
        action: "Hoặc tạo dữ liệu mẫu",
        expected: "Thời gian hiển thị dạng giờ:phút:giây (ví dụ: 7:30:00)",
      },
      {
        action: "Kiểm tra tất cả vị trí hiển thị thời gian",
        expected: "Tất cả đều dùng định dạng giống nhau",
      },
    ],
    testData: "Không cần",
    precondition: "Không cần",
    status: "pending",
  },
  {
    id: "TC-012",
    title: "Trạng Thái Các Nút Bấm",
    priority: "medium",
    category: "Kiểm Thử Giao Diện",
    duration: "2 phút",
    steps: [
      {
        action: "Mở ứng dụng",
        expected: 'Nút "Bắt Đầu Theo Dõi" có thể click',
      },
      {
        action: 'Click "Bắt Đầu Theo Dõi"',
        expected: 'Nút đổi thành "Dừng Theo Dõi"',
      },
      {
        action: 'Kiểm tra nút "Tạo Dữ Liệu Mẫu"',
        expected: "Nút bị vô hiệu hóa (màu xám, không click được)",
      },
      {
        action: 'Click "Dừng Theo Dõi"',
        expected: 'Nút đổi lại thành "Bắt Đầu Theo Dõi"',
      },
      {
        action: 'Kiểm tra nút "Tạo Dữ Liệu Mẫu"',
        expected: "Nút lại có thể click được",
      },
      { action: 'Click "Reset"', expected: "Tất cả nút về trạng thái ban đầu" },
    ],
    testData: "Không cần",
    precondition: "Không cần",
    status: "pending",
  },
  {
    id: "TC-013",
    title: "Không Cấp Quyền Accessibility",
    priority: "high",
    category: "Kiểm Thử Tiêu Cực",
    duration: "3 phút",
    steps: [
      {
        action:
          "Mở System Preferences > Security & Privacy > Privacy > Accessibility",
        expected: "Mở được cài đặt",
      },
      {
        action: "Bỏ tick ứng dụng Smart Work Tracker (nếu có)",
        expected: "Quyền bị thu hồi",
      },
      { action: "Mở ứng dụng", expected: "Ứng dụng vẫn mở được" },
      { action: 'Click "Bắt Đầu Theo Dõi"', expected: "Có thể bắt đầu" },
      {
        action: "Gõ phím nhiều lần",
        expected: "Số sự kiện bàn phím có thể KHÔNG tăng",
      },
      {
        action: "Kiểm tra thông báo lỗi",
        expected: "Có thể hiện thông báo yêu cầu cấp quyền",
      },
    ],
    testData: "Quyền Accessibility bị thu hồi",
    precondition: "Có quyền admin để thay đổi cài đặt",
    status: "pending",
    note: "Sau khi test xong, nhớ cấp lại quyền cho ứng dụng",
  },
  {
    id: "TC-014",
    title: "Đóng và Mở Lại Ứng Dụng",
    priority: "medium",
    category: "Kiểm Thử Chức Năng",
    duration: "2 phút",
    steps: [
      {
        action: "Bắt đầu theo dõi và thu thập dữ liệu",
        expected: "Có dữ liệu hiển thị",
      },
      {
        action: "Ghi lại các số liệu hiện tại",
        expected: "Ghi nhớ số chuột, bàn phím, thời gian",
      },
      {
        action: "Đóng ứng dụng (Cmd+Q hoặc click X)",
        expected: "Ứng dụng đóng hoàn toàn",
      },
      { action: "Mở lại ứng dụng", expected: "Ứng dụng mở thành công" },
      {
        action: "Kiểm tra dữ liệu",
        expected: "Tất cả số liệu về 0 (theo thiết kế bảo mật)",
      },
      {
        action: "Kiểm tra không có lỗi",
        expected: "Không có thông báo lỗi khi mở lại",
      },
    ],
    testData: "Không cần",
    precondition: "Đã có dữ liệu",
    status: "pending",
    note: "Ứng dụng KHÔNG lưu dữ liệu để bảo vệ quyền riêng tư",
  },
  {
    id: "TC-015",
    title: "Bật Tắt Theo Dõi Nhiều Lần",
    priority: "medium",
    category: "Kiểm Thử Chức Năng",
    duration: "8 phút",
    steps: [
      { action: "Bắt đầu theo dõi", expected: "Đang theo dõi" },
      { action: "Hoạt động trong 1 phút", expected: "Dữ liệu tăng lên" },
      { action: "Dừng theo dõi", expected: "Dừng thành công" },
      { action: "Bắt đầu theo dõi lại", expected: "Theo dõi tiếp tục" },
      { action: "Hoạt động thêm 1 phút", expected: "Dữ liệu tiếp tục tăng" },
      {
        action: "Lặp lại bước 3-5 thêm 3 lần nữa",
        expected: "Mỗi lần đều hoạt động bình thường",
      },
      {
        action: "Kiểm tra tổng dữ liệu",
        expected: "Dữ liệu từ tất cả các lần được cộng dồn",
      },
      {
        action: "Kiểm tra ứng dụng",
        expected: "Ứng dụng vẫn mượt mà, không bị lag",
      },
    ],
    testData: "5 lần bật/tắt",
    precondition: "Có thời gian test 8 phút",
    status: "pending",
  },
  {
    id: "TC-016",
    title: "Thay Đổi Kích Thước Cửa Sổ",
    priority: "low",
    category: "Kiểm Thử Giao Diện",
    duration: "3 phút",
    steps: [
      { action: "Mở ứng dụng", expected: "Cửa sổ mở ở kích thước mặc định" },
      {
        action: "Click nút phóng to (màu xanh)",
        expected: "Cửa sổ phóng to toàn màn hình",
      },
      {
        action: "Kiểm tra giao diện",
        expected: "Tất cả phần tử hiển thị đúng, không bị vỡ",
      },
      {
        action: "Thu nhỏ cửa sổ về kích thước nhỏ nhất",
        expected: "Cửa sổ thu nhỏ",
      },
      {
        action: "Kiểm tra giao diện",
        expected: "Vẫn sử dụng được, không bị che khuất",
      },
      {
        action: "Kéo thay đổi kích thước tùy ý",
        expected: "Giao diện tự điều chỉnh",
      },
      {
        action: "Kiểm tra biểu đồ",
        expected: "Biểu đồ thay đổi kích thước theo cửa sổ",
      },
      { action: "Kiểm tra các nút", expected: "Các nút vẫn ở vị trí hợp lý" },
    ],
    testData: "Không cần",
    precondition: "Không cần",
    status: "pending",
  },
  {
    id: "TC-017",
    title: "Hiệu Năng - Chạy Lâu Dài",
    priority: "medium",
    category: "Kiểm Thử Hiệu Năng",
    duration: "2+ giờ",
    steps: [
      { action: "Bắt đầu theo dõi", expected: "Đang theo dõi" },
      {
        action: "Làm việc bình thường trong 2 giờ",
        expected: "Ứng dụng chạy nền",
      },
      {
        action: "Kiểm tra ứng dụng sau 2 giờ",
        expected: "Ứng dụng vẫn hoạt động bình thường",
      },
      {
        action: "Mở Activity Monitor (Cmd+Space > Activity Monitor)",
        expected: "Tìm thấy Smart Work Tracker",
      },
      {
        action: "Kiểm tra Memory",
        expected: "Bộ nhớ sử dụng ổn định, không tăng liên tục",
      },
      { action: "Kiểm tra CPU", expected: "CPU sử dụng thấp (~1-2%)" },
      { action: "Kiểm tra dữ liệu", expected: "Số liệu chính xác, hợp lý" },
      {
        action: "Thử phân tích AI",
        expected: "Phân tích hoàn thành thành công",
      },
    ],
    testData: "Phiên làm việc 2+ giờ",
    precondition: "Có thời gian test lâu dài",
    status: "pending",
  },
  {
    id: "TC-018",
    title: "Tính Toán Điểm Năng Suất",
    priority: "high",
    category: "Kiểm Thử Chức Năng",
    duration: "5 phút",
    steps: [
      {
        action: "Tạo dữ liệu mẫu (hoạt động cao)",
        expected: "Dữ liệu mô phỏng làm việc chăm chỉ",
      },
      { action: "Chạy phân tích AI", expected: "Phân tích hoàn thành" },
      { action: "Kiểm tra điểm năng suất", expected: "Điểm cao (70-100)" },
      { action: "Ghi lại điểm số", expected: "Ghi nhớ điểm" },
      { action: "Reset dữ liệu", expected: "Dữ liệu về 0" },
      {
        action: "Theo dõi 5 phút nhưng KHÔNG hoạt động gì",
        expected: "Chỉ có thời gian nghỉ tăng",
      },
      { action: "Chạy phân tích AI", expected: "Phân tích hoàn thành" },
      { action: "Kiểm tra điểm năng suất", expected: "Điểm thấp (0-50)" },
      {
        action: "So sánh 2 điểm",
        expected: "Điểm phản ánh đúng mức độ hoạt động",
      },
    ],
    testData: "Kịch bản hoạt động cao và thấp",
    precondition: "Có thời gian test",
    status: "pending",
  },
  {
    id: "TC-019",
    title: "Giao Diện Tổng Thể",
    priority: "low",
    category: "Kiểm Thử Giao Diện",
    duration: "3 phút",
    steps: [
      { action: "Mở ứng dụng", expected: "Ứng dụng hiển thị" },
      {
        action: "Kiểm tra màu sắc",
        expected: "Giao diện tối (dark mode), màu sắc hài hòa",
      },
      { action: "Kiểm tra font chữ", expected: "Chữ rõ ràng, dễ đọc" },
      {
        action: "Kiểm tra khoảng cách",
        expected: "Các phần tử không bị chồng lên nhau",
      },
      { action: "Kiểm tra biểu tượng", expected: "Các icon hiển thị đúng" },
      {
        action: "Kiểm tra nút bấm",
        expected: "Nút có hiệu ứng khi hover chuột",
      },
      {
        action: "Kiểm tra tổng thể",
        expected: "Giao diện chuyên nghiệp, hiện đại",
      },
    ],
    testData: "Không cần",
    precondition: "Không cần",
    status: "pending",
  },
  {
    id: "TC-020",
    title: "Kiểm Tra Bảo Mật Dữ Liệu",
    priority: "high",
    category: "Kiểm Thử Bảo Mật",
    duration: "5 phút",
    steps: [
      { action: "Bắt đầu theo dõi", expected: "Đang theo dõi" },
      {
        action: "Gõ mật khẩu hoặc thông tin nhạy cảm",
        expected: "Gõ bình thường",
      },
      {
        action: "Kiểm tra số liệu",
        expected: "CHỈ hiển thị số lượng phím bấm, KHÔNG hiển thị nội dung",
      },
      {
        action: "Di chuyển chuột",
        expected: "CHỈ đếm số lần di chuyển, KHÔNG lưu vị trí",
      },
      { action: "Đóng ứng dụng", expected: "Ứng dụng đóng" },
      {
        action: "Tìm kiếm file dữ liệu trong máy",
        expected: "KHÔNG tìm thấy file lưu trữ dữ liệu theo dõi",
      },
      { action: "Mở lại ứng dụng", expected: "Dữ liệu đã bị xóa hoàn toàn" },
    ],
    testData: "Không cần",
    precondition: "Không cần",
    status: "pending",
    note: "Đây là test quan trọng về bảo mật và quyền riêng tư",
  },
];

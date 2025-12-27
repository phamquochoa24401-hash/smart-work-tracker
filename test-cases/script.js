// ===== State Management =====
let currentFilter = "all";
let currentTestCase = null;

// Load saved test results from localStorage
function loadTestResults() {
  const saved = localStorage.getItem("testResults");
  if (saved) {
    const results = JSON.parse(saved);
    testCases.forEach((tc) => {
      const savedResult = results.find((r) => r.id === tc.id);
      if (savedResult) {
        tc.status = savedResult.status;
        tc.notes = savedResult.notes || "";
        tc.actualDuration = savedResult.actualDuration || "";
      }
    });
  }
}

// Save test results to localStorage
function saveTestResults() {
  const results = testCases.map((tc) => ({
    id: tc.id,
    status: tc.status,
    notes: tc.notes || "",
    actualDuration: tc.actualDuration || "",
  }));
  localStorage.setItem("testResults", JSON.stringify(results));
}

// ===== Initialize =====
document.addEventListener("DOMContentLoaded", () => {
  loadTestResults();
  renderTestCases();
  updateStats();
  setupEventListeners();
});

// ===== Render Test Cases =====
function renderTestCases() {
  const container = document.getElementById("testCasesList");
  const filteredTests = filterTestCases();

  container.innerHTML = "";

  filteredTests.forEach((testCase) => {
    const card = createTestCaseCard(testCase);
    container.appendChild(card);
  });

  if (filteredTests.length === 0) {
    container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-tertiary);">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style="margin: 0 auto 1rem;">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <h3>No test cases found</h3>
                <p>Try adjusting your filters</p>
            </div>
        `;
  }
}

// ===== Create Test Case Card =====
function createTestCaseCard(testCase) {
  const card = document.createElement("div");
  card.className = `test-case-card status-${testCase.status}`;
  card.onclick = () => openTestCaseModal(testCase);

  const priorityClass = `priority-${testCase.priority}`;
  const statusClass = testCase.status;

  card.innerHTML = `
        <div class="test-case-header">
            <div class="test-case-id">${testCase.id}</div>
            <div class="test-case-status ${statusClass}">${testCase.status}</div>
        </div>
        <h3 class="test-case-title">${testCase.title}</h3>
        <div class="test-case-meta">
            <div class="meta-item">
                <span class="priority-badge ${priorityClass}">${testCase.priority}</span>
            </div>
            <div class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                ${testCase.duration}
            </div>
        </div>
        <div class="test-case-category">${testCase.category}</div>
        <div class="test-case-steps">${testCase.steps.length} steps</div>
    `;

  return card;
}

// ===== Filter Test Cases =====
function filterTestCases() {
  switch (currentFilter) {
    case "all":
      return testCases;
    case "high":
    case "medium":
    case "low":
      return testCases.filter((tc) => tc.priority === currentFilter);
    case "passed":
      return testCases.filter((tc) => tc.status === "passed");
    case "failed":
      return testCases.filter((tc) => tc.status === "failed");
    default:
      return testCases;
  }
}

// ===== Update Statistics =====
function updateStats() {
  const total = testCases.length;
  const passed = testCases.filter((tc) => tc.status === "passed").length;
  const failed = testCases.filter((tc) => tc.status === "failed").length;
  const pending = testCases.filter((tc) => tc.status === "pending").length;
  const progress =
    total > 0 ? (((passed + failed) / total) * 100).toFixed(0) : 0;

  document.getElementById("totalTests").textContent = total;
  document.getElementById("passedTests").textContent = passed;
  document.getElementById("failedTests").textContent = failed;
  document.getElementById("pendingTests").textContent = pending;
  document.getElementById("progressFill").style.width = `${progress}%`;
  document.getElementById("progressPercent").textContent = `${progress}%`;
  document.getElementById("passedBadge").textContent = passed;
  document.getElementById("failedBadge").textContent = failed;
}

// ===== Open Test Case Modal =====
function openTestCaseModal(testCase) {
  currentTestCase = testCase;
  const modal = document.getElementById("testModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.textContent = `${testCase.id}: ${testCase.title}`;

  modalBody.innerHTML = `
        <div class="modal-info">
            <div class="info-item">
                <div class="info-label">Priority</div>
                <div class="info-value">
                    <span class="priority-badge priority-${
                      testCase.priority
                    }">${testCase.priority}</span>
                </div>
            </div>
            <div class="info-item">
                <div class="info-label">Category</div>
                <div class="info-value">${testCase.category}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Expected Duration</div>
                <div class="info-value">${testCase.duration}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value">
                    <span class="test-case-status ${testCase.status}">${
    testCase.status
  }</span>
                </div>
            </div>
        </div>
        
        ${
          testCase.testData !== "N/A"
            ? `
            <div class="modal-section">
                <h3>📋 Test Data</h3>
                <div class="info-item">
                    <div class="info-value">${testCase.testData}</div>
                </div>
            </div>
        `
            : ""
        }
        
        <div class="modal-section">
            <h3>📝 Test Steps</h3>
            <ol class="steps-list">
                ${testCase.steps
                  .map(
                    (step, index) => `
                    <li class="step-item">
                        <div class="step-action">
                            <span class="step-number">${index + 1}</span>
                            ${step.action}
                        </div>
                        <div class="step-expected">${step.expected}</div>
                    </li>
                `
                  )
                  .join("")}
            </ol>
        </div>
        
        ${
          testCase.note
            ? `
            <div class="modal-section">
                <h3>💡 Note</h3>
                <div class="info-item">
                    <div class="info-value" style="color: var(--warning);">${testCase.note}</div>
                </div>
            </div>
        `
            : ""
        }
    `;

  modal.classList.add("active");
}

// ===== Close Modal =====
function closeModal() {
  document.getElementById("testModal").classList.remove("active");
  currentTestCase = null;
}

// ===== Mark Test Result =====
function markTestResult(status) {
  if (!currentTestCase) return;

  currentTestCase.status = status;
  saveTestResults();
  updateStats();
  renderTestCases();
  closeModal();
}

// ===== Reset All Tests =====
function resetAllTests() {
  if (
    !confirm(
      "Are you sure you want to reset all test results? This action cannot be undone."
    )
  ) {
    return;
  }

  testCases.forEach((tc) => {
    tc.status = "pending";
    tc.notes = "";
    tc.actualDuration = "";
  });

  saveTestResults();
  updateStats();
  renderTestCases();
}

// ===== Export Results to Excel =====
function exportResults() {
  const total = testCases.length;
  const passed = testCases.filter((tc) => tc.status === "passed").length;
  const failed = testCases.filter((tc) => tc.status === "failed").length;
  const pending = testCases.filter((tc) => tc.status === "pending").length;
  const passRate = total > 0 ? ((passed / total) * 100).toFixed(2) : 0;

  const now = new Date();
  const dateStr = now.toLocaleDateString("vi-VN");
  const timeStr = now.toLocaleTimeString("vi-VN");

  // Create HTML table that Excel can open
  let html = `
<html xmlns:x="urn:schemas-microsoft-com:office:excel">
<head>
    <meta charset="UTF-8">
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid black; padding: 8px; text-align: left; }
        th { background-color: #4472C4; color: white; font-weight: bold; }
        .summary { background-color: #E7E6E6; font-weight: bold; }
        .passed { background-color: #C6EFCE; }
        .failed { background-color: #FFC7CE; }
        .pending { background-color: #FFEB9C; }
        .high { background-color: #FFC7CE; font-weight: bold; }
        .medium { background-color: #FFEB9C; }
        .low { background-color: #BDD7EE; }
        .header-row { background-color: #D9E1F2; font-weight: bold; }
    </style>
</head>
<body>
    <h1>BÁO CÁO KIỂM THỬ - SMART WORK TRACKER</h1>
    <p><strong>Ngày:</strong> ${dateStr}</p>
    <p><strong>Giờ:</strong> ${timeStr}</p>
    <p><strong>Người thực hiện:</strong> _________________</p>
    
    <h2>TỔNG KẾT</h2>
    <table>
        <tr class="summary">
            <th>Chỉ số</th>
            <th>Giá trị</th>
        </tr>
        <tr>
            <td>Tổng số test case</td>
            <td>${total}</td>
        </tr>
        <tr class="passed">
            <td>Đã Pass</td>
            <td>${passed}</td>
        </tr>
        <tr class="failed">
            <td>Đã Fail</td>
            <td>${failed}</td>
        </tr>
        <tr class="pending">
            <td>Chưa thực hiện</td>
            <td>${pending}</td>
        </tr>
        <tr class="summary">
            <td>Tỷ lệ Pass</td>
            <td>${passRate}%</td>
        </tr>
    </table>
    
    <h2>CHI TIẾT TEST CASES</h2>
    <table>
        <tr>
            <th style="width: 80px;">Mã TC</th>
            <th style="width: 200px;">Tiêu đề</th>
            <th style="width: 80px;">Ưu tiên</th>
            <th style="width: 120px;">Loại test</th>
            <th style="width: 80px;">Thời gian</th>
            <th style="width: 80px;">Trạng thái</th>
            <th style="width: 150px;">Điều kiện tiên quyết</th>
            <th style="width: 400px;">Các bước thực hiện</th>
            <th style="width: 150px;">Ghi chú</th>
        </tr>`;

  testCases.forEach((tc) => {
    const statusClass = tc.status;
    const priorityClass = tc.priority;
    const statusText =
      tc.status === "passed"
        ? "PASS"
        : tc.status === "failed"
        ? "FAIL"
        : "Chưa test";
    const priorityText =
      tc.priority === "high"
        ? "Cao"
        : tc.priority === "medium"
        ? "Trung bình"
        : "Thấp";

    // Format steps
    let stepsHtml = '<ol style="margin: 0; padding-left: 20px;">';
    tc.steps.forEach((step, index) => {
      stepsHtml += `<li><strong>${step.action}</strong><br/>→ ${step.expected}</li>`;
    });
    stepsHtml += "</ol>";

    html += `
        <tr class="${statusClass}">
            <td>${tc.id}</td>
            <td>${tc.title}</td>
            <td class="${priorityClass}">${priorityText}</td>
            <td>${tc.category}</td>
            <td>${tc.duration}</td>
            <td><strong>${statusText}</strong></td>
            <td>${tc.precondition || "Không cần"}</td>
            <td>${stepsHtml}</td>
            <td>${tc.note || ""}</td>
        </tr>`;
  });

  html += `
    </table>
    
    <h2>NHẬN XÉT CHUNG</h2>
    <p>_________________________________________________________________________</p>
    <p>_________________________________________________________________________</p>
    <p>_________________________________________________________________________</p>
    
    <h2>KẾT LUẬN</h2>
    <p>☐ Ứng dụng đạt yêu cầu, có thể release</p>
    <p>☐ Ứng dụng cần sửa một số lỗi trước khi release</p>
    <p>☐ Ứng dụng chưa đạt yêu cầu, cần test lại</p>
    
    <br/><br/>
    <table style="border: none;">
        <tr style="border: none;">
            <td style="border: none; width: 50%;">
                <strong>Người kiểm thử</strong><br/><br/>
                Ký tên: _________________<br/>
                Ngày: _________________
            </td>
            <td style="border: none; width: 50%;">
                <strong>Người phê duyệt</strong><br/><br/>
                Ký tên: _________________<br/>
                Ngày: _________________
            </td>
        </tr>
    </table>
</body>
</html>`;

  // Download as Excel file
  const blob = new Blob([html], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Bao-Cao-Test-SmartWorkTracker-${now.getFullYear()}${(
    now.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}.xls`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // Show success message
  showNotification("Đã xuất báo cáo Excel thành công!", "success");
}

// ===== Show Notification =====
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${type === "success" ? "var(--success)" : "var(--info)"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ===== Event Listeners =====
function setupEventListeners() {
  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderTestCases();
    });
  });

  // Modal controls
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalCancel").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", closeModal);
  document
    .getElementById("modalPass")
    .addEventListener("click", () => markTestResult("passed"));
  document
    .getElementById("modalFail")
    .addEventListener("click", () => markTestResult("failed"));

  // Header buttons
  document.getElementById("resetBtn").addEventListener("click", resetAllTests);
  document.getElementById("exportBtn").addEventListener("click", exportResults);

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

// ===== Animations =====
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

console.log(
  "%c🧪 Test Cases Dashboard Loaded",
  "font-size: 20px; font-weight: bold; color: #6366f1;"
);
console.log("%cTotal Test Cases:", testCases.length);

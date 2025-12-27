# Manual Test Cases - Smart Work Tracker

**Project:** Smart Work Tracker  
**Version:** 1.0.0  
**Platform:** macOS Desktop Application  
**Test Type:** Manual Testing  
**Last Updated:** 2025-12-27

---

## Test Environment Setup

### Prerequisites

- macOS operating system
- Node.js installed
- Accessibility permissions granted
- OpenAI API key (optional, for AI features)

### Test Data

- Sample work session: 8 hours
- Minimum tracking time: 1 hour
- Idle threshold: 2 minutes

---

## Test Cases

### **TC-001: Application Launch**

**Priority:** High  
**Category:** Smoke Test

| Step | Action                        | Expected Result                                     | Status        | Notes |
| ---- | ----------------------------- | --------------------------------------------------- | ------------- | ----- |
| 1    | Navigate to project directory | Terminal opens in correct folder                    | ☐ Pass ☐ Fail |       |
| 2    | Run `npm start`               | Application launches without errors                 | ☐ Pass ☐ Fail |       |
| 3    | Verify window opens           | App window displays with title "Smart Work Tracker" | ☐ Pass ☐ Fail |       |
| 4    | Check initial UI state        | All buttons and sections are visible                | ☐ Pass ☐ Fail |       |
| 5    | Verify default values         | Mouse/Keyboard events = 0, Active/Idle time = 0     | ☐ Pass ☐ Fail |       |

**Test Data:** N/A  
**Expected Duration:** 1 minute  
**Actual Duration:** ****\_****

---

### **TC-002: Start Tracking - Normal Flow**

**Priority:** High  
**Category:** Functional Test

| Step | Action                          | Expected Result                           | Status        | Notes |
| ---- | ------------------------------- | ----------------------------------------- | ------------- | ----- |
| 1    | Launch application              | App is ready                              | ☐ Pass ☐ Fail |       |
| 2    | Click "Bắt Đầu Theo Dõi" button | Button changes to "Dừng Theo Dõi"         | ☐ Pass ☐ Fail |       |
| 3    | Verify tracking status          | Status indicator shows "Đang theo dõi..." | ☐ Pass ☐ Fail |       |
| 4    | Move mouse around               | Mouse events counter increases            | ☐ Pass ☐ Fail |       |
| 5    | Type on keyboard                | Keyboard events counter increases         | ☐ Pass ☐ Fail |       |
| 6    | Wait 5 seconds                  | Active time increases                     | ☐ Pass ☐ Fail |       |
| 7    | Check chart updates             | Activity chart shows data points          | ☐ Pass ☐ Fail |       |

**Test Data:** N/A  
**Expected Duration:** 2 minutes  
**Actual Duration:** ****\_****

---

### **TC-003: Stop Tracking**

**Priority:** High  
**Category:** Functional Test

| Step | Action                       | Expected Result                           | Status        | Notes |
| ---- | ---------------------------- | ----------------------------------------- | ------------- | ----- |
| 1    | Start tracking (TC-002)      | Tracking is active                        | ☐ Pass ☐ Fail |       |
| 2    | Perform some activities      | Counters increase                         | ☐ Pass ☐ Fail |       |
| 3    | Click "Dừng Theo Dõi" button | Button changes back to "Bắt Đầu Theo Dõi" | ☐ Pass ☐ Fail |       |
| 4    | Verify tracking status       | Status shows "Chưa bắt đầu theo dõi"      | ☐ Pass ☐ Fail |       |
| 5    | Move mouse/type              | Counters do NOT increase                  | ☐ Pass ☐ Fail |       |
| 6    | Check data retention         | Previous data is still displayed          | ☐ Pass ☐ Fail |       |

**Test Data:** N/A  
**Expected Duration:** 2 minutes  
**Actual Duration:** ****\_****

---

### **TC-004: Idle Time Detection**

**Priority:** High  
**Category:** Functional Test

| Step | Action                           | Expected Result                       | Status        | Notes |
| ---- | -------------------------------- | ------------------------------------- | ------------- | ----- |
| 1    | Start tracking                   | Tracking is active                    | ☐ Pass ☐ Fail |       |
| 2    | Perform activities for 1 minute  | Active time increases to ~60 seconds  | ☐ Pass ☐ Fail |       |
| 3    | Stop all mouse/keyboard activity | Wait without interaction              | ☐ Pass ☐ Fail |       |
| 4    | Wait for 2+ minutes              | Idle time starts increasing           | ☐ Pass ☐ Fail |       |
| 5    | Resume activity                  | Active time resumes increasing        | ☐ Pass ☐ Fail |       |
| 6    | Verify counters                  | Both active and idle time are tracked | ☐ Pass ☐ Fail |       |

**Test Data:** Idle threshold = 2 minutes  
**Expected Duration:** 5 minutes  
**Actual Duration:** ****\_****

---

### **TC-005: Generate Sample Data**

**Priority:** Medium  
**Category:** Functional Test

| Step | Action                         | Expected Result                          | Status        | Notes |
| ---- | ------------------------------ | ---------------------------------------- | ------------- | ----- |
| 1    | Launch application             | App is ready                             | ☐ Pass ☐ Fail |       |
| 2    | Click "Tạo Dữ Liệu Mẫu" button | Button is clickable                      | ☐ Pass ☐ Fail |       |
| 3    | Wait for generation            | Sample data is generated                 | ☐ Pass ☐ Fail |       |
| 4    | Verify mouse events            | Counter shows ~15,000-20,000 events      | ☐ Pass ☐ Fail |       |
| 5    | Verify keyboard events         | Counter shows ~8,000-12,000 events       | ☐ Pass ☐ Fail |       |
| 6    | Verify active time             | Shows ~7-8 hours (25,200-28,800 seconds) | ☐ Pass ☐ Fail |       |
| 7    | Verify idle time               | Shows ~30-60 minutes                     | ☐ Pass ☐ Fail |       |
| 8    | Check chart                    | Chart displays hourly data for 8 hours   | ☐ Pass ☐ Fail |       |

**Test Data:** 8-hour work session simulation  
**Expected Duration:** 1 minute  
**Actual Duration:** ****\_****

---

### **TC-006: Reset Data**

**Priority:** Medium  
**Category:** Functional Test

| Step | Action                                    | Expected Result                          | Status        | Notes |
| ---- | ----------------------------------------- | ---------------------------------------- | ------------- | ----- |
| 1    | Generate sample data or track for a while | Data is present                          | ☐ Pass ☐ Fail |       |
| 2    | Click "Reset" button                      | Confirmation may appear (if implemented) | ☐ Pass ☐ Fail |       |
| 3    | Confirm reset                             | All counters reset to 0                  | ☐ Pass ☐ Fail |       |
| 4    | Verify mouse events                       | Shows 0                                  | ☐ Pass ☐ Fail |       |
| 5    | Verify keyboard events                    | Shows 0                                  | ☐ Pass ☐ Fail |       |
| 6    | Verify active time                        | Shows 0:00:00                            | ☐ Pass ☐ Fail |       |
| 7    | Verify idle time                          | Shows 0:00:00                            | ☐ Pass ☐ Fail |       |
| 8    | Check chart                               | Chart is empty or shows no data          | ☐ Pass ☐ Fail |       |

**Test Data:** N/A  
**Expected Duration:** 1 minute  
**Actual Duration:** ****\_****

---

### **TC-007: AI Analysis - With OpenAI API Key**

**Priority:** High  
**Category:** Functional Test

| Step | Action                                      | Expected Result                       | Status        | Notes |
| ---- | ------------------------------------------- | ------------------------------------- | ------------- | ----- |
| 1    | Ensure OpenAI API key is configured in .env | API key is set                        | ☐ Pass ☐ Fail |       |
| 2    | Generate sample data or track for 1+ hour   | Sufficient data available             | ☐ Pass ☐ Fail |       |
| 3    | Click "Phân Tích Năng Suất Với AI" button   | Button is clickable                   | ☐ Pass ☐ Fail |       |
| 4    | Wait for API response                       | Loading indicator appears             | ☐ Pass ☐ Fail |       |
| 5    | Verify productivity score                   | Score between 0-100 is displayed      | ☐ Pass ☐ Fail |       |
| 6    | Check peak hours                            | Top 3 productive hours are listed     | ☐ Pass ☐ Fail |       |
| 7    | Review work patterns                        | Patterns section shows analysis       | ☐ Pass ☐ Fail |       |
| 8    | Check recommendations                       | Personalized suggestions are provided | ☐ Pass ☐ Fail |       |
| 9    | Verify AI summary                           | Summary text is displayed             | ☐ Pass ☐ Fail |       |

**Test Data:** Valid OpenAI API key  
**Expected Duration:** 30 seconds  
**Actual Duration:** ****\_****

---

### **TC-008: AI Analysis - Without API Key (Fallback)**

**Priority:** High  
**Category:** Functional Test

| Step | Action                                    | Expected Result                | Status        | Notes |
| ---- | ----------------------------------------- | ------------------------------ | ------------- | ----- |
| 1    | Remove or comment out OpenAI API key      | No API key configured          | ☐ Pass ☐ Fail |       |
| 2    | Generate sample data                      | Data is available              | ☐ Pass ☐ Fail |       |
| 3    | Click "Phân Tích Năng Suất Với AI" button | Button is clickable            | ☐ Pass ☐ Fail |       |
| 4    | Wait for analysis                         | Local algorithm runs           | ☐ Pass ☐ Fail |       |
| 5    | Verify productivity score                 | Score is calculated locally    | ☐ Pass ☐ Fail |       |
| 6    | Check peak hours                          | Hours are identified           | ☐ Pass ☐ Fail |       |
| 7    | Review work patterns                      | Basic patterns are shown       | ☐ Pass ☐ Fail |       |
| 8    | Check recommendations                     | Generic recommendations appear | ☐ Pass ☐ Fail |       |
| 9    | Verify no API error                       | No error messages about API    | ☐ Pass ☐ Fail |       |

**Test Data:** No API key  
**Expected Duration:** 10 seconds  
**Actual Duration:** ****\_****

---

### **TC-009: AI Analysis - Insufficient Data**

**Priority:** Medium  
**Category:** Negative Test

| Step | Action                                    | Expected Result                             | Status        | Notes |
| ---- | ----------------------------------------- | ------------------------------------------- | ------------- | ----- |
| 1    | Launch fresh application                  | No data tracked                             | ☐ Pass ☐ Fail |       |
| 2    | Click "Phân Tích Năng Suất Với AI" button | Button is clickable                         | ☐ Pass ☐ Fail |       |
| 3    | Check response                            | Error message or warning appears            | ☐ Pass ☐ Fail |       |
| 4    | Verify message content                    | Message indicates insufficient data         | ☐ Pass ☐ Fail |       |
| 5    | Track for 5 minutes only                  | Minimal data collected                      | ☐ Pass ☐ Fail |       |
| 6    | Try AI analysis again                     | Analysis runs but may show limited insights | ☐ Pass ☐ Fail |       |

**Test Data:** Less than 1 hour of data  
**Expected Duration:** 2 minutes  
**Actual Duration:** ****\_****

---

### **TC-010: Real-time Chart Updates**

**Priority:** Medium  
**Category:** UI Test

| Step | Action                             | Expected Result                         | Status        | Notes |
| ---- | ---------------------------------- | --------------------------------------- | ------------- | ----- |
| 1    | Start tracking                     | Tracking is active                      | ☐ Pass ☐ Fail |       |
| 2    | Perform activities                 | Events are counted                      | ☐ Pass ☐ Fail |       |
| 3    | Observe chart for 1 minute         | Chart updates in real-time              | ☐ Pass ☐ Fail |       |
| 4    | Check current hour bar             | Current hour shows activity             | ☐ Pass ☐ Fail |       |
| 5    | Wait for hour change (if possible) | New hour bar appears                    | ☐ Pass ☐ Fail |       |
| 6    | Verify chart colors                | Bars are visible and colored correctly  | ☐ Pass ☐ Fail |       |
| 7    | Check axis labels                  | X-axis shows hours, Y-axis shows counts | ☐ Pass ☐ Fail |       |

**Test Data:** N/A  
**Expected Duration:** 3 minutes  
**Actual Duration:** ****\_****

---

### **TC-011: Time Display Format**

**Priority:** Low  
**Category:** UI Test

| Step | Action                    | Expected Result                        | Status        | Notes |
| ---- | ------------------------- | -------------------------------------- | ------------- | ----- |
| 1    | Start tracking            | Tracking begins                        | ☐ Pass ☐ Fail |       |
| 2    | Track for 30 seconds      | Active time shows "0:00:30" or similar | ☐ Pass ☐ Fail |       |
| 3    | Track for 1 minute        | Active time shows "0:01:00"            | ☐ Pass ☐ Fail |       |
| 4    | Track for 1 hour          | Active time shows "1:00:00"            | ☐ Pass ☐ Fail |       |
| 5    | Generate sample data      | Times show in hours:minutes:seconds    | ☐ Pass ☐ Fail |       |
| 6    | Verify format consistency | All time displays use same format      | ☐ Pass ☐ Fail |       |

**Test Data:** Various time durations  
**Expected Duration:** 2 minutes (or use sample data)  
**Actual Duration:** ****\_****

---

### **TC-012: Button State Management**

**Priority:** Medium  
**Category:** UI Test

| Step | Action                   | Expected Result                               | Status        | Notes |
| ---- | ------------------------ | --------------------------------------------- | ------------- | ----- |
| 1    | Launch application       | "Bắt Đầu Theo Dõi" button is enabled          | ☐ Pass ☐ Fail |       |
| 2    | Click "Bắt Đầu Theo Dõi" | Button text changes to "Dừng Theo Dõi"        | ☐ Pass ☐ Fail |       |
| 3    | Check other buttons      | "Tạo Dữ Liệu Mẫu" is disabled during tracking | ☐ Pass ☐ Fail |       |
| 4    | Click "Dừng Theo Dõi"    | Button reverts to "Bắt Đầu Theo Dõi"          | ☐ Pass ☐ Fail |       |
| 5    | Verify button states     | "Tạo Dữ Liệu Mẫu" is enabled again            | ☐ Pass ☐ Fail |       |
| 6    | Click "Reset"            | All buttons return to initial state           | ☐ Pass ☐ Fail |       |

**Test Data:** N/A  
**Expected Duration:** 2 minutes  
**Actual Duration:** ****\_****

---

### **TC-013: Accessibility Permissions - Not Granted**

**Priority:** High  
**Category:** Negative Test

| Step | Action                           | Expected Result                         | Status        | Notes |
| ---- | -------------------------------- | --------------------------------------- | ------------- | ----- |
| 1    | Revoke Accessibility permissions | System Preferences > Security & Privacy | ☐ Pass ☐ Fail |       |
| 2    | Launch application               | App launches                            | ☐ Pass ☐ Fail |       |
| 3    | Click "Bắt Đầu Theo Dõi"         | Tracking attempts to start              | ☐ Pass ☐ Fail |       |
| 4    | Check keyboard tracking          | Keyboard events may not be tracked      | ☐ Pass ☐ Fail |       |
| 5    | Verify error handling            | Error message or warning appears        | ☐ Pass ☐ Fail |       |
| 6    | Check console logs               | Logs show permission error              | ☐ Pass ☐ Fail |       |

**Test Data:** Accessibility permissions revoked  
**Expected Duration:** 3 minutes  
**Actual Duration:** ****\_****

---

### **TC-014: Application Close and Data Persistence**

**Priority:** Medium  
**Category:** Functional Test

| Step | Action                          | Expected Result                            | Status        | Notes |
| ---- | ------------------------------- | ------------------------------------------ | ------------- | ----- |
| 1    | Start tracking and collect data | Data is present                            | ☐ Pass ☐ Fail |       |
| 2    | Note current values             | Record mouse, keyboard, active, idle times | ☐ Pass ☐ Fail |       |
| 3    | Close application               | App closes cleanly                         | ☐ Pass ☐ Fail |       |
| 4    | Relaunch application            | App opens successfully                     | ☐ Pass ☐ Fail |       |
| 5    | Check data                      | All counters are reset to 0 (by design)    | ☐ Pass ☐ Fail |       |
| 6    | Verify no errors                | No error messages on relaunch              | ☐ Pass ☐ Fail |       |

**Test Data:** N/A  
**Expected Duration:** 2 minutes  
**Actual Duration:** ****\_****  
**Note:** App is designed NOT to persist data for privacy reasons

---

### **TC-015: Multiple Start/Stop Cycles**

**Priority:** Medium  
**Category:** Functional Test

| Step | Action                            | Expected Result                    | Status        | Notes |
| ---- | --------------------------------- | ---------------------------------- | ------------- | ----- |
| 1    | Start tracking                    | Tracking begins                    | ☐ Pass ☐ Fail |       |
| 2    | Track for 1 minute                | Data accumulates                   | ☐ Pass ☐ Fail |       |
| 3    | Stop tracking                     | Tracking stops                     | ☐ Pass ☐ Fail |       |
| 4    | Start tracking again              | Tracking resumes                   | ☐ Pass ☐ Fail |       |
| 5    | Track for 1 more minute           | Data continues to accumulate       | ☐ Pass ☐ Fail |       |
| 6    | Repeat steps 3-5 three more times | Each cycle works correctly         | ☐ Pass ☐ Fail |       |
| 7    | Verify total data                 | All tracking sessions are combined | ☐ Pass ☐ Fail |       |
| 8    | Check for memory leaks            | App remains responsive             | ☐ Pass ☐ Fail |       |

**Test Data:** 5 start/stop cycles  
**Expected Duration:** 8 minutes  
**Actual Duration:** ****\_****

---

### **TC-016: AI Analysis - API Error Handling**

**Priority:** Medium  
**Category:** Negative Test

| Step | Action                             | Expected Result                     | Status        | Notes |
| ---- | ---------------------------------- | ----------------------------------- | ------------- | ----- |
| 1    | Set invalid OpenAI API key         | Use "sk-invalid-key-123"            | ☐ Pass ☐ Fail |       |
| 2    | Generate sample data               | Data is available                   | ☐ Pass ☐ Fail |       |
| 3    | Click "Phân Tích Năng Suất Với AI" | Button is clicked                   | ☐ Pass ☐ Fail |       |
| 4    | Wait for response                  | API call fails                      | ☐ Pass ☐ Fail |       |
| 5    | Check fallback behavior            | Local analysis runs automatically   | ☐ Pass ☐ Fail |       |
| 6    | Verify error message               | User-friendly error message appears | ☐ Pass ☐ Fail |       |
| 7    | Check results                      | Local analysis results are shown    | ☐ Pass ☐ Fail |       |

**Test Data:** Invalid API key  
**Expected Duration:** 2 minutes  
**Actual Duration:** ****\_****

---

### **TC-017: Window Resize and Responsiveness**

**Priority:** Low  
**Category:** UI Test

| Step | Action                           | Expected Result                   | Status        | Notes |
| ---- | -------------------------------- | --------------------------------- | ------------- | ----- |
| 1    | Launch application               | App opens at default size         | ☐ Pass ☐ Fail |       |
| 2    | Maximize window                  | All elements scale properly       | ☐ Pass ☐ Fail |       |
| 3    | Minimize window to smallest size | UI remains usable                 | ☐ Pass ☐ Fail |       |
| 4    | Resize to medium size            | Layout adjusts appropriately      | ☐ Pass ☐ Fail |       |
| 5    | Check chart visibility           | Chart resizes with window         | ☐ Pass ☐ Fail |       |
| 6    | Verify button positions          | Buttons remain accessible         | ☐ Pass ☐ Fail |       |
| 7    | Check text readability           | All text is readable at all sizes | ☐ Pass ☐ Fail |       |

**Test Data:** N/A  
**Expected Duration:** 3 minutes  
**Actual Duration:** ****\_****

---

### **TC-018: Performance - Long Running Session**

**Priority:** Medium  
**Category:** Performance Test

| Step | Action                        | Expected Result                           | Status        | Notes |
| ---- | ----------------------------- | ----------------------------------------- | ------------- | ----- |
| 1    | Start tracking                | Tracking begins                           | ☐ Pass ☐ Fail |       |
| 2    | Perform continuous activities | Events are tracked                        | ☐ Pass ☐ Fail |       |
| 3    | Run for 2+ hours              | App remains responsive                    | ☐ Pass ☐ Fail |       |
| 4    | Check memory usage            | Memory usage is stable (Activity Monitor) | ☐ Pass ☐ Fail |       |
| 5    | Check CPU usage               | CPU usage remains low (~1-2%)             | ☐ Pass ☐ Fail |       |
| 6    | Verify data accuracy          | Counters show reasonable values           | ☐ Pass ☐ Fail |       |
| 7    | Test AI analysis              | Analysis completes successfully           | ☐ Pass ☐ Fail |       |

**Test Data:** 2+ hour session  
**Expected Duration:** 2+ hours  
**Actual Duration:** ****\_****

---

### **TC-019: Chart - Edge Cases**

**Priority:** Low  
**Category:** Edge Case Test

| Step | Action                              | Expected Result                  | Status        | Notes |
| ---- | ----------------------------------- | -------------------------------- | ------------- | ----- |
| 1    | Launch app with no data             | Chart shows empty state or zeros | ☐ Pass ☐ Fail |       |
| 2    | Generate sample data                | Chart populates                  | ☐ Pass ☐ Fail |       |
| 3    | Reset data                          | Chart clears                     | ☐ Pass ☐ Fail |       |
| 4    | Track for exactly 1 second          | Chart shows minimal data         | ☐ Pass ☐ Fail |       |
| 5    | Track across midnight (if possible) | Chart handles day transition     | ☐ Pass ☐ Fail |       |
| 6    | Check with 24+ hours of data        | Chart displays correctly         | ☐ Pass ☐ Fail |       |

**Test Data:** Various edge case scenarios  
**Expected Duration:** 5 minutes  
**Actual Duration:** ****\_****

---

### **TC-020: Productivity Score Calculation**

**Priority:** High  
**Category:** Functional Test

| Step | Action                                  | Expected Result                | Status        | Notes |
| ---- | --------------------------------------- | ------------------------------ | ------------- | ----- |
| 1    | Generate sample data with high activity | Data shows high engagement     | ☐ Pass ☐ Fail |       |
| 2    | Run AI analysis                         | Analysis completes             | ☐ Pass ☐ Fail |       |
| 3    | Check productivity score                | Score is 70-100 (high)         | ☐ Pass ☐ Fail |       |
| 4    | Reset and create low activity data      | Minimal events, high idle time | ☐ Pass ☐ Fail |       |
| 5    | Run AI analysis                         | Analysis completes             | ☐ Pass ☐ Fail |       |
| 6    | Check productivity score                | Score is 0-50 (low)            | ☐ Pass ☐ Fail |       |
| 7    | Verify score logic                      | Score reflects activity level  | ☐ Pass ☐ Fail |       |

**Test Data:** High and low activity scenarios  
**Expected Duration:** 5 minutes  
**Actual Duration:** ****\_****

---

## Test Summary Template

| Metric           | Value   |
| ---------------- | ------- |
| Total Test Cases | 20      |
| Passed           | **\_**  |
| Failed           | **\_**  |
| Blocked          | **\_**  |
| Not Executed     | **\_**  |
| Pass Rate        | **\_**% |

---

## Bug Report Template

**Bug ID:** BUG-XXX  
**Test Case:** TC-XXX  
**Severity:** Critical / High / Medium / Low  
**Priority:** P1 / P2 / P3 / P4

**Summary:**  
Brief description of the bug

**Steps to Reproduce:**

1. Step 1
2. Step 2
3. Step 3

**Expected Result:**  
What should happen

**Actual Result:**  
What actually happened

**Environment:**

- macOS Version: **\_**
- Node.js Version: **\_**
- App Version: 1.0.0

**Screenshots/Logs:**  
Attach if available

**Additional Notes:**  
Any other relevant information

---

## Testing Notes

### Critical Path Tests

- TC-001: Application Launch
- TC-002: Start Tracking
- TC-003: Stop Tracking
- TC-007: AI Analysis with API
- TC-008: AI Analysis without API

### Regression Tests

Run after any code changes:

- TC-001, TC-002, TC-003, TC-005, TC-006, TC-007

### Performance Tests

- TC-018: Long running session
- Monitor memory and CPU usage

### Privacy Tests

- Verify no keystroke content is logged
- Verify no mouse coordinates are stored
- Check data is not persisted after app close

---

## Sign-off

**Tester Name:** **********\_**********  
**Date:** **********\_**********  
**Signature:** **********\_**********

**Test Lead Approval:** **********\_**********  
**Date:** **********\_**********

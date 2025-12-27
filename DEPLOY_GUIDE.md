# 📖 Hướng Dẫn Hoàn Chỉnh: Push GitHub và Deploy Pages

## 🎯 Tổng Quan

Bạn sẽ:

1. ✅ Push source code lên GitHub
2. ✅ Deploy Documentation lên GitHub Pages
3. ✅ Deploy Test Cases lên GitHub Pages
4. ✅ Có trang chủ đẹp với links đến cả 2 trang

---

## 📋 Chuẩn Bị

### Yêu Cầu:

- ✅ Tài khoản GitHub
- ✅ Git đã cài đặt
- ✅ Source code đã commit local (✅ Done!)

### Files Quan Trọng:

```
smart-work-tracker/
├── docs/                    ← Documentation website
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── test-cases/              ← Test Cases dashboard
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── testData.js
├── gh-pages-index.html      ← Landing page
├── deploy-gh-pages.sh       ← Auto deploy script
└── README.md
```

---

## 🚀 BƯỚC 1: Tạo Repository Trên GitHub

### Cách 1: Qua Web Interface

1. Truy cập: https://github.com/new
2. Điền thông tin:
   ```
   Repository name: smart-work-tracker
   Description: Privacy-focused productivity tracking app with AI insights
   Visibility: Public (để dùng GitHub Pages miễn phí)
   ```
3. **KHÔNG** tick các options:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
4. Click **"Create repository"**

### Cách 2: Qua GitHub CLI (Nếu có)

```bash
gh repo create smart-work-tracker --public --description "Privacy-focused productivity tracking app"
```

---

## 📤 BƯỚC 2: Push Code Lên GitHub

Sau khi tạo repository, GitHub sẽ hiện hướng dẫn. Chạy:

```bash
# Add remote (thay YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/smart-work-tracker.git

# Đảm bảo branch là main
git branch -M main

# Push code
git push -u origin main
```

**Ví dụ:**

```bash
git remote add origin https://github.com/maczens/smart-work-tracker.git
git branch -M main
git push -u origin main
```

### Kiểm Tra:

- Vào https://github.com/YOUR_USERNAME/smart-work-tracker
- Bạn sẽ thấy tất cả files đã được push

---

## 🌐 BƯỚC 3: Deploy GitHub Pages

### Option A: Tự Động (Khuyên Dùng) ⭐

Chạy script tự động:

```bash
./deploy-gh-pages.sh
```

Script sẽ:

1. Tạo branch `gh-pages`
2. Copy `docs/`, `test-cases/`, và `gh-pages-index.html`
3. Đổi tên `gh-pages-index.html` → `index.html`
4. Push lên GitHub

### Option B: Thủ Công

```bash
# Tạo branch gh-pages
git checkout --orphan gh-pages

# Xóa tất cả files
git rm -rf .

# Copy files cần thiết từ main
git checkout main -- docs/
git checkout main -- test-cases/
git checkout main -- gh-pages-index.html

# Đổi tên index
mv gh-pages-index.html index.html

# Commit
git add .
git commit -m "Deploy GitHub Pages"

# Push
git push -u origin gh-pages

# Quay lại main
git checkout main
```

---

## ⚙️ BƯỚC 4: Enable GitHub Pages

1. Vào repository: `https://github.com/YOUR_USERNAME/smart-work-tracker`
2. Click **Settings** (tab trên cùng)
3. Scroll xuống sidebar bên trái, click **Pages**
4. Trong phần **"Build and deployment"**:
   - **Source**: Deploy from a branch
   - **Branch**: Chọn `gh-pages`
   - **Folder**: Chọn `/ (root)`
5. Click **Save**

### Chờ Deploy:

- GitHub sẽ build và deploy (2-5 phút)
- Bạn sẽ thấy thông báo: "Your site is live at..."

---

## 🎉 BƯỚC 5: Truy Cập Trang Web

Sau khi deploy xong, truy cập:

### 🏠 Trang Chủ:

```
https://YOUR_USERNAME.github.io/smart-work-tracker/
```

### 📚 Documentation:

```
https://YOUR_USERNAME.github.io/smart-work-tracker/docs/
```

### 🧪 Test Cases:

```
https://YOUR_USERNAME.github.io/smart-work-tracker/test-cases/
```

**Ví dụ với username `maczens`:**

- https://maczens.github.io/smart-work-tracker/
- https://maczens.github.io/smart-work-tracker/docs/
- https://maczens.github.io/smart-work-tracker/test-cases/

---

## 🔄 Update Sau Này

### Khi Thay Đổi Documentation hoặc Test Cases:

```bash
# 1. Sửa files trong docs/ hoặc test-cases/
# 2. Commit changes
git add .
git commit -m "Update documentation"
git push origin main

# 3. Deploy lại GitHub Pages
./deploy-gh-pages.sh
```

### Hoặc Thủ Công:

```bash
# Commit changes trên main
git add .
git commit -m "Update docs"
git push origin main

# Update gh-pages
git checkout gh-pages
git checkout main -- docs/
git checkout main -- test-cases/
git add .
git commit -m "Deploy updates"
git push origin gh-pages
git checkout main
```

---

## 📊 Cấu Trúc GitHub Pages

Sau khi deploy, cấu trúc sẽ như sau:

```
Branch: gh-pages
├── index.html           ← Landing page (từ gh-pages-index.html)
├── docs/                ← Documentation
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── test-cases/          ← Test Cases
    ├── index.html
    ├── styles.css
    ├── script.js
    └── testData.js
```

---

## 🐛 Troubleshooting

### Lỗi: "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/smart-work-tracker.git
```

### Lỗi: "Permission denied"

- Kiểm tra username/password
- Hoặc dùng SSH key
- Hoặc dùng Personal Access Token

### Trang 404 Not Found

- Đợi 5-10 phút sau khi enable Pages
- Clear cache browser (Ctrl+Shift+R)
- Kiểm tra branch và folder đã chọn đúng

### CSS/JS không load

- Kiểm tra console browser (F12)
- Đảm bảo đường dẫn files đúng
- Files phải tồn tại trong branch gh-pages

### Trang không update

- Force refresh: Ctrl+Shift+R (Windows) hoặc Cmd+Shift+R (Mac)
- Xóa cache: Settings > Pages > Unpublish > Publish lại
- Đợi vài phút

---

## 📝 Checklist

Trước khi deploy, đảm bảo:

- [ ] Repository đã được tạo trên GitHub
- [ ] Remote origin đã được add
- [ ] Code đã push lên branch main
- [ ] Branch gh-pages đã được tạo
- [ ] Files docs/ và test-cases/ đã được copy
- [ ] GitHub Pages đã được enable
- [ ] Đã đợi 5 phút để deploy
- [ ] Đã test tất cả 3 URLs

---

## 🎯 Kết Quả Cuối Cùng

Bạn sẽ có:

✅ **Source Code**: https://github.com/YOUR_USERNAME/smart-work-tracker
✅ **Trang Chủ**: https://YOUR_USERNAME.github.io/smart-work-tracker/
✅ **Documentation**: https://YOUR_USERNAME.github.io/smart-work-tracker/docs/
✅ **Test Cases**: https://YOUR_USERNAME.github.io/smart-work-tracker/test-cases/

---

## 💡 Tips

### Share Links:

```markdown
📚 Documentation: https://YOUR_USERNAME.github.io/smart-work-tracker/docs/
🧪 Test Cases: https://YOUR_USERNAME.github.io/smart-work-tracker/test-cases/
```

### Update README:

Thêm vào README.md:

```markdown
## 📖 Online Documentation

- [Documentation](https://YOUR_USERNAME.github.io/smart-work-tracker/docs/)
- [Test Cases](https://YOUR_USERNAME.github.io/smart-work-tracker/test-cases/)
```

### Custom Domain (Advanced):

Nếu có domain riêng:

1. Settings > Pages > Custom domain
2. Nhập: `docs.yoursite.com`
3. Cấu hình DNS CNAME

---

## 🚀 Quick Commands

```bash
# Push code lần đầu
git remote add origin https://github.com/YOUR_USERNAME/smart-work-tracker.git
git push -u origin main

# Deploy GitHub Pages
./deploy-gh-pages.sh

# Update sau này
git add .
git commit -m "Update"
git push origin main
./deploy-gh-pages.sh
```

---

**Chúc bạn deploy thành công! 🎉**

Nếu gặp vấn đề, check lại từng bước hoặc xem phần Troubleshooting.

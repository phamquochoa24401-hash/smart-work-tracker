# Hướng Dẫn Deploy Lên GitHub Pages

## 🚀 Bước 1: Tạo Repository Trên GitHub

1. Truy cập https://github.com/new
2. Điền thông tin:
   - **Repository name**: `smart-work-tracker`
   - **Description**: `Privacy-focused productivity tracking app with AI insights`
   - **Public** (để dùng GitHub Pages miễn phí)
   - **KHÔNG** tick "Add a README file" (vì đã có rồi)
3. Click **Create repository**

## 📤 Bước 2: Push Code Lên GitHub

Sau khi tạo repository, chạy các lệnh sau:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/smart-work-tracker.git

# Push code
git branch -M main
git push -u origin main
```

**Thay `YOUR_USERNAME`** bằng username GitHub của bạn.

## 🌐 Bước 3: Enable GitHub Pages

### Option 1: Deploy Từ Branch Main (Đơn Giản)

1. Vào repository trên GitHub
2. Click **Settings** (⚙️)
3. Scroll xuống phần **Pages** (bên trái)
4. Trong **Source**, chọn:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Đợi vài phút, trang sẽ được deploy tại:
   ```
   https://YOUR_USERNAME.github.io/smart-work-tracker/
   ```

### Option 2: Deploy Với Custom Structure (Khuyên Dùng)

Để tổ chức tốt hơn, tạo branch `gh-pages`:

```bash
# Tạo branch gh-pages
git checkout --orphan gh-pages

# Xóa tất cả files (chỉ giữ docs và test-cases)
git rm -rf .

# Copy files cần thiết
git checkout main -- docs/
git checkout main -- test-cases/
git checkout main -- gh-pages-index.html

# Đổi tên gh-pages-index.html thành index.html
mv gh-pages-index.html index.html

# Commit
git add .
git commit -m "Deploy GitHub Pages"

# Push
git push origin gh-pages

# Quay lại branch main
git checkout main
```

Sau đó trong **Settings > Pages**, chọn:

- Branch: `gh-pages`
- Folder: `/ (root)`

## 📋 Bước 4: Cấu Trúc GitHub Pages

Sau khi deploy, các trang sẽ có URL:

- **Trang chủ**: `https://YOUR_USERNAME.github.io/smart-work-tracker/`
- **Documentation**: `https://YOUR_USERNAME.github.io/smart-work-tracker/docs/`
- **Test Cases**: `https://YOUR_USERNAME.github.io/smart-work-tracker/test-cases/`

## 🎨 Bước 5: Custom Domain (Tùy Chọn)

Nếu có domain riêng:

1. Trong **Settings > Pages > Custom domain**
2. Nhập domain: `docs.yoursite.com`
3. Click **Save**
4. Cấu hình DNS:
   ```
   Type: CNAME
   Name: docs
   Value: YOUR_USERNAME.github.io
   ```

## 🔄 Bước 6: Update Sau Này

Khi có thay đổi:

### Nếu dùng branch main:

```bash
git add .
git commit -m "Update documentation"
git push origin main
```

### Nếu dùng branch gh-pages:

```bash
# Cập nhật docs hoặc test-cases trên main
git add docs/ test-cases/
git commit -m "Update docs"
git push origin main

# Merge vào gh-pages
git checkout gh-pages
git checkout main -- docs/
git checkout main -- test-cases/
git commit -m "Update GitHub Pages"
git push origin gh-pages
git checkout main
```

## ✅ Kiểm Tra Deploy

1. Vào **Settings > Pages**
2. Xem status: "Your site is live at ..."
3. Click link để xem trang
4. Kiểm tra:
   - Trang chủ hiển thị đúng
   - Link đến docs hoạt động
   - Link đến test-cases hoạt động

## 🐛 Troubleshooting

### Trang 404 Not Found

- Đợi 5-10 phút sau khi push
- Kiểm tra branch và folder đã chọn đúng
- Clear cache browser (Ctrl+Shift+R)

### CSS/JS không load

- Kiểm tra đường dẫn tương đối
- Đảm bảo files tồn tại trong branch gh-pages

### Trang không update

- Force refresh: Ctrl+Shift+R
- Xóa cache GitHub Pages (Settings > Pages > Unpublish > Publish lại)

## 📝 Script Tự Động Deploy

Tạo file `deploy.sh`:

```bash
#!/bin/bash

echo "🚀 Deploying to GitHub Pages..."

# Build nếu cần
# npm run build

# Commit changes
git add .
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

# Update gh-pages
git checkout gh-pages
git checkout main -- docs/
git checkout main -- test-cases/
git checkout main -- gh-pages-index.html
mv gh-pages-index.html index.html
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin gh-pages
git checkout main

echo "✅ Deploy completed!"
echo "🌐 Visit: https://YOUR_USERNAME.github.io/smart-work-tracker/"
```

Chạy:

```bash
chmod +x deploy.sh
./deploy.sh
```

## 🎉 Hoàn Thành!

Bây giờ bạn có:

- ✅ Source code trên GitHub
- ✅ Documentation online
- ✅ Test Cases dashboard online
- ✅ Trang chủ đẹp mắt

Share link với team và users! 🚀

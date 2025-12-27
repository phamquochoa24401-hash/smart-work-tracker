# 🚀 Quick Start: Deploy Lên GitHub

## Bước 1: Tạo Repository Trên GitHub

1. Vào https://github.com/new
2. Tạo repository mới:
   - Name: `smart-work-tracker`
   - Public
   - Không tick "Add README"
3. Click "Create repository"

## Bước 2: Push Code Lên GitHub

```bash
# Thay YOUR_USERNAME bằng username GitHub của bạn
git remote add origin https://github.com/YOUR_USERNAME/smart-work-tracker.git
git branch -M main
git push -u origin main
```

## Bước 3: Deploy GitHub Pages (Tự Động)

```bash
./deploy-gh-pages.sh
```

Script sẽ tự động:

- ✅ Tạo branch `gh-pages`
- ✅ Copy `docs/` và `test-cases/`
- ✅ Push lên GitHub

## Bước 4: Enable GitHub Pages

1. Vào repository trên GitHub
2. Click **Settings** > **Pages**
3. Chọn:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

## Bước 5: Xem Kết Quả

Đợi 2-3 phút, sau đó truy cập:

- **Trang chủ**: `https://YOUR_USERNAME.github.io/smart-work-tracker/`
- **Documentation**: `https://YOUR_USERNAME.github.io/smart-work-tracker/docs/`
- **Test Cases**: `https://YOUR_USERNAME.github.io/smart-work-tracker/test-cases/`

## 🔄 Update Sau Này

Khi có thay đổi docs hoặc test-cases:

```bash
# Commit changes
git add .
git commit -m "Update docs"
git push origin main

# Deploy lại
./deploy-gh-pages.sh
```

## ✅ Xong!

Bây giờ bạn có:

- ✅ Source code trên GitHub
- ✅ Documentation online
- ✅ Test Cases online
- ✅ Trang chủ đẹp

---

**Lưu ý:** Nhớ thay `YOUR_USERNAME` bằng username GitHub thật của bạn!

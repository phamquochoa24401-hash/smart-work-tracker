#!/bin/bash

# Script tự động deploy GitHub Pages
# Sử dụng: ./deploy-gh-pages.sh

set -e  # Exit on error

echo "🚀 Smart Work Tracker - GitHub Pages Deploy Script"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Kiểm tra git status
if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}⚠️  Có thay đổi chưa commit. Commit trước khi deploy.${NC}"
    git status -s
    echo ""
    read -p "Commit changes? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        read -p "Commit message: " commit_msg
        git commit -m "$commit_msg"
        git push origin main
    else
        echo "Deploy cancelled."
        exit 1
    fi
fi

# Tạo branch gh-pages nếu chưa có
if ! git show-ref --verify --quiet refs/heads/gh-pages; then
    echo -e "${GREEN}📝 Tạo branch gh-pages...${NC}"
    git checkout --orphan gh-pages
    git rm -rf .
    git checkout main -- docs/
    git checkout main -- test-cases/
    git checkout main -- gh-pages-index.html
    mv gh-pages-index.html index.html
    git add .
    git commit -m "Initial GitHub Pages deployment"
    git push -u origin gh-pages
    git checkout main
    echo -e "${GREEN}✅ Branch gh-pages đã được tạo!${NC}"
else
    # Update gh-pages branch
    echo -e "${GREEN}🔄 Updating gh-pages branch...${NC}"
    
    # Stash current changes if any
    git stash
    
    # Checkout gh-pages
    git checkout gh-pages
    
    # Get latest from main
    git checkout main -- docs/
    git checkout main -- test-cases/
    git checkout main -- gh-pages-index.html
    
    # Rename index
    if [ -f "gh-pages-index.html" ]; then
        mv gh-pages-index.html index.html
    fi
    
    # Commit and push
    if [[ -n $(git status -s) ]]; then
        git add .
        git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
        git push origin gh-pages
        echo -e "${GREEN}✅ GitHub Pages updated!${NC}"
    else
        echo -e "${YELLOW}ℹ️  No changes to deploy${NC}"
    fi
    
    # Back to main
    git checkout main
    
    # Restore stash if any
    git stash pop 2>/dev/null || true
fi

echo ""
echo -e "${GREEN}🎉 Deploy completed!${NC}"
echo ""
echo "📋 Next steps:"
echo "1. Go to GitHub repository Settings > Pages"
echo "2. Select branch: gh-pages"
echo "3. Select folder: / (root)"
echo "4. Click Save"
echo ""
echo "🌐 Your site will be available at:"
echo "   https://YOUR_USERNAME.github.io/smart-work-tracker/"
echo ""
echo "📚 Pages:"
echo "   - Home: https://YOUR_USERNAME.github.io/smart-work-tracker/"
echo "   - Docs: https://YOUR_USERNAME.github.io/smart-work-tracker/docs/"
echo "   - Tests: https://YOUR_USERNAME.github.io/smart-work-tracker/test-cases/"
echo ""

# Deployment Guide - Smart Work Tracker

## 📦 Building the Application

### Prerequisites

- macOS 10.13 or later
- Node.js 16+ installed
- Xcode Command Line Tools (for native modules)

### Build Steps

#### 1. Install electron-builder (if not already installed)

```bash
npm install --save-dev electron-builder
```

#### 2. Build the application

```bash
npm run package
```

This will create a `.dmg` installer in the `dist/` folder.

#### 3. Distribute

The generated `.dmg` file can be:

- Shared directly with users
- Uploaded to your website
- Distributed via Mac App Store (requires Apple Developer account)

## 🔐 Code Signing (Optional but Recommended)

For distribution outside the Mac App Store, you should code sign your app:

### 1. Get a Developer ID Certificate

- Enroll in Apple Developer Program ($99/year)
- Create a Developer ID Application certificate in Xcode

### 2. Update package.json

```json
{
  "build": {
    "mac": {
      "identity": "Developer ID Application: Your Name (TEAM_ID)",
      "hardenedRuntime": true,
      "gatekeeperAssess": false,
      "entitlements": "build/entitlements.mac.plist",
      "entitlementsInherit": "build/entitlements.mac.plist"
    }
  }
}
```

### 3. Create entitlements file

Create `build/entitlements.mac.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.disable-library-validation</key>
    <true/>
</dict>
</plist>
```

### 4. Notarize (for macOS 10.15+)

```bash
# After building
xcrun notarytool submit dist/Smart\ Work\ Tracker-1.0.0.dmg \
  --apple-id "your-email@example.com" \
  --team-id "TEAM_ID" \
  --password "app-specific-password"
```

## 🚀 Auto-Update Setup (Optional)

To enable automatic updates:

### 1. Install electron-updater

```bash
npm install electron-updater
```

### 2. Add to main.js

```javascript
const { autoUpdater } = require("electron-updater");

app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify();
});
```

### 3. Configure in package.json

```json
{
  "build": {
    "publish": {
      "provider": "github",
      "owner": "your-username",
      "repo": "smart-work-tracker"
    }
  }
}
```

## 📱 Mac App Store Submission

### 1. Additional Requirements

- App Sandbox enabled
- Proper entitlements
- Privacy descriptions in Info.plist

### 2. Update package.json

```json
{
  "build": {
    "mac": {
      "target": "mas",
      "category": "public.app-category.productivity",
      "provisioningProfile": "path/to/profile.provisionprofile",
      "identity": "3rd Party Mac Developer Application: Your Name (TEAM_ID)"
    }
  }
}
```

### 3. Build for Mac App Store

```bash
npm run package -- --mac mas
```

### 4. Submit via Transporter

- Open Transporter app
- Drag and drop the `.pkg` file
- Submit to App Store Connect

## 🔒 Privacy Compliance

### Required Privacy Descriptions

Add to `package.json` or create `Info.plist`:

```xml
<key>NSAccessibilityUsageDescription</key>
<string>Smart Work Tracker needs accessibility access to count keyboard and mouse events for productivity tracking. No keystroke content or mouse coordinates are recorded.</string>
```

### GDPR/Privacy Policy

Include a privacy policy that clearly states:

- What data is collected (event counts only)
- What data is NOT collected (keystrokes, coordinates, screen content)
- Where data is stored (locally on device)
- User rights (data can be reset anytime)

## 📊 Analytics (Optional)

If you want to add usage analytics:

```bash
npm install electron-google-analytics
```

**Important**: Always get user consent before enabling analytics!

## 🐛 Error Reporting (Optional)

For production error tracking:

```bash
npm install @sentry/electron
```

Configure in main.js:

```javascript
const Sentry = require("@sentry/electron");

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

## 📝 Version Management

### Semantic Versioning

- **Major** (1.0.0): Breaking changes
- **Minor** (1.1.0): New features, backward compatible
- **Patch** (1.0.1): Bug fixes

### Update version

```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

## 🌐 Distribution Channels

### 1. Direct Download

- Host `.dmg` on your website
- Provide SHA-256 checksum for verification

### 2. Homebrew Cask

Create a cask formula:

```ruby
cask "smart-work-tracker" do
  version "1.0.0"
  sha256 "checksum"

  url "https://your-site.com/Smart-Work-Tracker-#{version}.dmg"
  name "Smart Work Tracker"
  desc "Privacy-focused productivity tracking"
  homepage "https://your-site.com"

  app "Smart Work Tracker.app"
end
```

### 3. Mac App Store

- Most trusted by users
- Requires annual fee
- Strict review process

## 🔧 Troubleshooting Build Issues

### Native Module Errors

```bash
# Rebuild native modules for Electron
npx electron-rebuild
```

### Code Signing Issues

```bash
# Verify certificate
security find-identity -v -p codesigning

# Check app signature
codesign -dv --verbose=4 dist/mac/Smart\ Work\ Tracker.app
```

### Notarization Issues

```bash
# Check notarization status
xcrun notarytool log <submission-id> \
  --apple-id "your-email@example.com" \
  --team-id "TEAM_ID" \
  --password "app-specific-password"
```

## 📋 Pre-Release Checklist

- [ ] All features working correctly
- [ ] No console errors
- [ ] Accessibility permissions prompt works
- [ ] AI analysis generates insights
- [ ] Sample data generation works
- [ ] UI is responsive
- [ ] Privacy notice is clear
- [ ] README is up to date
- [ ] Version number updated
- [ ] Code signed (if distributing)
- [ ] Tested on clean macOS installation

## 🎯 Post-Release

### Monitor

- User feedback
- Crash reports (if Sentry enabled)
- Feature requests

### Update Strategy

- Bug fixes: Release immediately
- Minor features: Monthly updates
- Major features: Quarterly releases

---

**Need Help?** Check the main [README.md](README.md) or create an issue in the repository.

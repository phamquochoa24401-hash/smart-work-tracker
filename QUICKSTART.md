# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Grant Permissions

When you first run the app, macOS will ask for Accessibility permissions.

**Why?** The app needs system-level access to count mouse and keyboard events.

**How to grant:**

1. Open **System Preferences**
2. Go to **Security & Privacy** → **Privacy** → **Accessibility**
3. Click the lock icon and enter your password
4. Find **Smart Work Tracker** (or Electron) and check the box

### Step 2: Start Tracking

1. Click **"Start Tracking"** button
2. Work normally on your computer
3. Watch the statistics update in real-time

**What's being tracked:**

- ✅ Number of mouse movements (not where you move)
- ✅ Number of key presses (not what you type)
- ✅ Active vs idle time

**What's NOT tracked:**

- ❌ Keystroke content
- ❌ Mouse coordinates
- ❌ Screen content
- ❌ Application names

### Step 3: Get AI Insights

1. After tracking for a while (or generate sample data)
2. Click **"Analyze Productivity with AI"**
3. Review your:
   - Productivity score
   - Peak working hours
   - Work patterns
   - Personalized recommendations

## 🎮 Try Demo Mode

Don't want to track real activity yet? No problem!

1. Click **"Generate Sample Data"**
2. This creates fake data simulating 8 hours of work
3. Click **"Analyze Productivity with AI"** to see insights
4. Perfect for understanding how the app works

## 💡 Tips

### Maximize Productivity Insights

- Track for at least 2-3 hours for meaningful data
- Use throughout a full workday for best results
- Review AI insights at the end of each day

### Take Breaks

The app will show idle time. Use this to:

- Ensure you're taking regular breaks
- Avoid burnout from continuous work
- Follow the 20-20-20 rule (every 20 min, look 20 feet away for 20 seconds)

### Privacy First

- All data stays on your device
- No data is sent anywhere (unless you add AI API integration)
- Click "Reset" anytime to clear all data

## 🔧 Troubleshooting

### "Accessibility permissions required" error

→ Follow Step 1 above to grant permissions

### Statistics not updating

→ Make sure tracking is started (green "Tracking Active" badge)

### Chart is empty

→ Track for a few minutes to generate hourly data

### AI analysis shows no data

→ Start tracking or generate sample data first

## 📚 Learn More

- Read the full [README.md](README.md) for detailed documentation
- Check [ai-integration-example.js](ai-integration-example.js) to add real AI APIs
- Customize the UI by editing [styles.css](styles.css)

## 🎯 Next Steps

1. **Customize tracking interval**: Edit `IDLE_THRESHOLD` in `main.js`
2. **Add real AI**: Follow examples in `ai-integration-example.js`
3. **Build for distribution**: Run `npm run package` to create a `.dmg` installer
4. **Share feedback**: Let us know how we can improve!

---

**Remember**: This tool is for YOUR productivity, not surveillance. Use it ethically! 🌟

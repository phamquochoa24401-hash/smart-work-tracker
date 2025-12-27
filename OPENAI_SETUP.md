# Smart Work Tracker - OpenAI Integration Guide

## 🤖 AI-Powered Productivity Analysis

This app now uses **OpenAI's GPT models** to provide intelligent, personalized productivity insights for developers using Cursor IDE.

## 📋 Setup Instructions

### 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy your API key (it starts with `sk-`)

### 2. Configure the API Key

You have two options:

#### Option A: Using Environment Variable (Recommended)

1. Create a `.env` file in the project root:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

#### Option B: Direct Configuration

1. Open `config.js`
2. Replace the empty string with your API key:
   ```javascript
   OPENAI_API_KEY: 'sk-your-actual-api-key-here',
   ```

⚠️ **Security Warning**: Never commit your API key to version control!

### 3. Run the App

```bash
npm start
```

## 🎯 How It Works

1. **Track Your Work**: Click "Start Tracking" to monitor your Cursor IDE activity
2. **Generate Sample Data**: Or click "Generate Sample Data" for a demo
3. **Analyze with AI**: Click "Analyze Productivity with AI"
4. **Get Insights**: OpenAI will analyze your work patterns and provide:
   - Productivity score (0-100)
   - Peak productivity hours
   - Work pattern analysis
   - Personalized recommendations
   - AI-generated summary

## 💰 Cost Information

- Uses **GPT-4o-mini** by default (very affordable, ~$0.15 per 1M tokens)
- Each analysis costs approximately $0.001-0.002
- You can change the model in `config.js`:
  ```javascript
  OPENAI_MODEL: 'gpt-4', // For better results (more expensive)
  ```

## 🔄 Fallback Behavior

If the OpenAI API fails (no key, network error, etc.), the app automatically falls back to local analysis using hardcoded logic.

## 🛠️ Configuration Options

Edit `config.js` to customize:

```javascript
{
  OPENAI_API_KEY: '',           // Your API key
  OPENAI_MODEL: 'gpt-4o-mini',  // Model to use
  OPENAI_MAX_TOKENS: 1000,      // Max response length
  OPENAI_TEMPERATURE: 0.7,      // Creativity (0-1)
}
```

## 📊 What Data is Sent to OpenAI?

Only aggregated statistics:

- Total mouse/keyboard events
- Active/idle time
- Hourly activity breakdown

**Never sent**:

- Actual keystrokes
- Mouse coordinates
- Screen content
- File names or code

## 🔒 Privacy & Security

- All data stays local except for anonymous statistics sent to OpenAI
- Your API key is stored locally and never shared
- No personal information is transmitted
- You can use local analysis mode without any external API calls

## ❓ Troubleshooting

### "OpenAI API key not configured"

- Make sure you've added your API key to `.env` or `config.js`
- Restart the app after adding the key

### "OpenAI API request failed"

- Check your internet connection
- Verify your API key is valid
- Check if you have credits in your OpenAI account
- The app will automatically use local analysis as fallback

### "Failed to parse OpenAI response"

- This is rare, try again
- If it persists, the model might be returning invalid JSON
- Check the console for detailed error messages

## 🎨 Features

✅ Real-time activity tracking for Cursor IDE
✅ AI-powered productivity analysis
✅ Beautiful, modern UI
✅ Automatic fallback to local analysis
✅ Privacy-focused design
✅ Sample data generation for testing

## 📝 License

MIT License - Feel free to use and modify!

---

Made with ❤️ for developers who want to optimize their productivity

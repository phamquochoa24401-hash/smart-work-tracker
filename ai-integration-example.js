/**
 * AI Integration Example
 *
 * This file demonstrates how to integrate real AI services
 * for productivity analysis. Choose one of the following:
 *
 * 1. OpenAI GPT-4
 * 2. Anthropic Claude
 * 3. Google Gemini
 */

// ============================================
// OPTION 1: OpenAI GPT-4 Integration
// ============================================

async function analyzeWithOpenAI(activitySummary) {
  const OPENAI_API_KEY = "your-api-key-here"; // Store securely!

  const prompt = `
You are a productivity expert analyzing work activity data. Based on the following metrics, provide insights:

Activity Summary:
- Total Mouse Events: ${activitySummary.totalMouseEvents}
- Total Keyboard Events: ${activitySummary.totalKeyboardEvents}
- Active Time: ${activitySummary.activeTimeMinutes} minutes
- Idle Time: ${activitySummary.idleTimeMinutes} minutes
- Active Percentage: ${activitySummary.activePercentage}%

Hourly Breakdown:
${activitySummary.hourlyBreakdown
  .map(
    (h) =>
      `Hour ${h.hour}: ${h.mouseEvents} mouse, ${
        h.keyboardEvents
      } keyboard, ${Math.floor(h.activeTime / 60)}min active`
  )
  .join("\n")}

Please provide:
1. A productivity score (0-100) with explanation
2. Identification of peak productivity hours
3. Work pattern analysis (deep work vs browsing, fatigue signs, etc.)
4. 3-5 personalized recommendations to improve productivity and well-being

Format your response as JSON with this structure:
{
  "productivityScore": number,
  "scoreExplanation": "string",
  "peakHours": [numbers],
  "patterns": [{"type": "positive|warning|info", "text": "string"}],
  "recommendations": ["string"]
}
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are an expert productivity analyst. Provide insights in JSON format.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    const insights = JSON.parse(data.choices[0].message.content);

    return insights;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
}

// ============================================
// OPTION 2: Anthropic Claude Integration
// ============================================

async function analyzeWithClaude(activitySummary) {
  const ANTHROPIC_API_KEY = "your-api-key-here"; // Store securely!

  const prompt = `
Analyze this work activity data and provide productivity insights:

Activity Metrics:
- Mouse Events: ${activitySummary.totalMouseEvents}
- Keyboard Events: ${activitySummary.totalKeyboardEvents}
- Active Time: ${activitySummary.activeTimeMinutes} minutes (${
    activitySummary.activePercentage
  }%)
- Idle Time: ${activitySummary.idleTimeMinutes} minutes

Hourly Activity:
${activitySummary.hourlyBreakdown
  .map(
    (h) =>
      `${h.hour}:00 - Mouse: ${h.mouseEvents}, Keyboard: ${
        h.keyboardEvents
      }, Active: ${Math.floor(h.activeTime / 60)}m`
  )
  .join("\n")}

Provide:
1. Productivity score (0-100) with reasoning
2. Peak productivity hours
3. Work pattern insights
4. Actionable recommendations

Return as JSON: {"productivityScore": number, "scoreExplanation": "string", "peakHours": [numbers], "patterns": [{"type": "positive|warning|info", "text": "string"}], "recommendations": ["string"]}
  `;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();
    const insights = JSON.parse(data.content[0].text);

    return insights;
  } catch (error) {
    console.error("Claude API Error:", error);
    throw error;
  }
}

// ============================================
// OPTION 3: Google Gemini Integration
// ============================================

async function analyzeWithGemini(activitySummary) {
  const GEMINI_API_KEY = "your-api-key-here"; // Store securely!

  const prompt = `
You are a productivity expert. Analyze this work activity data:

Metrics:
- Mouse Events: ${activitySummary.totalMouseEvents}
- Keyboard Events: ${activitySummary.totalKeyboardEvents}
- Active Time: ${activitySummary.activeTimeMinutes} min (${
    activitySummary.activePercentage
  }%)
- Idle Time: ${activitySummary.idleTimeMinutes} min

Hourly Data:
${activitySummary.hourlyBreakdown
  .map(
    (h) =>
      `Hour ${h.hour}: ${h.mouseEvents} mouse, ${h.keyboardEvents} keyboard`
  )
  .join("\n")}

Provide JSON response with:
- productivityScore (0-100)
- scoreExplanation
- peakHours (array of hours)
- patterns (array of {type, text})
- recommendations (array of strings)
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    const data = await response.json();
    const responseText = data.candidates[0].content.parts[0].text;

    // Extract JSON from response (Gemini might include markdown)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const insights = JSON.parse(jsonMatch[0]);

    return insights;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

// ============================================
// Integration into renderer.js
// ============================================

/**
 * To use real AI in your app, replace the simulateAIAnalysis
 * function in renderer.js with one of the above functions.
 *
 * Example:
 *
 * async function analyzeWithAI() {
 *   if (!currentData) {
 *     alert('No data available for analysis.');
 *     return;
 *   }
 *
 *   aiLoading.classList.remove('hidden');
 *   aiInsights.classList.add('hidden');
 *
 *   try {
 *     const summary = prepareDataSummary(currentData);
 *
 *     // Choose your AI service:
 *     const insights = await analyzeWithOpenAI(summary);
 *     // const insights = await analyzeWithClaude(summary);
 *     // const insights = await analyzeWithGemini(summary);
 *
 *     displayInsights(insights);
 *   } catch (error) {
 *     console.error('AI Analysis error:', error);
 *     alert('Failed to analyze data. Please check your API key and try again.');
 *   } finally {
 *     aiLoading.classList.add('hidden');
 *   }
 * }
 */

// ============================================
// Security Best Practices
// ============================================

/**
 * IMPORTANT: Never hardcode API keys in your source code!
 *
 * Better approaches:
 *
 * 1. Environment Variables:
 *    - Store API key in .env file (add to .gitignore)
 *    - Use dotenv package to load it
 *
 * 2. Electron Store:
 *    - Use electron-store to save encrypted API key
 *    - Prompt user to enter their own API key in settings
 *
 * 3. System Keychain:
 *    - Use keytar package to store in macOS Keychain
 *    - Most secure option for desktop apps
 *
 * Example with environment variables:
 */

// Install: npm install dotenv
// Create .env file with: OPENAI_API_KEY=your-key-here

// In main.js:
// require('dotenv').config();
// const apiKey = process.env.OPENAI_API_KEY;

// ============================================
// Cost Estimation
// ============================================

/**
 * AI API costs (approximate):
 *
 * OpenAI GPT-4:
 * - ~$0.03 per analysis (1000 tokens)
 * - 100 analyses = ~$3.00
 *
 * Anthropic Claude:
 * - ~$0.015 per analysis
 * - 100 analyses = ~$1.50
 *
 * Google Gemini:
 * - Free tier available
 * - ~$0.001 per analysis (paid tier)
 *
 * Recommendation: Start with Gemini's free tier for testing
 */

// ============================================
// Error Handling
// ============================================

function handleAIError(error) {
  if (error.message.includes("401")) {
    return "Invalid API key. Please check your credentials.";
  } else if (error.message.includes("429")) {
    return "Rate limit exceeded. Please try again later.";
  } else if (error.message.includes("network")) {
    return "Network error. Please check your internet connection.";
  } else {
    return "An unexpected error occurred. Please try again.";
  }
}

// Export functions for use in renderer.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    analyzeWithOpenAI,
    analyzeWithClaude,
    analyzeWithGemini,
    handleAIError,
  };
}

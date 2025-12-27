/**
 * Configuration file for Smart Work Tracker
 * Store your OpenAI API key here
 */

// Load environment variables from .env file
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

module.exports = {
  // Add your OpenAI API key here
  // Get it from: https://platform.openai.com/api-keys
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",

  // OpenAI Model Configuration
  OPENAI_MODEL: "gpt-4o-mini", // or 'gpt-4' for better results
  OPENAI_MAX_TOKENS: 1000,
  OPENAI_TEMPERATURE: 0.7,
};

const axios = require("axios");

module.exports = {
  config: {
    name: "aiphoto",
    version: "1.0.0",
    author: "Neoaz 🐦",
    cooldown: 5,
    role: 0,
    description: "Generate AI photo from prompt",
    category: "ai-image",
    usage: "aiphoto <prompt>"
  },

  onStart: async function ({ message, args, event, api }) {
    const prompt = args.join(" ");
    if (!prompt) return message.reply("❌ Please provide a prompt.");

    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    try {
      const url = `https://nkximggen.onrender.com/api/aiphoto?prompt=${encodeURIComponent(prompt)}`;
      await message.reply({
        body: `✅ | Generated: "${prompt}"`,
        attachment: url
      });
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    } catch (error) {
      console.error('aiphoto error:', error.message);
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      message.reply("❌ | Failed to generate AI photo.");
    }
  }
};
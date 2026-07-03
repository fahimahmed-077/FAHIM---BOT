const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "videooo",
    version: "1.0",
    author: "EryXenX",
    countDown: 5,
    role: 0,
    shortDescription: "Download video from YouTube",
    longDescription: "Download YouTube video using EryXenX API",
    category: "media",
    guide: "{pn} <song name / query>"
  },

  onStart: async function ({ api, event, args, message }) {
    const query = args.join(" ");
    if (!query) return message.reply("Song name den vai.");

    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    const tryDownload = async (attempt = 1) => {
      try {
        const res = await axios.get("https://exxdev.onrender.com/api/ytvideo", {
          params: { q: query },
          responseType: "arraybuffer",
          timeout: 60000
        });

        const contentType = res.headers["content-type"];

        if (!contentType || !contentType.includes("video")) {
          throw new Error("Not a video response");
        }

        const filePath = __dirname + "/cache/video_" + Date.now() + ".mp4";
        fs.writeFileSync(filePath, Buffer.from(res.data));

        await message.reply({
          body: "🎬 Video ready",
          attachment: fs.createReadStream(filePath)
        });

        api.setMessageReaction("✅", event.messageID, () => {}, true);
        fs.unlinkSync(filePath);
      } catch (err) {
        console.log(`video command attempt ${attempt} failed:`, err.message);

        if (attempt < 3) {
          return tryDownload(attempt + 1);
        }

        api.setMessageReaction("❌", event.messageID, () => {}, true);
        message.reply("Video paoa jayni. (" + err.message + ")");
      }
    };

    tryDownload();
  }
};
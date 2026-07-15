const fs = require("fs");
const axios = require("axios");
const path = require("path");

let lastPlayed = -1;

module.exports = {
  config: {
    name: "gana",
    version: "1.0.0",
    role: 0,
    author: "FAHIM",
    shortDescription: "Play random song 🎶",
    longDescription: "Random mp3 song sender from Catbox links.",
    category: "media",
    guide: "{p}gana"
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID } = event;

    const songLinks = [
      "https://files.catbox.moe/v4l3im.mp3",
      "https://files.catbox.moe/di10ej.mp3",
      "https://files.catbox.moe/qvbvyh.mp3",
      "https://files.catbox.moe/s2mign.mp3",
      "https://files.catbox.moe/5qkxaw.mp3",
      "https://files.catbox.moe/urayw9.mp3",
      "https://files.catbox.moe/6weyuv.mp3",
      "https://files.catbox.moe/njn1e0.mp3",
      "https://files.catbox.moe/oup7am.mp3",
      "https://files.catbox.moe/ogufor.mp3",
      "https://files.catbox.moe/mu0x2l.mp3"
    ];

    if (!songLinks.length) {
      return api.sendMessage(
        "❌ No songs found!",
        threadID,
        messageID
      );
    }

    api.setMessageReaction("🎵", messageID, () => {}, true);

    let index;
    do {
      index = Math.floor(Math.random() * songLinks.length);
    } while (index === lastPlayed && songLinks.length > 1);

    lastPlayed = index;

    const url = songLinks[index];
    const filePath = path.join(__dirname, `cache/gana_${index}.mp3`);

    try {
      const response = await axios({
        url,
        method: "GET",
        responseType: "stream"
      });

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      writer.on("finish", async () => {
        api.sendMessage(
          {
            body: "🎶 Here's your song 🎧",
            attachment: fs.createReadStream(filePath)
          },
          threadID,
          () => {
            if (fs.existsSync(filePath))
              fs.unlinkSync(filePath);
          },
          messageID
        );
      });

      writer.on("error", () => {
        api.sendMessage(
          "❌ Failed to send song!",
          threadID,
          messageID
        );
      });

    } catch (err) {
      console.error(err);
      api.sendMessage(
        "⚠️ Failed to download song!",
        threadID,
        messageID
      );
    }
  }
};
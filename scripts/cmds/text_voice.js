const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "fahim_voice",
    version: "1.0.5",
    author: "MR_FARHAN",
    countDown: 1,
    role: 0,
    shortDescription: "Ultra Fast Voice Reply",
    longDescription: "Sends specific voice messages instantly using local cache",
    category: "system"
  },

  // ==============================
  // 🔒 AUTHOR LOCK SYSTEM
  // ==============================
  _authorLock: function () {
    const expectedAuthor = "MR_FARHAN";

    if (module.exports.config.author !== expectedAuthor) {
      throw new Error("🚫 AUTHOR LOCKED: You are not allowed to change author name!");
    }
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {

    // 🔒 Run lock check every time
    this._authorLock();

    if (!event.body) return;

    const input = event.body.toLowerCase().trim();

    const voiceMap = {

      "magi": "https://files.catbox.moe/9co1zx.mp4",
      "মাগি": "https://files.catbox.moe/63hyw2.mp4",

      "খানকি": "https://files.catbox.moe/qhtvsf.mp4",
      "khanki": "https://files.catbox.moe/kje55j.mp4",

      "brand": "https://files.catbox.moe/e2nd1c.mp3",
      "ফাহিম": "https://files.catbox.moe/91qnco.mp4",

      "@fahim ahmed": "https://files.catbox.moe/84fp4p.mp3",

      "mahi": "https://files.catbox.moe/3u6shs.mp3",

      "good night": "https://files.catbox.moe/i29m4q.mp3",
      "গুড নাইট": "https://files.catbox.moe/i29m4q.mp3",

      "good morning": "https://files.catbox.moe/8gzqx5.mp3",

      "valobasi": "https://files.catbox.moe/s4ksgt.mp3",

      "jan": "https://files.catbox.moe/rbbukc.mp3",
      "biye": "https://files.catbox.moe/lssnaq.mp3",
      "love": "https://files.catbox.moe/dwwa0b.mp3",
      "ভালোবাসি": "https://files.catbox.moe/84fp4p.mp3",
      "wifi": "https://files.catbox.moe/kgl4qy.mp3",

      "maye": "https://files.catbox.moe/q62hco.mp3",
      "maiya": "https://files.catbox.moe/941wy3.mp3",

      "mon": "https://files.catbox.moe/y951y2.mp3",
      "sundor": "https://files.catbox.moe/j8aly8.mp3",

      "replly": "https://files.catbox.moe/knbcsa.mp3",
      "mama": "https://files.catbox.moe/6r9a0q.mp3",
      "jamai": "https://files.catbox.moe/tksdsh.mp3",
      "hasi": "https://files.catbox.moe/ng48w0.mp3",
      "sundori": "https://files.catbox.moe/xpsbrv.mp3",
      "online": "https://files.catbox.moe/yclzbp.mp3",
      "eid": "https://files.catbox.moe/jtselt.mp3",
      "boss": "https://files.catbox.moe/k6zvre.mp3",
      "bou": "https://files.catbox.moe/n00sm0.mp3",
      "free": "https://files.catbox.moe/vobj4c.mp3",
      "valo": "https://files.catbox.moe/nv8t0p.mp3",
      "asbo": "https://files.catbox.moe/znipjw.mp3",
      "jai": "https://files.catbox.moe/d0lcxj.mp3",
      "inbox": "https://files.catbox.moe/cf01jp.mp3",
      "text": "https://files.catbox.moe/q7fu6p.mp3"

    };

    if (voiceMap[input]) {

      const audioUrl = voiceMap[input];

      const cacheDir = path.join(__dirname, "cache", "voices");

      fs.ensureDirSync(cacheDir);

      const ext = path.extname(audioUrl);

      const fileName = `${Buffer.from(input).toString("hex")}${ext}`;

      const filePath = path.join(cacheDir, fileName);

      try {

        // Send from cache
        if (fs.existsSync(filePath)) {
          return await message.reply({
            attachment: fs.createReadStream(filePath)
          });
        }

        // Download file
        const response = await axios.get(audioUrl, {
          responseType: "arraybuffer"
        });

        // Save cache
        fs.writeFileSync(filePath, Buffer.from(response.data));

        // Send file
        await message.reply({
          attachment: fs.createReadStream(filePath)
        });

      } catch (error) {
        console.error("Error sending voice:", error);
      }
    }
  }
};
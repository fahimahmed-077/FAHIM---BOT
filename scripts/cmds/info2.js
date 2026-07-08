const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "info2",
    version: "1.5.0",
    author: "FARHAN",
    role: 0,
    shortDescription: "Owner information with dynamic Facebook profile picture",
    category: "Information",
    guide: { en: "info" }
  },

  onStart: async function ({ api, event }) {
    // --- Owner Info Text ---
    const ownerText = `╔════•|      ✿      |•════╗
💐আ্ঁস্ঁসা্ঁলা্ঁমু্ঁ💚আ্ঁলা্ঁই্ঁকু্ঁম্ঁ💐
╚════•|      ✿      |•════╝
__________________________________
🌺❀ 𝐁𝐎𝐓_ 𝐈𝐍𝐅𝐎_𝐑𝐌𝐀𝐓𝐈𝐎𝐍 ❀🌺
__________________________________

💠𝐁𝐎𝐓 𝐍𝐀𝐌𝐄💠 :

─꯭𓆩»̶̶͓͓͓̽̽̽𝆠꯭፝֟𝗙𝗔𝗛𝗜𝗠𝆠꯭፝֟𓆩𝆠፝𝐁𝐀𝐁𝐘𝆠꯭፝֟𝆠꯭፝֟𓆪🐱🩵🪽

🌼𝐁𝐎𝐓 𝐀𝐃𝐌𝐈𝐍🌼:『𝗙𝗠-𝗙𝗔𝗛𝗜𝗠』

🔥𝐁𝐈𝐎 𝐀𝐃𝐌𝐈𝐍🔥 : [ ⊱༅༎😽💚༅༎⊱


-আমি ভদ্র, বেয়াদব দুটোই🥱✌️

-তুমি যেটা ডি'জার্ভ করো, আমি সেটাই দেখাবো!🙂


⊱༅༎😽💚༅༎⊱ ]

🏠𝐀𝐃𝐃𝐑𝐄𝐒𝐒🏠 :[𝗦𝗜𝗥𝗔𝗝𝗚𝗢𝗡𝗚]
              [𝐁𝐀𝐍𝐆𝐋𝐀𝐃𝐄𝐒𝐇] 

🌺𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍🌺 :[𝐈𝐒𝐋𝐀𝐌]

💮𝐆𝐄𝐍𝐃𝐄𝐑💮  :[𝐌𝐀𝐋𝐄]

🌸𝐑𝐄𝐋𝐀𝐓𝐈𝐎𝐍𝐒𝐇𝐈𝐏🌸 :[𝐒𝐈𝐍𝐆𝐋𝐄]

🌼𝐖𝐎𝐑𝐊🌼 :[𝗕𝗔𝗞𝗘𝗥]

🌷𝐖𝐇𝐀𝐓'𝐒 𝐀𝐏𝐏🌷:[01771240377]

_________🅲🅾🅽🆃🅰🅲🆃_________

💥𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐈𝐃 (❶)💥 : https://m.me/fahim.ahmed.raj.207

💥𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐈𝐃 (❷)💥 : https://www.facebook.com/fahim.ahmed.207
______________________________
☄️>𝐁𝐎𝐓 𝐏𝐑𝐄𝐅𝐈𝐗 :-  { - } 

👑>𝐎𝐖𝐍𝐄𝐑 :-(𝐌𝐑.𝐅𝐀𝗛𝗜𝗠)
______________________________

𝐓𝐘𝐏𝐄 /𝐀𝐃𝐌𝐈𝐍:-♻️➟𝐔𝐏𝐓𝐈𝐌𝐄 ♻️

『💚 𝐓𝐇𝐀𝐍𝐊𝐒 𝐅𝐎𝐑 𝐔𝐒𝐈𝐍𝐆 💚』
-------------+++++++++++++-------------`;

    const cacheDir = path.join(__dirname, "cache");
    const fbUserID = "61591846737194"; // Change to your Facebook user ID
    const imgPath = path.join(cacheDir, `${fbUserID}.png`);

    try {
      await fs.ensureDir(cacheDir);

      // Remove old file if exists
      if (await fs.pathExists(imgPath)) {
        await fs.remove(imgPath);
      }

      // Download Facebook profile picture dynamically
      const fbURL = `https://graph.facebook.com/${fbUserID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      const response = await axios({ method: "GET", url: fbURL, responseType: "stream" });

      const writer = fs.createWriteStream(imgPath);
      response.data.pipe(writer);

      // Wait until image is fully written
      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      // Send message with image attachment
      api.sendMessage(
        { body: ownerText, attachment: fs.createReadStream(imgPath) },
        event.threadID,
        () => fs.remove(imgPath), // Cleanup after sending
        event.messageID
      );

    } catch (err) {
      console.error("❌ Error sending owner info:", err);
      api.sendMessage(ownerText, event.threadID, event.messageID); // fallback: send text only
    }
  }
};
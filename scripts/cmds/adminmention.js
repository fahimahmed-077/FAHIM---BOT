const axios = require("axios");

let imageIndex = 0;

module.exports = {
  config: {
    name: "adminmention",
    version: "20.0.0",
    author: "Farhan-Khan",
    countDown: 0,
    role: 0,
    shortDescription: "Fast caption + image reply",
    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    // 🔒 Author lock
    if (this.config.author !== "Farhan-Khan") return;

    const admins = [
      { uid: "61591571863767", names: ["@Fahim Ahmed"] },
      { uid: "61591571863767", names: ["@মে্ঁঘ্ঁ বা্ঁল্ঁক্ঁ"] }
    ];

    const senderID = String(event.senderID);
    if (admins.some(a => a.uid === senderID)) return;

    const text = (event.body || "").toLowerCase();
    const mentionedIDs = event.mentions ? Object.keys(event.mentions) : [];

    const isMentioning = admins.some(admin =>
      mentionedIDs.includes(admin.uid) ||
      admin.names.some(name => text.includes(name.toLowerCase()))
    );

    if (!isMentioning) return;

    // 🖼️ Image list (ভিডিওর জায়গায়)
    const images = [
      "https://i.imgur.com/BojELnR.jpeg",
      "https://i.imgur.com/aNYl58f.jpeg",
      "https://i.imgur.com/TqS7xxC.jpeg"
    ];

    const imageUrl = images[imageIndex];
    imageIndex = (imageIndex + 1) % images.length;

    // ✍️ captions
    const captions = [
      "Mantion_দি্ঁস্ঁ না্ঁ ফা্ঁহি্ঁম্ঁ ব্ঁস্ঁ এ্ঁর্ঁ ম্ঁন্ঁ ভা্ঁলো্ঁ নে্ঁই্ঁ আ্ঁস্কে্ঁ-!💔🥀",
      "- আ্ঁমা্ঁর্ঁ ব্ঁস্ঁ ফা্ঁহি্ঁম্ঁ এ্ঁর্ঁ সা্ঁথে্ঁ কে্ঁউ্ঁ সে্ঁক্স্ঁ ক্ঁরে্ঁ না্ঁ থুক্কু্ু্ঁ টে্ঁক্স্ঁ ক্ঁরে্ঁ না্ঁহ্ঁ🫂💔",
      "👉আ্ঁমা্ঁর্ঁ ব্ঁস্ঁ ফা্ঁহি্ঁম্ঁ এ্ঁখ্ঁন্ঁ বি্ঁজি্ঁ আ্ঁছে্ঁ । তা্ঁর্ঁ ই্ঁন্ঁব্ঁক্সে্ঁ এ্ঁ মে্ঁসে্ঁজ্ঁ দি্ঁয়ে্ঁ রা্ঁখো্ঁ",
      "ব্ঁস্ঁ ফা্ঁহি্ঁম্ঁ কে্ঁ এ্ঁত্ঁ মে্ঁন্ঁশ্ঁন্ঁ না্ঁ দি্ঁয়ে্ঁ ব্ঁক্স্ঁ আ্ঁসো্ঁ হ্ঁট্ঁ ক্ঁরে্ঁ দি্ঁবো্ঁ🤷‍ঝাং 😘🥒",
      "ব্ঁস্ঁ ফা্ঁহি্ঁম্ঁ কে্ঁ Mantion_দি্ঁলে্ঁ চু্ঁম্মা্ঁই্ঁয়া্ঁ ঠু্ঁটে্ঁর্ঁ কা্ঁলা্ঁর্ঁ change ক্ঁই্ঁরা্ঁ,লা্ঁমু্ঁ 💋😾😾🔨",
      "ফা্ঁহি্ঁম্ঁ ব্ঁস্ঁ এ্ঁখ্ঁন্ঁ বি্ঁজি্ঁ জা্ঁ ব্ঁলা্ঁর্ঁ আ্ঁমা্ঁকে্ঁ ব্ঁল্ঁতে্ঁ পা্ঁরে্ঁন্ঁ_!!😼🥰",
      "ফা্ঁহি্ঁম্ঁ ব্ঁস্ঁ কে্ঁ এ্ঁতো্ঁ মে্ঁন্ঁশ্ঁন্ঁ না্ঁহ্ঁ দি্ঁয়া্ঁ ব্ঁস্ঁ কে্ঁ এ্ঁক্ঁটা্ঁ জি্ঁ এফ্ঁ দে্ঁ 😒 😏",
      "Mantion_না্ঁ দি্ঁয়ে্ঁ ব্ঁস্ঁ ফা্ঁহি্ঁম্ঁ এ্ঁর্ঁ সা্ঁথে্ঁ সিরিয়াস প্রেম করতে চাইলে ইনবক্স",
      "ব্ঁস্ঁ ফা্ঁহি্ঁম্ঁ কে্ঁ মে্ঁন্ঁশ্ঁন্ঁ দি্ঁস্ঁনা্ঁ পা্ঁর্ঁলে্ঁ এ্ঁক্ঁটা্ঁ জি্ঁ এ্ঁফ্ঁ দে্ঁ",
      "বা্ঁল্ঁ পা্ঁক্ঁনা্ঁ Mantion_দি্ঁস্ঁ না্ঁ ব্ঁস্ঁ ফা্ঁহি্ঁম্ঁ প্র্ঁচু্ঁর্ঁ বি্ঁজি্ঁ আ্ঁছে্ঁ 🥵🥀🤐",
      "চু্ঁমু্ঁ খা্ঁও্ঁয়া্ঁর্ঁ ব্ঁয়াঁস্ঁ টা্ঁ আ্ঁমা্ঁর্ঁ ব্ঁস্ঁ ফা্ঁহি্ঁম্ঁ চ্ঁক্ঁলে্ঁট🍫খে্ঁয়ে্ঁ উ্ঁড়ি্ঁয়ে্ঁ দি্ঁল্ঁ 🤗"
    ];

    const mentionNames = mentionedIDs.map(id => `@${id}`).join(", ");

    const caption = `
✿•≫───────────────≪•✿
『 ${captions[Math.floor(Math.random() * captions.length)]} 』
✿•≫───────────────≪•✿
`;

    try {
      // ⚡ Fast Image Fetch
      const imgStream = await axios({
        url: imageUrl,
        method: "GET",
        responseType: "stream",
        timeout: 5000, // fast response
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      await message.reply({
        body: caption,
        attachment: imgStream.data
      });

    } catch (err) {
      console.log("❌ Image error:", err.message);
      await message.reply("😢 পিক দিতে পারলাম না");
    }
  }
};
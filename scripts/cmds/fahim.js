const axios = require("axios");

let videoIndex = 0;

module.exports = {
  config: {
    name: "fahim",
    version: "1.0.0",
    author: "Farhan-Khan",
    countDown: 0,
    role: 0,
    shortDescription: "Fahim video reply",
    category: "media"
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {

    const text = (event.body || "").toLowerCase();

    if (!text.includes("raj")) return;

    const videos = [
      "https://files.catbox.moe/fxre5k.mp4",
      "https://files.catbox.moe/zkfe54.mp4",
      "https://files.catbox.moe/rbpxmu.mp4",
      "https://files.catbox.moe/zah3gd.mp4",
      "https://files.catbox.moe/dnuqtb.mp4",
      "https://files.catbox.moe/euhh1j.mp4",
      "https://files.catbox.moe/28zdh0.mp4",
      "https://files.catbox.moe/u6uhih.mp4",
      "https://files.catbox.moe/kjuygx.mp4",
      "https://files.catbox.moe/agbbr7.mp4",
      "https://files.catbox.moe/v0c93q.mp4",
      "https://files.catbox.moe/vn4iiv.mp4",
      "https://files.catbox.moe/lw4gip.mp4",
      "https://files.catbox.moe/7dhh65.mp4",
      "https://files.catbox.moe/t1o8nu.mp4",
      "https://files.catbox.moe/53ki3x.mp4",
      "https://files.catbox.moe/2riyds.mp4",
      "https://files.catbox.moe/u2inzy.mp4",
      "https://files.catbox.moe/zabqtx.mp4",
      "https://files.catbox.moe/lvat8q.mp4",
      "https://files.catbox.moe/8iohbn.mp4",
      "https://files.catbox.moe/zs1v3i.mp4",
      "https://files.catbox.moe/sdcjc6.mp4",
      "https://files.catbox.moe/2rjsbf.mp4",
      "https://files.catbox.moe/545cye.mp4",
      "https://files.catbox.moe/4o50lr.mp4",
      "https://files.catbox.moe/2xzljw.mp4",
      "https://files.catbox.moe/t005nq.mp4",
      "https://files.catbox.moe/hkuu1g.mp4",
      "https://files.catbox.moe/s462pk.mp4",
      "https://files.catbox.moe/esuxkr.mp4",
      "https://files.catbox.moe/f8xkp2.mp4",
      "https://files.catbox.moe/7ng9cb.mp4",
      "https://files.catbox.moe/mhi9ty.mp4",
      "https://files.catbox.moe/91pi11.mp4","https://files.catbox.moe/tohxxe.mp4",
      "https://files.catbox.moe/7iunr8.mp4",
      "https://files.catbox.moe/988yxx.mp4",
      "https://files.catbox.moe/y3i1np.mp4",
      "https://files.catbox.moe/a36r4q.mp4",
      "https://files.catbox.moe/vmfxka.mp4",
      "https://files.catbox.moe/3zpm82.mp4",
      "https://files.catbox.moe/xe7ylb.mp4",
      "https://files.catbox.moe/jo77w4.mp4",
      "https://files.catbox.moe/pzo521.mp4",
      "https://files.catbox.moe/858ngn.mp4",
      "https://files.catbox.moe/yc1d9n.mp4",
      "https://files.catbox.moe/6ncvi8.mp4",
      "https://files.catbox.moe/5qijmn.mp4",
      "https://files.catbox.moe/2jd36v.mp4",
      "https://files.catbox.moe/7pka26.mp4",
      "https://files.catbox.moe/h5hqho.mp4",
      "https://files.catbox.moe/d6xs2g.mp4",
      "https://files.catbox.moe/kbcm3x.mp4",
      "https://files.catbox.moe/miv4ii.mp4",
      "https://files.catbox.moe/7pntx5.mp4",
      "https://files.catbox.moe/7ituuz.mp4",
      "https://files.catbox.moe/8ec66g.mp4"
"https://files.catbox.moe/g8d1av.mp4",
"https://files.catbox.moe/ypt7au.mp4",
"https://files.catbox.moe/nstu8b.mp4",
"https://files.catbox.moe/xmrujv.mp4",
"https://files.catbox.moe/jndni6.mp4",
"https://files.catbox.moe/dv3qv4.mp4",
"https://files.catbox.moe/au2yk5.mp4",
"https://files.catbox.moe/4v4uyv.mp4",
"https://files.catbox.moe/ltspa4.mp4",
"https://files.catbox.moe/s6la9u.mp4",
"https://files.catbox.moe/ndbhtu.mp4",
"https://files.catbox.moe/0e4s7h.mp4",
"https://files.catbox.moe/sxs5io.mp4",
"https://files.catbox.moe/2633wl.mp4",
"https://files.catbox.moe/8iohbn.mp4",
"https://files.catbox.moe/8btwbx.mp4",
"https://files.catbox.moe/9iq1ki.mp4",
"https://files.catbox.moe/g9zf5c.mp4",
"https://files.catbox.moe/siojtf.mp4",
"https://files.catbox.moe/5v4nxi.mp4",
"https://files.catbox.moe/q9rf0f.mp4",
"https://files.catbox.moe/ztnm6a.mp4",
"https://files.catbox.moe/tb5xef.mp4",
"https://files.catbox.moe/q2vg9i.mp4",
"https://files.catbox.moe/4v4uyv.mp4",
"https://files.catbox.moe/ltspa4.mp4",
"https://files.catbox.moe/s6la9u.mp4",
"https://files.catbox.moe/ndbhtu.mp4",
"https://files.catbox.moe/0e4s7h.mp4",
"https://files.catbox.moe/sxs5io.mp4",
"https://files.catbox.moe/2633wl.mp4",
"https://files.catbox.moe/u2inzy.mp4",
"https://files.catbox.moe/mhi9ty.mp4",
"https://files.catbox.moe/uqy4ur.mp4",
"https://files.catbox.moe/sdcjc6.mp4",
"https://files.catbox.moe/476z9n.mp4"
    ];

    const videoUrl = videos[videoIndex];
    videoIndex = (videoIndex + 1) % videos.length;

    try {

      const videoStream = await axios({
        url: videoUrl,
        method: "GET",
        responseType: "stream",
        timeout: 5000,
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      await message.reply({
        body: "🎬 Fahim Video",
        attachment: videoStream.data
      });

    } catch (err) {
      console.log("❌ Video error:", err.message);
      await message.reply("😢 ভিডিও দিতে পারলাম না");
    }
  }
};
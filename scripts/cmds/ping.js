module.exports = {
  config: { name: 'ping', aliases: ['p'], description: 'Check bot response time', usage: 'ping', cooldown: 5, role: 0, category: 'core' },
  async run({ api, event, logger }) {
    try {
      const start = Date.now();
      const uptime = process.uptime();
      const h = Math.floor(uptime / 3600), m = Math.floor((uptime % 3600) / 60), s = Math.floor(uptime % 60);
      await api.sendMessage(`🏓 Pong!\n⏱ Response: ${Date.now() - start}ms\n⬆️ Uptime: ${h}h ${m}m ${s}s`, event.threadId);
    } catch (e) { logger.error('Error in ping', { error: e.message }); }
  }
};
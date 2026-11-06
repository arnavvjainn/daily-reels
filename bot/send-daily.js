#!/usr/bin/env node
// Bot stub: picks today's reel and prints the message it would send.
// TODO: replace sample data with crawled reels, add a delivery channel, schedule it.
const { reelForDate } = require("../web/data.js");

function buildMessage(reel, date = new Date()) {
  const day = date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  return [
    `☀️ Good morning! Your reel for ${day}:`,
    ``,
    `${reel.emoji} ${reel.title} (${reel.duration})`,
    `${reel.summary}`,
    ``,
    `▶ ${reel.url}`,
  ].join("\n");
}

async function deliver(message) {
  // TODO: post to Discord.
  console.log(message);
}

if (require.main === module) {
  deliver(buildMessage(reelForDate(new Date())));
}

module.exports = { buildMessage };

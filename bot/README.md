# Bot

The bot's job each morning:

1. **Find reels.** Use OpenClaw to find short educational videos on Instagram Reels and YouTube Shorts.
2. **Pick one.** Choose today's reel based on the user's topics and what they've already seen.
3. **Deliver.** Post the link to Discord at the user's chosen time.

Right now `send-daily.js` only does step 2, using the sample data in `../web/data.js`, and prints the message:

```sh
node bot/send-daily.js
```

## TODO
- [ ] Set up OpenClaw and have it find reels on Instagram and YouTube Shorts
- [ ] Store reels and watch history (SQLite or similar)
- [ ] Send the message to Discord
- [ ] Run it every morning (OpenClaw's scheduler, cron, or launchd)

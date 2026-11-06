# Bot

The bot's job each morning:

1. **Find reels.** Crawl or query sources for short educational videos (crawler/agent framework still to be decided).
2. **Pick one.** Choose today's reel based on the user's topics and what they've already seen.
3. **Deliver.** Send the link at the user's chosen time over their chosen channel.

Right now `send-daily.js` only does step 2, using the sample data in `../web/data.js`, and prints the message:

```sh
node bot/send-daily.js
```

## TODO
- [ ] Choose a crawler/agent framework and content sources
- [ ] Store reels and watch history (SQLite or similar)
- [ ] Delivery channel (Telegram bot is the easiest place to start)
- [ ] Scheduling (cron, launchd, or a hosted scheduler)

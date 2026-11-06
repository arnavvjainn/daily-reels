# Daily Reels

One short educational reel, delivered to you every morning.

Instead of doomscrolling, you get a single link to a good short video (science, finance, programming, history…) at a time you choose. A bot finds and picks the reel. A small web app shows today's reel, your topics, and what you've watched.

```
┌──────────────┐   crawl/pick    ┌──────────┐   link at 7:30am   ┌────────┐
│ reel sources │ ──────────────▶ │   bot    │ ─────────────────▶ │  you   │
└──────────────┘                 └──────────┘                    └────────┘
                                      │ shares data
                                      ▼
                                 ┌──────────┐
                                 │  web UI  │  today · topics · history
                                 └──────────┘
```

## Structure

```
web/   Sample UI: plain HTML/CSS/JS, no build step
  index.html, styles.css, app.js
  data.js  Sample reels + reelForDate(), shared with the bot
bot/   Bot stub: picks today's reel and prints the message
```

## Run it

**UI:** open `web/index.html` in a browser, or serve it:

```sh
cd web && python3 -m http.server 8000   # → http://localhost:8000
```

**Bot (dry run):**

```sh
node bot/send-daily.js
```

## Status

This is a sample. The reels are placeholders (`example.com` links), and settings are saved in the browser only.

## Open questions
- Which crawler/agent framework does the bot run on?
- Where do reels come from (Instagram, YouTube Shorts, TikTok, curated lists)?
- How is the link delivered (Telegram, WhatsApp, email, push)?
- Where does it run on a schedule (local cron or hosted)?
- Should the UI become a real app (Next.js / React Native) with a backend?

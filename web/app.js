// Sample UI logic. State lives in localStorage until there's a backend.
const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
};

const $ = (id) => document.getElementById(id);
const today = new Date();
const dateKey = (d) => d.toLocaleDateString("en-CA"); // local YYYY-MM-DD

function daysAgo(n) {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d;
}

function renderHeader() {
  const h = today.getHours();
  $("greeting").textContent = h < 12 ? "Good morning ☀️" : h < 18 ? "Good afternoon" : "Good evening";
  $("today-date").textContent = today.toLocaleDateString(undefined, {
    weekday: "long", month: "short", day: "numeric",
  });
}

function renderToday() {
  const reel = reelForDate(today);
  const [a, b] = reel.gradient;
  $("reel-art").style.background = `linear-gradient(160deg, ${a}, ${b})`;
  $("reel-emoji").textContent = reel.emoji;
  $("reel-topic").textContent = reel.topic;
  $("reel-title").textContent = reel.title;
  $("reel-creator").textContent = reel.creator;
  $("reel-duration").textContent = reel.duration;
  $("reel-summary").textContent = reel.summary;
  $("reel-link").href = reel.url;

  const watched = store.get("watched", {});
  const isWatched = Boolean(watched[dateKey(today)]);
  $("reel").classList.toggle("watched", isWatched);
  $("mark-watched").textContent = isWatched ? "✓ Watched" : "Mark watched";
}

function toggleWatched() {
  const watched = store.get("watched", {});
  const key = dateKey(today);
  if (watched[key]) delete watched[key]; else watched[key] = true;
  store.set("watched", watched);
  renderToday();
  renderStreak();
  renderHistory();
}

function renderStreak() {
  const watched = store.get("watched", {});
  let streak = 0;
  // A streak still counts if today isn't watched yet.
  for (let i = watched[dateKey(today)] ? 0 : 1; watched[dateKey(daysAgo(i))]; i++) streak++;
  $("streak").textContent = streak;
}

function renderTopics() {
  const selected = new Set(store.get("topics", TOPICS));
  const wrap = $("topics");
  wrap.innerHTML = "";
  TOPICS.forEach((topic) => {
    const chip = document.createElement("button");
    chip.className = "chip" + (selected.has(topic) ? " on" : "");
    chip.textContent = topic;
    chip.onclick = () => {
      selected.has(topic) ? selected.delete(topic) : selected.add(topic);
      store.set("topics", [...selected]);
      renderTopics();
    };
    wrap.appendChild(chip);
  });
}

function renderHistory() {
  const watched = store.get("watched", {});
  const list = $("history");
  list.innerHTML = "";
  for (let i = 1; i <= 6; i++) {
    const d = daysAgo(i);
    const reel = reelForDate(d);
    const li = document.createElement("li");
    const [a, b] = reel.gradient;
    li.innerHTML = `
      <a href="${reel.url}" target="_blank" rel="noopener">
        <div class="thumb" style="background:linear-gradient(160deg, ${a}, ${b})">${reel.emoji}</div>
        <div class="meta">
          <div class="title"></div>
          <div class="sub">${d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })} · ${reel.topic} · ${reel.duration}</div>
        </div>
        ${watched[dateKey(d)] ? '<span class="check">✓</span>' : ""}
      </a>`;
    li.querySelector(".title").textContent = reel.title;
    list.appendChild(li);
  }
}

function initSettings() {
  const settings = store.get("settings", {});
  if (settings.time) $("send-time").value = settings.time;
  if (settings.channel) $("channel").value = settings.channel;
  const save = () => store.set("settings", { time: $("send-time").value, channel: $("channel").value });
  $("send-time").onchange = save;
  $("channel").onchange = save;
}

$("mark-watched").onclick = toggleWatched;
renderHeader();
renderToday();
renderStreak();
renderTopics();
renderHistory();
initSettings();

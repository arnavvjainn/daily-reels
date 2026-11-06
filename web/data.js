// Sample data — placeholder reels until the bot supplies real ones.
// Works in the browser (window.REELS) and in Node (module.exports).
const REELS = [
  {
    id: "r1",
    title: "Why the sky is blue, in 45 seconds",
    creator: "@sciencebites",
    topic: "Science",
    duration: "0:45",
    url: "https://example.com/reels/r1",
    gradient: ["#4f46e5", "#06b6d4"],
    emoji: "🌌",
    summary: "Rayleigh scattering explained with a flashlight and a glass of milk.",
  },
  {
    id: "r2",
    title: "Compound interest, visualised",
    creator: "@moneymath",
    topic: "Finance",
    duration: "0:58",
    url: "https://example.com/reels/r2",
    gradient: ["#059669", "#a3e635"],
    emoji: "📈",
    summary: "How $100 a month turns into a surprising number over 30 years.",
  },
  {
    id: "r3",
    title: "Big-O notation with pizza slices",
    creator: "@codecrumbs",
    topic: "Programming",
    duration: "1:02",
    url: "https://example.com/reels/r3",
    gradient: ["#f97316", "#ef4444"],
    emoji: "🍕",
    summary: "O(1), O(n) and O(n²) explained by sharing pizza at a party.",
  },
  {
    id: "r4",
    title: "The Roman road that's still in use",
    creator: "@historyminute",
    topic: "History",
    duration: "0:51",
    url: "https://example.com/reels/r4",
    gradient: ["#a16207", "#facc15"],
    emoji: "🏛️",
    summary: "How 2,000-year-old engineering still carries traffic today.",
  },
  {
    id: "r5",
    title: "One trick to remember anything",
    creator: "@brainhacks",
    topic: "Psychology",
    duration: "0:39",
    url: "https://example.com/reels/r5",
    gradient: ["#db2777", "#8b5cf6"],
    emoji: "🧠",
    summary: "Spaced repetition and why cramming fails you.",
  },
  {
    id: "r6",
    title: "How a transformer model reads a sentence",
    creator: "@aiexplained",
    topic: "AI",
    duration: "1:10",
    url: "https://example.com/reels/r6",
    gradient: ["#0f172a", "#6366f1"],
    emoji: "🤖",
    summary: "Attention, tokens and embeddings, without the maths.",
  },
  {
    id: "r7",
    title: "Why bread rises",
    creator: "@kitchenchem",
    topic: "Science",
    duration: "0:47",
    url: "https://example.com/reels/r7",
    gradient: ["#b45309", "#fde68a"],
    emoji: "🍞",
    summary: "Yeast, CO₂ and gluten networks, filmed in time-lapse.",
  },
];

const TOPICS = ["Science", "Finance", "Programming", "History", "Psychology", "AI"];

// Deterministic "reel of the day": same reel for everyone on a given date.
function reelForDate(date, reels = REELS) {
  const day = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000
  );
  return reels[day % reels.length];
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { REELS, TOPICS, reelForDate };
} else {
  window.REELS = REELS;
  window.TOPICS = TOPICS;
  window.reelForDate = reelForDate;
}

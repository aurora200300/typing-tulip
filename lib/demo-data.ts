import type { PracticeResult, UserStats } from "@/lib/types";

export const demoStats: UserStats = {
  avgWpm: 42,
  bestWpm: 68,
  avgAccuracy: 94,
  points: 18450,
  streak: 7,
  totalSessions: 126,
  practiceMinutes: 28 * 60 + 42
};

export const demoResults: PracticeResult[] = [
  { id: "1", mode: "sentences", wpm: 38, accuracy: 93, mistakes: 3, typedChars: 128, durationSeconds: 102, createdAt: "2026-06-03T08:20:00Z" },
  { id: "2", mode: "words", wpm: 42, accuracy: 95, mistakes: 2, typedChars: 160, durationSeconds: 90, createdAt: "2026-06-02T09:20:00Z" },
  { id: "3", mode: "news", wpm: 36, accuracy: 91, mistakes: 5, typedChars: 210, durationSeconds: 180, createdAt: "2026-06-01T09:20:00Z" }
];

export const trend = [
  { day: "Mon", wpm: 34, accuracy: 88, mistakes: 14 },
  { day: "Tue", wpm: 38, accuracy: 91, mistakes: 10 },
  { day: "Wed", wpm: 31, accuracy: 87, mistakes: 17 },
  { day: "Thu", wpm: 45, accuracy: 93, mistakes: 8 },
  { day: "Fri", wpm: 42, accuracy: 92, mistakes: 9 },
  { day: "Sat", wpm: 48, accuracy: 95, mistakes: 5 },
  { day: "Sun", wpm: 52, accuracy: 96, mistakes: 4 }
];

export const leaders = [
  { rank: 1, name: "Pragya Bhattarai", wpm: 68, accuracy: 95, points: 23560, streak: 12 },
  { rank: 2, name: "Rohan Shrestha", wpm: 64, accuracy: 93, points: 19850, streak: 9 },
  { rank: 3, name: "Bibek Poudel", wpm: 61, accuracy: 92, points: 17640, streak: 8 },
  { rank: 4, name: "Samiksha Adhikari", wpm: 58, accuracy: 90, points: 16230, streak: 6 },
  { rank: 5, name: "Sagar Achikari", wpm: 52, accuracy: 93, points: 11250, streak: 4 }
];

export type Lang = "en" | "ne";
export type PracticeMode = "letters" | "words" | "sentences" | "paragraph" | "news" | "speed";

export type PracticeResult = {
  id: string;
  mode: PracticeMode;
  wpm: number;
  accuracy: number;
  mistakes: number;
  typedChars: number;
  durationSeconds: number;
  createdAt: string;
};

export type UserStats = {
  avgWpm: number;
  bestWpm: number;
  avgAccuracy: number;
  points: number;
  streak: number;
  totalSessions: number;
  practiceMinutes: number;
};

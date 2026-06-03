export function calculateTypingStats(target: string, typed: string, startedAt: number | null, now = Date.now()) {
  let correct = 0;
  let mistakes = 0;

  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === target[i]) correct++;
    else mistakes++;
  }

  const elapsedSeconds = startedAt ? Math.max(1, Math.floor((now - startedAt) / 1000)) : 0;
  const words = correct / 5;
  const wpm = elapsedSeconds ? Math.round(words / (elapsedSeconds / 60)) : 0;
  const accuracy = typed.length ? Math.max(0, Math.round((correct / typed.length) * 100)) : 100;
  const progress = Math.min(100, Math.round((typed.length / target.length) * 100));
  const points = Math.max(0, Math.round(wpm * 4 + accuracy * 2 - mistakes * 1.5));

  return { correct, mistakes, elapsedSeconds, wpm, accuracy, progress, points };
}

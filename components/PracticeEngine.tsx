"use client";

import { useMemo, useRef, useState } from "react";
import { Card, Button, Progress } from "@/components/ui";
import KeyboardHelper from "@/components/KeyboardHelper";
import { calculateTypingStats } from "@/lib/scoring";
import { practiceTexts } from "@/lib/preeti";
import type { Lang, PracticeMode } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

const modes: { key: keyof typeof practiceTexts; label: string; mode: PracticeMode }[] = [
  { key: "words", label: "शब्द अभ्यास", mode: "words" },
  { key: "sentences", label: "वाक्य अभ्यास", mode: "sentences" },
  { key: "paragraph", label: "अनुच्छेद अभ्यास", mode: "paragraph" },
  { key: "news", label: "समाचार अभ्यास", mode: "news" },
  { key: "speed", label: "Speed Test", mode: "speed" }
];

export default function PracticeEngine({ lang = "en" }: { lang?: Lang }) {
  const [mode, setMode] = useState(modes[1]);
  const [typed, setTyped] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const text = practiceTexts[mode.key];
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const stats = useMemo(() => calculateTypingStats(text, typed, startedAt), [text, typed, startedAt]);
  const activeChar = typed.at(-1);

  function reset() {
    setTyped("");
    setStartedAt(null);
    setSaved(false);
    inputRef.current?.focus();
  }

  async function saveResult() {
    const supabase = createClient();
    const result = {
      mode: mode.mode,
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      mistakes: stats.mistakes,
      typed_chars: typed.length,
      duration_seconds: stats.elapsedSeconds,
      points: stats.points
    };

    if (!supabase) {
      const current = JSON.parse(localStorage.getItem("practice_results") || "[]");
      localStorage.setItem("practice_results", JSON.stringify([{ ...result, created_at: new Date().toISOString() }, ...current]));
      setSaved(true);
      return;
    }

    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      alert("Login first to save online.");
      return;
    }

    const { error } = await supabase.from("practice_sessions").insert({ ...result, user_id: data.user.id });
    if (error) alert(error.message);
    else setSaved(true);
  }

  return (
    <div className="grid gap-5">
      <Card id="practice">
        <div className="mb-5 flex flex-wrap gap-3">
          {modes.map((item) => (
            <button key={item.key} onClick={() => { setMode(item); reset(); }} className={`rounded-2xl px-4 py-2 font-bold ${mode.key === item.key ? "bg-brand-600 text-white" : "glass"}`}>
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-4 rounded-3xl border border-brand-500/20 bg-brand-500/5 p-5 font-devanagari text-2xl leading-loose">
              {text.split("").map((ch, idx) => {
                const cls = typed[idx] == null ? (idx === typed.length ? "current-char" : "") : typed[idx] === ch ? "good-char" : "bad-char";
                return <span key={idx} className={cls}>{ch}</span>;
              })}
            </div>

            <textarea
              ref={inputRef}
              value={typed}
              onFocus={() => !startedAt && setStartedAt(Date.now())}
              onChange={(e) => {
                if (!startedAt) setStartedAt(Date.now());
                setTyped(e.target.value);
                setSaved(false);
              }}
              placeholder="यहाँ टाइप गर्नुहोस्..."
              className="min-h-36 w-full rounded-3xl border border-brand-500/20 bg-white/70 p-5 font-devanagari text-2xl leading-loose outline-none focus:ring-4 focus:ring-brand-500/20 dark:bg-black/20"
            />

            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              <Kpi label="WPM" value={stats.wpm} />
              <Kpi label="Accuracy" value={`${stats.accuracy}%`} />
              <Kpi label="Mistakes" value={stats.mistakes} />
              <Kpi label="Time" value={`${Math.floor(stats.elapsedSeconds / 60)}:${String(stats.elapsedSeconds % 60).padStart(2, "0")}`} />
            </div>

            <div className="mt-4">
              <Progress value={stats.progress} />
              <p className="mt-2 text-sm text-[var(--muted)]">{stats.progress}% complete · +{stats.points} XP</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={() => inputRef.current?.focus()}>Start Practice</Button>
              <Button onClick={reset} variant="secondary">Reset</Button>
              <Button onClick={saveResult} variant="ghost">Save Result</Button>
              {saved && <span className="rounded-2xl bg-emerald-500/10 px-4 py-2 font-bold text-emerald-700">Saved ✓</span>}
            </div>
          </div>

          <Card className="shadow-none">
            <h3 className="text-xl font-black">🤖 AI Coach Preview</h3>
            <p className="mt-2 text-[var(--muted)]">
              {stats.mistakes > 3 ? "Slow down. Repeat the red characters and use the keyboard helper below." : "Good rhythm. Keep accuracy above 90% before chasing speed."}
            </p>
            <div className="mt-5 grid gap-3">
              <Kpi label="Weak area" value={stats.mistakes > 3 ? "Matras" : "None"} />
              <Kpi label="Next lesson" value={stats.accuracy < 90 ? "Letters" : "Speed"} />
            </div>
          </Card>
        </div>
      </Card>

      <KeyboardHelper lang={lang} activeChar={activeChar} />
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass rounded-2xl p-4">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <b className="mt-1 block text-2xl">{value}</b>
    </div>
  );
}

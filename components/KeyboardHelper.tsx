"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { preetiKeyboard, romanHints } from "@/lib/preeti";
import { Card } from "@/components/ui";
import type { Lang } from "@/lib/types";
import { dictionary } from "@/lib/i18n";

const typeColor = {
  vowel: "bg-emerald-100 text-emerald-900 dark:bg-emerald-400/20 dark:text-emerald-100",
  consonant: "bg-sky-100 text-sky-950 dark:bg-sky-400/20 dark:text-sky-100",
  matra: "bg-orange-100 text-orange-950 dark:bg-orange-400/20 dark:text-orange-100",
  symbol: "bg-violet-100 text-violet-950 dark:bg-violet-400/20 dark:text-violet-100",
  action: "bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-white"
};

export default function KeyboardHelper({ lang = "en", activeChar }: { lang?: Lang; activeChar?: string }) {
  const [mode, setMode] = useState<"preeti" | "english" | "roman">("preeti");
  const t = dictionary[lang];

  const rows = useMemo(() => preetiKeyboard, []);
  const keys = activeChar ? activeChar.toLowerCase() : "";

  return (
    <Card className="border-2 border-brand-500/20" id="keyboard-helper">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-black">⌨️ {t.keyboardHelper} <span className="rounded-full bg-emerald-600 px-2 py-1 text-xs text-white">NEW</span></h3>
          <p className="text-sm text-[var(--muted)]">Preeti keyboard, roman hints, matra guide and finger help.</p>
        </div>
        <div className="glass flex w-fit rounded-2xl p-1">
          {(["preeti", "english", "roman"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setMode(item)}
              className={clsx("rounded-xl px-3 py-2 text-sm font-bold", mode === item && "bg-brand-600 text-white")}
            >
              {item === "preeti" ? "Preeti" : item === "english" ? "English" : "Roman → Preeti"}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
        <span><i className="mr-1 inline-block h-3 w-3 rounded bg-emerald-200" />Vowels</span>
        <span><i className="mr-1 inline-block h-3 w-3 rounded bg-sky-200" />Consonants</span>
        <span><i className="mr-1 inline-block h-3 w-3 rounded bg-orange-200" />Matras</span>
        <span><i className="mr-1 inline-block h-3 w-3 rounded bg-violet-200" />Symbols</span>
      </div>

      {mode === "roman" ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
          {romanHints.map(([roman, nepali]) => (
            <div key={roman} className="glass rounded-2xl p-4 text-center">
              <b>{roman}</b><span className="mx-2 text-[var(--muted)]">→</span><strong className="font-devanagari text-2xl">{nepali}</strong>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-2 overflow-x-auto pb-2">
          {rows.map((row, idx) => (
            <div key={idx} className="grid min-w-[920px] grid-cols-14 gap-2">
              {row.map((key, kIdx) => (
                <button
                  key={`${idx}-${kIdx}-${key.label}`}
                  className={clsx(
                    "key relative min-h-12 rounded-xl border border-black/10 p-2 text-center font-black transition hover:-translate-y-0.5",
                    typeColor[key.type ?? "action"],
                    key.width === "wide" && "col-span-2",
                    key.width === "space" && "col-span-5",
                    (keys === key.small || keys === key.label.toLowerCase()) && "ring-4 ring-brand-500"
                  )}
                >
                  {key.small && <small className="absolute left-2 top-1 text-[10px] opacity-60">{mode === "english" ? key.label : key.small}</small>}
                  <span className="font-devanagari">{mode === "english" ? key.small || key.label : key.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="glass rounded-2xl p-4">
          <h4 className="font-black">Roman hints</h4>
          <p className="text-sm text-[var(--muted)]">ka → क, kha → ख, tra → त्र, gya → ज्ञ</p>
        </div>
        <div className="glass rounded-2xl p-4">
          <h4 className="font-black">Matra guide</h4>
          <p className="font-devanagari text-xl">ि  ी  ु  ू  े  ै  ो  ौ  ं  ः</p>
        </div>
        <div className="glass rounded-2xl p-4">
          <h4 className="font-black">Finger guide</h4>
          <p className="text-sm text-[var(--muted)]">Left hand for left zone, right hand for right zone. Accuracy first, speed later.</p>
        </div>
      </div>
    </Card>
  );
}

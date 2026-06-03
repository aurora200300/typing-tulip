"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, BookOpen, Gauge, Home, Keyboard, LayoutDashboard, Settings, Trophy, UserRoundCog } from "lucide-react";
import { dictionary } from "@/lib/i18n";
import type { Lang } from "@/lib/types";
import { Button } from "@/components/ui";
import AuthButton from "@/components/AuthButton";
import clsx from "clsx";

const nav = [
  { href: "#dashboard", key: "dashboard", icon: LayoutDashboard },
  { href: "#practice", key: "practice", icon: Keyboard },
  { href: "#lessons", key: "lessons", icon: BookOpen },
  { href: "#analytics", key: "analytics", icon: BarChart3 },
  { href: "#leaderboard", key: "leaderboard", icon: Trophy },
  { href: "#settings", key: "settings", icon: Settings },
  { href: "#admin", key: "admin", icon: UserRoundCog }
] as const;

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);
  const t = useMemo(() => dictionary[lang], [lang]);

  useEffect(() => {
    const savedLang = (localStorage.getItem("lang") as Lang | null) || "en";
    const savedTheme = localStorage.getItem("theme") || "light";
    setLang(savedLang);
    setDark(savedTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
    localStorage.setItem("lang", lang);
  }, [dark, lang]);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[292px_1fr]">
      <aside className="glass sticky top-0 hidden h-screen overflow-auto rounded-none border-y-0 border-l-0 p-5 lg:block">
        <div className="mb-7 flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 text-3xl font-black text-white shadow-glow">प</div>
          <div>
            <h1 className="text-2xl font-extrabold text-brand-700 dark:text-brand-100">{t.appName}</h1>
            <p className="text-sm text-[var(--muted)]">{t.sub}</p>
          </div>
        </div>

        <nav className="grid gap-2">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.key} href={item.href} className="flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-[var(--text)] transition hover:bg-brand-500/10 hover:text-brand-600">
                <Icon size={20} /> {t[item.key]}
              </a>
            );
          })}
        </nav>

        <div className="mt-7 rounded-[26px] bg-gradient-to-br from-brand-600 to-brand-700 p-5 text-white shadow-glow">
          <div className="text-5xl">🏆</div>
          <h3 className="mt-3 text-xl font-bold">Fun Mode</h3>
          <p className="mb-4 text-sm opacity-85">Mini games, badges and challenges.</p>
          <Button className="w-full bg-white text-brand-700" variant="secondary">Start Game</Button>
        </div>

        <p className="mt-8 text-sm text-[var(--muted)]">© 2026 PreetiFont Typing ❤️</p>
      </aside>

      <main className="min-w-0 p-4 md:p-7">
        <header className="mb-5 flex items-center gap-3">
          <a href="#dashboard" className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 text-2xl font-black text-white shadow-glow lg:hidden">प</a>
          <div className="flex-1" />
          <label className="glass flex items-center gap-2 rounded-2xl px-3 py-2">
            ☀️
            <input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} className="h-5 w-10 accent-brand-600" />
            🌙
          </label>
          <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} className="glass rounded-2xl px-4 py-2.5 outline-none">
            <option value="en">English</option>
            <option value="ne">नेपाली</option>
          </select>
          <AuthButton lang={lang} />
        </header>

        <section className="nepal-hero mb-5 flex flex-col gap-5 rounded-[28px] p-6 text-white shadow-glow md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black md:text-5xl">{t.heroTitle}</h2>
            <p className="mt-2 opacity-90">{t.heroSub}</p>
          </div>
          <blockquote className="max-w-sm rounded-3xl border border-white/20 bg-black/25 p-5">
            <strong>“{t.quote}”</strong>
            <span className="mt-2 block text-sm opacity-80">अभ्यासले नै सफलता दिन्छ।</span>
          </blockquote>
        </section>

        <div className={clsx("space-y-7")} data-lang={lang}>
          {children}
        </div>
      </main>
    </div>
  );
}

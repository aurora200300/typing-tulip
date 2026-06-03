"use client";

import { Flame, Gauge, Target, Trophy, Clock, CalendarDays } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, StatCard, Progress, Button } from "@/components/ui";
import { demoStats, trend, demoResults } from "@/lib/demo-data";
import type { Lang } from "@/lib/types";
import { dictionary } from "@/lib/i18n";

export default function Dashboard({ lang = "en" }: { lang?: Lang }) {
  const t = dictionary[lang];

  return (
    <div id="dashboard" className="grid gap-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<Gauge />} title={`Average ${t.wpm}`} value={demoStats.avgWpm} note="+6 today" />
        <StatCard icon={<Target />} title={t.accuracy} value={`${demoStats.avgAccuracy}%`} note="+3% today" color="from-emerald-500 to-emerald-700" />
        <StatCard icon={<Trophy />} title={t.points} value={demoStats.points.toLocaleString()} note="+850 today" color="from-orange-400 to-orange-700" />
        <StatCard icon={<Flame />} title={t.streak} value={`${demoStats.streak} days`} note="Best: 12 days" color="from-rose-500 to-red-700" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-black">📊 Today&apos;s Performance</h3>
            <Button variant="ghost">View report →</Button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="wpm" stroke="#6d3deb" strokeWidth={4} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="accuracy" stroke="#16a34a" strokeWidth={4} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid gap-5">
          <Card>
            <h3 className="text-xl font-black">🔥 Streak Tracker</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">Practice 7 days continuously.</p>
            <div className="mt-5 grid grid-cols-7 gap-2 text-center">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={`${d}-${i}`} className="grid gap-2">
                  <div className={`grid h-10 place-items-center rounded-full font-black ${i < 6 ? "bg-emerald-500 text-white" : "glass"}`}>{i < 6 ? "✓" : "7"}</div>
                  <small>{d}</small>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-black">🎯 {t.dailyGoal}</h3>
            <div className="mt-4 flex items-center gap-5">
              <div className="grid h-24 w-24 place-items-center rounded-full bg-brand-500/10 text-2xl font-black text-brand-600">73%</div>
              <div className="flex-1">
                <b>28 / 38 min</b>
                <Progress value={73} />
                <p className="mt-2 text-sm text-[var(--muted)]">10 minutes left to complete today.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_.8fr]">
        <Card>
          <h3 className="mb-4 text-xl font-black">🕒 Recent Activity</h3>
          <div className="grid gap-3">
            {demoResults.map((r) => (
              <div key={r.id} className="glass grid gap-3 rounded-2xl p-4 md:grid-cols-5">
                <b>{r.mode}</b>
                <span>{r.wpm} WPM</span>
                <span>{r.accuracy}%</span>
                <span>{r.mistakes} mistakes</span>
                <span>{Math.round(r.durationSeconds / 60)} min</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-xl font-black">🏅 Achievements</h3>
          <div className="grid grid-cols-2 gap-3">
            {["30 WPM", "90% Accuracy", "7 Day Streak", "50 Tests"].map((item, idx) => (
              <div key={item} className="glass rounded-2xl p-4 text-center">
                <div className="text-4xl">{idx === 0 ? "⏱️" : idx === 1 ? "🎯" : idx === 2 ? "🔥" : "🔒"}</div>
                <b>{item}</b>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

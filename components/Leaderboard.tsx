import { Card, Button } from "@/components/ui";
import { leaders } from "@/lib/demo-data";

export default function Leaderboard() {
  return (
    <Card id="leaderboard">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-black">🏆 Leaderboard</h3>
          <p className="text-[var(--muted)]">Daily, weekly, monthly, friends, college and global ranking.</p>
        </div>
        <div className="glass flex w-fit rounded-2xl p-1">
          {["Daily", "Weekly", "Monthly"].map((item, idx) => (
            <button key={item} className={`rounded-xl px-4 py-2 font-bold ${idx === 0 ? "bg-brand-600 text-white" : ""}`}>{item}</button>
          ))}
        </div>
      </div>
      <div className="grid gap-3">
        {leaders.map((leader) => (
          <div key={leader.rank} className="glass grid items-center gap-3 rounded-2xl p-4 md:grid-cols-[60px_1fr_110px_110px_120px_100px]">
            <b className="text-2xl">#{leader.rank}</b>
            <span className="font-bold">{leader.name}</span>
            <span>{leader.wpm} WPM</span>
            <span>{leader.accuracy}%</span>
            <span>{leader.points.toLocaleString()} pts</span>
            <span>🔥 {leader.streak} days</span>
          </div>
        ))}
      </div>
      <Button className="mt-5">View All</Button>
    </Card>
  );
}

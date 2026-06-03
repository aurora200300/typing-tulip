import { Card, Button } from "@/components/ui";

export default function SettingsPanel() {
  return (
    <div id="settings" className="grid gap-5 xl:grid-cols-2">
      <Card>
        <h3 className="text-2xl font-black">⚙️ User Settings</h3>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2">
            <span className="font-bold">Typing layout</span>
            <select className="glass rounded-2xl px-4 py-3 outline-none"><option>Preeti</option><option>Roman helper</option></select>
          </label>
          <label className="grid gap-2">
            <span className="font-bold">Daily goal</span>
            <select className="glass rounded-2xl px-4 py-3 outline-none"><option>30 minutes</option><option>15 minutes</option><option>60 minutes</option></select>
          </label>
          <label className="grid gap-2">
            <span className="font-bold">Target WPM</span>
            <select className="glass rounded-2xl px-4 py-3 outline-none"><option>30 WPM</option><option>50 WPM</option><option>70 WPM</option></select>
          </label>
        </div>
      </Card>

      <Card>
        <h3 className="text-2xl font-black">🔐 Production Backend</h3>
        <p className="mt-3 text-[var(--muted)]">
          Add Supabase keys to enable Google login, cloud dashboard, leaderboard, certificates, admin content manager and row-level security.
        </p>
        <div className="mt-5 grid gap-3">
          {["Google OAuth", "PostgreSQL tables", "Row Level Security", "Practice session API", "Certificate ready"].map((item) => (
            <div key={item} className="glass rounded-2xl p-4">✅ {item}</div>
          ))}
        </div>
        <Button className="mt-5">Ready for Supabase</Button>
      </Card>
    </div>
  );
}

import { Card, Button } from "@/components/ui";

export default function AdminPreview() {
  return (
    <Card id="admin">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black">🛠️ Admin Panel Preview</h3>
          <p className="text-[var(--muted)]">Manage lessons, paragraphs, users and leaderboard.</p>
        </div>
        <Button>Add Lesson</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Users", "1,248"],
          ["Tests", "8,420"],
          ["Avg WPM", "39"],
          ["Lessons", "84"]
        ].map(([label, value]) => (
          <div key={label} className="glass rounded-3xl p-5">
            <p className="text-[var(--muted)]">{label}</p>
            <b className="text-3xl">{value}</b>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-3">
        {["Beginner matra lesson", "Lok Sewa sample paragraph", "News practice text"].map((item) => (
          <div key={item} className="glass flex items-center justify-between rounded-2xl p-4">
            <span>{item}</span>
            <div className="flex gap-2"><Button variant="ghost">Edit</Button><Button variant="secondary">Delete</Button></div>
          </div>
        ))}
      </div>
    </Card>
  );
}

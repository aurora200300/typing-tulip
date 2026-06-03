import { Card, Progress, Button } from "@/components/ui";

const lessons = [
  ["Level 1", "Basic Keys", 100, "✅"],
  ["Level 2", "Nepali Letters", 72, "अ"],
  ["Level 3", "Matras", 38, "ा"],
  ["Level 4", "Words", 0, "📖"],
  ["Level 5", "Sentences", 0, "💬"],
  ["Level 6", "Paragraphs", 0, "📄"],
  ["Level 7", "Speed Test", 0, "⏱️"],
  ["Level 8", "Professional Test", 0, "👑"]
];

export default function Lessons() {
  return (
    <Card id="lessons">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black">📚 Learning Path</h3>
          <p className="text-[var(--muted)]">Auto-unlock lessons based on skill and mistakes.</p>
        </div>
        <Button>Continue Level 2</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {lessons.map(([level, title, progress, icon]) => (
          <div key={String(title)} className={`glass rounded-3xl p-5 ${Number(progress) === 0 ? "opacity-70" : ""}`}>
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-bold text-brand-600">{level}</span>
              <span className="text-4xl">{icon}</span>
            </div>
            <h4 className="text-xl font-black">{title}</h4>
            <div className="mt-4"><Progress value={Number(progress)} /></div>
            <p className="mt-2 text-sm text-[var(--muted)]">{progress}% complete</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

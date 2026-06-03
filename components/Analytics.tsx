"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";
import { Card, Button } from "@/components/ui";
import { trend } from "@/lib/demo-data";

export default function Analytics() {
  return (
    <div id="analytics" className="grid gap-5">
      <div className="grid gap-5 xl:grid-cols-2">
        <Chart title="WPM Trend" dataKey="wpm" />
        <Chart title="Accuracy Trend" dataKey="accuracy" color="#16a34a" />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_.8fr]">
        <Card>
          <h3 className="mb-4 text-xl font-black">Mistake Reduction</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="mistakes" fill="#e11d48" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h3 className="text-xl font-black">🧠 AI Mistake Analysis</h3>
          <p className="mt-2 text-[var(--muted)]">Detected weak characters and lesson suggestions.</p>
          <div className="mt-4 grid gap-3">
            {["ज्ञ", "त्र", "श्र", "ध"].map((char, idx) => (
              <div key={char} className="glass flex items-center justify-between rounded-2xl p-4">
                <b className="font-devanagari text-2xl">{char}</b>
                <span>{78 - idx * 5}% error rate</span>
              </div>
            ))}
          </div>
          <Button className="mt-5 w-full">Practice Weak Keys</Button>
        </Card>
      </div>
    </div>
  );
}

function Chart({ title, dataKey, color = "#6d3deb" }: { title: string; dataKey: string; color?: string }) {
  return (
    <Card>
      <h3 className="mb-4 text-xl font-black">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={4} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

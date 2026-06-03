import AppShell from "@/components/AppShell";
import Dashboard from "@/components/Dashboard";
import PracticeEngine from "@/components/PracticeEngine";
import Lessons from "@/components/Lessons";
import Analytics from "@/components/Analytics";
import Leaderboard from "@/components/Leaderboard";
import SettingsPanel from "@/components/SettingsPanel";
import AdminPreview from "@/components/AdminPreview";

export default function Home() {
  return (
    <AppShell>
      <Dashboard />
      <PracticeEngine />
      <Lessons />
      <Analytics />
      <Leaderboard />
      <SettingsPanel />
      <AdminPreview />
    </AppShell>
  );
}

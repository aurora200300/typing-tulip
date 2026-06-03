"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { dictionary } from "@/lib/i18n";
import type { Lang } from "@/lib/types";
import { Button } from "@/components/ui";

export default function AuthButton({ lang }: { lang: Lang }) {
  const t = dictionary[lang];
  const [email, setEmail] = useState<string | null>(null);
  const [hasSupabase, setHasSupabase] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    setHasSupabase(Boolean(supabase));
    supabase?.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  async function signIn() {
    const supabase = createClient();
    if (!supabase) {
      alert(t.noBackend);
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  }

  async function signOut() {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setEmail(null);
  }

  if (email) {
    return (
      <div className="glass flex items-center gap-3 rounded-2xl px-3 py-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white font-black text-blue-600">G</span>
        <span className="hidden text-sm md:block">{email}</span>
        <Button onClick={signOut} variant="ghost">{t.logout}</Button>
      </div>
    );
  }

  return (
    <Button onClick={signIn} variant="secondary" title={hasSupabase ? "Supabase Google OAuth" : "Add env keys first"}>
      <span className="mr-2 font-black text-blue-600">G</span>{t.login}
    </Button>
  );
}

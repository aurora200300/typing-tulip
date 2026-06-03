import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const resultSchema = z.object({
  mode: z.enum(["letters", "words", "sentences", "paragraph", "news", "speed"]),
  wpm: z.number().min(0).max(300),
  accuracy: z.number().min(0).max(100),
  mistakes: z.number().min(0),
  typed_chars: z.number().min(0),
  duration_seconds: z.number().min(0),
  points: z.number().min(0)
});

export async function POST(request: Request) {
  const payload = resultSchema.safeParse(await request.json());
  if (!payload.success) return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Supabase env keys are missing." }, { status: 500 });

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase.from("practice_sessions").insert({
    ...payload.data,
    user_id: userData.user.id
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

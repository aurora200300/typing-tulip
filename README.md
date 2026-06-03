# PreetiFont Stronger V2

A stronger production-style codebase for a Preeti Font Nepali Typing Practice website.

## What is included

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase-ready Google login
- Supabase PostgreSQL schema
- Row Level Security policies
- Dashboard
- Practice engine with live WPM, accuracy, mistake tracking and XP
- Keyboard Layout Helper
- Roman → Preeti hints
- Matra guide
- Lessons
- Analytics charts
- Leaderboard
- Settings
- Admin panel preview
- Local fallback mode when Supabase env keys are missing

## Run locally

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Setup Supabase

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. Run `supabase/seed.sql`.
5. Go to Authentication → Providers → Google.
6. Enable Google provider and add your Google OAuth Client ID/Secret.
7. Add your local redirect URL:
   `http://localhost:3000/auth/callback`
8. Copy `.env.example` to `.env.local`.
9. Paste your Supabase URL and anon key.

## Environment

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Deploy

Recommended free hosting:

- Vercel for frontend
- Supabase for database/auth

On Vercel, add the same environment variables.

## Notes

This is stronger than a simple HTML prototype because it is structured like a real app:
auth layer, database schema, RLS security, reusable components, API route, typed scoring logic, charts, and scalable page sections.

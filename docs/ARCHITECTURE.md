# Architecture

## Frontend
- Next.js App Router
- React components
- Tailwind CSS
- Recharts for analytics
- Local fallback mode for demo

## Backend
- Supabase Auth
- Supabase PostgreSQL
- Row Level Security
- API route: `/api/results`

## Main tables
- `profiles`
- `lessons`
- `practice_sessions`
- `achievements`
- `user_achievements`
- `certificates`

## Data flow
1. User logs in with Google.
2. Supabase creates a profile through trigger.
3. User practices typing.
4. Practice result is inserted into `practice_sessions`.
5. Dashboard and leaderboard read user/session data.
6. Achievements and certificates can be generated from results.

-- PreetiFont Stronger V2 Supabase Schema
-- Run this in Supabase SQL editor.

create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  language text not null default 'en' check (language in ('en', 'ne')),
  theme text not null default 'light' check (theme in ('light', 'dark', '3d')),
  daily_goal_minutes int not null default 30,
  target_wpm int not null default 30,
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  title_ne text,
  level int not null default 1,
  mode text not null check (mode in ('letters', 'words', 'sentences', 'paragraph', 'news', 'speed')),
  content text not null,
  difficulty text not null default 'beginner' check (difficulty in ('beginner', 'intermediate', 'advanced')),
  xp int not null default 100,
  is_published boolean not null default true,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.practice_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete set null,
  mode text not null check (mode in ('letters', 'words', 'sentences', 'paragraph', 'news', 'speed')),
  wpm int not null default 0,
  accuracy numeric(5,2) not null default 0,
  mistakes int not null default 0,
  typed_chars int not null default 0,
  duration_seconds int not null default 0,
  points int not null default 0,
  weak_keys jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.achievements (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,
  title text not null,
  title_ne text,
  description text,
  icon text not null default '🏅',
  condition jsonb not null default '{}'::jsonb
);

create table if not exists public.user_achievements (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  unique(user_id, achievement_id)
);

create table if not exists public.certificates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  session_id uuid not null references public.practice_sessions(id) on delete cascade,
  certificate_no text unique not null,
  verification_hash text unique not null,
  issued_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.lessons enable row level security;
alter table public.practice_sessions enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;
alter table public.certificates enable row level security;

create policy "Profiles are viewable by owner"
on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
on public.profiles for insert with check (auth.uid() = id);

create policy "Published lessons are readable"
on public.lessons for select using (is_published = true);

create policy "Admins manage lessons"
on public.lessons for all using (
  exists(select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Users read own sessions"
on public.practice_sessions for select using (auth.uid() = user_id);

create policy "Users insert own sessions"
on public.practice_sessions for insert with check (auth.uid() = user_id);

create policy "Users read achievements"
on public.achievements for select using (true);

create policy "Users read own unlocked achievements"
on public.user_achievements for select using (auth.uid() = user_id);

create policy "Users read own certificates"
on public.certificates for select using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace view public.leaderboard_daily as
select
  p.id,
  p.full_name,
  p.avatar_url,
  max(ps.wpm) as best_wpm,
  round(avg(ps.accuracy), 2) as avg_accuracy,
  sum(ps.points) as total_points,
  count(*) as sessions
from public.practice_sessions ps
join public.profiles p on p.id = ps.user_id
where ps.created_at >= date_trunc('day', now())
group by p.id, p.full_name, p.avatar_url
order by total_points desc, best_wpm desc;

insert into public.achievements (code, title, title_ne, description, icon, condition)
values
('first_practice', 'First Practice', 'पहिलो अभ्यास', 'Complete your first session.', '🎉', '{"sessions":1}'),
('wpm_30', '30 WPM', '३० WPM', 'Reach 30 WPM.', '⏱️', '{"wpm":30}'),
('accuracy_90', '90% Accuracy', '९०% शुद्धता', 'Reach 90% accuracy.', '🎯', '{"accuracy":90}'),
('streak_7', '7 Day Streak', '७ दिन लगातार', 'Practice for 7 days.', '🔥', '{"streak":7}')
on conflict (code) do nothing;

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.study_sessions enable row level security;
alter table public.practice_tests enable row level security;
alter table public.user_progress enable row level security;

-- Create tables
create table public.profiles (
  id uuid references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  preferences jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

create table public.study_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  subject text not null,
  topic text not null,
  duration integer not null,
  confidence_level smallint not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.practice_tests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  subject text not null,
  score integer not null,
  total_questions integer not null,
  time_taken integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.user_progress (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  ai_sessions integer default 0,
  topics_mastered integer default 0,
  practice_tests integer default 0,
  current_rank integer default 0,
  study_streak integer default 0,
  total_study_hours integer default 0,
  subject_progress jsonb default '{}'::jsonb,
  last_updated timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

create policy "Users can view own study sessions"
  on study_sessions for select
  using ( auth.uid() = user_id );

create policy "Users can insert own study sessions"
  on study_sessions for insert
  with check ( auth.uid() = user_id );

create policy "Users can view own practice tests"
  on practice_tests for select
  using ( auth.uid() = user_id );

create policy "Users can insert own practice tests"
  on practice_tests for insert
  with check ( auth.uid() = user_id );

create policy "Users can view own progress"
  on user_progress for select
  using ( auth.uid() = user_id );

create policy "Users can update own progress"
  on user_progress for update
  using ( auth.uid() = user_id );
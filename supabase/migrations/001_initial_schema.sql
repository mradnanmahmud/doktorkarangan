create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  school text,
  created_at timestamptz not null default now()
);
create table public.clinics (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users(id) on delete cascade,
  code text not null unique,
  title text not null,
  class_name text,
  level text not null check (level in ('G1','G2','G3')),
  essay_type text not null check (essay_type in ('ekspositori','naratif')),
  topic text not null,
  essay text not null,
  sentences jsonb not null default '[]',
  issues jsonb not null default '[]',
  teacher_scores jsonb not null default '{}',
  ai_feedback text,
  status text not null default 'draft' check (status in ('draft','open','closed')),
  created_at timestamptz not null default now()
);
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  student_name text not null,
  student_token uuid not null default gen_random_uuid(),
  diagnoses jsonb not null default '[]',
  scores jsonb not null default '{}',
  improved_paragraph text,
  reflection text,
  accuracy integer check (accuracy between 0 and 100),
  submitted_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.clinics enable row level security;
alter table public.submissions enable row level security;

create policy "teachers read own profile" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "teachers update own profile" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "teachers insert own profile" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);

create policy "teachers manage own clinics" on public.clinics for all to authenticated using ((select auth.uid()) = teacher_id) with check ((select auth.uid()) = teacher_id);
create policy "students read open clinics" on public.clinics for select to anon using (status = 'open');

create policy "students submit to open clinics" on public.submissions for insert to anon with check (exists (select 1 from public.clinics c where c.id = clinic_id and c.status = 'open'));
create policy "teachers read clinic submissions" on public.submissions for select to authenticated using (exists (select 1 from public.clinics c where c.id = clinic_id and c.teacher_id = (select auth.uid())));

create index clinics_teacher_id_idx on public.clinics(teacher_id);
create index clinics_code_idx on public.clinics(code);
create index submissions_clinic_id_idx on public.submissions(clinic_id);

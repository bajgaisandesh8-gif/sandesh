-- ===========================================================
-- SANDESH BAJGAI PORTFOLIO — SUPABASE SCHEMA
-- ===========================================================
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- Safe to run top-to-bottom on a fresh project.
-- ===========================================================

create extension if not exists "uuid-ossp";

-- ===========================================================
-- 1. PROJECTS
-- ===========================================================
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  category text not null check (category in ('WEB','CYBERSECURITY','NETWORKING','AI','AUTOMATION','IT')),
  technologies text[] default '{}',
  github_url text,
  live_url text,
  image_url text,
  status text not null default 'in_progress' check (status in ('live','in_progress','archived')),
  featured boolean not null default false,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_projects_category on public.projects (category);
create index if not exists idx_projects_created_at on public.projects (created_at desc);

-- ===========================================================
-- 2. SKILLS
-- ===========================================================
create table if not exists public.skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null check (category in ('networking','infrastructure','development','cybersecurity','ai')),
  level int not null default 50 check (level >= 0 and level <= 100),
  display_order int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists idx_skills_category on public.skills (category);

-- ===========================================================
-- 3. EXPERIENCE
-- ===========================================================
create table if not exists public.experience (
  id uuid primary key default uuid_generate_v4(),
  role text not null,
  organization text not null,
  period text,                       -- display string e.g. "Jan 2025 – Present"
  start_date date,
  end_date date,                     -- null = ongoing
  description text,
  tags text[] default '{}',
  display_order int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists idx_experience_start_date on public.experience (start_date desc);

-- ===========================================================
-- 4. CERTIFICATIONS
-- ===========================================================
create table if not exists public.certifications (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  issuer text not null,
  issue_date text,                   -- display string e.g. "March 2026"
  credential_id text,
  verification_url text,
  certificate_image_url text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists idx_certifications_issue_date on public.certifications (issue_date desc);

-- ===========================================================
-- 5. CONTACT MESSAGES
-- ===========================================================
create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists idx_contact_messages_created_at on public.contact_messages (created_at desc);

-- ===========================================================
-- 6. SITE SETTINGS  (key/value store for admin-editable content)
-- ===========================================================
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Seed sensible defaults (safe to re-run)
insert into public.site_settings (key, value) values
  ('social_links', '{"github":"","linkedin":"","instagram":"","email":""}'::jsonb),
  ('hero_status', '{"status":"ONLINE","focus":"CYBERSECURITY","network":"ACTIVE","build_mode":"ENABLED"}'::jsonb)
on conflict (key) do nothing;

-- ===========================================================
-- updated_at auto-touch trigger (projects + site_settings)
-- ===========================================================
create or replace function public.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_touch on public.projects;
create trigger trg_projects_touch before update on public.projects
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_settings_touch on public.site_settings;
create trigger trg_settings_touch before update on public.site_settings
  for each row execute function public.touch_updated_at();

-- ===========================================================
-- ROW LEVEL SECURITY
-- ===========================================================
alter table public.projects           enable row level security;
alter table public.skills             enable row level security;
alter table public.experience         enable row level security;
alter table public.certifications     enable row level security;
alter table public.contact_messages   enable row level security;
alter table public.site_settings      enable row level security;

-- ---------- Public READ policies (anon + authenticated) ----------
drop policy if exists "public_read_projects" on public.projects;
create policy "public_read_projects" on public.projects
  for select using (true);

drop policy if exists "public_read_skills" on public.skills;
create policy "public_read_skills" on public.skills
  for select using (true);

drop policy if exists "public_read_experience" on public.experience;
create policy "public_read_experience" on public.experience
  for select using (true);

drop policy if exists "public_read_certifications" on public.certifications;
create policy "public_read_certifications" on public.certifications
  for select using (true);

drop policy if exists "public_read_site_settings" on public.site_settings;
create policy "public_read_site_settings" on public.site_settings
  for select using (true);

-- contact_messages: NO public read (protects submitters' data)

-- ---------- Public INSERT-ONLY on contact_messages ----------
drop policy if exists "public_insert_contact_messages" on public.contact_messages;
create policy "public_insert_contact_messages" on public.contact_messages
  for insert
  with check (
    length(trim(name)) > 0 and
    length(trim(name)) <= 100 and
    email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$' and
    length(trim(subject)) > 0 and
    length(trim(subject)) <= 150 and
    length(trim(message)) >= 10 and
    length(trim(message)) <= 2000
  );

-- ---------- Admin (authenticated) FULL ACCESS ----------
-- Any authenticated user counts as admin here because only you will
-- have a login (created manually in Supabase Auth — see README).
-- For multi-admin setups, swap auth.uid() checks for a role claim instead.

drop policy if exists "admin_write_projects" on public.projects;
create policy "admin_write_projects" on public.projects
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin_write_skills" on public.skills;
create policy "admin_write_skills" on public.skills
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin_write_experience" on public.experience;
create policy "admin_write_experience" on public.experience
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin_write_certifications" on public.certifications;
create policy "admin_write_certifications" on public.certifications
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin_read_contact_messages" on public.contact_messages;
create policy "admin_read_contact_messages" on public.contact_messages
  for select using (auth.role() = 'authenticated');

drop policy if exists "admin_update_contact_messages" on public.contact_messages;
create policy "admin_update_contact_messages" on public.contact_messages
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin_delete_contact_messages" on public.contact_messages;
create policy "admin_delete_contact_messages" on public.contact_messages
  for delete using (auth.role() = 'authenticated');

drop policy if exists "admin_write_site_settings" on public.site_settings;
create policy "admin_write_site_settings" on public.site_settings
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Note: projects/skills/experience/certifications public read policies
-- above already cover SELECT for admins too (any authenticated user is
-- also "public"), so no separate admin SELECT policy is needed for those.

-- ===========================================================
-- STORAGE — bucket + policies
-- ===========================================================
-- Run this section after creating the bucket in the dashboard,
-- OR let this create it for you:
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

-- Public can READ any object in the bucket (profile photo, project
-- images, certificate images are all meant to be publicly visible).
drop policy if exists "public_read_portfolio_assets" on storage.objects;
create policy "public_read_portfolio_assets" on storage.objects
  for select using (bucket_id = 'portfolio-assets');

-- Only authenticated (admin) users may upload/update/delete.
drop policy if exists "admin_write_portfolio_assets" on storage.objects;
create policy "admin_write_portfolio_assets" on storage.objects
  for insert with check (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');

drop policy if exists "admin_update_portfolio_assets" on storage.objects;
create policy "admin_update_portfolio_assets" on storage.objects
  for update using (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');

drop policy if exists "admin_delete_portfolio_assets" on storage.objects;
create policy "admin_delete_portfolio_assets" on storage.objects
  for delete using (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');

-- ===========================================================
-- OPTIONAL SEED DATA (comment out if you'd rather start empty)
-- ===========================================================
insert into public.experience (role, organization, period, description, tags, display_order)
values (
  'IT Intern',
  'Soaltee Westend Itahari',
  'Internship',
  'Hands-on exposure to hotel IT operations — supporting network infrastructure, hardware, and day-to-day systems across the property.',
  array['Ethernet','RJ45 / T568B','Switches','PoE','Fiber','Firewall','Core Switch','DHCP','IP Configuration','Wi-Fi','Access Points','CCTV / NVR','Printers','Projectors','Server Room','POS Systems'],
  1
)
on conflict do nothing;

-- ===========================================================
-- DONE. Verify with:
--   select * from public.projects;
--   select * from public.site_settings;
-- ===========================================================

-- =========================================================
-- SANDESH BAJGAI PORTFOLIO - SUPABASE SCHEMA
-- =========================================================
-- Run this file in Supabase SQL Editor.
--
-- IMPORTANT:
-- 1. RLS is enabled on every public table.
-- 2. Public visitors can read published portfolio content.
-- 3. Public visitors can submit contact messages.
-- 4. Public visitors cannot modify portfolio content.
-- 5. NEVER expose the service_role/secret key in the website.
-- =========================================================

create extension if not exists pgcrypto;

-- =========================================================
-- PROJECTS
-- =========================================================

create table if not exists public.projects (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    slug text not null unique,
    category text not null,
    short_description text not null,
    full_description text,
    problem text,
    solution text,
    result text,
    featured boolean not null default false,
    published boolean not null default true,
    github_url text,
    live_url text,
    cover_image text,
    sort_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- =========================================================
-- SKILLS
-- =========================================================

create table if not exists public.skills (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    category text not null,
    description text,
    level text,
    featured boolean not null default false,
    sort_order integer not null default 0,
    created_at timestamptz not null default now()
);

-- =========================================================
-- TECHNOLOGIES
-- =========================================================

create table if not exists public.technologies (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    category text,
    created_at timestamptz not null default now()
);

create table if not exists public.project_technologies (
    project_id uuid not null references public.projects(id) on delete cascade,
    technology_id uuid not null references public.technologies(id) on delete cascade,
    primary key (project_id, technology_id)
);

-- =========================================================
-- PROJECT IMAGES
-- =========================================================

create table if not exists public.project_images (
    id uuid primary key default gen_random_uuid(),
    project_id uuid not null references public.projects(id) on delete cascade,
    image_url text not null,
    alt_text text,
    sort_order integer not null default 0,
    created_at timestamptz not null default now()
);

-- =========================================================
-- EXPERIENCE
-- =========================================================

create table if not exists public.experience (
    id uuid primary key default gen_random_uuid(),
    role text not null,
    company text not null,
    location text,
    start_date date,
    end_date date,
    description text not null,
    featured boolean not null default false,
    sort_order integer not null default 0,
    created_at timestamptz not null default now()
);

-- =========================================================
-- CERTIFICATIONS
-- =========================================================

create table if not exists public.certifications (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    issuer text,
    issue_date date,
    credential_url text,
    certificate_image text,
    description text,
    created_at timestamptz not null default now()
);

-- =========================================================
-- CONTACT MESSAGES
-- =========================================================

create table if not exists public.contact_messages (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text not null,
    subject text not null,
    message text not null,
    status text not null default 'new',
    created_at timestamptz not null default now()
);

-- =========================================================
-- SITE SETTINGS
-- =========================================================

create table if not exists public.site_settings (
    id uuid primary key default gen_random_uuid(),
    setting_key text not null unique,
    setting_value jsonb not null default '{}'::jsonb,
    updated_at timestamptz not null default now()
);

-- =========================================================
-- INDEXES
-- =========================================================

create index if not exists projects_category_idx on public.projects(category);
create index if not exists projects_featured_idx on public.projects(featured);
create index if not exists projects_published_idx on public.projects(published);
create index if not exists projects_sort_order_idx on public.projects(sort_order);
create index if not exists skills_category_idx on public.skills(category);
create index if not exists skills_sort_order_idx on public.skills(sort_order);
create index if not exists experience_sort_order_idx on public.experience(sort_order);
create index if not exists project_images_project_idx on public.project_images(project_id);
create index if not exists project_images_sort_order_idx on public.project_images(sort_order);
create index if not exists contact_messages_status_idx on public.contact_messages(status);
create index if not exists contact_messages_created_at_idx on public.contact_messages(created_at desc);

-- =========================================================
-- UPDATED_AT TRIGGER
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

-- =========================================================
-- ROW LEVEL SECURITY
-- =========================================================

alter table public.projects enable row level security;
alter table public.skills enable row level security;
alter table public.technologies enable row level security;
alter table public.project_technologies enable row level security;
alter table public.project_images enable row level security;
alter table public.experience enable row level security;
alter table public.certifications enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;

-- =========================================================
-- PUBLIC READ POLICIES
-- =========================================================

create policy "Public can read published projects"
on public.projects
for select
to anon, authenticated
using (published = true);

create policy "Public can read skills"
on public.skills
for select
to anon, authenticated
using (true);

create policy "Public can read technologies"
on public.technologies
for select
to anon, authenticated
using (true);

create policy "Public can read project technologies"
on public.project_technologies
for select
to anon, authenticated
using (
    exists (
        select 1
        from public.projects p
        where p.id = project_id
        and p.published = true
    )
);

create policy "Public can read project images"
on public.project_images
for select
to anon, authenticated
using (
    exists (
        select 1
        from public.projects p
        where p.id = project_id
        and p.published = true
    )
);

create policy "Public can read experience"
on public.experience
for select
to anon, authenticated
using (true);

create policy "Public can read certifications"
on public.certifications
for select
to anon, authenticated
using (true);

create policy "Public can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

-- =========================================================
-- CONTACT FORM POLICY
-- =========================================================
-- Visitors may submit a message, but cannot read/update/delete
-- messages through the public anon key.

create policy "Anyone can submit contact messages"
on public.contact_messages
for insert
to anon, authenticated
with check (
    char_length(trim(name)) between 1 and 100
    and char_length(trim(email)) between 3 and 150
    and char_length(trim(subject)) between 1 and 150
    and char_length(trim(message)) between 1 and 2000
);

-- No public SELECT / UPDATE / DELETE policies are created for
-- contact_messages intentionally.

-- =========================================================
-- OPTIONAL SEED DATA
-- =========================================================

insert into public.site_settings (setting_key, setting_value)
values
    ('hero', '{"status":"AVAILABLE FOR OPPORTUNITIES","headline":"Building Systems. Securing Technology. Exploring What''s Next."}'::jsonb),
    ('social_links', '{"github":"https://github.com/bajgaisandesh8-gif"}'::jsonb)
on conflict (setting_key) do nothing;

-- =========================================================
-- END
-- =========================================================

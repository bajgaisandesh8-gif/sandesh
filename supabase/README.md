# Supabase backend setup

This portfolio uses Supabase as its database layer while the frontend remains a static HTML/CSS/JavaScript site on GitHub Pages.

## Current backend design

- `projects` — portfolio projects
- `skills` — technical skills
- `technologies` — technology catalog
- `project_technologies` — project/technology relationships
- `project_images` — project gallery images
- `experience` — experience timeline
- `certifications` — credentials
- `contact_messages` — messages submitted through the public contact form
- `site_settings` — small editable site configuration values

## First-time Supabase setup

1. Open the Supabase project configured in `JS/supabase.js`.
2. Open **SQL Editor**.
3. Run the complete `schema.sql` file from this folder.
4. Confirm that `contact_messages` exists under **Table Editor**.
5. Confirm Row Level Security is enabled.
6. The browser must use only the public publishable/anon key. Never put a Supabase `service_role` or secret key into this repository.

## Contact form behavior

The contact form first attempts to insert a message into `contact_messages`.

If Supabase is unavailable, the frontend falls back to a `mailto:` link so the form does not silently fail.

## Important security rule

The public website must never be given a service-role/secret key. Public access is controlled by the Row Level Security policies in `schema.sql`.

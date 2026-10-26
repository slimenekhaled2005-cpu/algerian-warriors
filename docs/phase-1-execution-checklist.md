# AW The Mind — Phase 1 execution checklist

Current app review (branch: feature/aw-the-mind-foundation)
- Frontend is React + Vite, with Tailwind CSS, Framer Motion and Lucide icons.
- The current App.jsx is still the Algerian Warriors brand landing page; it is not yet a student dashboard.
- A Supabase schema and privacy docs are staged on this feature branch.
- No Supabase project has been connected by this repository change, and no production database has been migrated.

## Phase 1A — local repository safety
1. Work only on feature/aw-the-mind-foundation. Do not commit directly to main.
2. Install dependencies: npm install
3. Create a private local .env.local file for public Supabase settings only; it must not be committed.
4. Keep OPENAI_API_KEY out of Vite/browser variables. It belongs only in a server runtime environment when a server route is implemented.
5. Check Git status before committing and ensure no real secret appears in tracked files.

## Phase 1B — create Supabase project
1. Create a Supabase project in the user's own account.
2. Open SQL Editor.
3. Review and run supabase/migrations/202610260001_aw_mind_schema.sql.
4. In Authentication settings, configure sign-up, email confirmation and redirect URLs for localhost and the eventual production domain.
5. Create the owner's own user through Supabase Auth.
6. Assign the admin role only to that user through the SQL Editor using the actual Auth UUID:
   insert into public.user_roles (user_id, role) values ('YOUR_AUTH_USER_UUID', 'admin');
7. Never expose the database password or service-role/secret key to the browser.

## Phase 1C — security tests before real student data
- Student A cannot read Student B's profile, subscriptions, conversations, or messages.
- Student A cannot create assistant-role messages from the browser.
- Admin can manage tutor definitions and subscription records but cannot select from conversations or messages through the app role.
- Admin can read aggregate usage metrics only; the metrics table must not contain message content.
- No AI provider key appears in browser bundles or network responses.
- Do not accept a client-supplied role, plan, token count, or cost as authoritative.

## Important architecture note
The Supabase migration is an initial schema, not a complete production-ready backend. Before public launch, add a server route that validates the signed-in user, subscription, quotas and request size; calls the AI provider server-side; stores assistant replies through a trusted server process; and records verified usage metrics. The server must never use service-role credentials to fetch conversations for the admin dashboard. Review database grants and test RLS with separate student/admin accounts before launch.

# AW The Mind — privacy and security baseline

## Architecture requirements
- Browser: Supabase URL and publishable/anon key only; never an AI API key or Supabase service-role key.
- Authentication: Supabase Auth; require a signed-in user for student data.
- Chat route: validate the user's session, check subscription and rate limits, then call the AI provider server-side.
- Student chat database requests must use the user's JWT so row-level security applies. Do not use service-role credentials to read conversation or message rows.
- Admin dashboard: manage tutor instructions and subscription status; show usage/cost metrics only. Do not query conversations or messages.
- Store the AI API key only in server-side deployment environment settings. Never prefix it with VITE_.
- Logs should contain request ID, user ID, tutor ID, token counts, estimated cost, status and timestamp only. Never log prompts, completions, attachments or message excerpts.
- Assign admin roles through a trusted process. Never let users set their own role.
- Student files must use private storage and access policies.
- Provide clear history deletion/export controls and document retention.

## Privacy promise and limits
The admin UI and ordinary admin role must not have permission to read message content. The migration intentionally has no admin policy on conversations or messages.

This is not end-to-end encryption or a guarantee that no infrastructure operator can ever access content. The AI provider receives prompts to generate responses, and privileged database-owner or service-role credentials can bypass RLS. Restrict those credentials, never use them in student-facing chat handlers, and accurately explain provider processing and retention in the privacy notice.

## Manual setup
1. Create a Supabase project.
2. Run the SQL migration at supabase/migrations/202610260001_aw_mind_schema.sql in the Supabase SQL Editor.
3. Create your own user through Supabase Auth.
4. Grant admin role to your user only, using the SQL Editor and your actual Auth user UUID:
   insert into public.user_roles (user_id, role) values ('YOUR_AUTH_USER_UUID', 'admin');
5. Add the Supabase URL, publishable/anon key, and AI API key in the correct environment settings. The AI key must be server-only.
6. Test with two student accounts and one admin account before storing real student data.

## Environment variable names
- VITE_SUPABASE_URL: public project URL.
- VITE_SUPABASE_ANON_KEY: public/anon key (use the key type shown by your project).
- OPENAI_API_KEY: server-only secret. Never use VITE_OPENAI_API_KEY.

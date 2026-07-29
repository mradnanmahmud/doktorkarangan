# Doktor Karangan AI — Version 2

A Next.js classroom application where students diagnose, assess and improve AI-generated Malay essays instead of asking AI to complete the work for them.

## What is included

- Responsive Next.js App Router interface
- Teacher clinic builder for G1/G2/G3
- Expository and narrative essay modes
- Configurable diagnosis focus
- Student class-code flow
- Sentence-level diagnosis and reasons
- 30-mark rubric
- Paragraph treatment task
- AI-literacy reflection
- Diagnosis Accuracy Score
- Teacher dashboard and CSV export
- Demo mode using localStorage
- Optional OpenAI server route
- Supabase schema with RLS policies

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

The app works immediately in demo mode without credentials. Use clinic code `DKAI26`.

## Enable OpenAI

Set these server environment variables:

```env
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5-mini
```

The API key is only read in `app/api/generate/route.ts` and must never use the `NEXT_PUBLIC_` prefix.

## Enable Supabase

1. Create a Supabase project.
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL Editor.
3. Add:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

The current UI uses demo storage so that it is immediately testable. Replace `lib/storage.ts` calls with Supabase queries when moving to multi-device classroom use.

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Add the environment variables.
4. Deploy.

## Security notes

- Student access does not require email accounts.
- The service-role key and OpenAI key must remain server-only.
- RLS is enabled on every public table.
- Teachers can access only clinics they own and their clinic submissions.
- Anonymous students can read only open clinics and insert submissions into open clinics.

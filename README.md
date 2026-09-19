# Mayukh Solar — VR Enterprises

Marketing website for VR Enterprises (trading as Mayukh Solar), a solar EPC in
Kota serving six districts of the Hadoti region.

Next.js 16 (App Router) · deployed on Vercel · leads written into the existing
Supabase CRM.

## Local development

Requires Node 22.x.

```sh
pnpm install
cp .env.example .env.local   # then fill in the secrets
pnpm dev
```

## Environment

| Variable | Where | Purpose |
|---|---|---|
| `SUPABASE_URL` | server | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | server | **Secret.** Required to insert leads — `public.leads` has no anon INSERT policy, so the write bypasses RLS with the service role. Never expose to the client, never commit. |
| `LEADS_CREATED_BY_USER_ID` | server | `auth.users` id recorded as `leads.created_by_user_id` (NOT NULL) |
| `NEXT_PUBLIC_SITE_URL` | public | Live origin. Canonicals, OpenGraph URLs and `sitemap.xml` are wrong until this is set. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | public | Optional. Unset disables analytics entirely. |

## Lead capture

Form submissions go through the `submitLead` server action in
[`app/actions/submit-lead.ts`](app/actions/submit-lead.ts) and insert directly
into the CRM's `public.leads` table. They are tagged `source='website'` and
`campaign='website'`, left unassigned at `status='new'`, and picked up by the
team in the CRM — this site has no admin view of its own.

Two `AFTER INSERT` triggers on that table (`log_lead_assignment`,
`audit_lead_changes`) fire on every submission and write to `lead_assignments`
and `audit_logs`. That is expected CRM behaviour.

`village_city` and `address` are NOT NULL in the CRM but optional on the form,
so they fall back to the selected district.

## Images

Served assets in `public/` are WebP. The full-resolution masters live in
[`design-assets/`](design-assets/README.md), which is not deployed; that README
carries the commands to regenerate the WebP files.

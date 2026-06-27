-- Migration: add audit-specific columns to leads table
-- PRD Section 7.5 — Audit form fields that have no existing column equivalents
--
-- businessName is already captured in the `name` column.
-- These three columns are added as nullable so existing contact rows remain valid.
--
-- After applying this migration, regenerate types/database.ts with:
--   supabase gen types typescript --project-id <project-id> > types/database.ts

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS primary_goal   text,
  ADD COLUMN IF NOT EXISTS hear_about_us  text,
  ADD COLUMN IF NOT EXISTS website_url    text;

COMMENT ON COLUMN public.leads.primary_goal  IS 'Audit form: what the business wants to achieve (e.g. "Get more customers online")';
COMMENT ON COLUMN public.leads.hear_about_us IS 'Audit form: how the lead heard about Vextiv';
COMMENT ON COLUMN public.leads.website_url   IS 'Audit form: the business website URL to be audited (optional)';

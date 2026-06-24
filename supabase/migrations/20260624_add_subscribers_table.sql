CREATE TABLE IF NOT EXISTS public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text default 'blog',
  created_at timestamptz default now()
);

-- RLS Policies
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert subscribers"
  ON public.subscribers
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can select subscribers"
  ON public.subscribers
  FOR SELECT
  TO service_role
  USING (true);

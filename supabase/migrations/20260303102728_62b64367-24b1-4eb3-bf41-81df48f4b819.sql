
-- Waitlist subscribers table
CREATE TABLE public.waitlist_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.waitlist_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public signup)
CREATE POLICY "Anyone can subscribe to waitlist"
  ON public.waitlist_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Only admins can view
CREATE POLICY "Admins can view waitlist"
  ON public.waitlist_subscribers
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete
CREATE POLICY "Admins can delete waitlist"
  ON public.waitlist_subscribers
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

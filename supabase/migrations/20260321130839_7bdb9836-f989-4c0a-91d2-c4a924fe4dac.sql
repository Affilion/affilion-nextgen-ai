
-- Create linked_emails table for users who have multiple emails (e.g. different Stripe email)
CREATE TABLE public.linked_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  email text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, email)
);

-- Enable RLS
ALTER TABLE public.linked_emails ENABLE ROW LEVEL SECURITY;

-- Users can view their own linked emails
CREATE POLICY "Users can view own linked emails"
ON public.linked_emails FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Admins can manage all linked emails
CREATE POLICY "Admins can manage linked emails"
ON public.linked_emails FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Index for fast lookup by email
CREATE INDEX idx_linked_emails_email ON public.linked_emails(email);
CREATE INDEX idx_linked_emails_user_id ON public.linked_emails(user_id);


CREATE TABLE public.discord_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  discord_user_id text NOT NULL,
  discord_username text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (email)
);

ALTER TABLE public.discord_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage discord_links"
ON public.discord_links
FOR ALL
USING (true)
WITH CHECK (true);

CREATE TRIGGER update_discord_links_updated_at
BEFORE UPDATE ON public.discord_links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

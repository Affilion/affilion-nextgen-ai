
DROP POLICY "Service role can manage discord_links" ON public.discord_links;

-- No public access needed; edge functions use service_role which bypasses RLS
-- Only admins can view via client
CREATE POLICY "Admins can view discord_links"
ON public.discord_links
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

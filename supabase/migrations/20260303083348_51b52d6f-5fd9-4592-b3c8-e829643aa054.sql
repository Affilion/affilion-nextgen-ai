
-- Allow admins to see ALL profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to see ALL purchases
CREATE POLICY "Admins can view all purchases"
ON public.purchases
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Allow service role (webhook) to insert purchases
CREATE POLICY "Service role can insert purchases"
ON public.purchases
FOR INSERT
WITH CHECK (true);

-- Allow service role to update purchases
CREATE POLICY "Service role can update purchases"
ON public.purchases
FOR UPDATE
USING (true);

-- Allow admins to insert profiles (for webhook-created profiles)
CREATE POLICY "Admins can manage profiles"
ON public.profiles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

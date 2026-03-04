
CREATE POLICY "Admins can insert purchases"
ON public.purchases
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

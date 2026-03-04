
-- Product prompts table for native Prompt Player
CREATE TABLE public.product_prompts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'Általános',
  title TEXT NOT NULL,
  cover_image TEXT,
  style_tags TEXT NOT NULL DEFAULT '',
  structure_tags TEXT NOT NULL DEFAULT '',
  analysis_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.product_prompts ENABLE ROW LEVEL SECURITY;

-- Admins can manage
CREATE POLICY "Admins can manage product_prompts"
ON public.product_prompts FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Purchasers can view prompts for products they bought
CREATE POLICY "Purchasers can view their product prompts"
ON public.product_prompts FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.purchases
    WHERE purchases.product_id = product_prompts.product_id
      AND purchases.user_id = auth.uid()
      AND purchases.status = 'completed'
  )
);

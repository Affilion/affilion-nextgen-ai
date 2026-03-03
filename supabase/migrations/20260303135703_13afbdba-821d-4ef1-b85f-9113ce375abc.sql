
-- Create products table for dynamic product management
CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image_url TEXT,
  stripe_price_id TEXT NOT NULL,
  notion_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Anyone can view active products
CREATE POLICY "Anyone can view active products"
ON public.products
FOR SELECT
USING (is_active = true);

-- Admins can manage all products
CREATE POLICY "Admins can manage products"
ON public.products
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed existing hardcoded products
INSERT INTO public.products (id, name, description, price, stripe_price_id, sort_order) VALUES
  ('prompt-pack', '100 AI Prompt Pack', 'Azonnal használható promptok Midjourney-hez, ChatGPT-hez és DALL·E-hoz.', 2990, 'price_1T6Cy7HpS2EmCo1uaELBhhXK', 1),
  ('suno-guide', 'Suno AI Dalszövegírási Titkok', 'Tanulj meg professzionális dalokat generálni mesterséges intelligenciával.', 3990, 'price_1T6CySHpS2EmCo1uSYIjqUWV', 2),
  ('auto-guide', 'AI Automatizációs Útmutató', 'Automatizáld a munkafolyamataidat Make, Zapier és AI eszközökkel.', 4990, 'price_1T6CzZHpS2EmCo1uTsUcthA2', 3);

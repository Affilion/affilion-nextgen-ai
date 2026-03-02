
-- User roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Assign admin role to fekeaudi@gmail.com (if they exist)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE email = 'fekeaudi@gmail.com'
ON CONFLICT DO NOTHING;

-- Portfolio items (CMS)
CREATE TABLE public.portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  prompt text,
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view portfolio" ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage portfolio" ON public.portfolio_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Experiments / YouTube videos (CMS)
CREATE TABLE public.experiments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  video_id text NOT NULL,
  badge text DEFAULT 'AFFILION AI',
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.experiments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view experiments" ON public.experiments FOR SELECT USING (true);
CREATE POLICY "Admins can manage experiments" ON public.experiments FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Prompt lab items (CMS)
CREATE TABLE public.prompt_lab_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  prompt_text text NOT NULL,
  description text,
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.prompt_lab_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view prompt lab" ON public.prompt_lab_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage prompt lab" ON public.prompt_lab_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Product Notion URLs (map product_id to Notion embed URL)
CREATE TABLE public.product_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL UNIQUE,
  notion_url text NOT NULL,
  title text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.product_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Purchasers can view their content" ON public.product_content FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.purchases 
    WHERE purchases.product_id = product_content.product_id 
    AND purchases.user_id = auth.uid() 
    AND purchases.status = 'completed'
  )
);
CREATE POLICY "Admins can manage content" ON public.product_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for CMS uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-assets', 'cms-assets', true) ON CONFLICT DO NOTHING;
CREATE POLICY "Anyone can view cms assets" ON storage.objects FOR SELECT USING (bucket_id = 'cms-assets');
CREATE POLICY "Admins can upload cms assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'cms-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete cms assets" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'cms-assets' AND public.has_role(auth.uid(), 'admin'));

-- Trigger to auto-assign admin when fekeaudi signs up
CREATE OR REPLACE FUNCTION public.auto_assign_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'fekeaudi@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_assign_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.auto_assign_admin();

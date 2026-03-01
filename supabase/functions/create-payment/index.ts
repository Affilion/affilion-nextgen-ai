import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PRODUCTS: Record<string, { price_id: string; name: string }> = {
  "prompt-pack": {
    price_id: "price_1T6FLRHpS2EmCo1uByrbHyBp",
    name: "100 AI Prompt Pack",
  },
  "suno-guide": {
    price_id: "price_1T6FLfHpS2EmCo1uItSjd9SM",
    name: "Suno AI Dalszövegírási Titkok",
  },
  "auto-guide": {
    price_id: "price_1T6FMDHpS2EmCo1uEP6oJSbK",
    name: "AI Automatizációs Útmutató",
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("Nem vagy bejelentkezve.");

    const { productId } = await req.json();
    const product = PRODUCTS[productId];
    if (!product) throw new Error("Érvénytelen termék.");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [{ price: product.price_id, quantity: 1 }],
      mode: "payment",
      metadata: {
        user_id: user.id,
        product_id: productId,
      },
      success_url: `${req.headers.get("origin")}/fizetes-sikeres?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/#termekek`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

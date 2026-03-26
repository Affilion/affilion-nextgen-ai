import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  // Service role client for reading products (bypasses RLS for admin-only fields)
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("Nem vagy bejelentkezve.");

    const { productId } = await req.json();

    // Fetch product from database dynamically
    const { data: product, error: productError } = await supabaseAdmin
      .from("products")
      .select("id, name, stripe_price_id, is_active")
      .eq("id", productId)
      .single();

    if (productError || !product) throw new Error("Érvénytelen termék.");
    if (!product.is_active) throw new Error("Ez a termék jelenleg nem elérhető.");

    // Check if user already purchased this product
    const { data: existingPurchase } = await supabaseAdmin
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .eq("status", "completed")
      .limit(1);
    if (existingPurchase && existingPurchase.length > 0) {
      throw new Error("Ez a termék már meg van vásárolva.");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [{ price: product.stripe_price_id, quantity: 1 }],
      mode: "payment",
      automatic_tax: { enabled: false },
      billing_address_collection: "required",
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

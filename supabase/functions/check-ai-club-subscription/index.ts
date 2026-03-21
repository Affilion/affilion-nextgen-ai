import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user) throw new Error("Not authenticated");

    const primaryEmail = userData.user.email;
    if (!primaryEmail) return new Response(JSON.stringify({ subscribed: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

    // Collect all emails: primary + linked
    const emails = [primaryEmail];
    const { data: linkedEmails } = await supabaseClient
      .from("linked_emails")
      .select("email")
      .eq("user_id", userData.user.id);
    
    if (linkedEmails) {
      for (const le of linkedEmails) {
        if (!emails.includes(le.email)) {
          emails.push(le.email);
        }
      }
    }

    console.log(`[CHECK-AI-CLUB] Checking emails: ${emails.join(", ")}`);

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const productId = "prod_UBSvwtqbSH8L6K";

    // Check each email for active AI Club subscription
    for (const email of emails) {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length === 0) continue;

      const customerId = customers.data[0].id;
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "active",
        limit: 10,
      });

      const hasAiClub = subscriptions.data.some((sub) =>
        sub.items.data.some((item: any) => item.price.product === productId)
      );

      if (hasAiClub) {
        console.log(`[CHECK-AI-CLUB] Found active subscription via email: ${email}`);
        return new Response(JSON.stringify({ subscribed: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    console.log(`[CHECK-AI-CLUB] No active subscription found for any email`);
    return new Response(JSON.stringify({ subscribed: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[CHECK-AI-CLUB] Error:", error);
    return new Response(JSON.stringify({ subscribed: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

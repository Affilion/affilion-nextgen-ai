import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const toIsoString = (timestamp?: number | null) => {
  if (!timestamp || Number.isNaN(timestamp)) return null;
  const date = new Date(timestamp * 1000);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
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

    const { data: roleData } = await supabaseClient
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) throw new Error("Not authorized");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const productId = "prod_UBSvwtqbSH8L6K";
    const subscribers: any[] = [];

    // Fetch active subscriptions (includes cancel_at_period_end)
    for (const status of ["active", "canceled"] as const) {
      let hasMore = true;
      let startingAfter: string | undefined;

      while (hasMore) {
        const params: any = {
          status,
          limit: 100,
          expand: ["data.customer"],
        };
        if (startingAfter) params.starting_after = startingAfter;

        const subs = await stripe.subscriptions.list(params);

        for (const sub of subs.data) {
          const matchingItem = sub.items.data.find(
            (item: any) => item.price.product === productId
          );

          if (matchingItem) {
            const customer = sub.customer as any;

            // Determine display status
            let displayStatus: "active" | "canceled_pending" | "inactive";
            if (sub.status === "active" && !sub.cancel_at_period_end) {
              displayStatus = "active";
            } else if (sub.status === "active" && sub.cancel_at_period_end) {
              displayStatus = "canceled_pending";
            } else {
              displayStatus = "inactive";
            }

            subscribers.push({
              id: sub.id,
              name: customer?.name || "-",
              email: customer?.email || "-",
              created: toIsoString(sub.created),
              current_period_end: toIsoString(matchingItem.current_period_end),
              status: sub.status,
              cancel_at_period_end: sub.cancel_at_period_end ?? false,
              display_status: displayStatus,
            });
          }
        }

        hasMore = subs.has_more;
        if (subs.data.length > 0) {
          startingAfter = subs.data[subs.data.length - 1].id;
        }
      }
    }

    console.log(`[LIST-AI-CLUB] Found ${subscribers.length} subscribers (active+canceled)`);

    return new Response(JSON.stringify({ subscribers }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[LIST-AI-CLUB] Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

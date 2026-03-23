import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
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
      apiVersion: "2023-10-16",
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
            const price = matchingItem.price;

            console.log(`[LIST-AI-CLUB] Sub ${sub.id}: status=${sub.status}, cancel_at_period_end=${sub.cancel_at_period_end}`);

            let displayStatus: "active" | "canceled_pending" | "inactive";
            if (sub.status === "active" && !sub.cancel_at_period_end) {
              displayStatus = "active";
            } else if (sub.status === "active" && sub.cancel_at_period_end) {
              displayStatus = "canceled_pending";
            } else {
              displayStatus = "inactive";
            }

            // Extract coupon/discount info from subscription level
            const discount = sub.discount;
            let couponName: string | null = null;
            let couponPercent: number | null = null;
            let couponAmountOff: number | null = null;

            if (discount?.coupon) {
              couponName = discount.coupon.name || discount.coupon.id;
              couponPercent = discount.coupon.percent_off ?? null;
              couponAmountOff = discount.coupon.amount_off ? discount.coupon.amount_off / 100 : null;
            }

            const monthlyAmount = price.unit_amount ? price.unit_amount / 100 : null;
            const currency = price.currency || "huf";

            // Fetch latest invoice separately to avoid permission issues with expand
            let paidAmount: number | null = null;
            try {
              const invoices = await stripe.invoices.list({
                subscription: sub.id,
                limit: 1,
                status: "paid",
              });
              if (invoices.data.length > 0) {
                const latestInvoice = invoices.data[0];
                paidAmount = latestInvoice.amount_paid != null ? latestInvoice.amount_paid / 100 : null;

                // Check invoice-level discount if no subscription-level discount
                if (!couponName && latestInvoice.discount?.coupon) {
                  const ic = latestInvoice.discount.coupon;
                  couponName = ic.name || ic.id;
                  couponPercent = ic.percent_off ?? null;
                  couponAmountOff = ic.amount_off ? ic.amount_off / 100 : null;
                }

                // Check total_discount_amounts on the invoice
                if (!couponName && (latestInvoice as any).total_discount_amounts?.length > 0) {
                  const totalDiscount = (latestInvoice as any).total_discount_amounts[0];
                  if (totalDiscount.amount > 0) {
                    couponName = "Kedvezmény";
                    couponAmountOff = totalDiscount.amount / 100;
                  }
                }
              }
            } catch (invoiceErr) {
              console.warn(`[LIST-AI-CLUB] Could not fetch invoice for ${sub.id}:`, invoiceErr);
            }

            subscribers.push({
              id: sub.id,
              name: customer?.name || "-",
              email: customer?.email || "-",
              created: toIsoString(sub.created),
              current_period_end: toIsoString((matchingItem as any).current_period_end),
              status: sub.status,
              cancel_at_period_end: sub.cancel_at_period_end ?? false,
              display_status: displayStatus,
              monthly_amount: monthlyAmount,
              paid_amount: paidAmount,
              currency,
              coupon_name: couponName,
              coupon_percent: couponPercent,
              coupon_amount_off: couponAmountOff,
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

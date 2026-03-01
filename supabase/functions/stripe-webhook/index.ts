import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PRODUCT_NAMES: Record<string, string> = {
  "prompt-pack": "100 AI Prompt Pack",
  "suno-guide": "Suno AI Dalszövegírási Titkok",
  "auto-guide": "AI Automatizációs Útmutató",
};

const PRODUCT_PRICES: Record<string, number> = {
  "prompt-pack": 2990,
  "suno-guide": 3990,
  "auto-guide": 4990,
};

async function createSzamlazzInvoice(
  agentKey: string,
  customerEmail: string,
  customerName: string,
  productId: string,
  amount: number
): Promise<string | null> {
  const productName = PRODUCT_NAMES[productId] || productId;
  const unitPrice = PRODUCT_PRICES[productId] || amount;

  const xmlBody = `<?xml version="1.0" encoding="UTF-8"?>
<xmlszamla xmlns="http://www.szamlazz.hu/xmlszamla" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.szamlazz.hu/xmlszamla https://www.szamlazz.hu/szamla/docs/xsds/agent/xmlszamla.xsd">
  <bepiegyformationnfo>
    <felpiegyformationnfo>0</felpiegyformationnfo>
    <szamlaszam></szamlaszam>
  </bepiegyformationnfo>
  <fejlec>
    <keltDatum>${new Date().toISOString().split("T")[0]}</keltDatum>
    <teljesitesDatum>${new Date().toISOString().split("T")[0]}</teljesitesDatum>
    <fizetesiHataridoDatum>${new Date().toISOString().split("T")[0]}</fizetesiHataridoDatum>
    <fizmod>Bankkártya (Stripe)</fizmod>
    <ppiegyformationnz>HUF</ppiegyformationnz>
    <szpiegyformationnyelv>hu</szpiegyformationnyelv>
    <megjegyzes>Stripe online fizetés</megjegyzes>
    <rendpiegyformationnSzam></rendpiegyformationnSzam>
    <epiegyformationnSzamla>true</epiegyformationnSzamla>
    <szpiegyformationnTipus>SZ</szpiegyformationnTipus>
  </fejlec>
  <elado>
  </elado>
  <vevo>
    <nev>${escapeXml(customerName || customerEmail)}</nev>
    <email>${escapeXml(customerEmail)}</email>
    <sendEmail>true</sendEmail>
  </vevo>
  <tetelek>
    <tetel>
      <megnevezes>${escapeXml(productName)}</megnevezes>
      <mennyiseg>1</mennyiseg>
      <mennyisegiEgyseg>db</mennyisegiEgyseg>
      <nettoEgysegar>${unitPrice}</nettoEgysegar>
      <afakulcs>27</afakulcs>
      <nettoErtek>${unitPrice}</nettoErtek>
      <afaErtek>${Math.round(unitPrice * 0.27)}</afaErtek>
      <bruttoErtek>${Math.round(unitPrice * 1.27)}</bruttoErtek>
    </tetel>
  </tetelek>
</xmlszamla>`;

  try {
    const response = await fetch("https://www.szamlazz.hu/szamla/", {
      method: "POST",
      headers: {
        "Content-Type": "application/xml",
      },
      body: `szamlaagentkulcs=${agentKey}&action-xmlagentxmlfile=SZAMLA&${xmlBody}`,
    });

    // Számlázz.hu returns the invoice number in the szlahu_szamlaszam header
    const invoiceNumber = response.headers.get("szlahu_szamlaszam");
    const responseText = await response.text();
    console.log("[SZAMLAZZ] Response:", responseText.substring(0, 500));
    console.log("[SZAMLAZZ] Invoice number:", invoiceNumber);
    return invoiceNumber;
  } catch (err) {
    console.error("[SZAMLAZZ] Error creating invoice:", err);
    return null;
  }
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2025-08-27.basil",
  });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    // If we have a webhook secret, verify the signature
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    let event: Stripe.Event;

    if (webhookSecret && sig) {
      event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret);
    } else {
      // For testing without webhook secret
      event = JSON.parse(body);
    }

    console.log(`[WEBHOOK] Event type: ${event.type}`);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      const productId = session.metadata?.product_id;
      const customerEmail = session.customer_details?.email || session.customer_email || "";
      const customerName = session.customer_details?.name || "";

      console.log(`[WEBHOOK] Payment completed for user ${userId}, product ${productId}`);

      if (userId && productId) {
        // 1. Save purchase to database
        const { error: insertError } = await supabase.from("purchases").insert({
          user_id: userId,
          product_id: productId,
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
          customer_email: customerEmail,
          customer_name: customerName,
          amount: session.amount_total || 0,
          currency: session.currency || "huf",
          status: "completed",
        });

        if (insertError) {
          console.error("[WEBHOOK] Error inserting purchase:", insertError);
        } else {
          console.log("[WEBHOOK] Purchase saved successfully");
        }

        // 2. Create invoice via Számlázz.hu
        const agentKey = Deno.env.get("SZAMLAZZ_AGENT_KEY");
        if (agentKey) {
          const invoiceId = await createSzamlazzInvoice(
            agentKey,
            customerEmail,
            customerName,
            productId,
            (session.amount_total || 0) / 100
          );

          if (invoiceId) {
            await supabase
              .from("purchases")
              .update({ szamlazz_invoice_id: invoiceId })
              .eq("stripe_session_id", session.id);
            console.log(`[WEBHOOK] Invoice created: ${invoiceId}`);
          }
        } else {
          console.warn("[WEBHOOK] SZAMLAZZ_AGENT_KEY not set, skipping invoice");
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("[WEBHOOK] Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

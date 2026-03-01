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

const PRODUCT_PRICES_NETTO: Record<string, number> = {
  "prompt-pack": 2990,
  "suno-guide": 3990,
  "auto-guide": 4990,
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function createSzamlazzInvoice(
  agentKey: string,
  customerEmail: string,
  customerName: string,
  productId: string,
  _amountFromStripe: number
): Promise<string | null> {
  const productName = PRODUCT_NAMES[productId] || productId;
  const nettoPrice = PRODUCT_PRICES_NETTO[productId] || Math.round(_amountFromStripe / 1.27);
  const afaErtek = Math.round(nettoPrice * 0.27);
  const bruttoErtek = nettoPrice + afaErtek;

  const today = new Date().toISOString().split("T")[0];
  const xmlBody = `<?xml version="1.0" encoding="UTF-8"?>
<xmlszamla xmlns="http://www.szamlazz.hu/xmlszamla" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.szamlazz.hu/xmlszamla https://www.szamlazz.hu/szamla/docs/xsds/agent/xmlszamla.xsd">
  <beallitasok>
    <szamlaagentkulcs>${agentKey}</szamlaagentkulcs>
    <eszamla>true</eszamla>
    <szamlaLetoltes>false</szamlaLetoltes>
  </beallitasok>
  <fejlec>
    <keltDatum>${today}</keltDatum>
    <teljesitesDatum>${today}</teljesitesDatum>
    <fizetesiHataridoDatum>${today}</fizetesiHataridoDatum>
    <fizmod>Bankkártya (Stripe)</fizmod>
    <penznem>HUF</penznem>
    <szamlaNyelv>hu</szamlaNyelv>
    <megjegyzes>Stripe online fizetés</megjegyzes>
    <rendelesSzam></rendelesSzam>
    <dijbekeroSzamlaszam></dijbekeroSzamlaszam>
    <elolegszamla>false</elolegszamla>
    <vegszamla>false</vegszamla>
    <helyesbitoszamla>false</helyesbitoszamla>
    <helyesbitettSzamlaszam></helyesbitettSzamlaszam>
    <dijbekero>false</dijbekero>
    <szamlaszamElotag></szamlaszamElotag>
  </fejlec>
  <elado/>
  <vevo>
    <nev>${escapeXml(customerName || customerEmail)}</nev>
    <irsz></irsz>
    <telepules>N/A</telepules>
    <cim>Online vásárlás</cim>
    <email>${escapeXml(customerEmail)}</email>
    <sendEmail>true</sendEmail>
    <adoszam></adoszam>
    <postazasiNev></postazasiNev>
    <postazasiIrsz></postazasiIrsz>
    <postazasiTelepules></postazasiTelepules>
    <postazasiCim></postazasiCim>
    <azonosito></azonosito>
    <telefonszam></telefonszam>
    <megjegyzes></megjegyzes>
  </vevo>
  <fuvarlevel>
    <uticel></uticel>
    <futarSzolgalat></futarSzolgalat>
  </fuvarlevel>
  <tetelek>
    <tetel>
      <megnevezes>${escapeXml(productName)}</megnevezes>
      <mennyiseg>1</mennyiseg>
      <mennyisegiEgyseg>db</mennyisegiEgyseg>
      <nettoEgysegar>${nettoPrice}</nettoEgysegar>
      <afakulcs>27</afakulcs>
      <nettoErtek>${nettoPrice}</nettoErtek>
      <afaErtek>${afaErtek}</afaErtek>
      <bruttoErtek>${bruttoErtek}</bruttoErtek>
      <megjegyzes></megjegyzes>
    </tetel>
  </tetelek>
</xmlszamla>`;

  try {
    const formData = new FormData();
    const xmlBlob = new Blob([xmlBody], { type: "application/xml" });
    formData.append("action-xmlagentxmlfile", xmlBlob, "xmlszamla.xml");

    const response = await fetch("https://www.szamlazz.hu/szamla/", {
      method: "POST",
      body: formData,
    });

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

async function markInvoiceAsPaid(
  agentKey: string,
  invoiceNumber: string,
  amount: number
): Promise<boolean> {
  const today = new Date().toISOString().split("T")[0];
  const xmlBody = `<?xml version="1.0" encoding="UTF-8"?>
<xmlszamlakifiz xmlns="http://www.szamlazz.hu/xmlszamlakifiz" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.szamlazz.hu/xmlszamlakifiz https://www.szamlazz.hu/szamla/docs/xsds/agentkifiz/xmlszamlakifiz.xsd">
  <beallitasok>
    <szamlaagentkulcs>${agentKey}</szamlaagentkulcs>
    <szamlaszam>${escapeXml(invoiceNumber)}</szamlaszam>
    <adoszam></adoszam>
    <additiv>false</additiv>
  </beallitasok>
  <kifizetes>
    <datum>${today}</datum>
    <jogcim>Bankkártya (Stripe)</jogcim>
    <osszeg>${amount}</osszeg>
    <leiras>Stripe online fizetés</leiras>
  </kifizetes>
</xmlszamlakifiz>`;

  try {
    const formData = new FormData();
    const xmlBlob = new Blob([xmlBody], { type: "application/xml" });
    formData.append("action-szamla_agent_kifiz", xmlBlob, "xmlszamlakifiz.xml");

    const response = await fetch("https://www.szamlazz.hu/szamla/", {
      method: "POST",
      body: formData,
    });

    const responseText = await response.text();
    console.log("[SZAMLAZZ] Credit entry response:", responseText.substring(0, 500));
    return response.ok;
  } catch (err) {
    console.error("[SZAMLAZZ] Error marking invoice as paid:", err);
    return false;
  }
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

    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    let event: Stripe.Event;

    if (webhookSecret && sig) {
      event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret);
    } else {
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

            // 3. Mark invoice as paid (Stripe already charged the customer)
            const nettoPrice = PRODUCT_PRICES_NETTO[productId] || Math.round((session.amount_total || 0) / 100 / 1.27);
            const bruttoAmount = nettoPrice + Math.round(nettoPrice * 0.27);
            const paidOk = await markInvoiceAsPaid(agentKey, invoiceId, bruttoAmount);
            if (paidOk) {
              console.log(`[WEBHOOK] Invoice ${invoiceId} marked as paid`);
            }
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

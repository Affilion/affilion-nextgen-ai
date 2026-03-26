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
  "webgyar-tutorial": "Weboldal 0-ról AI-val",
};

const PRODUCT_PRICES: Record<string, number> = {
  "prompt-pack": 2990,
  "suno-guide": 3990,
  "auto-guide": 4990,
  "webgyar-tutorial": 17990,
};

// HUF is a zero-decimal currency in Stripe (amount_total is already in HUF, not in fillér)
const ZERO_DECIMAL_CURRENCIES = ["huf", "jpy", "krw", "bif", "clp", "djf", "gnf", "kmf", "mga", "pyg", "rwf", "ugx", "vnd", "vuv", "xaf", "xof", "xpf"];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

interface BillingAddress {
  city?: string;
  country?: string;
  line1?: string;
  line2?: string;
  postal_code?: string;
  state?: string;
}

async function createSzamlazzInvoice(
  agentKey: string,
  customerEmail: string,
  customerName: string,
  productId: string,
  amountPaid: number,
  billingAddress?: BillingAddress
): Promise<string | null> {
  const productName = PRODUCT_NAMES[productId] || productId;
  // USE THE ACTUAL AMOUNT PAID (after coupon), not the hardcoded price
  const price = amountPaid;

  const city = billingAddress?.city || "N/A";
  const postalCode = billingAddress?.postal_code || "";
  const addressLine = billingAddress?.line1 || "Online vásárlás";
  const addressLine2 = billingAddress?.line2 ? ` ${billingAddress.line2}` : "";
  const fullAddress = `${addressLine}${addressLine2}`;

  const today = new Date().toISOString().split("T")[0];
  // AAM = Alanyi adómentes (KATA egyéni vállalkozó, ÁFA-mentes)
  // Include <kifizetesek> so invoice is created as PAID (no separate payment deadline)
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
    <fizpipipipipipipipipipipipi>true</fizpipipipipipipipipipipipi>
  </fejlec>
  <elado/>
  <vevo>
    <nev>${escapeXml(customerName || customerEmail)}</nev>
    <irsz>${escapeXml(postalCode)}</irsz>
    <telepules>${escapeXml(city)}</telepules>
    <cim>${escapeXml(fullAddress)}</cim>
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
      <nettoEgysegar>${price}</nettoEgysegar>
      <afakulcs>AAM</afakulcs>
      <nettoErtek>${price}</nettoErtek>
      <afaErtek>0</afaErtek>
      <bruttoErtek>${price}</bruttoErtek>
      <megjegyzes></megjegyzes>
    </tetel>
  </tetelek>
  <kifizetesek>
    <kifizetes>
      <datum>${today}</datum>
      <jogcim>Bankkártya (Stripe)</jogcim>
      <osszeg>${price}</osszeg>
      <leiras>Stripe online fizetés</leiras>
    </kifizetes>
  </kifizetesek>
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
      const billingAddress = session.customer_details?.address as BillingAddress | undefined;

      console.log(`[WEBHOOK] Payment completed for user ${userId}, product ${productId}`);
      console.log(`[WEBHOOK] Billing address:`, JSON.stringify(billingAddress));

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

        // 2. Create invoice via Számlázz.hu (AAM - alanyi adómentes)
        const agentKey = Deno.env.get("SZAMLAZZ_AGENT_KEY");
        if (agentKey) {
          const currency = (session.currency || "huf").toLowerCase();
          const isZeroDecimal = ZERO_DECIMAL_CURRENCIES.includes(currency);
          const stripeAmount = session.amount_total || 0;
          const amountInCurrency = isZeroDecimal ? stripeAmount : stripeAmount / 100;

          const invoiceId = await createSzamlazzInvoice(
            agentKey,
            customerEmail,
            customerName,
            productId,
            amountInCurrency,
            billingAddress
          );

          if (invoiceId) {
            await supabase
              .from("purchases")
              .update({ szamlazz_invoice_id: invoiceId })
              .eq("stripe_session_id", session.id);
            console.log(`[WEBHOOK] Invoice created: ${invoiceId}`);

            // 3. Mark invoice as paid (Stripe already charged)
            const price = PRODUCT_PRICES[productId] || amountInCurrency;
            const paidOk = await markInvoiceAsPaid(agentKey, invoiceId, price);
            if (paidOk) {
              console.log(`[WEBHOOK] Invoice ${invoiceId} marked as paid`);
            }
          }
        } else {
          console.warn("[WEBHOOK] SZAMLAZZ_AGENT_KEY not set, skipping invoice");
        }
      }
    }

    // Handle subscription cancellation — remove Discord role
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;
      
      // Check if this is an AI Club subscription
      const aiClubProductId = "prod_UBSvwtqbSH8L6K";
      const isAiClub = subscription.items.data.some(
        (item: any) => item.price.product === aiClubProductId
      );

      if (isAiClub && customerId) {
        console.log(`[WEBHOOK] AI Club subscription canceled for customer: ${customerId}`);

        // Get customer email from Stripe
        const customer = await stripe.customers.retrieve(customerId);
        const customerEmail = (customer as any).email;

        if (customerEmail) {
          console.log(`[WEBHOOK] Looking up Discord user for email: ${customerEmail}`);

          // Look up discord_user_id from discord_links table
          const { data: link } = await supabase
            .from("discord_links")
            .select("discord_user_id")
            .eq("email", customerEmail)
            .maybeSingle();

          if (link?.discord_user_id) {
            console.log(`[WEBHOOK] Removing Discord role for user: ${link.discord_user_id}`);

            // Remove role directly via Discord API
            const botToken = Deno.env.get("DISCORD_BOT_TOKEN") || "";
            const guildId = "1484597652749553734";
            const roleId = "1484598151812878516";
            const removeRoleRes = await fetch(
              `https://discord.com/api/v10/guilds/${guildId}/members/${link.discord_user_id}/roles/${roleId}`,
              {
                method: "DELETE",
                headers: { Authorization: `Bot ${botToken}` },
              }
            );
            console.log(`[WEBHOOK] Discord role removal status: ${removeRoleRes.status}`);
            await removeRoleRes.text();

            // Also notify Make.com webhook
            const makeRes = await fetch(
              "https://hook.eu2.make.com/a23r47wbiz23jj2k8u6eej3levlzwxae",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ discord_user_id: link.discord_user_id }),
              }
            );
            await makeRes.text();
            console.log(`[WEBHOOK] Make.com role removal webhook sent`);
          } else {
            console.warn(`[WEBHOOK] No Discord link found for email: ${customerEmail}`);
          }
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

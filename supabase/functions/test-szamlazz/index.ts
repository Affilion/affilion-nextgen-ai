import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

  const agentKey = Deno.env.get("SZAMLAZZ_AGENT_KEY");
  if (!agentKey) {
    return new Response(JSON.stringify({ error: "SZAMLAZZ_AGENT_KEY not set" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }

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
    <megjegyzes>Teszt számla</megjegyzes>
    <rendelesSzam></rendelesSzam>
    <szamlaTipus>SZ</szamlaTipus>
  </fejlec>
  <elado/>
  <vevo>
    <nev>${escapeXml("kriptoszkop@gmail.com")}</nev>
    <irsz></irsz>
    <telepules>N/A</telepules>
    <cim>Online vásárlás</cim>
    <email>${escapeXml("kriptoszkop@gmail.com")}</email>
    <sendEmail>true</sendEmail>
  </vevo>
  <tetelek>
    <tetel>
      <megnevezes>100 AI Prompt Pack</megnevezes>
      <mennyiseg>1</mennyiseg>
      <mennyisegiEgyseg>db</mennyisegiEgyseg>
      <nettoEgysegar>2990</nettoEgysegar>
      <afakulcs>27</afakulcs>
      <nettoErtek>2990</nettoErtek>
      <afaErtek>808</afaErtek>
      <bruttoErtek>3798</bruttoErtek>
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

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    const responseText = await response.text();

    return new Response(JSON.stringify({
      status: response.status,
      headers: responseHeaders,
      body: responseText.substring(0, 2000),
      invoiceNumber: response.headers.get("szlahu_szamlaszam"),
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

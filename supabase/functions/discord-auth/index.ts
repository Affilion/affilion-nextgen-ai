import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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
    const body = await req.json();
    const { action } = body;

    // Handle role removal
    if (action === "remove_role") {
      const { discord_user_id } = body;
      if (!discord_user_id) {
        return new Response(JSON.stringify({ error: "Missing discord_user_id" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const removeRes = await fetch(
        "https://hook.eu2.make.com/a23r47wbiz23jj2k8u6eej3levlzwxae",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ discord_user_id }),
        }
      );
      await removeRes.text();

      console.log(`[DISCORD-AUTH] Role removal webhook sent for user: ${discord_user_id}`);
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Default: handle Discord OAuth code exchange
    const { code, session_id } = body;
    if (!code) {
      return new Response(JSON.stringify({ error: "Missing code" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Exchange code for access token
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: "1484599498113290240",
        client_secret: Deno.env.get("DISCORD_CLIENT_SECRET") || "",
        grant_type: "authorization_code",
        code,
        redirect_uri: "https://affilionai.hu/ai-club/discord-callback",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error("[DISCORD-AUTH] Token exchange failed:", tokenData);
      return new Response(
        JSON.stringify({ error: "Discord token exchange failed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Get Discord user ID
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userData = await userRes.json();

    if (!userData.id) {
      console.error("[DISCORD-AUTH] User fetch failed:", userData);
      return new Response(
        JSON.stringify({ error: "Failed to get Discord user" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[DISCORD-AUTH] User: ${userData.id} (${userData.username})`);

    // 3. Add user to the Affilion AI Club Discord server
    const botToken = Deno.env.get("DISCORD_BOT_TOKEN") || "";
    const guildId = "1484597652749553734";
    const addMemberRes = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}/members/${userData.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: tokenData.access_token }),
      }
    );
    const addMemberStatus = addMemberRes.status;
    await addMemberRes.text();
    console.log(`[DISCORD-AUTH] Add member to guild status: ${addMemberStatus}`);

    // 4. Send to Make.com webhook
    const webhookRes = await fetch(
      "https://hook.eu2.make.com/s31a5qmrwfj3gzxkehm5whfbhararfkc",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discord_user_id: userData.id,
          session_id: session_id || "",
        }),
      }
    );
    await webhookRes.text();

    console.log("[DISCORD-AUTH] Webhook sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[DISCORD-AUTH] Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") || "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
);

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

    // Handle refund: lookup discord_user_id by email, then remove role
    if (action === "refund") {
      const { customer_email } = body;
      if (!customer_email) {
        return new Response(JSON.stringify({ error: "Missing customer_email" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Look up discord_user_id from discord_links table
      const { data: link, error: linkError } = await supabaseAdmin
        .from("discord_links")
        .select("discord_user_id")
        .eq("email", customer_email)
        .maybeSingle();

      if (linkError || !link) {
        console.error(`[DISCORD-AUTH] No discord link found for email: ${customer_email}`, linkError);
        return new Response(
          JSON.stringify({ error: "No Discord user found for this email" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log(`[DISCORD-AUTH] Refund: removing role for Discord user ${link.discord_user_id} (email: ${customer_email})`);

      // Send role removal webhook
      const removeRes = await fetch(
        "https://hook.eu2.make.com/a23r47wbiz23jj2k8u6eej3levlzwxae",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ discord_user_id: link.discord_user_id }),
        }
      );
      await removeRes.text();

      // Also remove role directly via Discord API
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
      console.log(`[DISCORD-AUTH] Refund: Discord role removal status: ${removeRoleRes.status}`);
      await removeRoleRes.text();

      return new Response(JSON.stringify({ success: true, discord_user_id: link.discord_user_id }), {
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

    // 2. Get Discord user info
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

    console.log(`[DISCORD-AUTH] User: ${userData.id} (${userData.username}, email: ${userData.email || "N/A"})`);

    // 2b. Save discord_user_id <-> email mapping
    // Try to get email from Discord or from Stripe session
    const discordEmail = userData.email;
    if (discordEmail) {
      const { error: upsertError } = await supabaseAdmin
        .from("discord_links")
        .upsert(
          {
            email: discordEmail,
            discord_user_id: userData.id,
            discord_username: userData.username || null,
          },
          { onConflict: "email" }
        );
      if (upsertError) {
        console.error("[DISCORD-AUTH] Failed to save discord link:", upsertError);
      } else {
        console.log(`[DISCORD-AUTH] Saved discord link: ${discordEmail} -> ${userData.id}`);
      }
    }

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

    // 3b. Assign the AI Club role directly via Discord API
    const roleId = "1484598151812878516";
    const addRoleRes = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}/members/${userData.id}/roles/${roleId}`,
      {
        method: "PUT",
        headers: { Authorization: `Bot ${botToken}` },
      }
    );
    const addRoleStatus = addRoleRes.status;
    await addRoleRes.text();
    console.log(`[DISCORD-AUTH] Add role ${roleId} to user ${userData.id} status: ${addRoleStatus}`);

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

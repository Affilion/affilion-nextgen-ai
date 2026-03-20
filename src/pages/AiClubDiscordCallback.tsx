import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AiClubDiscordCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!code) {
      setStatus("error");
      setMessage("Hiányzó Discord authorization code.");
      return;
    }

    const sessionId = localStorage.getItem("stripe_session_id") || "";

    const sendCode = async () => {
      try {
        const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
        const res = await fetch(
          `https://${projectId}.supabase.co/functions/v1/discord-auth`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, session_id: sessionId }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage("Sikeresen megkaptad az AI Club rangot! 🎉");
        } else {
          setStatus("error");
          setMessage(data.error || "Hiba történt a Discord hitelesítés során.");
        }
      } catch {
        setStatus("error");
        setMessage("Hálózati hiba. Kérlek próbáld újra később.");
      }
    };

    sendCode();
  }, [code]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
        <div className="glass-card rounded-2xl p-10 max-w-md w-full text-center space-y-6">
          {status === "loading" && (
            <>
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-muted-foreground">Discord hitelesítés folyamatban...</p>
            </>
          )}
          {status === "success" && (
            <>
              <h1 className="text-3xl font-bold glow-text">{message}</h1>
              <p className="text-muted-foreground">Mostantól hozzáférsz az AI Club exkluzív tartalmaihoz.</p>
            </>
          )}
          {status === "error" && (
            <>
              <h1 className="text-2xl font-bold text-destructive">Hiba történt</h1>
              <p className="text-muted-foreground">{message}</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiClubDiscordCallback;

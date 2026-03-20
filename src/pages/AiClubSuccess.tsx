import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AiClubSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      localStorage.setItem("stripe_session_id", sessionId);
    }
  }, [sessionId]);

  const discordOAuthUrl =
    "https://discord.com/oauth2/authorize?client_id=1484599498113290240&response_type=code&redirect_uri=https%3A%2F%2Faffilionai.hu%2Fai-club%2Fdiscord-callback&scope=identify+guilds.join";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
        <div className="glass-card rounded-2xl p-10 max-w-md w-full text-center space-y-6">
          <h1 className="text-3xl font-bold glow-text">Sikeres fizetés! 🎉</h1>
          <p className="text-muted-foreground leading-relaxed">
            Kattints a gombra, hogy automatikusan megkapd az{" "}
            <span className="text-primary font-semibold">AI Club tag</span> rangot
            a Discord szerveren!
          </p>
          <a
            href={discordOAuthUrl}
            className="inline-block hero-glass-button px-6 py-3 text-sm font-semibold"
          >
            Csatlakozz a Discord szerverhez
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiClubSuccess;

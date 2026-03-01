import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Sikeres bejelentkezés!" });
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) throw error;
        toast({
          title: "Sikeres regisztráció!",
          description: "Kérjük, erősítsd meg az e-mail címedet.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Hiba",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md hyper-glass p-8 rounded-2xl"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Bejelentkezés" : "Regisztráció"}
        </h1>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <Input
              placeholder="Teljes név"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required={!isLogin}
              className="bg-muted/50 border-border"
            />
          )}
          <Input
            type="email"
            placeholder="E-mail cím"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-muted/50 border-border"
          />
          <Input
            type="password"
            placeholder="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="bg-muted/50 border-border"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full neon-button border-0"
          >
            {loading ? "Kérlek várj..." : isLogin ? "Bejelentkezés" : "Regisztráció"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          {isLogin ? "Még nincs fiókod?" : "Már van fiókod?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin ? "Regisztrálj!" : "Jelentkezz be!"}
          </button>
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Vissza a főoldalra
        </button>
      </motion.div>
    </div>
  );
};

export default Auth;

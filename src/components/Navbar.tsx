import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User, BookOpen, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import defaultLogo from "@/assets/logo.jpg";

const links = [
  { label: "Munkáim", href: "#munkak" },
  { label: "Videók", href: "#youtube" },
  { label: "Prompt Labor", href: "#prompt-labor" },
  { label: "Termékek", href: "#termekek" },
  { label: "Kurzus", href: "#kurzus" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-0 border-b border-glass-border/20">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-2">
          <img src={defaultLogo} alt="Affilion AI" className="h-8 w-auto rounded-full" />
          <span className="text-xl font-bold glow-text">Affilion AI</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
              >
                <BookOpen size={14} /> Tartalmaim
              </button>
              {isAdmin && (
                <button
                  onClick={() => navigate("/admin")}
                  className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                >
                  <Shield size={14} /> Admin
                </button>
              )}
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <User size={14} />
                {user.email?.split("@")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
              >
                <LogOut size={14} /> Kilépés
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="hero-glass-button text-xs py-2 px-4 flex items-center gap-1"
            >
              <LogIn size={14} /> Belépés
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-card border-0 border-t border-glass-border/20 px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          {user ? (
            <>
              <button
                onClick={() => { navigate("/dashboard"); setOpen(false); }}
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
              >
                <BookOpen size={14} /> Saját Tartalmaim
              </button>
              {isAdmin && (
                <button
                  onClick={() => { navigate("/admin"); setOpen(false); }}
                  className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                >
                  <Shield size={14} /> Admin Panel
                </button>
              )}
              <button
                onClick={handleLogout}
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
              >
                <LogOut size={14} /> Kilépés
              </button>
            </>
          ) : (
            <button
              onClick={() => { navigate("/auth"); setOpen(false); }}
              className="text-sm text-primary flex items-center gap-1"
            >
              <LogIn size={14} /> Belépés
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

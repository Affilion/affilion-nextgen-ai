import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User, BookOpen, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import defaultLogo from "@/assets/logo.jpg";

const links = [
  { label: "Munkáim", sectionId: "munkak" },
  { label: "Videók", sectionId: "youtube" },
  { label: "Kreatív Stúdió", sectionId: "prompt-labor" },
  { label: "Termékek", sectionId: "termekek" },
  { label: "Kurzus", sectionId: "kurzus" },
];

const resetBodyLock = () => {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
  };

  const navigateToHome = () => {
    resetBodyLock();
    if (location.pathname === "/") {
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/");
    setOpen(false);
  };

  const navigateToSection = (sectionId: string) => {
    resetBodyLock();

    if (location.pathname === "/") {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `/#${sectionId}`);
      }
    } else {
      navigate(`/#${sectionId}`);
    }

    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-0 border-b border-glass-border/20">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <button onClick={navigateToHome} className="flex items-center gap-2" aria-label="Főoldal">
          <img src={defaultLogo} alt="Affilion AI" className="h-8 w-8 object-cover" style={{ clipPath: "circle(50%)" }} />
          <span className="text-xl font-bold glow-text">Affilion AI</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.slice(0, 3).map((l) => (
            <button
              key={l.sectionId}
              onClick={() => navigateToSection(l.sectionId)}
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => {/* TODO: funkció később */}}
            className="relative text-base font-bold tracking-wide text-foreground px-4 py-1.5 rounded-lg border border-transparent bg-transparent overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 neon-club-btn"
          >
            AI CLUB
          </button>
          {links.slice(3).map((l) => (
            <button
              key={l.sectionId}
              onClick={() => navigateToSection(l.sectionId)}
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {l.label}
            </button>
          ))}
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  resetBodyLock();
                  navigate("/dashboard");
                }}
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
              >
                <BookOpen size={14} /> Tartalmaim
              </button>
              {isAdmin && (
                <button
                  onClick={() => {
                    resetBodyLock();
                    navigate("/admin");
                  }}
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
              onClick={() => {
                resetBodyLock();
                navigate("/auth");
              }}
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
          <button
            onClick={() => {/* TODO */}}
            className="relative text-base font-bold tracking-wide text-foreground px-4 py-1.5 rounded-lg overflow-hidden neon-club-btn text-left w-fit"
          >
            AI CLUB
          </button>
          {links.map((l) => (
            <button
              key={l.sectionId}
              onClick={() => navigateToSection(l.sectionId)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
            >
              {l.label}
            </button>
          ))}
          {user ? (
            <>
              <button
                onClick={() => {
                  resetBodyLock();
                  navigate("/dashboard");
                  setOpen(false);
                }}
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
              >
                <BookOpen size={14} /> Saját Tartalmaim
              </button>
              {isAdmin && (
                <button
                  onClick={() => {
                    resetBodyLock();
                    navigate("/admin");
                    setOpen(false);
                  }}
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
              onClick={() => {
                resetBodyLock();
                navigate("/auth");
                setOpen(false);
              }}
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

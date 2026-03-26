import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User, BookOpen, Shield, MessageCircle, Send, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import defaultLogo from "@/assets/logo.jpg";

const links = [
  { label: "Kurzus", sectionId: "kurzus" },
  { label: "Munkáim", sectionId: "munkak" },
  { label: "Videók", sectionId: "youtube" },
  { label: "Kreatív Stúdió", sectionId: "prompt-labor" },
  { label: "Termékek", sectionId: "termekek" },
  { label: "AI Csoport", sectionId: "__link__/csatlakozas" },
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
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSending, setContactSending] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      toast({ title: "Kérlek töltsd ki az összes mezőt!", variant: "destructive" });
      return;
    }
    setContactSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: contactForm.name.trim(),
      email: contactForm.email.trim(),
      message: contactForm.message.trim(),
    });
    if (error) {
      toast({ title: "Hiba történt az üzenet küldésekor", variant: "destructive" });
      setContactSending(false);
      return;
    }
    setContactSent(true);
    setContactSending(false);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => {
      setContactSent(false);
      setContactOpen(false);
    }, 3000);
  };
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAiClubClick = () => {
    resetBodyLock();
    navigate("/csatlakozas");
    setOpen(false);
  };

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

    // Handle direct link navigation (e.g. __link__/csatlakozas)
    if (sectionId.startsWith("__link__")) {
      const path = sectionId.replace("__link__", "");
      navigate(path);
      setOpen(false);
      return;
    }

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
        <div className="flex items-center gap-4">
          <button onClick={navigateToHome} className="flex items-center gap-2" aria-label="Főoldal">
            <img src={defaultLogo} alt="Affilion AI" className="h-8 w-8 object-cover" style={{ clipPath: "circle(50%)" }} />
            <span className="text-xl font-bold glow-text">Affilion AI</span>
          </button>
          <button
            onClick={handleAiClubClick}
            className="hidden md:inline-flex relative text-base font-bold tracking-wide text-foreground px-4 py-1.5 rounded-lg border border-transparent bg-transparent overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 neon-club-btn no-underline"
          >
            AI CLUB
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
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
                  navigate("/tartalmaim");
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
            onClick={handleAiClubClick}
            className="relative text-base font-bold tracking-wide text-foreground px-4 py-1.5 rounded-lg overflow-hidden neon-club-btn text-left w-fit no-underline"
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
                  navigate("/tartalmaim");
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

          {/* Contact section */}
          <div className="border-t border-border/20 pt-3 mt-1">
            <button
              onClick={() => setContactOpen((o) => !o)}
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
            >
              <MessageCircle size={14} /> Üzenj nekünk
            </button>
            {contactOpen && (
              <div className="mt-3">
                {contactSent ? (
                  <div className="flex items-center gap-2 text-sm text-green-400 py-2">
                    <CheckCircle size={16} /> Üzenet elküldve!
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Neved"
                      value={contactForm.name}
                      onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))}
                      maxLength={100}
                      className="w-full rounded-lg border border-border/30 bg-background/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/50"
                    />
                    <input
                      type="email"
                      placeholder="Email címed"
                      value={contactForm.email}
                      onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                      maxLength={255}
                      className="w-full rounded-lg border border-border/30 bg-background/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/50"
                    />
                    <textarea
                      placeholder="Üzeneted..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
                      maxLength={1000}
                      rows={3}
                      className="w-full rounded-lg border border-border/30 bg-background/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                    />
                    <button
                      type="submit"
                      disabled={contactSending}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-2 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-all"
                    >
                      {contactSending ? (
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <><Send size={14} /> Küldés</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
      )}
    </nav>
  );
};

export default Navbar;

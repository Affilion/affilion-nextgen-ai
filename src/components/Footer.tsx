import defaultLogo from "@/assets/logo.jpg";

const Footer = () => {
  const logoUrl = localStorage.getItem("affilion_logo_url") || defaultLogo;

  return (
    <footer className="border-t border-glass-border/20 py-8 px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <img src={logoUrl} alt="Affilion AI" className="h-6 w-auto rounded-full" />
        <span className="glow-text font-semibold text-sm">Affilion AI</span>
      </div>
      <p className="text-xs text-muted-foreground">
        © 2026 Affilion AI. Minden jog fenntartva.
      </p>
    </footer>
  );
};

export default Footer;

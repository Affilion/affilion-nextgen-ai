import { Link } from "react-router-dom";
import defaultLogo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="border-t border-border/20 py-8 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={defaultLogo} alt="Affilion AI" className="h-6 w-6 object-cover" style={{ clipPath: "circle(50%)" }} />
          <span className="text-xs text-muted-foreground">
            © 2026 Affilion AI. Minden jog fenntartva.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/impresszum" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Impresszum
          </Link>
          <Link to="/adatvedelem" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Adatvédelmi Tájékoztató
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

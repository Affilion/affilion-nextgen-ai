import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Videók", href: "#youtube" },
  { label: "Prompt Labor", href: "#prompt-labor" },
  { label: "Termékek", href: "#termekek" },
  { label: "Kurzus", href: "#kurzus" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-0 border-b border-glass-border/20">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#" className="text-xl font-bold glow-text">
          Affilion AI
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;

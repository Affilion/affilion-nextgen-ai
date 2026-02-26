import { useEffect, useState } from "react";
import { X } from "lucide-react";

const FAVICON_KEY = "affilion_favicon_url";
const LOGO_KEY = "affilion_logo_url";

const applyFavicon = (url: string) => {
  if (!url) return;
  let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = url;
};

const AdminPanel = () => {
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState(
    () => localStorage.getItem("affilion_hero_video") || ""
  );
  const [musicUrl, setMusicUrl] = useState(
    () => localStorage.getItem("affilion_hero_music") || ""
  );
  const [faviconUrl, setFaviconUrl] = useState(
    () => localStorage.getItem(FAVICON_KEY) || ""
  );
  const [logoUrl, setLogoUrl] = useState(
    () => localStorage.getItem(LOGO_KEY) || ""
  );

  useEffect(() => {
    const saved = localStorage.getItem(FAVICON_KEY);
    if (saved) applyFavicon(saved);
  }, []);

  useEffect(() => {
    const pressed = new Set<string>();
    const down = (e: KeyboardEvent) => {
      pressed.add(e.key.toLowerCase());
      if (pressed.has("o") && pressed.has("p")) {
        setOpen(true);
      }
    };
    const up = (e: KeyboardEvent) => pressed.delete(e.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const save = () => {
    localStorage.setItem("affilion_hero_video", videoUrl);
    localStorage.setItem("affilion_hero_music", musicUrl);
    localStorage.setItem(FAVICON_KEY, faviconUrl);
    localStorage.setItem(LOGO_KEY, logoUrl);
    if (faviconUrl) applyFavicon(faviconUrl);
    setOpen(false);
    window.location.reload();
  };

  if (!open) return null;

  const inputClass = "w-full rounded-lg border border-glass-border/40 bg-muted/30 px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative z-10 w-full max-w-md mx-4 hyper-glass border-primary/20 bg-background/90 p-6 rounded-xl">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={18} />
        </button>

        <h2 className="glow-text text-xl font-bold mb-1">Affilion AI – Vezérlőpult</h2>
        <p className="text-sm text-muted-foreground mb-6">Videó, zene, logó és favicon beállítása</p>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Hero Videó URL</label>
            <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/embed/..." className={inputClass} />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Hero Zene URL (MP3)</label>
            <input value={musicUrl} onChange={(e) => setMusicUrl(e.target.value)} placeholder="https://example.com/music.mp3" className={inputClass} />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Fő Logó URL (Átlátszó PNG)</label>
            <input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://example.com/logo.png" className={inputClass} />
            {logoUrl && (
              <div className="mt-2 flex items-center gap-2">
                <img src={logoUrl} alt="Logo preview" className="h-8 w-auto bg-transparent" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <span className="text-xs text-muted-foreground">Előnézet</span>
              </div>
            )}
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Favicon URL (Átlátszó PNG/SVG)</label>
            <input value={faviconUrl} onChange={(e) => setFaviconUrl(e.target.value)} placeholder="https://example.com/favicon.png" className={inputClass} />
          </div>
          <button onClick={save} className="neon-button w-full text-center">
            Mentés és újratöltés
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

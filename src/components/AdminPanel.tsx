import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X } from "lucide-react";

const AdminPanel = () => {
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState(
    () => localStorage.getItem("affilion_hero_video") || ""
  );
  const [musicUrl, setMusicUrl] = useState(
    () => localStorage.getItem("affilion_hero_music") || ""
  );

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
    setOpen(false);
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="hyper-glass border-primary/20 bg-background/90 max-w-md">
        <DialogHeader>
          <DialogTitle className="glow-text text-xl">Admin Panel</DialogTitle>
          <DialogDescription>Hero videó és zene URL beállítása</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Hero Videó URL</label>
            <input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://example.com/video.mp4"
              className="w-full rounded-lg border border-glass-border/40 bg-muted/30 px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Hero Zene URL</label>
            <input
              value={musicUrl}
              onChange={(e) => setMusicUrl(e.target.value)}
              placeholder="https://example.com/music.mp3"
              className="w-full rounded-lg border border-glass-border/40 bg-muted/30 px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button onClick={save} className="neon-button w-full text-center">
            Mentés és újratöltés
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;

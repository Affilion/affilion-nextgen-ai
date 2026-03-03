import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Image, Video, FileText, Link, Trash2, Plus, Save, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { optimizeImageForUpload } from "@/lib/imageOptimization";

type Tab = "users" | "portfolio" | "experiments" | "prompts" | "content";
type UploadFolder = "portfolio" | "prompts";

const uploadCmsImage = async (file: File, folder: UploadFolder) => {
  const optimizedFile = await optimizeImageForUpload(file, {
    maxWidth: 1920,
    maxHeight: 1920,
    targetMaxSizeMB: 2,
    outputType: "image/webp",
  });

  const path = `${folder}/${Date.now()}-${crypto.randomUUID()}.webp`;
  const { error: uploadErr } = await supabase.storage.from("cms-assets").upload(path, optimizedFile, {
    contentType: "image/webp",
    upsert: false,
  });

  if (uploadErr) throw uploadErr;

  const {
    data: { publicUrl },
  } = supabase.storage.from("cms-assets").getPublicUrl(path);

  return publicUrl;
};

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("users");

  useEffect(() => {
    if (authLoading || adminLoading) return;
    if (!user || !isAdmin) {
      navigate("/");
    }
  }, [user, isAdmin, authLoading, adminLoading, navigate]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "users", label: "Felhasználók", icon: <Users size={16} /> },
    { id: "portfolio", label: "Portfólió", icon: <Image size={16} /> },
    { id: "experiments", label: "AI Kísérletek", icon: <Video size={16} /> },
    { id: "prompts", label: "Prompt Labor", icon: <FileText size={16} /> },
    { id: "content", label: "Tartalom URL-ek", icon: <Link size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-0 border-b border-glass-border/20">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Vissza
          </button>
          <h1 className="text-lg font-bold glow-text">Admin Panel</h1>
          <div className="w-20" />
        </div>
      </header>

      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === t.id ? "neon-button" : "hyper-glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {activeTab === "users" && <UsersPanel />}
            {activeTab === "portfolio" && <PortfolioPanel />}
            {activeTab === "experiments" && <ExperimentsPanel />}
            {activeTab === "prompts" && <PromptsPanel />}
            {activeTab === "content" && <ContentPanel />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ── Users Panel ── */
const UsersPanel = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: profiles } = await supabase.from("profiles").select("*");
      const { data: purchases } = await supabase.from("purchases").select("*");

      const enriched = (profiles || []).map((p) => ({
        ...p,
        purchases: (purchases || []).filter((pu) => pu.user_id === p.user_id),
      }));
      setUsers(enriched);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="text-muted-foreground">Betöltés...</div>;

  return (
    <div className="hyper-glass rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="p-4">Név</th>
              <th className="p-4">Email</th>
              <th className="p-4">Regisztráció</th>
              <th className="p-4">Vásárlások</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-border/50 hover:bg-muted/20">
                <td className="p-4 text-foreground">{u.full_name || "–"}</td>
                <td className="p-4 text-foreground">{u.email || "–"}</td>
                <td className="p-4 text-muted-foreground">{new Date(u.created_at).toLocaleDateString("hu")}</td>
                <td className="p-4">
                  {u.purchases.length === 0 ? (
                    <span className="text-muted-foreground">–</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {u.purchases.map((p: any) => (
                        <span key={p.id} className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                          {p.product_id}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ── Portfolio Panel ── */
const PortfolioPanel = () => {
  type PortfolioItem = {
    id: string;
    title: string;
    prompt: string | null;
    image_url: string;
    sort_order: number | null;
  };

  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrompt, setEditPrompt] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const fetchItems = async () => {
    const { data } = await supabase
      .from("portfolio_items")
      .select("id, title, prompt, image_url, sort_order")
      .order("sort_order", { ascending: true });

    setItems((data || []) as PortfolioItem[]);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleEditFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setEditFile(e.target.files?.[0] || null);
  };

  const handleAdd = async () => {
    if (!title.trim() || !file) {
      return toast({ title: "Cím és kép kötelező!", variant: "destructive" });
    }

    setLoading(true);
    try {
      const publicUrl = await uploadCmsImage(file, "portfolio");

      const { error } = await supabase.from("portfolio_items").insert({
        title: title.trim(),
        image_url: publicUrl,
        prompt: prompt.trim() || null,
        sort_order: items.length,
      });

      if (error) throw error;

      setTitle("");
      setPrompt("");
      setFile(null);
      await fetchItems();
      toast({ title: "Portfólió elem hozzáadva!" });
    } catch (error) {
      toast({
        title: "Feltöltési hiba",
        description: error instanceof Error ? error.message : "Ismeretlen hiba történt.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditPrompt(item.prompt || "");
    setEditFile(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditPrompt("");
    setEditFile(null);
  };

  const handleSaveEdit = async (itemId: string) => {
    if (!editTitle.trim()) {
      return toast({ title: "A cím nem lehet üres.", variant: "destructive" });
    }

    setSavingId(itemId);
    try {
      let nextImageUrl: string | undefined;

      if (editFile) {
        nextImageUrl = await uploadCmsImage(editFile, "portfolio");
      }

      const { error } = await supabase
        .from("portfolio_items")
        .update({
          title: editTitle.trim(),
          prompt: editPrompt.trim() || null,
          ...(nextImageUrl ? { image_url: nextImageUrl } : {}),
        })
        .eq("id", itemId);

      if (error) throw error;

      await fetchItems();
      handleCancelEdit();
      toast({ title: "Portfólió elem frissítve!" });
    } catch (error) {
      toast({
        title: "Mentési hiba",
        description: error instanceof Error ? error.message : "Ismeretlen hiba történt.",
        variant: "destructive",
      });
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
    if (error) {
      toast({ title: "Törlési hiba", description: error.message, variant: "destructive" });
      return;
    }

    await fetchItems();
    toast({ title: "Törölve!" });
  };

  return (
    <div className="space-y-6">
      <div className="hyper-glass rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-foreground flex items-center gap-2"><Plus size={16} /> Új Portfólió Elem</h3>
        <Input placeholder="Cím" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-muted/50 border-border" />
        <Textarea placeholder="Prompt (opcionális)" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="bg-muted/50 border-border" />
        <input type="file" accept="image/*" onChange={handleFileSelect} className="text-sm text-muted-foreground" />
        <p className="text-xs text-muted-foreground">A feltöltött képeket automatikusan optimalizáljuk (max 1920px, tömörítés) a gyors oldalbetöltéshez.</p>
        <Button onClick={handleAdd} disabled={loading} className="neon-button border-0">{loading ? "Feltöltés..." : "Hozzáadás"}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const isEditing = editingId === item.id;

          return (
            <div key={item.id} className="hyper-glass rounded-xl overflow-hidden">
              {brokenImages[item.id] ? (
                <div className="w-full h-48 bg-muted/40 flex items-center justify-center text-sm text-muted-foreground">
                  Kép nem elérhető
                </div>
              ) : (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  onError={() => setBrokenImages((prev) => ({ ...prev, [item.id]: true }))}
                />
              )}

              <div className="p-4 space-y-3">
                {isEditing ? (
                  <>
                    <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="bg-muted/50 border-border" />
                    <Textarea
                      value={editPrompt}
                      onChange={(e) => setEditPrompt(e.target.value)}
                      placeholder="Prompt (opcionális)"
                      className="bg-muted/50 border-border min-h-[100px]"
                    />
                    <input type="file" accept="image/*" onChange={handleEditFileSelect} className="text-sm text-muted-foreground" />
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveEdit(item.id)}
                        disabled={savingId === item.id}
                        className="neon-button border-0"
                      >
                        {savingId === item.id ? "Mentés..." : "Mentés"}
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                        Mégse
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="text-sm font-medium text-foreground">{item.title}</span>
                      {item.prompt && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.prompt}</p>}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Button size="icon" variant="outline" onClick={() => handleStartEdit(item)} aria-label="Szerkesztés">
                        <Pencil size={16} />
                      </Button>
                      <Button size="icon" variant="outline" onClick={() => handleDelete(item.id)} aria-label="Törlés">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Experiments Panel ── */
const ExperimentsPanel = () => {
  type ExperimentItem = { id: string; title: string; video_id: string; badge: string | null; sort_order: number | null };

  const [items, setItems] = useState<ExperimentItem[]>([]);
  const [title, setTitle] = useState("");
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editVideoId, setEditVideoId] = useState("");
  const [editBadge, setEditBadge] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchItems = async () => {
    const { data } = await supabase.from("experiments").select("*").order("sort_order");
    setItems((data || []) as ExperimentItem[]);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAdd = async () => {
    if (!title || !videoId) return toast({ title: "Cím és videó ID kötelező!", variant: "destructive" });
    setLoading(true);
    await supabase.from("experiments").insert({ title, video_id: videoId, sort_order: items.length });
    setTitle(""); setVideoId("");
    await fetchItems();
    setLoading(false);
    toast({ title: "Kísérlet hozzáadva!" });
  };

  const handleStartEdit = (item: ExperimentItem) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditVideoId(item.video_id);
    setEditBadge(item.badge || "");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditVideoId("");
    setEditBadge("");
  };

  const handleSaveEdit = async (itemId: string) => {
    if (!editTitle.trim() || !editVideoId.trim()) {
      return toast({ title: "Cím és videó ID kötelező!", variant: "destructive" });
    }
    setSavingId(itemId);
    try {
      const { error } = await supabase
        .from("experiments")
        .update({
          title: editTitle.trim(),
          video_id: editVideoId.trim(),
          badge: editBadge.trim() || null,
        })
        .eq("id", itemId);
      if (error) throw error;
      await fetchItems();
      handleCancelEdit();
      toast({ title: "Kísérlet frissítve!" });
    } catch (error) {
      toast({ title: "Mentési hiba", description: error instanceof Error ? error.message : "Ismeretlen hiba.", variant: "destructive" });
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("experiments").delete().eq("id", id);
    await fetchItems();
    toast({ title: "Törölve!" });
  };

  return (
    <div className="space-y-6">
      <div className="hyper-glass rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-foreground flex items-center gap-2"><Plus size={16} /> Új AI Kísérlet</h3>
        <Input placeholder="Cím" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-muted/50 border-border" />
        <Input placeholder="YouTube Video ID (pl: dQw4w9WgXcQ)" value={videoId} onChange={(e) => setVideoId(e.target.value)} className="bg-muted/50 border-border" />
        <Button onClick={handleAdd} disabled={loading} className="neon-button border-0">{loading ? "Mentés..." : "Hozzáadás"}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const isEditing = editingId === item.id;
          return (
            <div key={item.id} className="hyper-glass rounded-xl overflow-hidden">
              <img src={`https://img.youtube.com/vi/${item.video_id}/maxresdefault.jpg`} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4 space-y-3">
                {isEditing ? (
                  <>
                    <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Cím" className="bg-muted/50 border-border" />
                    <Input value={editVideoId} onChange={(e) => setEditVideoId(e.target.value)} placeholder="YouTube Video ID" className="bg-muted/50 border-border" />
                    <Input value={editBadge} onChange={(e) => setEditBadge(e.target.value)} placeholder="Badge (pl: AFFILION AI)" className="bg-muted/50 border-border" />
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => handleSaveEdit(item.id)} disabled={savingId === item.id} className="neon-button border-0">
                        {savingId === item.id ? "Mentés..." : "Mentés"}
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancelEdit}>Mégse</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="text-sm font-medium text-foreground">{item.title}</span>
                      {item.badge && <p className="text-xs text-muted-foreground mt-1">{item.badge}</p>}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Button size="icon" variant="outline" onClick={() => handleStartEdit(item)} aria-label="Szerkesztés">
                        <Pencil size={16} />
                      </Button>
                      <Button size="icon" variant="outline" onClick={() => handleDelete(item.id)} aria-label="Törlés">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Prompts Panel ── */
const PromptsPanel = () => {
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [promptText, setPromptText] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from("prompt_lab_items").select("*").order("sort_order");
    setItems(data || []);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAdd = async () => {
    if (!title.trim() || !promptText.trim() || !file) {
      return toast({ title: "Cím, prompt és kép kötelező!", variant: "destructive" });
    }

    setLoading(true);
    try {
      const publicUrl = await uploadCmsImage(file, "prompts");

      const { error } = await supabase.from("prompt_lab_items").insert({
        title: title.trim(),
        image_url: publicUrl,
        prompt_text: promptText.trim(),
        description: description.trim() || null,
        sort_order: items.length,
      });

      if (error) throw error;

      setTitle("");
      setPromptText("");
      setDescription("");
      setFile(null);
      await fetchItems();
      toast({ title: "Prompt Labor elem hozzáadva!" });
    } catch (error) {
      toast({
        title: "Feltöltési hiba",
        description: error instanceof Error ? error.message : "Ismeretlen hiba történt.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("prompt_lab_items").delete().eq("id", id);
    await fetchItems();
    toast({ title: "Törölve!" });
  };

  return (
    <div className="space-y-6">
      <div className="hyper-glass rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-foreground flex items-center gap-2"><Plus size={16} /> Új Prompt Labor Elem</h3>
        <Input placeholder="Cím" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-muted/50 border-border" />
        <Input placeholder="Leírás (opcionális)" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-muted/50 border-border" />
        <Textarea placeholder="Prompt szöveg" value={promptText} onChange={(e) => setPromptText(e.target.value)} className="bg-muted/50 border-border min-h-[120px]" />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="text-sm text-muted-foreground" />
        <Button onClick={handleAdd} disabled={loading} className="neon-button border-0">{loading ? "Feltöltés..." : "Hozzáadás"}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="hyper-glass rounded-xl overflow-hidden flex">
            <img src={item.image_url} alt={item.title} className="w-32 h-32 object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-sm font-medium text-foreground">{item.title}</span>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.prompt_text}</p>
              </div>
              <button onClick={() => handleDelete(item.id)} className="self-end text-destructive hover:text-destructive/80"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Content URLs Panel ── */
const ContentPanel = () => {
  const [items, setItems] = useState<any[]>([]);
  const [productId, setProductId] = useState("");
  const [notionUrl, setNotionUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from("product_content").select("*");
    setItems(data || []);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async () => {
    if (!productId || !notionUrl || !title) return toast({ title: "Minden mező kötelező!", variant: "destructive" });
    setLoading(true);
    const { error } = await supabase.from("product_content").upsert({ product_id: productId, notion_url: notionUrl, title }, { onConflict: "product_id" });
    if (error) toast({ title: "Hiba", description: error.message, variant: "destructive" });
    else toast({ title: "Mentve!" });
    setProductId(""); setNotionUrl(""); setTitle("");
    await fetchItems();
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("product_content").delete().eq("id", id);
    await fetchItems();
    toast({ title: "Törölve!" });
  };

  const productOptions = [
    { id: "prompt-pack", label: "100 AI Prompt Pack" },
    { id: "suno-guide", label: "Suno AI Dalszövegírási Titkok" },
    { id: "auto-guide", label: "AI Automatizációs Útmutató" },
  ];

  return (
    <div className="space-y-6">
      <div className="hyper-glass rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-foreground flex items-center gap-2"><Save size={16} /> Notion Tartalom Hozzárendelés</h3>
        <select
          value={productId}
          onChange={(e) => {
            setProductId(e.target.value);
            const found = productOptions.find((p) => p.id === e.target.value);
            if (found) setTitle(found.label);
          }}
          className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground"
        >
          <option value="">Válassz terméket...</option>
          {productOptions.map((p) => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>
        <Input placeholder="Notion embed URL" value={notionUrl} onChange={(e) => setNotionUrl(e.target.value)} className="bg-muted/50 border-border" />
        <Button onClick={handleSave} disabled={loading} className="neon-button border-0">{loading ? "Mentés..." : "Mentés"}</Button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="hyper-glass rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-foreground">{item.title}</span>
              <p className="text-xs text-muted-foreground mt-1">{item.product_id} → {item.notion_url}</p>
            </div>
            <button onClick={() => handleDelete(item.id)} className="text-destructive hover:text-destructive/80"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;

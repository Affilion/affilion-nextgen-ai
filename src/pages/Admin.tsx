import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Image, Video, FileText, Link, Trash2, Plus, Save, Pencil, Mail, Download, ShoppingBag, Upload, Music } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { optimizeImageForUpload } from "@/lib/imageOptimization";

type Tab = "users" | "products" | "portfolio" | "experiments" | "prompts" | "content" | "waitlist" | "prompt-manager" | "ai-club";
type UploadFolder = "portfolio" | "prompts" | "products";

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
    { id: "products", label: "Termékek", icon: <ShoppingBag size={16} /> },
    { id: "portfolio", label: "Portfólió", icon: <Image size={16} /> },
    { id: "experiments", label: "AI Kísérletek", icon: <Video size={16} /> },
    { id: "prompts", label: "Kreatív Stúdió", icon: <FileText size={16} /> },
    { id: "prompt-manager", label: "Prompt Player", icon: <Music size={16} /> },
    { id: "content", label: "Tartalom URL-ek", icon: <Link size={16} /> },
    { id: "waitlist", label: "Várólista", icon: <Mail size={16} /> },
    { id: "ai-club", label: "AI Club Előfizetők", icon: <Users size={16} /> },
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
          <div className="flex flex-wrap gap-2 mb-8">
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
            {activeTab === "products" && <ProductsPanel />}
            {activeTab === "portfolio" && <PortfolioPanel />}
            {activeTab === "experiments" && <ExperimentsPanel />}
            {activeTab === "prompts" && <PromptsPanel />}
            {activeTab === "prompt-manager" && <PromptManagerPanel />}
            {activeTab === "content" && <ContentPanel />}
            {activeTab === "waitlist" && <WaitlistPanel />}
            {activeTab === "ai-club" && <AiClubPanel />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ── Users Panel ── */
const UsersPanel = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [discordEmails, setDiscordEmails] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [giftingUserId, setGiftingUserId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [giftLoading, setGiftLoading] = useState(false);

  const fetchData = async () => {
    const [{ data: profiles }, { data: purchases }, { data: prods }, { data: discordLinks }] = await Promise.all([
      supabase.from("profiles").select("*"),
      supabase.from("purchases").select("*"),
      supabase.from("products").select("*").order("sort_order"),
      supabase.from("discord_links").select("email"),
    ]);

    const enriched = (profiles || []).map((p) => ({
      ...p,
      purchases: (purchases || []).filter((pu) => pu.user_id === p.user_id),
    }));
    setUsers(enriched);
    setProducts(prods || []);
    setDiscordEmails(new Set((discordLinks || []).map((d: any) => d.email)));
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleGift = async (userId: string) => {
    if (!selectedProductId) return;
    const product = products.find((p: any) => p.id === selectedProductId);
    if (!product) return;

    setGiftLoading(true);
    try {
      const { error } = await supabase.from("purchases").insert({
        user_id: userId,
        product_id: product.id,
        amount: 0,
        currency: "huf",
        status: "completed",
        customer_email: users.find((u) => u.user_id === userId)?.email || null,
      });
      if (error) throw error;
      toast({ title: `${product.name} hozzáadva ajándékként!` });
      setGiftingUserId(null);
      setSelectedProductId("");
      await fetchData();
    } catch (err) {
      toast({ title: "Hiba", description: err instanceof Error ? err.message : "Ismeretlen hiba", variant: "destructive" });
    } finally {
      setGiftLoading(false);
    }
  };

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
              <th className="p-4">AI Club</th>
              <th className="p-4">Művelet</th>
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
                <td className="p-4">
                  {u.email && discordEmails.has(u.email) ? (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                      Aktív tag
                    </span>
                  ) : (
                    <span className="text-muted-foreground">–</span>
                  )}
                </td>
                <td className="p-4">
                  {giftingUserId === u.user_id ? (
                    <div className="flex items-center gap-2">
                      <select
                        value={selectedProductId}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                        className="text-xs bg-muted/50 border border-border rounded px-2 py-1 text-foreground"
                      >
                        <option value="">Válassz terméket...</option>
                        {products
                          .filter((pr: any) => !u.purchases.some((pu: any) => pu.product_id === pr.id && pu.status === "completed"))
                          .map((pr: any) => (
                            <option key={pr.id} value={pr.id}>{pr.name}</option>
                          ))}
                      </select>
                      <Button size="sm" onClick={() => handleGift(u.user_id)} disabled={!selectedProductId || giftLoading} className="neon-button border-0 text-xs h-7">
                        {giftLoading ? "..." : "Add"}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => { setGiftingUserId(null); setSelectedProductId(""); }} className="text-xs h-7">✕</Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="ghost" onClick={() => setGiftingUserId(u.user_id)} className="text-xs gap-1">
                      <Plus size={14} /> Ajándék
                    </Button>
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

/* ── Products Panel ── */
const ProductsPanel = () => {
  type Product = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image_url: string | null;
    stripe_price_id: string;
    notion_url: string | null;
    sort_order: number | null;
    is_active: boolean | null;
    coming_soon: boolean;
  };

  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // New product form
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStripePriceId, setNewStripePriceId] = useState("");
  const [newNotionUrl, setNewNotionUrl] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editStripePriceId, setEditStripePriceId] = useState("");
  const [editNotionUrl, setEditNotionUrl] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editIsActive, setEditIsActive] = useState(true);
  const [editComingSoon, setEditComingSoon] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchItems = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems((data || []) as Product[]);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async () => {
    if (!newId.trim() || !newName.trim() || !newPrice.trim() || !newStripePriceId.trim()) {
      return toast({ title: "ID, név, ár és Stripe Price ID kötelező!", variant: "destructive" });
    }

    setLoading(true);
    try {
      let imageUrl: string | null = null;
      if (newFile) {
        imageUrl = await uploadCmsImage(newFile, "products");
      }

      const { error } = await supabase.from("products").insert({
        id: newId.trim(),
        name: newName.trim(),
        description: newDesc.trim() || null,
        price: parseInt(newPrice),
        stripe_price_id: newStripePriceId.trim(),
        notion_url: newNotionUrl.trim() || null,
        image_url: imageUrl,
        sort_order: items.length,
        is_active: true,
      });

      if (error) throw error;

      // Also create product_content entry if notion_url is provided
      if (newNotionUrl.trim()) {
        await supabase.from("product_content").upsert({
          product_id: newId.trim(),
          notion_url: newNotionUrl.trim(),
          title: newName.trim(),
        }, { onConflict: "product_id" });
      }

      setNewId("");
      setNewName("");
      setNewDesc("");
      setNewPrice("");
      setNewStripePriceId("");
      setNewNotionUrl("");
      setNewFile(null);
      await fetchItems();
      toast({ title: "Termék hozzáadva!" });
    } catch (error) {
      toast({
        title: "Hiba",
        description: error instanceof Error ? error.message : "Ismeretlen hiba.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (item: Product) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditDesc(item.description || "");
    setEditPrice(String(item.price));
    setEditStripePriceId(item.stripe_price_id);
    setEditNotionUrl(item.notion_url || "");
    setEditFile(null);
    setEditIsActive(item.is_active ?? true);
    setEditComingSoon(item.coming_soon ?? false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (itemId: string) => {
    if (!editName.trim() || !editPrice.trim() || !editStripePriceId.trim()) {
      return toast({ title: "Név, ár és Stripe Price ID kötelező!", variant: "destructive" });
    }

    setSavingId(itemId);
    try {
      let nextImageUrl: string | undefined;
      if (editFile) {
        nextImageUrl = await uploadCmsImage(editFile, "products");
      }

      const { error } = await supabase
        .from("products")
        .update({
          name: editName.trim(),
          description: editDesc.trim() || null,
          price: parseInt(editPrice),
          stripe_price_id: editStripePriceId.trim(),
          notion_url: editNotionUrl.trim() || null,
          is_active: editIsActive,
          coming_soon: editComingSoon,
          ...(nextImageUrl ? { image_url: nextImageUrl } : {}),
        })
        .eq("id", itemId);

      if (error) throw error;

      // Sync product_content
      if (editNotionUrl.trim()) {
        await supabase.from("product_content").upsert({
          product_id: itemId,
          notion_url: editNotionUrl.trim(),
          title: editName.trim(),
        }, { onConflict: "product_id" });
      }

      await fetchItems();
      handleCancelEdit();
      toast({ title: "Termék frissítve!" });
    } catch (error) {
      toast({
        title: "Mentési hiba",
        description: error instanceof Error ? error.message : "Ismeretlen hiba.",
        variant: "destructive",
      });
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast({ title: "Törlési hiba", description: error.message, variant: "destructive" });
      return;
    }
    await fetchItems();
    toast({ title: "Termék törölve!" });
  };

  return (
    <div className="space-y-6">
      {/* Add new product form */}
      <div className="hyper-glass rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <Plus size={16} /> Új Termék
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Termék ID (pl: prompt-pack-v2)"
            value={newId}
            onChange={(e) => setNewId(e.target.value)}
            className="bg-muted/50 border-border"
          />
          <Input
            placeholder="Termék neve"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="bg-muted/50 border-border"
          />
          <Input
            placeholder="Ár (HUF, pl: 2990)"
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="bg-muted/50 border-border"
          />
          <Input
            placeholder="Stripe Price ID (pl: price_1T6Cy7...)"
            value={newStripePriceId}
            onChange={(e) => setNewStripePriceId(e.target.value)}
            className="bg-muted/50 border-border"
          />
        </div>
        <Textarea
          placeholder="Leírás"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          className="bg-muted/50 border-border"
        />
        <Input
          placeholder="Notion embed URL (a vásárlás utáni tartalom)"
          value={newNotionUrl}
          onChange={(e) => setNewNotionUrl(e.target.value)}
          className="bg-muted/50 border-border"
        />
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Borítókép</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewFile(e.target.files?.[0] || null)}
            className="text-sm text-muted-foreground"
          />
        </div>
        <Button onClick={handleAdd} disabled={loading} className="neon-button border-0">
          {loading ? "Feltöltés..." : "Termék hozzáadása"}
        </Button>
      </div>

      {/* Existing products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const isEditing = editingId === item.id;

          return (
            <div key={item.id} className={`hyper-glass rounded-xl overflow-hidden ${!item.is_active ? "opacity-50" : ""}`}>
              {item.image_url ? (
                <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-muted/40 flex items-center justify-center text-sm text-muted-foreground">
                  Nincs kép
                </div>
              )}

              <div className="p-4 space-y-3">
                {isEditing ? (
                  <>
                    <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Név" className="bg-muted/50 border-border" />
                    <Textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} placeholder="Leírás" className="bg-muted/50 border-border" />
                    <Input value={editPrice} onChange={(e) => setEditPrice(e.target.value)} placeholder="Ár (HUF)" type="number" className="bg-muted/50 border-border" />
                    <Input value={editStripePriceId} onChange={(e) => setEditStripePriceId(e.target.value)} placeholder="Stripe Price ID" className="bg-muted/50 border-border" />
                    <Input value={editNotionUrl} onChange={(e) => setEditNotionUrl(e.target.value)} placeholder="Notion URL" className="bg-muted/50 border-border" />
                    <input type="file" accept="image/*" onChange={(e) => setEditFile(e.target.files?.[0] || null)} className="text-sm text-muted-foreground" />
                    <label className="flex items-center gap-2 text-sm text-muted-foreground">
                      <input type="checkbox" checked={editIsActive} onChange={(e) => setEditIsActive(e.target.checked)} />
                      Aktív (látható a frontenden)
                    </label>
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
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                      <p className="text-xs text-muted-foreground mt-1">{item.price.toLocaleString("hu")} Ft</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">Stripe: {item.stripe_price_id}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                          <Switch
                            checked={item.is_active ?? true}
                            onCheckedChange={async (checked) => {
                              await supabase.from("products").update({ is_active: checked }).eq("id", item.id);
                              await fetchItems();
                              toast({ title: checked ? "Termék aktiválva!" : "Termék elrejtve!" });
                            }}
                          />
                          {item.is_active ? "Aktív" : "Rejtett"}
                        </label>
                        {(item.is_active ?? true) && (
                          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                            <Switch
                              checked={item.coming_soon}
                              onCheckedChange={async (checked) => {
                                await supabase.from("products").update({ coming_soon: checked }).eq("id", item.id);
                                await fetchItems();
                                toast({ title: checked ? "Hamarosan mód bekapcsolva!" : "Hamarosan mód kikapcsolva!" });
                              }}
                            />
                            Hamarosan
                          </label>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline" onClick={() => handleStartEdit(item)} aria-label="Szerkesztés">
                          <Pencil size={16} />
                        </Button>
                        <Button size="icon" variant="outline" onClick={() => handleDelete(item.id)} aria-label="Törlés">
                          <Trash2 size={16} />
                        </Button>
                      </div>
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
      toast({ title: "Kreatív Stúdió elem hozzáadva!" });
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
        <h3 className="font-bold text-foreground flex items-center gap-2"><Plus size={16} /> Új Kreatív Stúdió Elem</h3>
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

/* ── Prompt Manager Panel ── */
const PromptManagerPanel = () => {
  type PromptItem = {
    id: string;
    product_id: string;
    category: string;
    title: string;
    cover_image: string | null;
    style_tags: string;
    structure_tags: string;
    analysis_text: string | null;
    sort_order: number | null;
  };

  const [items, setItems] = useState<PromptItem[]>([]);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [loading, setLoading] = useState(false);

  // Single add form
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newStyleTags, setNewStyleTags] = useState("");
  const [newStructureTags, setNewStructureTags] = useState("");
  const [newAnalysis, setNewAnalysis] = useState("");
  const [newCoverFile, setNewCoverFile] = useState<File | null>(null);

  // Bulk import
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [bulkImporting, setBulkImporting] = useState(false);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("id, name").order("sort_order");
    setProducts((data || []) as { id: string; name: string }[]);
    // Don't auto-select — user must pick a product explicitly
  };

  const fetchItems = async () => {
    if (!selectedProductId) return;
    const { data } = await supabase
      .from("product_prompts")
      .select("*")
      .eq("product_id", selectedProductId)
      .order("sort_order");
    setItems((data || []) as PromptItem[]);
  };

  useEffect(() => { fetchProducts(); }, []);
  useEffect(() => { fetchItems(); }, [selectedProductId]);

  const handleAdd = async () => {
    if (!selectedProductId || !newTitle.trim() || !newStyleTags.trim()) {
      return toast({ title: "Termék, cím és style tags kötelező!", variant: "destructive" });
    }
    setLoading(true);
    try {
      let coverUrl: string | null = null;
      if (newCoverFile) coverUrl = await uploadCmsImage(newCoverFile, "prompts");

      const { error } = await supabase.from("product_prompts").insert({
        product_id: selectedProductId,
        title: newTitle.trim(),
        category: newCategory.trim() || "Általános",
        style_tags: newStyleTags.trim(),
        structure_tags: newStructureTags.trim(),
        analysis_text: newAnalysis.trim() || null,
        cover_image: coverUrl,
        sort_order: items.length,
      });
      if (error) throw error;

      setNewTitle(""); setNewCategory(""); setNewStyleTags(""); setNewStructureTags(""); setNewAnalysis(""); setNewCoverFile(null);
      await fetchItems();
      toast({ title: "Prompt hozzáadva!" });
    } catch (err) {
      toast({ title: "Hiba", description: err instanceof Error ? err.message : "Ismeretlen hiba.", variant: "destructive" });
    } finally { setLoading(false); }
  };

  const handleBulkImport = async () => {
    if (!bulkFile || !selectedProductId) return;
    setBulkImporting(true);
    try {
      const text = await bulkFile.text();
      let rows: any[] = [];

      if (bulkFile.name.endsWith(".json")) {
        rows = JSON.parse(text);
      } else {
        // CSV parse
        const lines = text.split("\n").filter((l) => l.trim());
        if (lines.length < 2) throw new Error("A CSV fájlnak fejlécet és legalább egy sort kell tartalmaznia.");
        const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
        for (let i = 1; i < lines.length; i++) {
          const vals = lines[i].split(",").map((v) => v.trim());
          const obj: any = {};
          headers.forEach((h, idx) => { obj[h] = vals[idx] || ""; });
          rows.push(obj);
        }
      }

      const inserts = rows.map((r, i) => ({
        product_id: selectedProductId,
        title: r.title || `Prompt ${i + 1}`,
        category: r.category || "Általános",
        style_tags: r.style_tags || r.style || "",
        structure_tags: r.structure_tags || r.structure || "",
        analysis_text: r.analysis_text || r.analysis || null,
        cover_image: r.cover_image || null,
        sort_order: items.length + i,
      }));

      const { error } = await supabase.from("product_prompts").insert(inserts);
      if (error) throw error;

      setBulkFile(null);
      await fetchItems();
      toast({ title: `${inserts.length} prompt sikeresen importálva!` });
    } catch (err) {
      toast({ title: "Import hiba", description: err instanceof Error ? err.message : "Ismeretlen hiba.", variant: "destructive" });
    } finally { setBulkImporting(false); }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("product_prompts").delete().eq("id", id);
    await fetchItems();
    toast({ title: "Prompt törölve!" });
  };

  const handleDeleteAll = async () => {
    if (!selectedProductId) return;
    if (!confirm("Biztosan törlöd az összes promptot ehhez a termékhez?")) return;
    await supabase.from("product_prompts").delete().eq("product_id", selectedProductId);
    await fetchItems();
    toast({ title: "Összes prompt törölve!" });
  };

  return (
    <div className="space-y-6">
      {/* Product selector */}
      <div className="hyper-glass rounded-xl p-4">
        <label className="text-sm text-muted-foreground block mb-2">Termék kiválasztása</label>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground"
        >
          <option value="">-- Válassz terméket --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Bulk import */}
      <div className="hyper-glass rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <Upload size={16} /> Tömeges Importálás (CSV/JSON)
        </h3>
        <p className="text-xs text-muted-foreground">
          CSV fejléc: <code className="text-primary">title,category,style_tags,structure_tags,analysis_text</code><br />
          JSON: tömb objektumokkal, ugyanezekkel a mezőkkel.
        </p>
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept=".csv,.json"
            onChange={(e) => setBulkFile(e.target.files?.[0] || null)}
            className="text-sm text-muted-foreground"
          />
          <Button onClick={handleBulkImport} disabled={!bulkFile || bulkImporting} className="neon-button border-0">
            {bulkImporting ? "Importálás..." : "Importálás"}
          </Button>
        </div>
      </div>

      {/* Single add */}
      <div className="hyper-glass rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-foreground flex items-center gap-2"><Plus size={16} /> Új Prompt</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Prompt címe" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="bg-muted/50 border-border" />
          <Input placeholder="Kategória (pl: Pop, EDM)" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="bg-muted/50 border-border" />
        </div>
        <Textarea placeholder="Style tags (a másolható stílus kód)" value={newStyleTags} onChange={(e) => setNewStyleTags(e.target.value)} className="bg-muted/50 border-border" />
        <Textarea placeholder="Structure tags (a másolható struktúra kód)" value={newStructureTags} onChange={(e) => setNewStructureTags(e.target.value)} className="bg-muted/50 border-border" />
        <Textarea placeholder="Elemzés / leírás (opcionális)" value={newAnalysis} onChange={(e) => setNewAnalysis(e.target.value)} className="bg-muted/50 border-border" />
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Borítókép (opcionális)</label>
          <input type="file" accept="image/*" onChange={(e) => setNewCoverFile(e.target.files?.[0] || null)} className="text-sm text-muted-foreground" />
        </div>
        <Button onClick={handleAdd} disabled={loading} className="neon-button border-0">{loading ? "Mentés..." : "Hozzáadás"}</Button>
      </div>

      {/* Existing prompts */}
      {!selectedProductId ? (
        <div className="hyper-glass rounded-xl p-8 text-center text-muted-foreground">
          ⬆️ Válassz egy terméket a fenti listából a promptok megjelenítéséhez.
        </div>
      ) : (
      <>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground">Promptok ({items.length})</h3>
        {items.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleDeleteAll} className="text-destructive border-destructive/30">
            <Trash2 size={14} className="mr-1" /> Összes törlése
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="hyper-glass rounded-xl p-4 space-y-2">
            {item.cover_image && <img src={item.cover_image} alt={item.title} className="w-full h-32 object-cover rounded-lg" />}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-sm font-medium text-foreground">{item.title}</span>
                <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary">{item.category}</span>
              </div>
              <button onClick={() => handleDelete(item.id)} className="text-destructive hover:text-destructive/80 flex-shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 font-mono">{item.style_tags}</p>
          </div>
        ))}
      </div>
      </>
      )}
    </div>
  );
};

/* ── Content URLs Panel ── */
const ContentPanel = () => {
  const [items, setItems] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [productId, setProductId] = useState("");
  const [notionUrl, setNotionUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from("product_content").select("*");
    setItems(data || []);
  };

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("id, name").order("sort_order");
    setProducts(data || []);
  };

  useEffect(() => {
    fetchItems();
    fetchProducts();
  }, []);

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

  return (
    <div className="space-y-6">
      <div className="hyper-glass rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-foreground flex items-center gap-2"><Save size={16} /> Notion Tartalom Hozzárendelés</h3>
        <select
          value={productId}
          onChange={(e) => {
            setProductId(e.target.value);
            const found = products.find((p) => p.id === e.target.value);
            if (found) setTitle(found.name);
          }}
          className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground"
        >
          <option value="">Válassz terméket...</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
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

/* ── Waitlist Panel ── */
const WaitlistPanel = () => {
  const [subscribers, setSubscribers] = useState<{ id: string; email: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    const { data } = await supabase
      .from("waitlist_subscribers")
      .select("id, email, created_at")
      .order("created_at", { ascending: false });
    setSubscribers((data || []) as { id: string; email: string; created_at: string }[]);
    setLoading(false);
  };

  useEffect(() => { fetchSubscribers(); }, []);

  const handleExportCsv = () => {
    if (subscribers.length === 0) return;
    const header = "Email,Feliratkozás dátuma";
    const rows = subscribers.map((s) => `${s.email},${new Date(s.created_at).toLocaleString("hu")}`);
    const csv = [header, ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `varolista_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("waitlist_subscribers").delete().eq("id", id);
    await fetchSubscribers();
    toast({ title: "Törölve!" });
  };

  if (loading) return <div className="text-muted-foreground">Betöltés...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground">Várólista ({subscribers.length} feliratkozó)</h3>
        <Button onClick={handleExportCsv} disabled={subscribers.length === 0} className="neon-button border-0 flex items-center gap-2">
          <Download size={16} /> Exportálás CSV-be
        </Button>
      </div>

      <div className="hyper-glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="p-4">Email</th>
                <th className="p-4">Feliratkozás</th>
                <th className="p-4 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {subscribers.length === 0 ? (
                <tr><td colSpan={3} className="p-8 text-center text-muted-foreground">Még nincs feliratkozó.</td></tr>
              ) : (
                subscribers.map((s) => (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="p-4 text-foreground">{s.email}</td>
                    <td className="p-4 text-muted-foreground">{new Date(s.created_at).toLocaleString("hu")}</td>
                    <td className="p-4">
                      <button onClick={() => handleDelete(s.id)} className="text-destructive hover:text-destructive/80"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ── AI Club Panel ── */
type AiClubSubTab = "active" | "inactive";

const AiClubPanel = () => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subTab, setSubTab] = useState<AiClubSubTab>("active");

  const fetchSubscribers = async () => {
    setLoading(true);
    setError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Nincs bejelentkezve");

      const { data, error: fnError } = await supabase.functions.invoke("list-ai-club-subscribers", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      setSubscribers(data.subscribers || []);
    } catch (err: any) {
      setError(err.message || "Hiba történt");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const activeList = subscribers.filter((s) => s.display_status === "active" || s.display_status === "canceled_pending");
  const inactiveList = subscribers.filter((s) => s.display_status === "inactive");
  const displayed = subTab === "active" ? activeList : inactiveList;

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === "active") {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">Aktív</span>;
    }
    if (status === "canceled_pending") {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400">Lemondva</span>;
    }
    return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">Lejárt</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">AI Club Előfizetők</h2>
        <Button onClick={fetchSubscribers} disabled={loading} variant="outline" className="gap-2">
          <Download size={14} /> Frissítés
        </Button>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setSubTab("active")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            subTab === "active" ? "neon-button" : "hyper-glass text-muted-foreground hover:text-foreground"
          }`}
        >
          Aktív előfizetők ({activeList.length})
        </button>
        <button
          onClick={() => setSubTab("inactive")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            subTab === "inactive" ? "neon-button" : "hyper-glass text-muted-foreground hover:text-foreground"
          }`}
        >
          Inaktív előfizetők ({inactiveList.length})
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="hyper-glass rounded-xl p-8 text-center text-destructive">{error}</div>
      ) : (
        <div className="hyper-glass rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="p-4">Név</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Havi díj</th>
                  <th className="p-4">Fizetett</th>
                  <th className="p-4">Kupon</th>
                  <th className="p-4">Előfizetés kezdete</th>
                  <th className="p-4">{subTab === "active" ? "Következő fizetés / Lejárat" : "Lejárt"}</th>
                  <th className="p-4">Státusz</th>
                </tr>
              </thead>
              <tbody>
                {displayed.length === 0 ? (
                  <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">
                    {subTab === "active" ? "Nincs aktív AI Club előfizető." : "Nincs inaktív AI Club előfizető."}
                  </td></tr>
                ) : (
                  displayed.map((s) => {
                    const fmtAmt = (amt: number | null, cur: string) => {
                      if (amt === null) return "-";
                      return cur === "huf" ? `${amt.toLocaleString("hu")} Ft` : `${amt} ${cur.toUpperCase()}`;
                    };
                    const couponLabel = s.coupon_name
                      ? s.coupon_percent
                        ? `${s.coupon_name} (${s.coupon_percent}%)`
                        : s.coupon_amount_off
                          ? `${s.coupon_name} (-${fmtAmt(s.coupon_amount_off, s.currency)})`
                          : s.coupon_name
                      : null;
                    const hasDifference = s.paid_amount !== null && s.monthly_amount !== null && s.paid_amount < s.monthly_amount;
                    return (
                      <tr key={s.id} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="p-4 text-foreground">{s.name}</td>
                        <td className="p-4 text-foreground">{s.email}</td>
                        <td className="p-4 text-foreground font-medium">{fmtAmt(s.monthly_amount, s.currency)}</td>
                        <td className="p-4">
                          {s.paid_amount !== null ? (
                            <span className={hasDifference ? "text-green-400 font-medium" : "text-foreground"}>
                              {fmtAmt(s.paid_amount, s.currency)}
                            </span>
                          ) : "-"}
                        </td>
                        <td className="p-4">
                          {couponLabel ? (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">{couponLabel}</span>
                          ) : hasDifference ? (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">Kedvezmény</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="p-4 text-muted-foreground">{s.created ? new Date(s.created).toLocaleDateString("hu") : "-"}</td>
                        <td className="p-4 text-muted-foreground">{s.current_period_end ? new Date(s.current_period_end).toLocaleDateString("hu") : "-"}</td>
                        <td className="p-4"><StatusBadge status={s.display_status} /></td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          {displayed.length > 0 && (
            <div className="p-4 border-t border-border text-sm text-muted-foreground">
              Összesen: {displayed.length} {subTab === "active" ? "aktív" : "inaktív"} előfizető
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;

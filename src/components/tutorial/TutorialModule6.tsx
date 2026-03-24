import TutorialAccordion from "./TutorialAccordion";
import TutorialPromptBox from "./TutorialPromptBox";
import TutorialTipBox from "./TutorialTipBox";
import TutorialVideoPlaceholder from "./TutorialVideoPlaceholder";

const TutorialModule6 = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-6">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 6
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Domain Bekötés és Publikálás</h2>
          <p className="text-muted-foreground">Itt összekapcsolod a Rackhost-nal regisztrált domainedet a Lovable-ben épített weboldaladdal.</p>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">1. lépés: Publikálás Lovable aldomain-en</h3>
          <p className="text-muted-foreground mb-4">Először publikáld a weboldaladat a Lovable ingyenes aldomain-jen (projektneved.lovable.app). Ez ingyenes és azonnal működik!</p>
          <ol className="tutorial-step-list">
            <li>A Lovable projektedben kattints a jobb felső sarokban a &bdquo;Share&rdquo; &rarr; &bdquo;Publish&rdquo; gombra</li>
            <li>A weboldalad azonnal elérhető lesz a <strong className="text-foreground">projektneved.lovable.app</strong> címen</li>
            <li>Teszteld: minden jól működik? Nézd még mobilon is!</li>
          </ol>
        </div>

        {/* ===================== FAVICON ÉS LOGÓ ===================== */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">&#x26a0;&#xfe0f; Fontos publikálás előtt: Favicon, logó és oldal-beállítások</h3>
          <p className="text-muted-foreground mb-4">Mielőtt publikálod az oldaladat, van néhány <strong className="text-foreground">kritikusan fontos beállítás</strong>, amit a legtöbb kezdő elfelejt. Ha ezeket nem állítod be, az oldalad <strong className="text-foreground">nem fog profinak tűnni</strong>!</p>

          {/* Browser tab comparison mockup */}
          <div className="tutorial-ui-mockup tutorial-fade-up mb-5">
            <div className="p-5 space-y-4">
              {/* BAD - Lovable default */}
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-wider text-red-400 mb-2">&#x274c; ROSSZ &mdash; ha nem állítod be:</div>
                <div className="flex items-center">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-t-lg border border-white/[0.08] border-b-0 max-w-[280px]" style={{ background: "hsl(var(--card) / 0.8)" }}>
                    <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #ff6b35, #e44d8a)" }}>
                      <span className="text-white text-[7px] font-bold">L</span>
                    </div>
                    <span className="text-muted-foreground text-[11px] truncate">Vite + React + TS</span>
                    <span className="text-muted-foreground text-[10px] ml-auto">&#x2715;</span>
                  </div>
                  <div className="flex-1 h-px" style={{ background: "hsl(var(--border) / 0.2)" }} />
                </div>
                <div className="px-4 py-2 border border-white/[0.06] rounded-b-lg text-muted-foreground text-[10px]" style={{ background: "hsl(var(--background))" }}>
                  &#x1f512; projektneved.lovable.app
                </div>
              </div>

              {/* GOOD - Custom */}
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-wider text-green-400 mb-2">&#x2705; JÓ &mdash; ha beállítod:</div>
                <div className="flex items-center">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-t-lg border border-white/[0.08] border-b-0 max-w-[280px]" style={{ background: "hsl(var(--card) / 0.8)" }}>
                    <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>
                      <span className="text-white text-[8px] font-bold">P</span>
                    </div>
                    <span className="text-foreground text-[11px] truncate">Péter Fotós | Portfólió</span>
                    <span className="text-muted-foreground text-[10px] ml-auto">&#x2715;</span>
                  </div>
                  <div className="flex-1 h-px" style={{ background: "hsl(var(--border) / 0.2)" }} />
                </div>
                <div className="px-4 py-2 border border-white/[0.06] rounded-b-lg text-muted-foreground text-[10px]" style={{ background: "hsl(var(--background))" }}>
                  &#x1f512; peterfoto.hu
                </div>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mb-5">Látod a különbséget? A rossz verzióban a Lovable alapértelmezett ikonja és a &bdquo;Vite + React + TS&rdquo; felirat jelenik meg a böngésző fülén. Ez <strong className="text-foreground">nem néz ki profin</strong> &mdash; a látogatóid azonnal meglátják.</p>

          {/* ===== Lovable "Website info" panel mockup ===== */}
          <h4 className="text-base font-bold font-heading mb-3">Hol állítod be? &mdash; A Lovable &bdquo;Website info&rdquo; panel</h4>
          <p className="text-muted-foreground mb-4">Amikor a <strong className="text-foreground">Share &rarr; Publish</strong> gombra kattintasz, megjelenik ez a panel. Itt állíthatsz be mindent &mdash; íme, hogy melyik mező mire való:</p>

          <div className="tutorial-ui-mockup tutorial-fade-up mb-5">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]" style={{ background: "hsl(var(--background))" }}>
              <div>
                <h5 className="text-foreground text-sm font-bold">Website info</h5>
                <p className="text-muted-foreground text-[10px]">Help people discover your app</p>
              </div>
              <span className="text-muted-foreground text-[10px]">&#x24d8; Docs</span>
            </div>
            <div className="p-5 space-y-5" style={{ background: "hsl(var(--card) / 0.5)" }}>
              {/* Icon & title */}
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground text-xs font-semibold">Icon &amp; title</span>
                  <span className="text-muted-foreground text-[10px]">0/60</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #ff6b35, #e44d8a)" }}>
                    <span className="text-white text-sm">&#x1f525;</span>
                  </div>
                  <div className="flex-1 px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground text-[12px]">Lovable app</div>
                </div>
                {/* Arrow annotation */}
                <div className="absolute -right-2 top-1 md:right-[-140px] md:top-8">
                  <div className="hidden md:flex items-center gap-1">
                    <span className="text-green-400 text-lg">&larr;</span>
                    <span className="text-green-400 text-[10px] font-bold leading-tight">Ide írd a cégneved!<br/>Ez a böngésző fülén<br/>jelenik meg + a Google-ben</span>
                  </div>
                </div>
                <div className="md:hidden mt-1.5 flex items-center gap-1">
                  <span className="text-green-400 text-sm">&uarr;</span>
                  <span className="text-green-400 text-[9px] font-bold">Ide írd a cégneved! Ez jelenik meg a böngésző fülén + Google-ben</span>
                </div>
              </div>

              {/* Description */}
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground text-xs font-semibold">Description</span>
                  <span className="text-muted-foreground text-[10px]">0/160</span>
                </div>
                <div className="px-3 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground text-[12px] min-h-[48px]">Lovable Generated Project</div>
                {/* Arrow annotation */}
                <div className="absolute -right-2 top-0 md:right-[-140px] md:top-6">
                  <div className="hidden md:flex items-center gap-1">
                    <span className="text-primary text-lg">&larr;</span>
                    <span className="text-primary text-[10px] font-bold leading-tight">Ez a Google keresőben<br/>jelenik meg az oldalad<br/>neve alatt (SEO!)</span>
                  </div>
                </div>
                <div className="md:hidden mt-1.5 flex items-center gap-1">
                  <span className="text-primary text-sm">&uarr;</span>
                  <span className="text-primary text-[9px] font-bold">Ez a Google keresőben jelenik meg az oldalad neve alatt (SEO!)</span>
                </div>
              </div>

              {/* Social image */}
              <div className="relative">
                <span className="text-foreground text-xs font-semibold block mb-2">Social image</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground text-[12px] flex items-center gap-2">
                    <span className="text-sm">&#x2B06;&#xFE0F;</span> Upload
                  </div>
                  <div className="px-4 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground text-[12px]">Generate</div>
                </div>
                {/* Arrow annotation */}
                <div className="absolute -right-2 top-0 md:right-[-140px] md:top-5">
                  <div className="hidden md:flex items-center gap-1">
                    <span className="text-purple-400 text-lg">&larr;</span>
                    <span className="text-purple-400 text-[10px] font-bold leading-tight">Ez jelenik meg ha<br/>Facebookon / WhatsApp-on<br/>megosztják az oldalt</span>
                  </div>
                </div>
                <div className="md:hidden mt-1.5 flex items-center gap-1">
                  <span className="text-purple-400 text-sm">&uarr;</span>
                  <span className="text-purple-400 text-[9px] font-bold">Ez a kép jelenik meg Facebookon / WhatsApp-on megosztáskor</span>
                </div>
              </div>

              {/* Preview */}
              <div>
                <span className="text-foreground text-xs font-semibold block mb-2">Preview</span>
                <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 rounded flex-shrink-0" style={{ background: "linear-gradient(135deg, #ff6b35, #e44d8a)" }} />
                    <span className="text-primary text-[12px] font-semibold">Lovable App</span>
                  </div>
                  <p className="text-green-400 text-[10px] mb-0.5">csoda-web-purple.lovable.app</p>
                  <p className="text-muted-foreground text-[10px]">Lovable Generated Project</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-muted-foreground text-xs">&lt; Back</span>
                <div className="px-5 py-2 rounded-lg text-white text-xs font-semibold" style={{ background: "#3b82f6" }}>Continue</div>
              </div>
            </div>
          </div>

          <TutorialTipBox variant="warning" icon="&#x26a0;&#xfe0f;" title="Ne hagyd az alapértelmezetteket!">
            <p>Ha nem írod át ezeket a mezőket, az oldalad &bdquo;Lovable app&rdquo; névvel, &bdquo;Lovable Generated Project&rdquo; leírással és a <strong>Lovable ikonjával</strong> jelenik meg mindenhol &mdash; a böngésző fülén, a Google-ben, és a közösségi médiában. Ez azonnal elárulja, hogy az oldalad &bdquo;csak egy Lovable projekt&rdquo;!</p>
          </TutorialTipBox>

          <p className="text-muted-foreground mb-4">Íme részletesen, hogy melyik mező mire való:</p>

          {/* What to set up - cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* Favicon */}
            <div className="glass-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--secondary) / 0.15))", border: "1px solid hsl(var(--primary) / 0.25)" }}>&#x2B50;</div>
                <h4 className="text-foreground font-semibold">Favicon (böngésző ikon)</h4>
              </div>
              <p className="text-muted-foreground text-sm">Az a kis ikon, ami a <strong className="text-foreground">böngésző fülén</strong> jelenik meg az oldal neve mellett. Ha nem állítod be, a Lovable saját narancssárga ikonja marad &mdash; ami nem a tiéd!</p>
            </div>

            {/* Page Title */}
            <div className="glass-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05))", border: "1px solid rgba(59, 130, 246, 0.25)" }}>&#x1f4c4;</div>
                <h4 className="text-foreground font-semibold">Oldal cím (Title)</h4>
              </div>
              <p className="text-muted-foreground text-sm">A böngésző fülén megjelenő szöveg. Alapértelmezetten &bdquo;Vite + React + TS&rdquo; &mdash; ezt át kell írni a <strong className="text-foreground">saját cégnevedre / oldalad nevére</strong>!</p>
            </div>

            {/* Meta Description */}
            <div className="glass-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))", border: "1px solid rgba(16, 185, 129, 0.25)" }}>&#x1f50d;</div>
                <h4 className="text-foreground font-semibold">Meta leírás (SEO)</h4>
              </div>
              <p className="text-muted-foreground text-sm">Ez a rövid leírás jelenik meg a <strong className="text-foreground">Google keresőben</strong> az oldalad neve alatt. Ha nem írod meg, a Google saját maga próbál valamit kiválasztani &mdash; ami ritkán ideális.</p>
            </div>

            {/* OG Image */}
            <div className="glass-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(168, 85, 247, 0.05))", border: "1px solid rgba(168, 85, 247, 0.25)" }}>&#x1f5bc;&#xfe0f;</div>
                <h4 className="text-foreground font-semibold">Megosztási kép (OG Image)</h4>
              </div>
              <p className="text-muted-foreground text-sm">Amikor valaki megosztja az oldaladat <strong className="text-foreground">Facebookon, Messengeren, WhatsApp-on</strong>, ez a kép jelenik meg. Ha nem állítod be, egy szürke üres doboz lesz.</p>
            </div>
          </div>

          <TutorialPromptBox label="Prompt &mdash; Mindent egyszerre beállít">{`Update my website's metadata and branding:

1. FAVICON: Replace the default Lovable favicon with a custom one. Create an SVG favicon that uses the main brand colors of my site. Make it a simple, recognizable icon (use the first letter of my site name or a relevant symbol).

2. PAGE TITLE: Change the browser tab title from "Vite + React + TS" to "[AZ OLDALAD NEVE] | [Rövid leírás]"
   Example: "Péter Fotós | Professzionális Fotózás Budapest"

3. META DESCRIPTION: Add a meta description tag:
   "[Írd le 1-2 mondatban, hogy miről szól az oldalad]"

4. OPEN GRAPH TAGS: Add og:title, og:description, and og:image meta tags so the site looks good when shared on Facebook/Messenger/WhatsApp. Create a simple OG image (1200x630px) with the site name and brand colors.

5. Make sure the favicon appears correctly in the browser tab.`}</TutorialPromptBox>

          <TutorialTipBox variant="warning" icon="&#x26a0;&#xfe0f;" title="Nagyon fontos: cseréld ki a szögletes zárójeleket!">
            <p>A promptban a <strong>[AZ OLDALAD NEVE]</strong> és a <strong>[Rövid leírás]</strong> részt cseréld ki a saját adataidra! Például: &bdquo;Kovács Szerviz | Autójavítás Debrecen&rdquo;.</p>
          </TutorialTipBox>

          <TutorialTipBox variant="pro" icon="&#x1f4a1;" title="Miért fontos ez?">
            <p><strong>Favicon nélkül</strong> az oldalad amatőrnek tűnik &mdash; a látogató azt gondolja, félkész. <strong>Rossz oldalcímmel</strong> a Google-ben &bdquo;Vite + React + TS&rdquo; jelenik meg az oldalad neve helyett. <strong>Megosztási kép nélkül</strong> Facebookon egy szürke doboz lesz ahelyett, hogy egy szép előnézeti kép vonzaná a kattintásokat. Ezek mind <strong>5 perc</strong> beállítani, de hatalmas különbséget tesznek!</p>
          </TutorialTipBox>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">2. lépés: Saját domain beállítása</h3>
          <p className="text-muted-foreground mb-4">Ha szeretnéd, hogy a weboldalad a <strong className="text-foreground">sajatdomain.hu</strong> címen legyen elérhető (ehhez fizetős Lovable csomag kell):</p>
          <ol className="tutorial-step-list">
            <li>A Lovable-ben: <strong className="text-foreground">Project &rarr; Settings &rarr; Domains &rarr; Connect domain</strong></li>
            <li>Írd be a domain nevedet (pl. sajatdomain.hu)</li>
            <li>Válaszd a <strong className="text-foreground">Manual DNS setup</strong> opciót</li>
            <li>A Lovable megadja neked az <strong className="text-foreground">A rekord</strong> IP-címet és a <strong className="text-foreground">TXT rekord</strong> értéket &mdash; másold ki őket!</li>
            <li>Nyisd még a <a href="https://www.rackhost.hu" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">Rackhost</a> admin paneledet</li>
            <li>Keresd még a domain-edet &rarr; <strong className="text-foreground">DNS rekordok</strong></li>
            <li>Adj hozzá egy <strong className="text-foreground">A rekordot</strong> a Lovable által megadott IP-vel</li>
            <li>Adj hozzá egy <strong className="text-foreground">TXT rekordot</strong> a Lovable által megadott verifikációs értékkel</li>
            <li>Várj a verifikációra &mdash; akár 72 óra, de általában néhány óra</li>
            <li>Sikeres verifikáció után az <strong className="text-foreground">SSL tanúsítvány automatikusan</strong> generálódik</li>
          </ol>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <TutorialVideoPlaceholder title="Domain bekötés lépésről lépésre" />
        </div>

        <div className="mb-8 tutorial-fade-up">
          <TutorialTipBox variant="warning" icon="⚠️" title="Fontos: DNS propagáció">
            <p>A DNS módosítások akár 72 óráig is tarthatnak, amíg &bdquo;végigfutnak&rdquo; az interneten. Általában pár órán belül működik. A <a href="https://dnschecker.org" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">dnschecker.org</a> oldalon ellenőrizheted a propagáció állapotát.</p>
          </TutorialTipBox>

          <TutorialTipBox variant="info" icon="💡" title="www aldomain">
            <p>Ha a www.sajatdomain.hu címet is szeretnéd használni, azt külön kell hozzáadnod a Lovable domain beállításaiban. Az első hozzáadott domain lesz az elsődleges, a többi automatikusan átirányít.</p>
          </TutorialTipBox>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Hibaelhárítás</h3>
          <TutorialAccordion title="A domain nem mutat a weboldalra">
            <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
              <li>Ellenőrizd, hogy az A rekord IP-je megegyezik a Lovable-ben megadottal</li>
              <li>Ellenőrizd a TXT rekordot a verifikációhoz</li>
              <li>Várj 24-72 órát &mdash; a DNS propagáció időbe telik</li>
              <li>Nézd még a <a href="https://dnschecker.org" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">dnschecker.org</a>-on, hogy a DNS rekordok már frissültek-e</li>
            </ul>
          </TutorialAccordion>
          <TutorialAccordion title="SSL hiba (nem biztonságos)">
            <p className="text-muted-foreground mb-2">Az SSL tanúsítvány automatikusan generálódik a sikeres domain verifikáció után. Ha nem működik:</p>
            <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
              <li>Várj néhány órát a verifikáció után</li>
              <li>Ellenőrizd, hogy a domain verifikáció sikeres volt-e a Lovable Settings-ben</li>
              <li>Próbáld még eltávolítani és újra hozzáadni a domaint</li>
            </ul>
          </TutorialAccordion>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule6;

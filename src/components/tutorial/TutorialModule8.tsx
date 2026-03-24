import { useState, useCallback } from "react";
import TutorialAccordion from "./TutorialAccordion";
import TutorialPromptBox from "./TutorialPromptBox";
import TutorialTipBox from "./TutorialTipBox";

const LOVABLE_URL = "https://lovable.dev/invite/PBZ4OPL";

const maintenanceItems = [
  "Tartalom frissítése (legalább havonta egyszer)",
  "Analytics adatok áttekintése (heti/havi)",
  "Search Console hibák ellenőrzése",
  "Mobil megjelenés tesztelése",
  "Biztonsági frissítések (SSL aktív-e?)",
  "Biztonsági mentés (GitHub sync bekapcsolás)",
];

const TutorialModule8 = () => {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const toggleCheck = useCallback((i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }, []);

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-8">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 8
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Karbantartás és Továbbfejlesztés</h2>
          <p className="text-muted-foreground">A weboldalad elkészült &mdash; de a munka nem áll még! Tartsd karban és fejleszd folyamatosan.</p>
        </div>

        {/* Checklist */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Rendszeres teendők</h3>
          <ul className="tutorial-checklist list-none p-0 mb-5">
            {maintenanceItems.map((item, i) => (
              <li
                key={i}
                onClick={() => toggleCheck(i)}
                className={`flex items-start gap-3 py-2.5 border-b border-white/[0.04] text-sm cursor-pointer transition-colors ${checked.has(i) ? "checked" : "text-muted-foreground"}`}
              >
                <span className="tutorial-check-box" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Perf */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Teljesítmény-optimalizálás</h3>
          <TutorialAccordion title="Képek optimalizálása">
            <p className="text-muted-foreground mb-3">A nagy képfájlok lelassítják az oldaladat. Használj WebP vagy AVIF formátumot, és állíts be lazy loading-ot:</p>
            <TutorialPromptBox label="Prompt">{`Optimize áll images: add lazy loading, use WebP format where possible, and add proper width/height attributes to prevent layout shifts.`}</TutorialPromptBox>
          </TutorialAccordion>
          <TutorialAccordion title="Speed Tool használata">
            <p className="text-muted-foreground">A Lovable beépített Speed eszközével mérheted a Core Web Vitals értékeket. Cél: LCP &lt; 2.5s, FID &lt; 100ms, CLS &lt; 0.1.</p>
          </TutorialAccordion>
        </div>

        {/* GitHub sync */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Biztonsági mentés &mdash; GitHub Sync</h3>
          <p className="text-muted-foreground mb-4">A Lovable kétirányú GitHub szinkront kínál. Ez azt jelenti, hogy a weboldalad teljes forráskódja automatikusan mentésre kerül a GitHub fiókodon. Ha bármi történne, onnan bármikor visszaállíthatod.</p>
          <TutorialTipBox variant="pro" icon="🎯" title="Pro tipp">
            <p>Kapcsold be a GitHub sync-et minél hamarabb! Ez nemcsak biztonsági mentés, hanem lehetővé teszi, hogy másokat is bevonj a projektbe, és akár más platformra is átvidd a kódot.</p>
          </TutorialTipBox>
        </div>

        {/* Cookie GDPR */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Cookie hozzájárulás és GDPR</h3>
          <p className="text-muted-foreground mb-4">Ha a weboldalad bármilyen cookie-t (sütit) használ &mdash; például Google Analytics-et &mdash;, akkor a magyar és EU-s jogszabályok (GDPR) értelmében köteles vagy erről tájékoztatni a látogatóidat, és beleegyezésüket kérni.</p>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">🍪 Mi az a cookie (süti)?</h4>
            <p className="text-muted-foreground leading-relaxed">A cookie egy apró szöveges fájl, amelyet a weboldal a látogató böngészőjében tárol. Olyan, mint egy kis &bdquo;emlékeztető cetli&rdquo; &mdash; segít a weboldalnak megjegyezni dolgokat rólad (pl. hogy bejelentkeztél, mit tettél a kosárba, milyen nyelvet beszélsz).</p>
          </div>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">🛡️ GDPR egyszerűen</h4>
            <p className="text-muted-foreground leading-relaxed mb-3">A GDPR (General Data Protection Regulation) az EU adatvédelmi rendelete. Lényege: a felhasználóknak joguk van tudni, milyen adatokat gyűjtesz róluk, és <strong className="text-foreground">előzetesen bele kell egyezniük</strong>. Ez azt jelenti:</p>
            <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
              <li>A weboldalon megjelenik egy &bdquo;cookie banner&rdquo; &mdash; egy kis sáv, ami tájékoztat a sütikről</li>
              <li>A látogató elfogadhatja vagy elutasíthatja a sütiket</li>
              <li>Kell egy Adatvédelmi tájékoztató (Privacy Policy) oldal</li>
              <li>Analytics kódot <strong className="text-foreground">csak az elfogadás után</strong> szabad betölteni</li>
            </ul>
          </div>

          <TutorialPromptBox label="Cookie consent banner prompt">{`Add a GDPR-compliant cookie consent banner to the site. It should appear at the bottom of the page on first visit with "Elfogadom" (Accept) and "Elutasítom" (Decline) buttons. Store the user's choice in the browser's local storage. Only load Google Analytics tracking code if the user accepts cookies. The banner should explain in Hungarian that the site uses cookies for analytics. Style it to match the site's dark theme with a glass-morphism effect.`}</TutorialPromptBox>

          <TutorialPromptBox label="Adatvédelmi tájékoztató prompt">{`Create an Adatvédelmi Tájékoztató (Privacy Policy) page in Hungarian. Include sections about: what data is collected (Google Analytics cookies), purpose of data collection (website improvement), data retention period, user rights (access, deletion, modification), cookie policy details, and contact information for the data controller. Use clear, simple Hungarian language.`}</TutorialPromptBox>

          <TutorialTipBox variant="warning" icon="⚠️" title="Fontos: Ha GA4-et használsz, KELL cookie banner!">
            <p>A Google Analytics cookie-kat helyez el a látogatók bongeszoijeben. GDPR szerint ehhez előzetes beleegyezés kell. Cookie banner nélkül jogsértést követsz el! Az NAIH (magyar adatvédelmi hatóság) büntetése akár több millió forint is lehet.</p>
          </TutorialTipBox>
        </div>

        {/* Impresszum */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Impresszum (Jogi nyilatkozat)</h3>
          <p className="text-muted-foreground mb-4">A magyar jogszabályok (2001. évi CVIII. törvény) szerint <strong className="text-foreground">minden kereskedelmi célú weboldalon</strong> kötelező feltüntetni bizonyos adatokat. Ezt nevezzük impresszumnak.</p>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">📋 Mit kell tartalmaznia az impresszumnak?</h4>
            <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
              <li><strong className="text-foreground">Egyéni vállalkozóknál:</strong> teljes név, székhely címe, adószám, e-mail cím</li>
              <li><strong className="text-foreground">Cégeknél:</strong> cégnév, székhely, cégjegyzékszám, adószám, e-mail, telefon</li>
              <li><strong className="text-foreground">Tárhelyszolgáltató neve</strong> (ha van, pl. Lovable Cloud)</li>
              <li><strong className="text-foreground">Felügyeleti szerv</strong> elérhetősége (ha releváns)</li>
            </ul>
          </div>

          <TutorialPromptBox label="Impresszum oldal prompt">{`Create an Impresszum (Legal Notice) page in Hungarian. Include placeholder sections for: company/individual name, registered address, tax number (adószám), company registration number (cégjegyzékszám), email contact, phone number, hosting provider information, and a note about the applicable Hungarian law (2001. évi CVIII. törvény). Style it to match the site's design.`}</TutorialPromptBox>

          <TutorialTipBox variant="warning" icon="⚠️" title="Figyelem: Az impresszum kihagyása bírságot vonhat maga után!">
            <p>Ha a weboldaladnak bármilyen üzleti célja van (szolgáltatás, termékek, hirdetés), az impresszum kötelező. Ennek hiánya a fogyasztóvédelmi hatóság bírságával járhat. Mindig tedd ki a láblécbe, jól látható helyre!</p>
          </TutorialTipBox>
        </div>

        {/* Future developments */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Jövőbeli fejlesztési lehetőségek</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[
              { icon: "💳", name: "Fizetés (Stripe)", desc: "Online fizetés integrálás" },
              { icon: "📧", name: "E-mail marketing", desc: "Hírlevél és automatizáció" },
              { icon: "🌐", name: "Többnyelvűség", desc: "i18n támogatás" },
              { icon: "🤖", name: "AI Chatbot", desc: "Ügyfélszolgálati asszisztens" },
            ].map((item) => (
              <div key={item.name} className="glass-card text-center py-5">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h4 className="font-heading text-sm font-semibold mb-1">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Csomag valtas */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Mikor érdemes csomagot váltani?</h3>
          <div className="glass-card">
            <ul className="text-muted-foreground pl-5 space-y-2 list-disc">
              <li><strong className="text-foreground">Free &rarr; Pro:</strong> Ha saját domaint szeretnél, vagy elfogynak a napi kreditjeid</li>
              <li><strong className="text-foreground">Pro &rarr; Business:</strong> Ha csapatban dolgozol, SSO-ra van szükséged, vagy extra védelmet szeretnél</li>
            </ul>
          </div>
        </div>

        {/* Leválás Lovable-ről */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Weboldal elvihetősége &mdash; Ha már nem akarod fizetni a Lovable-t</h3>
          <p className="text-muted-foreground mb-4">Előfordulhat, hogy az oldalad <strong className="text-foreground">elkészült, nem akarod tovább fejleszteni</strong>, és nem szeretnéd havonta fizetni a $25-ös díjat. A jó hír: <strong className="text-foreground">a kódod a tiéd</strong>, bármikor elviheted máshová. Íme a lehetőségeid:</p>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">&#x1f4cb; 0. lépés: Készíts biztonsági mentést (kötelező!)</h4>
            <p className="text-muted-foreground leading-relaxed">Mielőtt bármit csinálnál, kapcsold be a <strong className="text-foreground">GitHub szinkront</strong> a Lovable-ben (Settings &rarr; GitHub &rarr; Connect). Ez elmenti a teljes forráskódodat a saját GitHub fiókodba. Ha már be van kapcsolva, akkor minden rendben &mdash; a kódod már biztonságban van!</p>
          </div>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">&#x1f3e0; 1. opció: Ingyenes tárhelyre költöztetés (legegyszerűbb)</h4>
            <p className="text-muted-foreground leading-relaxed mb-3">Ha az oldalad <strong className="text-foreground">egyszerű bemutatkozó oldal</strong> (nincs adatbázis, bejelentkezés), akkor ingyen is hosztolhatod:</p>
            <ol className="tutorial-step-list">
              <li>A GitHub fiókodon már ott van a kódod (ha bekapcsoltad a szinkront)</li>
              <li>Regisztrálj egy ingyenes fiókot a <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">Netlify.com</a> vagy <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">Vercel.com</a> oldalon (mindkettő ingyenes!)</li>
              <li>Kösd össze a GitHub repódat &rarr; a platform automatikusan felépíti és közzéteszi az oldaladat</li>
              <li>Build beállítások: <strong className="text-foreground">Build command:</strong> npm run build &mdash; <strong className="text-foreground">Output:</strong> dist</li>
              <li>Kösd be a saját domained (Rackhost DNS beállításokban az A rekordot írd át az új IP-re)</li>
              <li>Kész! Az oldalad fut, és nem fizetsz érte semmit.</li>
            </ol>
          </div>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">&#x1f5c4;&#xfe0f; 2. opció: Saját szerverre telepítés (haladó)</h4>
            <p className="text-muted-foreground leading-relaxed mb-3">Ha van saját szervered (pl. VPS, Hetzner, DigitalOcean), a Lovable projektjeidet oda is telepítheted:</p>
            <ol className="tutorial-step-list">
              <li>Klónozd a GitHub repódat a szerveredre: <strong className="text-foreground">git clone [repo URL]</strong></li>
              <li>Telepítsd a függőségeket: <strong className="text-foreground">npm install</strong></li>
              <li>Építsd meg az oldalt: <strong className="text-foreground">npm run build</strong></li>
              <li>A <strong className="text-foreground">dist/</strong> mappában lesz a kész weboldal &mdash; ezt szolgáld ki Nginx-szel vagy Apache-csal</li>
              <li>Állítsd be az SSL tanúsítványt (pl. Let&rsquo;s Encrypt &mdash; ingyenes)</li>
            </ol>
          </div>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">&#x1f4be; 3. opció: Backend (adatbázis) költöztetése</h4>
            <p className="text-muted-foreground leading-relaxed mb-3">Ha az oldalad <strong className="text-foreground">Lovable Cloud-ot használ</strong> (adatbázis, felhasználó-kezelés, fájltárolás), azt is át kell költöztetni:</p>
            <ol className="tutorial-step-list">
              <li>Regisztrálj a <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">Supabase.com</a> oldalon (az első projekt ingyenes!)</li>
              <li>Hozz létre egy új projektet a Supabase-en</li>
              <li>Exportáld az adataidat a Lovable Cloud-ból (Cloud &rarr; Database &rarr; Export CSV)</li>
              <li>Futtasd le a migrációs SQL fájlokat az új Supabase projektben</li>
              <li>Frissítsd a .env fájlban a Supabase URL-t és API kulcsot az újakra</li>
              <li>Teszteld, hogy minden működik</li>
            </ol>
          </div>

          <TutorialTipBox variant="pro" icon="&#x1f4a1;" title="Melyiket válaszd?">
            <p><strong>Ha nincs backend/adatbázis</strong> (egyszerű bemutatkozó oldal): az <strong>1. opció</strong> a legegyszerűbb &mdash; Netlify vagy Vercel, 10 perc, teljesen ingyenes.</p>
            <p className="mt-1"><strong>Ha van backend</strong> (űrlap, bejelentkezés, webshop): a <strong>3. opciót</strong> is végig kell csinálni. Ez már bonyolultabb, de a Lovable dokumentáció részletesen leírja a lépéseket.</p>
          </TutorialTipBox>

          <TutorialTipBox variant="warning" icon="&#x26a0;&#xfe0f;" title="Fontos tudnivaló">
            <p>Ha lemondod a Lovable Pro-t, az oldalad <strong>a Lovable ingyenes aldomainen (projektneved.lovable.app) továbbra is elérhető marad</strong>. Ami megszűnik: a saját domain bekötés és az AI szerkesztési kreditek. Tehát ha nem akarod tovább fejleszteni és nem baj, hogy lovable.app címen van, akár fizetés nélkül is bent hagyhatod!</p>
          </TutorialTipBox>
        </div>

        {/* CTA */}
        <div className="tutorial-cta-card tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-2 relative">🎉 Gratulálunk!</h3>
          <p className="text-muted-foreground mb-6 relative mx-auto">Ha ideáig eljutottál, már mindent tudsz ahhoz, hogy saját weboldalt epitts és tartsd karban. Kezdj bele most!</p>
          <a
            href={LOVABLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-white rounded-[10px] transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))", boxShadow: "0 4px 20px hsl(var(--primary) / 0.3)" }}
          >
            Kezdd el a Lovable-lel!
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule8;

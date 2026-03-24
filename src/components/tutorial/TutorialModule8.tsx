import { useState, useCallback } from "react";
import { Check } from "lucide-react";
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
                <span className="tutorial-check-box">
                  {checked.has(i) && <Check size={12} className="text-white" />}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Perf */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Teljesítmény-optimalizálás</h3>
          <TutorialAccordion title="Képek optimalizálása">
            <p className="text-muted-foreground mb-3">A nagy képfájlok lelassítják az oldaladat. Használj WebP vagy AVIF formátumot, es állíts be lazy loading-ot:</p>
            <TutorialPromptBox label="Prompt">{`Optimize áll images: add lazy loading, use WebP format where possible, and add proper width/height attributes to prevent layout shifts.`}</TutorialPromptBox>
          </TutorialAccordion>
          <TutorialAccordion title="Speed Tool használata">
            <p className="text-muted-foreground">A Lovable beépített Speed eszközével mérheted a Core Web Vitals értékeket. Cél: LCP &lt; 2.5s, FID &lt; 100ms, CLS &lt; 0.1.</p>
          </TutorialAccordion>
        </div>

        {/* GitHub sync */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Biztonsági mentés &mdash; GitHub Sync</h3>
          <p className="text-muted-foreground mb-4">A Lovable ketaranyu GitHub szinkront kínál. Ez azt jelenti, hogy a weboldalad teljes forráskódja automatikusan mentésre kerül a GitHub fiókodon. Ha bármi tortenae, onnan bármikor visszaállíthatod.</p>
          <TutorialTipBox variant="pro" icon="🎯" title="Pro tipp">
            <p>Kapcsold be a GitHub sync-et minél hamarabb! Ez nemcsak biztonsági mentés, hanem lehetővé teszi, hogy másokat is bevonj a projektbe, es akár más platformra is átvidd a kódot.</p>
          </TutorialTipBox>
        </div>

        {/* Cookie GDPR */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Cookie hozzájárulás és GDPR</h3>
          <p className="text-muted-foreground mb-4">Ha a weboldalad bármilyen cookie-t (sütit) használ &mdash; például Google Analytics-et &mdash;, akkor a magyar és EU-s jogszabályok (GDPR) értelmében köteles vagy erről tájékoztatni a látogatóidat, es beleegyezésüket kérni.</p>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">🍪 Mi az a cookie (süti)?</h4>
            <p className="text-muted-foreground leading-relaxed">A cookie egy apró szöveges fájl, amelyet a weboldal a látogató böngészőjében tárol. Olyan, mint egy kis &bdquo;emlékeztető cetli&rdquo; &mdash; segít a weboldalnak megjegyezni dolgokat rólad (pl. hogy bejelentkeztél, mit tettél a kosárba, milyen nyelvet beszélsz).</p>
          </div>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">🛡️ GDPR egyszerűen</h4>
            <p className="text-muted-foreground leading-relaxed mb-3">A GDPR (General Data Protection Regulation) az EU adatvédelmi rendelete. Lényege: a felhasználóknak joguk van tudni, milyen adatokat gyűjtesz róluk, es <strong className="text-foreground">előzetesen bele kell egyezniük</strong>. Ez azt jelenti:</p>
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

import { useState, useCallback } from "react";
import TutorialAccordion from "./TutorialAccordion";
import TutorialTipBox from "./TutorialTipBox";
import TutorialCostCalculator from "./TutorialCostCalculator";
import { Check } from "lucide-react";

const checklistItems = [
  "Mi a célom a weboldallal? (bemutatkozás, szolgáltatás, portfólió, webshop?)",
  "Ki a célközönségem? (magánszemélyek, cégek, fiatalok, idősebbek?)",
  "Milyen oldalak kellenek? (Főoldal, Rólam, Szolgáltatások, Kapcsolat, stb.)",
  "Milyen domain nevét szeretnék? (.hu, .com, .eu?)",
  "Van-e szükségem backend funkcionalitásra? (bejelentkezés, adatbázis, űrlap?)",
  "Összegyűjtöttem a szövegeket és képeket?",
];

const TutorialModule1 = () => {
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
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-1">
      <div className="max-w-[820px] mx-auto">
        {/* Header */}
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 1
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Előkészületek</h2>
          <p className="text-muted-foreground">Mielőtt nekiállnál építeni, fontos megérteni, hogyan működik egy weboldal és mit kell előre megtervezned.</p>
        </div>

        {/* Mi az a weboldal? */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Mi az a weboldal?</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">Egy weboldal egyszerűen fájlok gyűjteménye, amelyeket egy szerver (számítógép) szolgáltat ki az interneten, és a böngésződ (Chrome, Firefox, Safari) megjeleníti. Nézzük meg az alapvető fogalmakat:</p>

          <TutorialAccordion title="Domain név — a weboldalad címe">
            <p className="text-muted-foreground mb-2">A domain név az az egyedi cím, amit az emberek beírnak a böngészőjükbe, hogy eljussanak a weboldaladra. Például: <strong className="text-foreground">példa.hu</strong> vagy <strong className="text-foreground">uzletem.com</strong>.</p>
            <p className="text-muted-foreground">Gondolj rá úgy, mint a házad postai címére &mdash; ez alapján találják meg az internetezők a weboldalad.</p>
          </TutorialAccordion>

          <TutorialAccordion title="Hosting (tárhelyszolgáltatás) — ahol a weboldalad „lakik”">
            <p className="text-muted-foreground">A hosting egy szerver (speciális számítógép), amely a weboldalad fájljait tárolja és folyamatosan elérhetővé teszi az interneten. Jó hír: a <strong className="text-foreground">Lovable</strong> automatikusan biztosít hosting-ot &mdash; ezt hívják <strong className="text-foreground">Lovable Cloud</strong>-nak. Ezzel neked nem kell foglalkoznod!</p>
          </TutorialAccordion>

          <TutorialAccordion title="Frontend vs. Backend — mit lát a felhasználó?">
            <p className="text-muted-foreground mb-2"><strong className="text-foreground">Frontend</strong> (az oldal &bdquo;arca&rdquo;): Minden, amit a látogató lát és használ &mdash; a design, a gombok, a szövegek, a képek, a menü, az animációk. Amikor megnyitsz egy weboldalt a böngésződben, az, amit látsz, az a frontend. Gondolj rá úgy, mint egy üzlet kirakata &mdash; ezt látja mindenki, aki belép.</p>
            <p className="text-muted-foreground mb-2"><strong className="text-foreground">Backend</strong> (a &bdquo;hátsó iroda&rdquo;): A háttérben futó logika, amit a látogató nem lát &mdash; adatbázis, felhasználó-kezelés (bejelentkezés/regisztráció), űrlap-feldolgozás, fizetés kezelése. Ha nincs szükséged bejelentkezésre vagy adatbázisra, akkor backend nélkül is elkészítheted a weboldalad!</p>
            <p className="text-muted-foreground">A Lovable mindkettőt képes létrehozni: a frontend-et React-tel (ez készíti el amit látsz), a backend-et pedig Supabase integrációval (ha szükséged van rá).</p>
          </TutorialAccordion>
        </div>

        {/* Fontos fogalmak */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Fontos fogalmak egyszerűen</h3>
          <p className="text-muted-foreground mb-4">Mielőtt továbbmennénk, ismerd meg ezeket az alapfogalmakat &mdash; mindegyiket hétköznapi nyelven magyarázzuk el:</p>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">🔒 SSL/HTTPS &mdash; A lakat ikon a böngészőben</h4>
            <p className="text-muted-foreground leading-relaxed">Képzeld el, hogy küldöl egy képeslapot (HTTP) &mdash; bárki olvashatja útközben. Most képzeld el, hogy zárt, leragasztott borítékban küldöd (HTTPS) &mdash; csak a címzett nyithatja ki. Az <strong className="text-foreground">SSL tanúsítvány</strong> pontosan ezt csinálja: titkosítja a weboldal és a látogató közötti kommunikációt. A böngésző ezért mutat egy kis <strong className="text-foreground">lakat ikont</strong> 🔒 a biztonságos oldalaknál. Jó hír: a <strong className="text-foreground">Lovable automatikusan biztosít SSL-t</strong> &mdash; nem kell vele foglalkoznod!</p>
          </div>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">🔗 URL &mdash; A weboldalad pontos címe</h4>
            <p className="text-muted-foreground leading-relaxed mb-3">Egy URL (Uniform Resource Locator) a weboldal pontos &bdquo;postacíme&rdquo;. Nézzük még a részeit:</p>
            <div className="bg-black/30 rounded-lg p-3.5 px-4 mb-3 font-mono text-sm overflow-x-auto">
              <span className="text-green-400">https://</span>
              <span className="text-yellow-400">www.</span>
              <span className="text-primary">példa</span>
              <span className="text-blue-400">.hu</span>
              <span className="text-muted-foreground">/szolgáltatások</span>
            </div>
            <ul className="text-sm text-muted-foreground pl-5 space-y-1 list-disc">
              <li><span className="text-green-400 font-semibold">https://</span> &mdash; Protokoll (biztonságos kapcsolat)</li>
              <li><span className="text-yellow-400 font-semibold">www.</span> &mdash; Aldomain (opcionális, ma már nem kötelező)</li>
              <li><span className="text-primary font-semibold">példa</span> &mdash; A domain neved</li>
              <li><span className="text-blue-400 font-semibold">.hu</span> &mdash; Kiterjesztés (TLD)</li>
              <li><span className="text-muted-foreground font-semibold">/szolgáltatások</span> &mdash; Aloldal (útvonal)</li>
            </ul>
          </div>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">📱 Reszponzív design &mdash; Alkalmazkodó megjelenés</h4>
            <p className="text-muted-foreground leading-relaxed">Gondolj egy okos bútorra, ami automatikusan atrendeződik, hogy belférjen egy kis szobába is és egy nagy nappaliba is. A <strong className="text-foreground">reszponzív design</strong> ugyanezt csinaja: a weboldal automatikusan alkalmazkodik a képernyő méretéhez &mdash; legyen az telefon, tablet, vagy monitor. A Lovable minden általa generált oldalt automatikusan reszponzívvá tesz!</p>
          </div>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">🤖 CMS vs. Kód vs. AI &mdash; Hogyan építhetsz weboldalt?</h4>
            <p className="text-muted-foreground leading-relaxed mb-3">Háromféleképpen készíthetsz weboldalt:</p>
            <div className="tutorial-diagram">
              <div className="tutorial-diagram-box">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">CMS</div>
                <div className="font-heading font-bold text-foreground">WordPress</div>
              </div>
              <div className="tutorial-diagram-box">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Kód</div>
                <div className="font-heading font-bold text-foreground">Fejlesztő</div>
              </div>
              <div className="tutorial-diagram-box" style={{ borderColor: "hsl(var(--primary) / 0.5)", background: "hsl(var(--primary) / 0.15)" }}>
                <div className="text-[11px] uppercase tracking-wider text-primary mb-1">AI-alapú</div>
                <div className="font-heading font-bold text-foreground">Lovable ✨</div>
              </div>
            </div>
            <ul className="text-sm text-muted-foreground pl-5 space-y-1 list-disc">
              <li><strong className="text-foreground">CMS (pl. WordPress):</strong> Kész sablonokból építkezel, de korlátozott és gyakran lassú</li>
              <li><strong className="text-foreground">Kóddal:</strong> Maximális szabadság, de programozói tudás kell</li>
              <li><strong className="text-foreground">AI-alapú (Lovable):</strong> Leírod szöveggel, mit szeretnél, es az AI megépíti &mdash; programozás nélkül, de profi eredménnyel!</li>
            </ul>
          </div>
        </div>

        {/* Hogyan működik? */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Hogyan működik egy weboldal?</h3>
          <div className="tutorial-diagram">
            {[
              { label: "1. Felhasználó", value: "Böngésző" },
              { label: "2. Domain", value: "példa.hu" },
              { label: "3. DNS", value: "IP keresés" },
              { label: "4. Szerver", value: "Lovable Cloud" },
              { label: "5. Válasz", value: "Weboldal ✓" },
            ].map((item, i) => (
              <div key={item.label} className="contents">
                <div className="tutorial-diagram-box">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{item.label}</div>
                  <div className="font-heading font-bold text-foreground">{item.value}</div>
                </div>
                {i < 4 && <div className="tutorial-diagram-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Tervezd még */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Tervezd még a weboldaladat!</h3>
          <p className="text-muted-foreground mb-4">Mielőtt akár egyetlen sort is írnál, gondold végig ezeket:</p>
          <ul className="tutorial-checklist list-none p-0 mb-5">
            {checklistItems.map((item, i) => (
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

          <TutorialTipBox variant="pro" icon="🎯" title="Pro tipp: Domain név választás">
            <p>Válassz rövid, könnyen megjegyezhető domain nevét. Kerüld a kötőjeleket és a számokat. Ha magyar célközönségnek készül, a <strong className="text-foreground">.hu</strong> kiterjesztés a legerősebb. Ha nemzetközi, válaszd a <strong className="text-foreground">.com</strong>-ot.</p>
          </TutorialTipBox>
        </div>

        {/* Amire szükséged lesz */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Amire szükséged lesz</h3>
          <div className="glass-card">
            <ul className="list-none p-0 space-y-2">
              {[
                "Egy modern böngésző (Chrome, Edge, Firefox)",
                "Lovable.dev fiók (ingyenes is elég a kezdéshez)",
                "Google fiók (Analytics-hoz és Search Console-hoz)",
                "~3-5 óra szabad idő",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-muted-foreground">
                  <Check size={18} className="text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cost calculator */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Mennyibe kerül összesen?</h3>
          <p className="text-muted-foreground mb-4">Az egyik legjobb dolog a Lovable-ben, hogy szinte ingyen elkezdhetsz. Íme a teljes költségbontás:</p>
          <TutorialCostCalculator />

          <TutorialTipBox variant="success" icon="🎉" title="Akár 1000 Ft alatt elkezdheted!">
            <p>Az ingyenes Lovable csomaggal és egy .hu domainnél már indulhatsz. Később, ha kell, bármikor frissíthetsz Pro-ra a saját domain és több kredit érdekében.</p>
          </TutorialTipBox>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule1;

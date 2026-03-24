import { useState, useCallback } from "react";
import TutorialAccordion from "./TutorialAccordion";
import TutorialTipBox from "./TutorialTipBox";
import TutorialCostCalculator from "./TutorialCostCalculator";
import { Check } from "lucide-react";

const checklistItems = [
  "Mi a celom a weboldallal? (bemutatkozas, szolgaltatas, portfolio, webshop?)",
  "Ki a celkozonsegem? (maganszemelyek, cegek, fiatalok, idosebbek?)",
  "Milyen oldalak kellenek? (Fooldal, Rolam, Szolgaltatasok, Kapcsolat, stb.)",
  "Milyen domain nevet szeretnek? (.hu, .com, .eu?)",
  "Van-e szuksegem backend funkcionalitasra? (bejelentkezes, adatbazis, urlap?)",
  "Osszegyujtottem a szovegeket es kepeket?",
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
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Elokeszuletek</h2>
          <p className="text-muted-foreground">Mielott nekiallnal epiteni, fontos megerteni, hogyan mukodik egy weboldal es mit kell elore megtervezned.</p>
        </div>

        {/* Mi az a weboldal? */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Mi az a weboldal?</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">Egy weboldal egyszeruen fajlok gyujtemenye, amelyeket egy szerver (szamitogep) szolgaltat ki az interneten, es a bongeszod (Chrome, Firefox, Safari) megjeleníti. Nezzuk meg az alapveto fogalmakat:</p>

          <TutorialAccordion title="Domain nev — a weboldalad cime">
            <p className="text-muted-foreground mb-2">A domain nev az az egyedi cim, amit az emberek beirnak a bongeszojukbe, hogy eljussanak a weboldaladra. Peldaul: <strong className="text-foreground">pelda.hu</strong> vagy <strong className="text-foreground">uzletem.com</strong>.</p>
            <p className="text-muted-foreground">Gondolj ra ugy, mint a hazad postai cimere &mdash; ez alapjan talaljak meg az internetezok a weboldalad.</p>
          </TutorialAccordion>

          <TutorialAccordion title="Hosting (tarhelyszolgaltatas) — ahol a weboldalad „lakik”">
            <p className="text-muted-foreground">A hosting egy szerver (specialis szamitogep), amely a weboldalad fajljait tarolja es folyamatosan elerhetove teszi az interneten. Jo hir: a <strong className="text-foreground">Lovable</strong> automatikusan biztosit hosting-ot &mdash; ezt hivjak <strong className="text-foreground">Lovable Cloud</strong>-nak. Ezzel neked nem kell foglalkoznod!</p>
          </TutorialAccordion>

          <TutorialAccordion title="Frontend vs. Backend — mit lat a felhasznalo?">
            <p className="text-muted-foreground mb-2"><strong className="text-foreground">Frontend</strong>: Minden, amit a latogato lat es hasznal &mdash; a design, a gombok, a szovegek, a kepek. Ez a &bdquo;vitrin&rdquo;.</p>
            <p className="text-muted-foreground mb-2"><strong className="text-foreground">Backend</strong>: A hatterben futo logika &mdash; adatbazis, felhasznalo-kezeles, urlap-feldolgozas. Ez a &bdquo;raktar es iroda&rdquo;.</p>
            <p className="text-muted-foreground">A Lovable mindkettot kepes letrehozni: a frontend-et React-tel, a backend-et pedig Supabase integracioval.</p>
          </TutorialAccordion>
        </div>

        {/* Fontos fogalmak */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Fontos fogalmak egyszeruen</h3>
          <p className="text-muted-foreground mb-4">Mielott tovabbmennenk, ismerd meg ezeket az alapfogalmakat &mdash; mindegyiket hetkoznapi nyelven magyarazzuk el:</p>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">🔒 SSL/HTTPS &mdash; A lakat ikon a bongészoben</h4>
            <p className="text-muted-foreground leading-relaxed">Kepzeld el, hogy kuldol egy kepeslapot (HTTP) &mdash; barki olvashatja utkozben. Most kepzeld el, hogy zart, leragasztott boritekban kuldod (HTTPS) &mdash; csak a cimzett nyithatja ki. Az <strong className="text-foreground">SSL tanusitvany</strong> pontosan ezt csinaja: titkositja a weboldal es a latogato kozotti kommunikaciot. A bongeszo ezert mutat egy kis <strong className="text-foreground">lakat ikont</strong> 🔒 a biztonsagos oldalaknál. Jo hir: a <strong className="text-foreground">Lovable automatikusan biztosit SSL-t</strong> &mdash; nem kell vele foglalkoznod!</p>
          </div>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">🔗 URL &mdash; A weboldalad pontos cime</h4>
            <p className="text-muted-foreground leading-relaxed mb-3">Egy URL (Uniform Resource Locator) a weboldal pontos &bdquo;postacime&rdquo;. Nezzuk meg a reszeit:</p>
            <div className="bg-black/30 rounded-lg p-3.5 px-4 mb-3 font-mono text-sm overflow-x-auto">
              <span className="text-green-400">https://</span>
              <span className="text-yellow-400">www.</span>
              <span className="text-primary">pelda</span>
              <span className="text-blue-400">.hu</span>
              <span className="text-muted-foreground">/szolgaltatasok</span>
            </div>
            <ul className="text-sm text-muted-foreground pl-5 space-y-1 list-disc">
              <li><span className="text-green-400 font-semibold">https://</span> &mdash; Protokoll (biztonsagos kapcsolat)</li>
              <li><span className="text-yellow-400 font-semibold">www.</span> &mdash; Aldomain (opcionalis, ma mar nem kotelezo)</li>
              <li><span className="text-primary font-semibold">pelda</span> &mdash; A domain neved</li>
              <li><span className="text-blue-400 font-semibold">.hu</span> &mdash; Kiterjesztes (TLD)</li>
              <li><span className="text-muted-foreground font-semibold">/szolgaltatasok</span> &mdash; Aloldal (utvonal)</li>
            </ul>
          </div>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">📱 Reszponziv design &mdash; Alkalmazkodo megjelenes</h4>
            <p className="text-muted-foreground leading-relaxed">Gondolj egy okos butorra, ami automatikusan atrendeződik, hogy belferjen egy kis szobaba is es egy nagy nappaliba is. A <strong className="text-foreground">reszponziv design</strong> ugyanezt csinaja: a weboldal automatikusan alkalmazkodik a kepernyo meretehez &mdash; legyen az telefon, tablet, vagy monitor. A Lovable minden altala generalt oldalt automatikusan reszponzivva tesz!</p>
          </div>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">🤖 CMS vs. Kod vs. AI &mdash; Hogyan epithetesz weboldalt?</h4>
            <p className="text-muted-foreground leading-relaxed mb-3">Haromfelekeppen keszithetsz weboldalt:</p>
            <div className="tutorial-diagram">
              <div className="tutorial-diagram-box">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">CMS</div>
                <div className="font-heading font-bold text-foreground">WordPress</div>
              </div>
              <div className="tutorial-diagram-box">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Kod</div>
                <div className="font-heading font-bold text-foreground">Fejleszto</div>
              </div>
              <div className="tutorial-diagram-box" style={{ borderColor: "hsl(var(--primary) / 0.5)", background: "hsl(var(--primary) / 0.15)" }}>
                <div className="text-[11px] uppercase tracking-wider text-primary mb-1">AI-alapu</div>
                <div className="font-heading font-bold text-foreground">Lovable ✨</div>
              </div>
            </div>
            <ul className="text-sm text-muted-foreground pl-5 space-y-1 list-disc">
              <li><strong className="text-foreground">CMS (pl. WordPress):</strong> Kesz sablonokbol epitkezel, de korlatozott es gyakran lassu</li>
              <li><strong className="text-foreground">Koddal:</strong> Maximalis szabadsag, de programozoi tudas kell</li>
              <li><strong className="text-foreground">AI-alapu (Lovable):</strong> Leirod szoveggel, mit szeretnel, es az AI megepiti &mdash; programozas nelkul, de profi eredmennyel!</li>
            </ul>
          </div>
        </div>

        {/* Hogyan mukodik? */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Hogyan mukodik egy weboldal?</h3>
          <div className="tutorial-diagram">
            {[
              { label: "1. Felhasznalo", value: "Bongeszo" },
              { label: "2. Domain", value: "pelda.hu" },
              { label: "3. DNS", value: "IP kereses" },
              { label: "4. Szerver", value: "Lovable Cloud" },
              { label: "5. Valasz", value: "Weboldal ✓" },
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

        {/* Tervezd meg */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Tervezd meg a weboldaladat!</h3>
          <p className="text-muted-foreground mb-4">Mielott akar egyetlen sort is irnal, gondold vegig ezeket:</p>
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

          <TutorialTipBox variant="pro" icon="🎯" title="Pro tipp: Domain nev valasztas">
            <p>Valassz rovid, konnyen megjegyezheto domain nevet. Keruld a kotojeleket es a szamokat. Ha magyar celkozonsegnek keszul, a <strong className="text-foreground">.hu</strong> kiterjesztes a legerosebb. Ha nemzetkozi, valaszd a <strong className="text-foreground">.com</strong>-ot.</p>
          </TutorialTipBox>
        </div>

        {/* Amire szukseged lesz */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Amire szukseged lesz</h3>
          <div className="glass-card">
            <ul className="list-none p-0 space-y-2">
              {[
                "Egy modern bongeszo (Chrome, Edge, Firefox)",
                "Lovable.dev fiok (ingyenes is eleg a kezdeshez)",
                "Google fiok (Analytics-hoz es Search Console-hoz)",
                "~3-5 ora szabad ido",
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
          <h3 className="text-xl font-bold font-heading mb-3">Mennyibe kerul osszesen?</h3>
          <p className="text-muted-foreground mb-4">Az egyik legjobb dolog a Lovable-ben, hogy szinte ingyen elkezdhetsz. Ime a teljes koltsegbontas:</p>
          <TutorialCostCalculator />

          <TutorialTipBox variant="success" icon="🎉" title="Akar 1000 Ft alatt elkezdheted!">
            <p>Az ingyenes Lovable csomaggal es egy .hu domainnel mar indulhatsz. Kesobb, ha kell, barmikor frissithetsz Pro-ra a sajat domain es tobb kredit erdekeben.</p>
          </TutorialTipBox>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule1;

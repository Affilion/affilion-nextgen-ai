import TutorialAccordion from "./TutorialAccordion";
import TutorialPromptBox from "./TutorialPromptBox";
import TutorialTipBox from "./TutorialTipBox";

const TutorialModule4 = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-4">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 4
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Weblap Epitese</h2>
          <p className="text-muted-foreground">Most jon a lenyeg &mdash; tanuld meg, hogyan irj hatekony promptokat es epitsd fel az oldaladat lepesrol lepesre.</p>
        </div>

        {/* Prompt tippek */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Prompt-irasi tippek (Prompt Engineering)</h3>
          <p className="text-muted-foreground mb-4">Az AI minosege a te utasitasaid minosoegetol fugg. Ime a legjobb gyakorlatok:</p>

          <TutorialTipBox variant="pro" icon="🎯" title="Az aranyszabaly: Legyel konkret!">
            <p>Minel reszletesebb a leirasod, annal jobb lesz az eredmeny. Ne csak azt ird: &bdquo;csinalj szep oldalt&rdquo;, hanem ird le pontosan, mit szeretnel latni.</p>
          </TutorialTipBox>

          <div className="glass-card">
            <h4 className="font-heading font-semibold mb-2">❌ Rossz prompt:</h4>
            <p className="text-red-400 mb-4">&bdquo;Csinalj egy weboldalt.&rdquo;</p>
            <h4 className="font-heading font-semibold mb-2">✅ Jo prompt:</h4>
            <p className="text-green-400">&bdquo;Keszits egy modern portfolio weboldalt egy fotos szamara. Legyen sotet hatter, nagy kepek, egy galeria szekcio 3 oszlopos grid-del, rolam szekcio, es egy kapcsolat urlap. A szinvilag legyen meleg szurke es arany akcentus.&rdquo;</p>
          </div>
        </div>

        {/* Prompt sablonok */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Reszletes prompt sablonok</h3>
          <p className="text-muted-foreground mb-4">Az alabbiakban kesz, kiproobalt prompt sablonokat talalsz kulonbozo tipusu weboldalakhoz. Csak masold be a Lovable chat-be!</p>

          {/* Etterem */}
          <div className="tutorial-prompt-template">
            <div className="tutorial-prompt-template-header">
              <span className="text-xl">🍽</span>
              <h5 className="text-sm font-semibold text-foreground">Etterem weboldal</h5>
            </div>
            <div className="tutorial-prompt-template-body">
              <TutorialPromptBox label="Etterem prompt sablon">{`Keszits egy elegans etterem weboldalt. A stilus legyen sotet hatter arany akcentus szinekkel.

Az oldalon legyen:
- Hero szekcio egy nagy hatterkeppel es "Foglalj asztalt" gombbal
- Etlap/Menu szekcio kategoriakkal (Eloetelek, Foetelek, Desszertek, Italok) — minden etelhez nev, rovid leiras es ar
- Rolunk szekcio a sef bemutatásaval
- Galeria szekcio az etterem fotoival (6 kep grid)
- Nyitvatartas es elerhetoseg (cim, telefon, email)
- Asztalfoglalasi urlap (nev, email, telefon, datum, vendegszam, megjegyzes)
- Google Maps beagyazas a pontos cimmel
- Legyen teljesen reszponziv, mobilbarat`}</TutorialPromptBox>
            </div>
          </div>

          {/* Portfolio */}
          <div className="tutorial-prompt-template">
            <div className="tutorial-prompt-template-header">
              <span className="text-xl">👤</span>
              <h5 className="text-sm font-semibold text-foreground">Szemelyes portfolio</h5>
            </div>
            <div className="tutorial-prompt-template-body">
              <TutorialPromptBox label="Portfolio prompt sablon">{`Keszits egy modern, minimalista szemelyes portfolio weboldalt. A stilus legyen letisztult, feher hatter finom szurke arnyalatokkal es egy eros akcentus szinnel (kek vagy lila).

Az oldalon legyen:
- Hero szekcio a nevemmel, foglalkozasommal es egy rovid bemutatkozo mondattal
- Rolam szekcio reszletesebb bemutatkozassal, kepessegek listajaval (skill bar-ok vagy tag-ek)
- Portfolio/Munkaim szekcio: 6 projekt kartya, mindegyiken kep, cim, rovid leiras es "Megnezem" gomb
- Tapasztalat szekcio timeline/idovonal stilusban (munkahely, evszam, pozicio)
- Kapcsolat szekcio: email, LinkedIn, GitHub linkek + kapcsolatfelvételi urlap
- Letoltheto oneletrajz gomb (CV)
- Legyen animalt scroll effekt es teljesen reszponziv`}</TutorialPromptBox>
            </div>
          </div>

          {/* Szolgaltato */}
          <div className="tutorial-prompt-template">
            <div className="tutorial-prompt-template-header">
              <span className="text-xl">✂️</span>
              <h5 className="text-sm font-semibold text-foreground">Szolgaltato ceg (pl. fodrasz, szerviz)</h5>
            </div>
            <div className="tutorial-prompt-template-body">
              <TutorialPromptBox label="Szolgaltato prompt sablon">{`Keszits egy professzionalis weboldalt egy szolgaltato vallalkozasnak. A stilus legyen modern, megbizhatosagot sugarzo, vilagos hatterrel es zold/kek akcentus szinnel.

Az oldalon legyen:
- Hero szekcio figyelemfelkelto szoveggel es "Idopontfoglalas" CTA gombbal
- Szolgaltatasok szekcio: legalabb 6 szolgaltatas kartyan (ikon, cim, rovid leiras, ar)
- Arlista tablazat a szolgaltatasokkal es arakkal
- Rolunk szekcio: a csapat bemutatasa fotokkal es rovid bioval
- Velemenyek szekcio: 4-5 ugyfélvelemeny kartya (idezet, nev, csillagos ertekeles)
- Galeria: munkaink bemutatasa (before/after vagy egyszeru grid)
- Nyitvatartas, cim, terkep, telefon, email
- Kapcsolatfelveteli/Idopontfoglalasi urlap
- Legyen teljesen reszponziv es mobilbarat`}</TutorialPromptBox>
            </div>
          </div>

          {/* Webshop */}
          <div className="tutorial-prompt-template">
            <div className="tutorial-prompt-template-header">
              <span className="text-xl">🛒</span>
              <h5 className="text-sm font-semibold text-foreground">Webshop / Termekbemutato</h5>
            </div>
            <div className="tutorial-prompt-template-body">
              <TutorialPromptBox label="Webshop prompt sablon">{`Keszits egy modern webshop/termekbemutato weboldalt. A stilus legyen letisztult, feher hatter narancs vagy piros akcentus szinnel.

Az oldalon legyen:
- Hero szekcio a fo termekkel es "Vasarlas" gombbal
- Termek kategoriak szekcio (3-4 kategoria kartya keppel)
- Kiemelt termekek grid: 8 termek kartya (kep, nev, ar, "Kosarba" gomb, kedvezmeny badge ha van)
- Termek szures es rendezes lehetoseg (kategoria, ar)
- Egyedi termek oldal: nagy kep, leiras, ar, meret/szin valaszto, "Kosarba" gomb
- Vasarloi velemenyek az egyes termekeknel
- Szallitasi informaciok szekcio
- GYIK (Gyakran Ismetelt Kerdesek) szekcio accordion stilusban
- Kapcsolat es ugyfelszolgalat elerhetosege
- Legyen teljesen reszponziv es mobilbarat
- Kosar funkcio sidebar-ral`}</TutorialPromptBox>
            </div>
          </div>

          <TutorialTipBox variant="info" icon="💡" title="Tipp: Testreszabas">
            <p>Ezek kiindulopontok &mdash; szabadon modositsd a szineket, szekciokat es a szoveget az igenyyeidnek megfeleloen. Minel reszletesebb a leirasod, annal jobb lesz az eredmeny!</p>
          </TutorialTipBox>
        </div>

        {/* Tipikus oldal-struktura */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Tipikus oldal-struktura</h3>
          <p className="text-muted-foreground mb-4">A legtobb weboldal ezekbol az oldalakbol all:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[
              { icon: "🏠", name: "Fooldal", desc: "Hero, bemutatkozas, CTA" },
              { icon: "👤", name: "Rolunk", desc: "Tortenet, csapat, ertekek" },
              { icon: "⚡", name: "Szolgaltatasok", desc: "Mit kinalsz?" },
              { icon: "📬", name: "Kapcsolat", desc: "Urlap, terkep, elerhetoseg" },
            ].map((p) => (
              <div key={p.name} className="glass-card text-center">
                <div className="text-3xl mb-2">{p.icon}</div>
                <h4 className="font-heading font-semibold mb-1">{p.name}</h4>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hasznos promptok */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Hasznos promptok</h3>
          <TutorialPromptBox label="Szekcio hozzaadasa">{`Add hozza a fooldalhoz egy „Velemenyek" szekciot. Legyen 3 kartya, mindegyiken egy idezet, a szemely neve, es csillagos ertekeles (5/5). Hasznalj glassmorphism kartya-designt.`}</TutorialPromptBox>
          <TutorialPromptBox label="Reszponziv design">{`Tedd az egesz weboldalt teljesen reszponzivva. Mobilon egymas ala keruljenek a kartyak, a menu legyen hamburger menu, a szoveg jol olvashato legyen kis kepernyoon is.`}</TutorialPromptBox>
          <TutorialPromptBox label="Kepek kezelese">{`Csereld le az osszes placeholder kepet Unsplash kepekre. A hero kep legyen egy modern irodai kornyezet, a szolgaltatasok szekcio kepei legyenek tech-temajuak.`}</TutorialPromptBox>
        </div>

        {/* Tippek */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Tippek a hatekony epiteshez</h3>
          <TutorialAccordion title="Lepesenként epitkezz">
            <p className="text-muted-foreground">Ne akarj egyszerre mindent! Eloszor keszitsd el az alapstrukturaat, aztaan finomitsd a reszleteket. Lepesenként kerd az AI-t, hogy adjon hozza vagy modositson.</p>
          </TutorialAccordion>
          <TutorialAccordion title="Mobil-barat design">
            <p className="text-muted-foreground">A latogatoid nagy resze mobilrol fog jonni! A Lovable automatikusan reszponziv kodot general, de mindig ellenorizd a mobil elonezetet. Ha valami nem stimmel, ird be: &bdquo;Fix the mobile layout for the services section&rdquo;.</p>
          </TutorialAccordion>
          <TutorialAccordion title="Figma import">
            <p className="text-muted-foreground">Ha van Figma design-od, egyszeruen importalhatod a Lovable-be! Hasznald a Figma import funkciot, es az AI a design alapjan generaalja a kodot. Ez kulonosen hasznos, ha van designed, vagy ha sablonbol indulsz.</p>
          </TutorialAccordion>
          <TutorialAccordion title="Verziokezeles (History)">
            <p className="text-muted-foreground">A Lovable minden valtozatot ment. Ha valami nem tetszik, barmikor visszalephetsz. Hasznald ezt batran: probalj ki meresz valtoztatasokat &mdash; ha nem jo, egyszeruen visszaallsz!</p>
          </TutorialAccordion>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule4;

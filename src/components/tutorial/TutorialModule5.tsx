import TutorialAccordion from "./TutorialAccordion";
import TutorialPromptBox from "./TutorialPromptBox";
import TutorialTipBox from "./TutorialTipBox";

const TutorialModule5 = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-5">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 5
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Backend és Adatbázis</h2>
          <p className="text-muted-foreground">Ha a weboldaladnak adatokat kell kezelnie (űrlap, bejelentkezés, feltoeltes), itt megtanulod, hogyan.</p>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Mikor van szükséged backend-re?</h3>
          <div className="tutorial-backend-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="glass-card">
              <h4 className="text-green-400 font-semibold mb-2">✅ Kell backend, ha:</h4>
              <ul className="text-sm text-muted-foreground pl-5 space-y-1 list-disc">
                <li>Felhasznaloi regisztráció/bejelentkezes</li>
                <li>Kapcsolatfelveteli űrlap, ami ment</li>
                <li>Kep/fajl feltoltes</li>
                <li>Dinamikus tartalom (blog)</li>
                <li>Admin panel</li>
                <li>Webshop funkciók</li>
              </ul>
            </div>
            <div className="glass-card">
              <h4 className="text-red-400 font-semibold mb-2">❌ Nem kell backend, ha:</h4>
              <ul className="text-sm text-muted-foreground pl-5 space-y-1 list-disc">
                <li>Egyszerű bemutatkozó oldal</li>
                <li>Portfólió, galeria</li>
                <li>Statikus tartalom</li>
                <li>Landing page</li>
                <li>Egyszerű informaacios oldal</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Supabase &mdash; a backend partnered</h3>
          <p className="text-muted-foreground mb-4">A Lovable a <strong className="text-foreground">Supabase</strong>-t hasznalja backend-kent. Ez egy nyilt forraskodu Firebase alternativa, PostgreSQL adatbázissal. A Lovable-bol egyetlen kattintással bekapcsolhatod.</p>

          <TutorialAccordion title="Adatbázis (PostgreSQL)">
            <p className="text-muted-foreground">Teljes SQL adatbázis, amit a Lovable automatikusan letreohoz az utasitasaid alapján. Például: &bdquo;Hozz letre egy termekek tablat nevvel, leirassal, arral és kép URL-lel&rdquo; &mdash; es kész!</p>
          </TutorialAccordion>

          <TutorialAccordion title="Felhasznalo-hitelesites (Auth)">
            <p className="text-muted-foreground mb-3">Email/jelszo alapú regisztráció és bejelentkezés, valamint közösségi bejelentkezés (Google, GitHub, stb.). Az AI mindent beállit, te csak kerd!</p>
            <TutorialPromptBox label="Prompt">{`Add authentication to the app with email/password login and registration. Include a protected dashboard page that only logged-in users can access.`}</TutorialPromptBox>
          </TutorialAccordion>

          <TutorialAccordion title="Fajltarolas (Storage)">
            <p className="text-muted-foreground">Kepek, dokumentumok és mas fájlok feltoltese és tárolása. Tokeletes profilkepekhez, termekfotokhoz vagy dokumentumkezelohoz.</p>
          </TutorialAccordion>

          <TutorialAccordion title="Edge Functions — szerver nelkuli logika">
            <p className="text-muted-foreground">Ha összetettebb logikara van szükséged (e-mail kuldes, API hivas, fizetés feldolgozas), az Edge Functions serverless háttér-kodot futtat JavaScript/TypeScript-ben. Titkos kulcsokat (Stripe, OpenAI) a Secrets managerben tarolhatsz biztonsagosan.</p>
          </TutorialAccordion>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Gyakorlati példa: Kapcsolat űrlap</h3>
          <TutorialPromptBox label="Prompt az AI-nak">{`Create a contact form with name, email, phone, and message fields. Save submissions to a Supabase "contact_messages" table. Show a success toast notification after submission. Add form validation.`}</TutorialPromptBox>

          <TutorialTipBox variant="success" icon="✅" title="Eredmeny">
            <p>Ez a prompt letrehoz egy teljes, működő kapcsolatfelveteli űrlapot, ami elmenti az üzeneteket az adatbazisba. A Supabase admin panelen lathatod az összes beerkez üzenetet!</p>
          </TutorialTipBox>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule5;

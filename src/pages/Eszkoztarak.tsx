import { useState, useMemo, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Pricing { tier: string; price: string; info: string; }
interface Tool {
  name: string; cat: string; tags: string[]; icon: string; free: boolean;
  affiliate?: boolean; desc: string; extra: string[]; url: string; pricing: Pricing[];
}

const tools: Tool[] = [
  { name:"ChatGPT", cat:"Chat & asszisztens", tags:["szöveg","kép","hang","kód"], icon:"💬", free:true,
    desc:"Az OpenAI zászlóshajója. GPT-4o képes szöveget, képet, hangot egyszerre kezelni. Webes böngészés, kódfuttatás, fájlelemzés, GPT Store. o1/o3 érvelő modellek komplex problémákhoz.",
    extra:["DALL·E 3 képgenerálás","Hangos mód (Advanced Voice)","Fájl- és PDF-elemzés","GPT Store (egyéni GPT-k)","Kódfuttatás (Code Interpreter)","Webes keresés","Canvas (dok. szerkesztő)","o1 / o3 érvelő modellek"],
    url:"https://chat.openai.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"GPT-4o korlátozott, DALL·E, böngészés"},{tier:"Plus",price:"$20/hó",info:"GPT-4o, o1, o3-mini, DALL·E, Voice"},{tier:"Pro",price:"$200/hó",info:"Korlátlan o1 Pro, o3, magasabb limitek"},{tier:"Team",price:"$30/fő/hó",info:"Üzleti funkciók, admin kezelőpanel"}]},
  { name:"Claude", cat:"Chat & asszisztens", tags:["szöveg","kód","elemzés"], icon:"🤖", free:true,
    desc:"Anthropic asszisztense – kiemelkedő hosszú dokumentumoknál, kódolásnál és összetett érvelésnél. Artifacts funkcióval élő React/HTML appokat generál. Extended Thinking móddal lépésről lépésre gondolkodik. Projects memória, MCP integráció.",
    extra:["Artifacts (élő kód/UI generálás)","200K token kontextus","Extended Thinking mód","PDF/dokumentumelemzés","Webes keresés (beta)","Claude Code (terminál ügynök)","Projects (memória)","MCP integráció"],
    url:"https://claude.ai",
    pricing:[{tier:"Free",price:"Ingyenes",info:"Claude 3.5 Haiku, napi limit"},{tier:"Pro",price:"$20/hó",info:"Claude 3.7 Sonnet, 5× több üzenet, Projects"},{tier:"Team",price:"$30/fő/hó",info:"Csapat funkciók, magasabb limitek"},{tier:"Enterprise",price:"Egyedi",info:"SSO, audit log, compliance"}]},
  { name:"Gemini", cat:"Chat & asszisztens", tags:["szöveg","kép","kód"], icon:"✨", free:true,
    desc:"Google AI – Gmail, Drive, Docs, Sheets integráció. Gemini 2.0 Flash Thinking az egyik leggyorsabb érvelő modell, 1 millió token kontextussal. Deep Research tudományos kutatáshoz, Gemini Live kamerás valós idejű elemzéshez.",
    extra:["1M token kontextus","Google Workspace integráció","Deep Research","Imagen 3 képgenerálás","Gemini Live (hang + kamera)","Gems (egyéni asszisztensek)","NotebookLM integráció"],
    url:"https://gemini.google.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"Gemini 2.0 Flash, alapfunkciók"},{tier:"Advanced",price:"$19.99/hó",info:"Gemini Ultra, 1M kontextus, Workspace AI"},{tier:"Business",price:"$24/fő/hó",info:"Google Workspace integráció, admin"}]},
  { name:"Grok", cat:"Chat & asszisztens", tags:["szöveg","kép"], icon:"⚡", free:true,
    desc:"xAI (Elon Musk) chatbotja – valós idejű X/Twitter adatokhoz fér hozzá. Aurora modellel képet generál az Imagine paranccsal. DeepSearch mélyreható webes kutatáshoz, Think mód lépésről lépésre gondolkodáshoz.",
    extra:["Aurora képgenerálás (Imagine parancs)","X/Twitter valós idejű adatok","DeepSearch (mélykeresés)","Think mód (érvelő AI)","Big Brain mód (Grok 3)","Videó- és hangelemzés","Valós idejű hírek"],
    url:"https://grok.com",
    pricing:[{tier:"Free (X-en)",price:"Ingyenes",info:"Korlátozott Grok 2, napi limittel"},{tier:"X Premium+",price:"$22/hó",info:"Grok 3, Aurora, DeepSearch, Think mód"},{tier:"SuperGrok",price:"$30/hó",info:"Magasabb limitek, priority access"}]},
  { name:"Perplexity", cat:"Chat & asszisztens", tags:["keresés","szöveg"], icon:"🔍", free:true,
    desc:"AI-alapú kereső és kutató asszisztens – minden válaszhoz forráshivatkozást ad. Computer Use / Agent mód: képes böngészőt vezérelni, weboldalakat kitölteni, foglalásokat és kutatásokat önállóan elvégezni.",
    extra:["Forráshivatkozásos válaszok","Pro Search (mélykeresés)","⭐ Computer Use / Agent mód","Spaces (megosztott kutatás)","Fájl- és PDF-elemzés","Képgenerálás (DALL·E/SDXL)","Valós idejű webes adatok"],
    url:"https://perplexity.ai",
    pricing:[{tier:"Free",price:"Ingyenes",info:"5 Pro Search/nap, alapkeresés"},{tier:"Pro",price:"$20/hó",info:"300+ Pro Search/nap, Computer Use, PDF"},{tier:"Enterprise",price:"Egyedi",info:"SSO, dedikált kapacitás, audit"}]},
  { name:"Microsoft Copilot", cat:"Chat & asszisztens", tags:["szöveg","kép","kód"], icon:"🪟", free:true,
    desc:"Microsoft AI – Windows 11, Edge és Office 365 teljes integrációval. GPT-4o alapú, Designer funkcióval DALL·E 3 képeket generál. Copilot Studio-val egyéni vállalati botokat lehet létrehozni kód nélkül.",
    extra:["Designer képgenerálás (DALL·E 3)","Office 365 deep integráció","Bing valós idejű keresés","Copilot Studio (bot builder)","Windows 11 beépített","Edge sidebar"],
    url:"https://copilot.microsoft.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"GPT-4o, Designer, Bing keresés"},{tier:"Pro",price:"$20/hó",info:"Priority access, több Designer kredit, Office AI"},{tier:"M365 Business",price:"$30/fő/hó",info:"Teljes Office integráció, Teams Copilot"}]},
  { name:"Meta AI", cat:"Chat & asszisztens", tags:["szöveg","kép"], icon:"🦙", free:true,
    desc:"Meta Llama 3.3 alapú AI – beépítve Facebook, Instagram, WhatsApp és Messenger appokba. Imagine funkcióval képeket és animált GIF-eket generál. Teljesen ingyenes, nincs fizetős csomag.",
    extra:["Imagine képgenerálás","Animált GIF generálás","WhatsApp/Instagram/FB integráció","Llama 3.3 nyílt modell","Web search","Teljesen ingyenes"],
    url:"https://meta.ai",
    pricing:[{tier:"Free",price:"Ingyenes",info:"Llama 3.3, Imagine, web search – nincs fizetős csomag"}]},
  { name:"DeepSeek", cat:"Chat & asszisztens", tags:["szöveg","kód","elemzés"], icon:"🐋", free:true,
    desc:"Kínai fejlesztésű, rendkívül erős és ingyenes AI. DeepSeek R1 az egyik legjobb érvelő modell – versenyez az OpenAI o1-gyel, de ingyenes. Nyílt forráskódú, helyi gépen is futtatható.",
    extra:["R1 érvelő mód (Chain of Thought)","Kód generálás (DeepCoder)","Nyílt forráskód","Helyi futtatás lehetséges","API elérés (nagyon olcsó)","Webes keresés"],
    url:"https://chat.deepseek.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"DeepSeek R1, V3, web keresés – minden ingyenes"},{tier:"API V3",price:"$0.14/1M token",info:"Input token ár"},{tier:"API R1",price:"$0.55/1M token",info:"Érvelő modell API ára"}]},

  { name:"Suno", cat:"Zene", tags:["zene"], icon:"🎵", free:true, affiliate:true,
    desc:"Szövegpromptból teljes, énekelt zeneszámot generál – hangszerelés, énekhang, mixelés egyszerre. V4 modellel 4 perces dalokat is ír, személyre szabott stílussal és dalszöveggel.",
    extra:["Szöveg → teljes dal (ének + hangszer)","4 perc hosszú dalok (V4)","Custom mode (saját dalszöveg)","Cover/remix funkció","Stem letöltés (Pro)","Stílus referencia"],
    url:"https://suno.com/invite/@affilion",
    pricing:[{tier:"Free",price:"Ingyenes",info:"50 kredit/nap (~10 dal), nem kereskedelmi"},{tier:"Pro",price:"$8/hó",info:"2500 kredit/hó, kereskedelmi jogok, prioritás"},{tier:"Premier",price:"$24/hó",info:"10 000 kredit/hó, stem letöltés, max minőség"}]},
  { name:"Udio", cat:"Zene", tags:["zene"], icon:"🎶", free:true,
    desc:"Suno főriválisa – kiemelkedő hangminőséggel és részletgazdag stílusvezérléssel. Különösen erős elektronikus zenékben. Chapters funkcióval zenei struktúrát is tervez.",
    extra:["Prémium hangminőség","Stílusvezérlés","Chapters (dal struktúra)","Remix és extend","Custom lyrics"],
    url:"https://udio.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"10 generálás/nap"},{tier:"Standard",price:"$10/hó",info:"1200 kredit/hó, kereskedelmi jogok"},{tier:"Pro",price:"$30/hó",info:"4800 kredit/hó, prioritás, max minőség"}]},
  { name:"Mubert", cat:"Zene", tags:["zene"], icon:"🎧", free:true,
    desc:"Hangulathoz, videóhoz, podcasthoz igazodó royalty-free háttérzenét generál AI-jal. Időtartamra, tempóra és hangulatkulcsszóra szűrhető.",
    extra:["Royalty-free licenc","Videóhoz igazítás (hossz/BPM)","API integráció","Hangulat- és műfajszűrő"],
    url:"https://mubert.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"25 track/hó, nem kereskedelmi"},{tier:"Creator",price:"$14/hó",info:"500 track/hó, kereskedelmi jogok"},{tier:"Pro",price:"$39/hó",info:"Korlátlan, SFX, API"}]},

  { name:"ElevenLabs", cat:"Hang & voice", tags:["hang"], icon:"🔊", free:true,
    desc:"A legjobb hangklónozó és szöveg-hang konverziós eszköz. 1 perces hangmintából klónoz hangot. 32 nyelvű AI Dubbing funkcióval videódat fordítja le automatikusan, megtartva az eredeti hangszínt.",
    extra:["Hangklónozás (1 perces mintából)","32+ nyelv","AI Dubbing (videó szinkron)","Voice Design","SFX (effekthang generálás)","Audiobook generálás","Conversational AI (bot hangja)"],
    url:"https://elevenlabs.io",
    pricing:[{tier:"Free",price:"Ingyenes",info:"10 000 karakter/hó, 3 hangklón"},{tier:"Starter",price:"$5/hó",info:"30 000 kar/hó, 10 klón, kereskedelmi"},{tier:"Creator",price:"$22/hó",info:"100 000 kar/hó, prof. klónozás"},{tier:"Pro",price:"$99/hó",info:"500 000 kar/hó, 30 prof. klón"}]},
  { name:"Whisper / Whisper.cpp", cat:"Hang & voice", tags:["hang"], icon:"🎙", free:true,
    desc:"OpenAI hang-szöveg modellje, helyi gépen is futtatható ingyenesen. 99 nyelvet támogat, pontossága eléri a professzionális átírókét. Whisper.cpp verzió régi gépen is fut, internet nélkül.",
    extra:["99 nyelv","Helyi gépen futtatható","Ingyenes & nyílt forráskód","SRT/VTT felirat export"],
    url:"https://openai.com/research/whisper",
    pricing:[{tier:"Nyílt forráskód",price:"Ingyenes",info:"GitHub-ról letölthető, helyi futtatás"},{tier:"OpenAI API",price:"$0.006/perc",info:"Felhőalapú API hívás"}]},
  { name:"Descript", cat:"Hang & voice", tags:["hang","video"], icon:"✂️", free:true,
    desc:"Szövegszerkesztőként kezeli a hang- és videófájlokat – szöveg törlésével a médiát is törli. Overdub funkcióval saját hangod lecserélhető AI-jal.",
    extra:["Szöveg alapú hang/videó vágás","Overdub (hangcsere AI-jal)","Zaj eltávolítás","Filler words törlés auto","Automatikus felirat"],
    url:"https://descript.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"1 óra átirat/hó, alapfunkciók"},{tier:"Creator",price:"$24/hó",info:"10 óra/hó, Overdub, AI funkciók"},{tier:"Business",price:"$40/fő/hó",info:"Korlátlan, csapat funkciók"}]},

  { name:"Midjourney", cat:"Képgenerálás", tags:["kép"], icon:"🖼", free:false,
    desc:"A legjobb esztétikájú AI képgeneráló – V7 modellel fotorealisztikus és festői stílusú képeket egyaránt. Sref (stílus referencia) és Cref (karakter referencia) funkciókkal konzisztens karakterek.",
    extra:["Legjobb esztétikai minőség (V7)","Style Reference (sref)","Character Reference (cref)","Niji 6 (anime mód)","Inpainting (Vary Region)","Upscale (4K)","Personalization"],
    url:"https://midjourney.com",
    pricing:[{tier:"Basic",price:"$10/hó",info:"200 generálás/hó – nincs ingyenes szint"},{tier:"Standard",price:"$30/hó",info:"15 óra Fast GPU, korlátlan Relax mód"},{tier:"Pro",price:"$60/hó",info:"30 óra Fast, Stealth mód (privát)"},{tier:"Mega",price:"$120/hó",info:"60 óra Fast, max párhuzamosság"}]},
  { name:"Ideogram", cat:"Képgenerálás", tags:["kép"], icon:"🔤", free:true,
    desc:"Szöveg-a-képben páratlan minőséggel – logók, plakátok, tipográfiai képek generáláshoz ideális. V2 modellel reális fotókat is generál. Magic Prompt automatikusan javítja a promptot.",
    extra:["Szöveg képbe (legjobb minőség)","Magic Prompt (prompt javítás)","Remixelés / Inpainting","Reális fotó generálás","Logo és plakát sablonok"],
    url:"https://ideogram.ai",
    pricing:[{tier:"Free",price:"Ingyenes",info:"10 slow generálás/nap"},{tier:"Basic",price:"$8/hó",info:"400 priority generálás/hó"},{tier:"Plus",price:"$20/hó",info:"1000 priority generálás/hó"},{tier:"Pro",price:"$60/hó",info:"4000 priority + API"}]},
  { name:"Adobe Firefly", cat:"Képgenerálás", tags:["kép"], icon:"🔥", free:true,
    desc:"Kereskedelmileg 100% biztonságos AI képgeneráló, Adobe szoftverekbe mélyen integrálva. Photoshop Generative Fill, Generative Expand és háttércsere.",
    extra:["Kereskedelmileg biztonságos","Photoshop Generative Fill","Generative Expand","Stílus referencia","Illustrator vektorgenerálás"],
    url:"https://firefly.adobe.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"25 generative kredit/hó"},{tier:"Firefly Premium",price:"$9.99/hó",info:"100 kredit/hó, priority"},{tier:"Creative Cloud",price:"$54.99/hó",info:"Teljes Adobe suite + Firefly"}]},
  { name:"Stable Diffusion", cat:"Képgenerálás", tags:["kép"], icon:"🌀", free:true,
    desc:"Nyílt forráskódú, helyi gépre telepíthető képgeneráló – teljes kontroll, nincs cenzúra, nincs előfizetés. LoRA-val egyéni stílusokat, karaktereket taníthat be.",
    extra:["Helyi futtatás (nincs adatküldés)","Nyílt forráskód","ControlNet (pózcontrol)","LoRA modellek","Inpainting/Outpainting","ComfyUI workflow"],
    url:"https://stability.ai",
    pricing:[{tier:"Helyi (ingyenes)",price:"Ingyenes",info:"Saját GPU szükséges, nincs limit"},{tier:"DreamStudio API",price:"$10 = 1000 kredit",info:"Felhős API, nincs saját GPU"}]},
  { name:"Leonardo.AI", cat:"Képgenerálás", tags:["kép"], icon:"🎨", free:true,
    desc:"Game asset, illusztráció és karakter generálásra optimalizált platform. Motion funkcióval animálhatja a képeket, Phoenix modellel fotorealisztikus képek.",
    extra:["Game asset generálás","Motion (kép animálása)","Phoenix (fotorealisztikus)","Konzisztens karakterek","ControlNet","3D textúra generálás"],
    url:"https://leonardo.ai",
    pricing:[{tier:"Free",price:"Ingyenes",info:"150 token/nap (~30 kép)"},{tier:"Apprentice",price:"$10/hó",info:"8500 token/hó"},{tier:"Artisan",price:"$24/hó",info:"25 000 token/hó, API"},{tier:"Maestro",price:"$48/hó",info:"60 000 token/hó"}]},
  { name:"Flux (Black Forest Labs)", cat:"Képgenerálás", tags:["kép"], icon:"⚗️", free:true,
    desc:"A legújabb nyílt modell, Midjourney minőségét megközelítő eredményekkel. Flux Pro 1.1 Ultra 4 megapixeles képeket generál. Nyílt forráskódú változatok lokálisan is futtathatók.",
    extra:["Flux Pro 1.1 Ultra (4MP)","Flux Dev (nyílt, helyi)","Flux Schnell (gyors, ingyenes)","Fill (inpainting)","Redux (style transfer)"],
    url:"https://blackforestlabs.ai",
    pricing:[{tier:"Flux Schnell",price:"Ingyenes",info:"Nyílt forráskód, helyi futtatás"},{tier:"API (Flux Pro)",price:"$0.055/kép",info:"Felhős API, nincs havi díj"}]},
  { name:"DZINE – Affilion AI ⭐", cat:"Képgenerálás", tags:["kép","video"], icon:"🧪", free:true, affiliate:true,
    desc:"All-in-one AI kreatív platform – képek, videók, hangok egyben, fix havi előfizetésért. Az Affilion AI ajánlott eszköze: ha egyetlen helyen akarsz mindent megtalálni, ez a legjobb választás.",
    extra:["Kép-, videó-, hanggeneráló egyben","Fix előfizetés (nincs kredit-stressz)","Több modell egy helyen (MJ, SDXL, Flux)","Kereskedelmi licenc","⭐ Affilion AI ajánlott eszköz"],
    url:"https://www.dzine.ai/referrals/47NQZav2",
    pricing:[{tier:"Starter",price:"~$9/hó",info:"Alap kép + videó generálás"},{tier:"Pro",price:"~$29/hó",info:"Teljes hozzáférés, fix kredit pool"},{tier:"Business",price:"~$79/hó",info:"Csapat, API, kereskedelmi jog"}]},

  { name:"Runway", cat:"Videógenerálás", tags:["video"], icon:"🎬", free:true,
    desc:"A legtöbb funkciójú AI videóeszköz. Gen-3 Alpha Turbo modellel szövegből és képből generál. Act-One funkcióval arc expressziót visz át videóra, Motion Brush-sal animációt rajzolhat a képre.",
    extra:["Gen-3 Alpha Turbo modell","Szöveg → videó","Kép → videó animálás","Act-One (expresszió átvitel)","Motion Brush","Camera controls","Videó hosszabbítás"],
    url:"https://runwayml.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"125 kredit (~25 mp videó), vízjel"},{tier:"Standard",price:"$15/hó",info:"625 kredit/hó, nincs vízjel"},{tier:"Pro",price:"$35/hó",info:"2250 kredit/hó, 4K upscale"},{tier:"Unlimited",price:"$95/hó",info:"Korlátlan Turbo generálás"}]},
  { name:"Kling AI", cat:"Videógenerálás", tags:["video"], icon:"📽", free:true,
    desc:"Kínai fejlesztés, de globálisan elismert videógeneráló. Kling 2.0 Master modellel 3 perces videókat generál, lip sync és kamera control funkcióval.",
    extra:["Kling 2.0 Master (3 perces videó)","Lip sync","1080p / 4K","Kamera kontrolok","Image to Video","Virtual Try-On"],
    url:"https://klingai.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"66 kredit/nap (~10 videó)"},{tier:"Standard",price:"$10/hó",info:"660 kredit/hó"},{tier:"Pro",price:"$35/hó",info:"3000 kredit/hó, prioritás"}]},
  { name:"HeyGen", cat:"Videógenerálás", tags:["video"], icon:"👤", free:true,
    desc:"AI avatárral és hangklónozással személyre szabott videók. Video Translation funkcióval meglévő videódat 40+ nyelvre fordítja és szinkronizálja, megtartva az eredeti hangszínt.",
    extra:["AI avatar (fotódból)","Video Translation (40+ nyelv)","Streaming Avatar (valós idejű)","Hangklónozás","Custom avatar betanítás"],
    url:"https://heygen.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"1 kredit (~1 perc), korlátozott"},{tier:"Creator",price:"$29/hó",info:"15 kredit/hó, kereskedelmi jog"},{tier:"Team",price:"$89/hó",info:"30 kredit/hó, custom avatar"}]},
  { name:"Sora", cat:"Videógenerálás", tags:["video"], icon:"🎞", free:false,
    desc:"OpenAI videógenerálója – fizikailag helyes, fotorealisztikus videók szövegpromptból. Storyboard móddal több jelenet tervezhető, Remix funkcióval meglévő videókat dolgoz át.",
    extra:["Fotorealisztikus fizika","Storyboard mód","Remix videó","Loop generálás","ChatGPT Plus-ba beépítve"],
    url:"https://openai.com/sora",
    pricing:[{tier:"Plus (ChatGPT)",price:"$20/hó",info:"50 priority videó/hó, 480p"},{tier:"Pro (ChatGPT)",price:"$200/hó",info:"Korlátlan Sora, 1080p, 20 mp"}]},
  { name:"Pika", cat:"Videógenerálás", tags:["video"], icon:"🌊", free:true,
    desc:"Képeket és szöveget animál Pika 2.0 modellel. Pikaffects effektekkel gyors, kreatív videók. Lip sync és Pika Scenes funkcióval jeleneteket épít.",
    extra:["Pika 2.0 modell","Lip sync","Pikaffects (effektek)","Pika Scenes (jelenetépítés)","Sound effects generálás"],
    url:"https://pika.art",
    pricing:[{tier:"Free",price:"Ingyenes",info:"150 kredit/hó, vízjel"},{tier:"Basic",price:"$8/hó",info:"700 kredit/hó, nincs vízjel"},{tier:"Standard",price:"$28/hó",info:"2000 kredit/hó"}]},

  { name:"GitHub Copilot", cat:"Kód & fejlesztés", tags:["kód"], icon:"💻", free:true,
    desc:"A legnépszerűbb AI kódkiegészítő – valós idejű javaslatok VS Code, JetBrains, Neovim szerkesztőkben. Copilot Workspace komplex feladatokat old meg önállóan. Multi-model: Claude, GPT-4o, Gemini.",
    extra:["Inline kódkiegészítés (real-time)","Copilot Chat (kód magyarázat)","Copilot Workspace (agent)","PR összefoglalók","Multi-model (Claude/GPT-4o/Gemini)"],
    url:"https://github.com/features/copilot",
    pricing:[{tier:"Free",price:"Ingyenes",info:"2000 kódkiegészítés/hó, 50 chat/hó"},{tier:"Pro",price:"$10/hó",info:"Korlátlan, multi-model, Workspace"},{tier:"Business",price:"$19/fő/hó",info:"Vállalati policy, audit log"}]},
  { name:"Cursor", cat:"Kód & fejlesztés", tags:["kód"], icon:"⌨", free:true,
    desc:"AI-first kódszerkesztő – VS Code fork, minden extension működik. Composer módban több fájlt egyszerre szerkeszt, Agent módban önállóan végrehajt feladatokat terminál hozzáféréssel.",
    extra:["Codebase-szintű szerkesztés","Agent mód (terminál hozzáférés)","Multi-file Composer","Codebase Q&A","Claude 3.7 / GPT-4o / Gemini","Privacy mód"],
    url:"https://cursor.sh",
    pricing:[{tier:"Free (Hobby)",price:"Ingyenes",info:"2 hetes Pro trial, utána korlátozott"},{tier:"Pro",price:"$20/hó",info:"500 fast request/hó, korlátlan slow"},{tier:"Business",price:"$40/fő/hó",info:"Csapatkezelés, zero data retention"}]},
  { name:"Lovable", cat:"Kód & fejlesztés", tags:["kód","weboldal"], icon:"❤️", free:true, affiliate:true,
    desc:"Szövegpromptból teljes fullstack weboldalakat és appokat épít – backend, adatbázis, autentikáció egyszerre. Supabase DB, GitHub sync, egy kattintással deploy. Egyáltalán nem kell kódolni.",
    extra:["Fullstack app generálás","Supabase DB integráció","GitHub sync","Azonnali deploy","Shadcn/ui komponensek","Stripe integráció","Visual szerkesztő"],
    url:"https://lovable.dev/invite/PBZ4OPL",
    pricing:[{tier:"Free",price:"Ingyenes",info:"5 üzenet/nap, 1 projekt"},{tier:"Starter",price:"$20/hó",info:"100 üzenet/hó, 3 projekt"},{tier:"Launch",price:"$50/hó",info:"500 üzenet/hó, korlátlan projekt"},{tier:"Scale",price:"$100/hó",info:"1000 üzenet/hó, csapat funkciók"}]},
  { name:"Bolt.new", cat:"Kód & fejlesztés", tags:["kód","weboldal"], icon:"⚡", free:true,
    desc:"StackBlitz által, promptból teljes webalkalmazásokat épít és futtat böngészőben – Node.js, React, Next.js, Vite. WebContainers technológiával nincs szükség helyi szerverre.",
    extra:["Böngészőben futó Node.js","React/Next.js/Vite support","NPM csomagok","Azonnali preview","Export kód","Netlify deploy"],
    url:"https://bolt.new",
    pricing:[{tier:"Free",price:"Ingyenes",info:"Korlátozott token/nap"},{tier:"Pro",price:"$20/hó",info:"10M token/hó, prioritás"}]},
  { name:"v0 by Vercel", cat:"Kód & fejlesztés", tags:["kód"], icon:"🧩", free:true,
    desc:"UI komponenseket és teljes oldalakat generál React + Tailwind + shadcn kódban. Azonnali élő előnézet, egy kattintással Vercel deploy. Képből is tud kódot generálni.",
    extra:["React/Tailwind/shadcn generálás","Azonnali preview","Vercel deploy","Képből kód (screenshot → UI)"],
    url:"https://v0.dev",
    pricing:[{tier:"Free",price:"Ingyenes",info:"200 kredit/hó"},{tier:"Premium",price:"$20/hó",info:"5000 kredit/hó, prioritás"}]},
  { name:"Replit AI", cat:"Kód & fejlesztés", tags:["kód"], icon:"🧑‍💻", free:true,
    desc:"Böngészőből futtatható AI fejlesztői környezet – Agent móddal természetes nyelvi utasításból épít és deployol teljes appokat. 50+ programnyelv, multiplayer kódolás.",
    extra:["Böngészős IDE + futtatás","Replit Agent (app builder)","Deploy egy kattintással","Multiplayer kódolás","50+ programnyelv"],
    url:"https://replit.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"Alap IDE, korlátozott AI"},{tier:"Core",price:"$25/hó",info:"Replit Agent, erősebb gép, több tárhely"}]},

  { name:"Make (Integromat)", cat:"Automatizálás", tags:["automatizálás"], icon:"⚙️", free:true,
    desc:"Vizuális no-code workflow builder – 1900+ app összekapcsolása drag-and-drop módon. AI modulokkal OpenAI, Claude, Gemini hívható be a folyamatba.",
    extra:["1900+ app integráció","AI modul (OpenAI, Claude)","Webhook support","Adattranszformáció","HTTP/API hívás","Ütemezett futtatás","Error handling"],
    url:"https://make.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"1000 művelet/hó, 2 aktív scenario"},{tier:"Core",price:"$10.59/hó",info:"10 000 művelet/hó, korlátlan scenario"},{tier:"Pro",price:"$18.82/hó",info:"10 000+ műv., full log history"},{tier:"Teams",price:"$34.12/hó",info:"Csapatmunka, több felhasználó"}]},
  { name:"n8n", cat:"Automatizálás", tags:["automatizálás"], icon:"🔄", free:true,
    desc:"Nyílt forráskódú, önhosztolható workflow automatizáló – fejlesztőknek és haladóknak. AI Agent node-dal LLM-eket kapcsol a workflowba, kód node-dal JS/Python logika írható.",
    extra:["Önhosztolható (ingyenes)","Nyílt forráskód","AI Agent node (LLM integráció)","Kód node (JS/Python)","400+ integráció","Webhook + HTTP","Community templates"],
    url:"https://n8n.io",
    pricing:[{tier:"Self-hosted",price:"Ingyenes",info:"Saját szerveren korlátlan, open source"},{tier:"Cloud Starter",price:"$24/hó",info:"2500 workflow execution/hó"},{tier:"Cloud Pro",price:"$60/hó",info:"10 000 execution/hó, prioritás"}]},
  { name:"Zapier", cat:"Automatizálás", tags:["automatizálás"], icon:"🔌", free:true,
    desc:"A legnépszerűbb no-code automatizáló – 7000+ app integrációval, minimális technikai tudással kezelhető. AI Zap generálással természetes nyelven írd le az automatizálást.",
    extra:["7000+ integráció (legtöbb)","AI Zap generálás","Chatbot builder (Interfaces)","Tables (beépített adatbázis)","Legkönnyebb UI"],
    url:"https://zapier.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"100 feladat/hó, 5 Zap"},{tier:"Professional",price:"$29.99/hó",info:"750 feladat/hó, korlátlan Zap"},{tier:"Team",price:"$103.50/hó",info:"2000 feladat/hó, csapat"}]},
  { name:"Relevance AI", cat:"Automatizálás", tags:["automatizálás","agent"], icon:"🤖", free:true,
    desc:"AI Agent építő platform – saját AI ügynököket hozol létre, amelyek webes kutatást, e-mail küldést, CRM kezelést végeznek önállóan. Multi-agent workflow-kban egymással is kommunikálnak.",
    extra:["AI agent builder (no-code)","Multi-agent workflow","Tool integráció (100+)","Long-term memória","Web scraping agent"],
    url:"https://relevanceai.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"100 kredit/nap, 1 agent"},{tier:"Team",price:"$199/hó",info:"Korlátlan agent, több felhasználó"}]},

  { name:"Notion AI", cat:"Produktivitás", tags:["szöveg","szervezés"], icon:"📝", free:false,
    desc:"Notion-ba beépített AI – dokumentumok írása, összefoglalók, Q&A az összes Notion tartalomra. AI adatbázis mezőkkel automatikusan kategorizál és összefoglal.",
    extra:["Dokumentum írás/összefoglalás","Q&A az összes Notion tartalomra","AI adatbázis mező","Fordítás (35+ nyelv)","AI autofill táblázatban"],
    url:"https://notion.so/product/ai",
    pricing:[{tier:"AI addon (Free Notion)",price:"+$10/hó",info:"AI addon a meglévő ingyenes Notion-hoz"},{tier:"Plus + AI",price:"$18/hó",info:"Korlátlan oldalak + AI"},{tier:"Business + AI",price:"$25/hó",info:"Csapat + AI funkciók"}]},
  { name:"Gamma", cat:"Produktivitás", tags:["prezentáció","szöveg"], icon:"📊", free:true,
    desc:"AI-alapú prezentáció, dokumentum és weboldal készítő. Szövegből profi diák másodpercek alatt, automatikus elrendezéssel. Beágyazható weboldalakba, megosztható linkkel.",
    extra:["Prezentáció generálás","AI weboldal builder","Beágyazható médiák","Analitika (megtekintések)","Export PDF/PPT"],
    url:"https://gamma.app",
    pricing:[{tier:"Free",price:"Ingyenes",info:"400 AI kredit, Gamma branding"},{tier:"Plus",price:"$10/hó",info:"Korlátlan AI, no branding, export"},{tier:"Pro",price:"$20/hó",info:"Custom domain, analitika, prioritás"}]},
  { name:"Otter.ai", cat:"Produktivitás", tags:["hang","szöveg"], icon:"🦦", free:true,
    desc:"Megbeszélések, interjúk automatikus átírása és összefoglalása valós időben. Zoom, Teams, Google Meet-hez csatlakozik, AI Chat funkciójával kérdezhet a meeting tartalmáról.",
    extra:["Valós idejű átirat","AI meeting összefoglaló","Zoom/Teams/Meet integráció","Action items kinyerés"],
    url:"https://otter.ai",
    pricing:[{tier:"Free",price:"Ingyenes",info:"300 perc/hó, 30 perc/meeting"},{tier:"Pro",price:"$16.99/hó",info:"1200 perc/hó, import funkciók"},{tier:"Business",price:"$30/fő/hó",info:"6000 perc/hó, admin"}]},

  { name:"Consensus", cat:"Kutatás", tags:["keresés","tudomány"], icon:"🔬", free:true,
    desc:"Tudományos cikkekben keres AI-jal – peer-reviewed forrásokból válaszol, nem találgat. Konszenzus mutatóval jelzi, hogy a kutatások általánosan támogatnak-e egy állítást.",
    extra:["Peer-reviewed cikkek keresése","Konszenzus mutató","Citáció export","GPT-4 alapú összefoglalók","200M+ cikk adatbázis"],
    url:"https://consensus.app",
    pricing:[{tier:"Free",price:"Ingyenes",info:"20 keresés/hó"},{tier:"Premium",price:"$11.99/hó",info:"Korlátlan keresés, GPT-4 összefoglalók"}]},
  { name:"Elicit", cat:"Kutatás", tags:["keresés","tudomány"], icon:"📚", free:true,
    desc:"Kutatási asszisztens – szakirodalom keresés, összefoglalás, adatkinyerés táblázatba. Feltöltött PDF-eket elemez és strukturált adatot von ki belőlük.",
    extra:["PDF elemzés és összefoglalás","Adat kinyerés táblázatba","Kutatás szintézis","8M+ cikk adatbázis"],
    url:"https://elicit.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"5 forrás/keresés"},{tier:"Plus",price:"$12/hó",info:"Korlátlan forrás, PDF upload, export"}]},
];

const categories = ["Összes","Chat & asszisztens","Zene","Hang & voice","Képgenerálás","Videógenerálás","Kód & fejlesztés","Automatizálás","Produktivitás","Kutatás"];

const tagColors: Record<string, { bg: string; tc: string }> = {
  szöveg:{bg:"rgba(0,200,100,0.12)",tc:"#4de89a"},
  kép:{bg:"rgba(0,200,255,0.12)",tc:"#4dd9ff"},
  video:{bg:"rgba(255,100,100,0.12)",tc:"#ff8080"},
  zene:{bg:"rgba(180,100,255,0.12)",tc:"#cc88ff"},
  kód:{bg:"rgba(255,200,0,0.12)",tc:"#ffcc44"},
  hang:{bg:"rgba(0,200,255,0.1)",tc:"#66ddff"},
  keresés:{bg:"rgba(255,255,255,0.07)",tc:"#aab0be"},
  automatizálás:{bg:"rgba(255,120,60,0.12)",tc:"#ff9966"},
  agent:{bg:"rgba(255,200,0,0.1)",tc:"#ffcc44"},
  prezentáció:{bg:"rgba(0,200,255,0.1)",tc:"#4dd9ff"},
  szervezés:{bg:"rgba(0,200,100,0.1)",tc:"#4de89a"},
  tudomány:{bg:"rgba(180,100,255,0.1)",tc:"#cc88ff"},
  weboldal:{bg:"rgba(0,200,255,0.1)",tc:"#4dd9ff"},
  elemzés:{bg:"rgba(255,255,255,0.06)",tc:"#aab0be"},
};

const PricingModal = ({ tool, onClose }: { tool: Tool | null; onClose: () => void }) => {
  if (!tool) return null;
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-5"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="rounded-[18px] p-7 max-w-[460px] w-full"
        style={{ background: "#13161e", border: "1px solid rgba(0,200,255,0.2)", boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,200,255,0.06)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="text-2xl w-[46px] h-[46px] rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>{tool.icon}</div>
          <div>
            <div className="font-bold text-base text-white">{tool.name.replace(" ⭐","")}</div>
            <div className="text-[11px] italic mt-0.5" style={{ color: "#555e70" }}>árak 2026 márciusi frissítéssel</div>
          </div>
          <button className="ml-auto text-[22px] leading-none hover:text-white transition-colors" style={{ color: "#555e70" }} onClick={onClose}>×</button>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          {tool.pricing.map((p, i) => (
            <div key={i} className="flex justify-between items-start py-3 px-3.5 rounded-xl"
              style={{
                background: i === 0 && tool.free ? "rgba(0,200,100,0.06)" : "rgba(255,255,255,0.03)",
                border: i === 0 && tool.free ? "1px solid rgba(0,200,100,0.2)" : "1px solid rgba(255,255,255,0.07)"
              }}
            >
              <div>
                <div className="font-semibold text-[13px] text-white">{p.tier}</div>
                <div className="text-xs mt-0.5 leading-snug" style={{ color: "#8892a4" }}>{p.info}</div>
              </div>
              <div className="font-bold text-sm whitespace-nowrap ml-3" style={{ color: i === 0 && tool.free ? "#00c864" : "#fff" }}>{p.price}</div>
            </div>
          ))}
        </div>
        {tool.affiliate && (
          <div className="mb-3.5 py-2.5 px-3.5 rounded-lg text-xs leading-relaxed" style={{ background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.2)", color: "#ffaa77" }}>
            🔗 Affiliate link – Affilion AI ajánlás. Regisztrációddal ingyen támogatod a közösséget.
          </div>
        )}
        <a href={tool.url} target="_blank" rel="noopener noreferrer"
          className="block w-full text-center py-3 rounded-xl text-[13px] font-bold no-underline transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #00aadd, #00c8ff)", color: "#000", letterSpacing: "0.02em" }}
        >
          Megnyitás → {tool.url.replace("https://","").split("/")[0]}
        </a>
      </div>
    </div>
  );
};

const Eszkoztarak = () => {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("Összes");
  const [modalTool, setModalTool] = useState<Tool | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return tools.filter(t => {
      const mc = activeCat === "Összes" || t.cat === activeCat;
      const mq = !q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q) || t.tags.some(tg => tg.includes(q)) || t.extra.some(e => e.toLowerCase().includes(q));
      return mc && mq;
    });
  }, [search, activeCat]);

  const grouped = useMemo(() => {
    const g: Record<string, Tool[]> = {};
    filtered.forEach(t => { if (!g[t.cat]) g[t.cat] = []; g[t.cat].push(t); });
    return g;
  }, [filtered]);

  const handlePricingClick = useCallback((e: React.MouseEvent, tool: Tool) => {
    e.preventDefault();
    e.stopPropagation();
    setModalTool(tool);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20" style={{ background: "#0d0f14", color: "#f0f4ff", fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div className="max-w-[1020px] mx-auto px-6 py-9">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3.5 mb-2">
              <span className="text-[32px]">🧠</span>
              <h1 className="text-[32px] font-extrabold tracking-tight" style={{
                background: "linear-gradient(90deg, #fff 40%, #00c8ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>AI Eszköztár</h1>
            </div>
            <p className="text-[13px]" style={{ color: "#8892a4" }}>
              {filtered.length} eszköz · Kártyára kattintva megnyílik az oldal · „Csomagok" az árakért · <em style={{ color: "#555e70" }}>árak 2026 márciusi frissítéssel</em>
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm opacity-40">🔎</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Keresés eszközök, funkciók között..."
              className="w-full py-3 pl-10 pr-3.5 text-sm rounded-[14px] outline-none transition-all"
              style={{
                background: "#13161e",
                color: "#f0f4ff",
                border: "1px solid rgba(255,255,255,0.08)",
                fontFamily: "inherit",
              }}
              onFocus={(e) => { e.target.style.borderColor = "#00c8ff"; e.target.style.boxShadow = "0 0 0 3px rgba(0,200,255,0.08)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-1.5 flex-wrap mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                className="py-1 px-3.5 rounded-full text-[12.5px] whitespace-nowrap transition-all"
                style={{
                  border: activeCat === cat ? "1px solid #00c8ff" : "1px solid rgba(255,255,255,0.1)",
                  background: activeCat === cat ? "rgba(0,200,255,0.15)" : "transparent",
                  color: activeCat === cat ? "#00c8ff" : "#8892a4",
                  fontWeight: activeCat === cat ? 600 : 400,
                  fontFamily: "inherit",
                }}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Content */}
          {filtered.length === 0 ? (
            <p className="text-center py-12 text-[15px]" style={{ color: "#555e70" }}>Nincs találat.</p>
          ) : (
            categories.slice(1).filter(c => grouped[c]).map(cat => (
              <div key={cat}>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-[10.5px] font-bold tracking-widest uppercase" style={{ color: "#00c8ff", opacity: 0.7 }}>{cat}</span>
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                  <span className="text-[11px]" style={{ color: "#555e70" }}>{grouped[cat].length} eszköz</span>
                </div>
                <div className="grid gap-2.5 mb-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                  {grouped[cat].map(t => (
                    <a
                      key={t.name}
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-[14px] p-4 flex flex-col gap-2.5 no-underline transition-all hover:-translate-y-[3px] relative"
                      style={{
                        background: "#161920",
                        border: "1px solid rgba(0,200,255,0.12)",
                        color: "inherit",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,200,255,0.2)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,200,255,0.08)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,200,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="text-xl w-[38px] h-[38px] flex items-center justify-center rounded-[10px] shrink-0" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>{t.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-white mb-1">{t.name}</div>
                          <div className="flex gap-1 flex-wrap">
                            {t.affiliate && <span className="text-[10px] py-[1px] px-[7px] rounded-full font-semibold" style={{ background: "linear-gradient(135deg, rgba(255,107,53,0.25), rgba(247,197,159,0.2))", color: "#ffaa77", border: "1px solid rgba(255,107,53,0.3)" }}>Affiliate</span>}
                            {t.free
                              ? <span className="text-[10px] py-[1px] px-[7px] rounded-full font-semibold" style={{ background: "rgba(0,200,100,0.15)", color: "#00c864", border: "1px solid rgba(0,200,100,0.2)" }}>Van ingyenes</span>
                              : <span className="text-[10px] py-[1px] px-[7px] rounded-full font-semibold" style={{ background: "rgba(255,160,0,0.12)", color: "#ffaa33", border: "1px solid rgba(255,160,0,0.2)" }}>Csak fizetős</span>
                            }
                          </div>
                        </div>
                      </div>
                      <p className="text-[12.5px] leading-relaxed" style={{ color: "#8892a4" }}>{t.desc}</p>
                      {t.extra.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {t.extra.map((e, i) => (
                            <span key={i} className="text-[11px] py-0.5 px-[7px] rounded-[5px]" style={{ background: "rgba(255,255,255,0.04)", color: "#8892a4", border: "1px solid rgba(255,255,255,0.06)" }}>{e}</span>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {t.tags.map(tg => {
                          const c = tagColors[tg] || { bg: "rgba(255,255,255,0.07)", tc: "#aab0be" };
                          return <span key={tg} className="text-[10.5px] py-0.5 px-2 rounded-full font-semibold" style={{ background: c.bg, color: c.tc }}>{tg}</span>;
                        })}
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-1">
                        <span className="text-[11px]" style={{ color: "#555e70" }}>{t.url.replace("https://","").split("/")[0]} ↗</span>
                        <button
                          className="text-[11px] font-semibold py-1 px-2.5 rounded-md transition-all"
                          style={{ background: "transparent", border: "1px solid rgba(0,200,255,0.25)", color: "#00c8ff" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,200,255,0.15)"; e.currentTarget.style.borderColor = "#00c8ff"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,200,255,0.25)"; }}
                          onClick={(e) => handlePricingClick(e, t)}
                        >
                          Csomagok
                        </button>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))
          )}

          <p className="text-center text-[11.5px] mt-2 pb-5" style={{ color: "#555e70" }}>
            🔗 Affiliate linkeknél a regisztráció ingyen támogatja az Affilion AI-t &nbsp;·&nbsp; <em>árak 2026 márciusi frissítéssel</em>
          </p>
        </div>
      </div>
      <Footer />
      <PricingModal tool={modalTool} onClose={() => setModalTool(null)} />
    </>
  );
};

export default Eszkoztarak;

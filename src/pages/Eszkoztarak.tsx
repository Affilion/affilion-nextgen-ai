import { useState, useMemo, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Pricing {
  tier: string;
  price: string;
  info: string;
}

interface Tool {
  name: string;
  cat: string;
  tags: string[];
  icon: string;
  free: boolean;
  affiliate?: boolean;
  desc: string;
  extra: string[];
  url: string;
  pricing: Pricing[];
}

const tools: Tool[] = [
  { name:"ChatGPT", cat:"Chat & asszisztens", tags:["szöveg","kép","hang","kód"], icon:"💬", free:true,
    desc:"Az OpenAI zászlóshajója. GPT-4o képes szöveget, képet, hangot egyszerre kezelni. Webes böngészés, kódfuttatás, fájlelemzés, GPT Store. o1/o3 érvelő modellek komplex problémákhoz.",
    extra:["DALL·E 3 képgenerálás","Hangos mód (Advanced Voice)","Fájl- és PDF-elemzés","GPT Store (egyéni GPT-k)","Kódfuttatás (Code Interpreter)","Webes keresés","Canvas (dok. szerkesztő)","o1 / o3 érvelő modellek"],
    url:"https://chat.openai.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"GPT-4o korlátozott, DALL·E, böngészés"},{tier:"Plus",price:"$20/hó",info:"GPT-4o, o1, o3-mini, DALL·E, Voice"},{tier:"Pro",price:"$200/hó",info:"Korlátlan o1 Pro, o3, magasabb limitek"},{tier:"Team",price:"$30/fő/hó",info:"Üzleti funkciók, admin kezelőpanel"}]},
  { name:"Claude", cat:"Chat & asszisztens", tags:["szöveg","kód","elemzés"], icon:"🤖", free:true,
    desc:"Anthropic asszisztense – kiemelkedő hosszú dokumentumoknál, kódolásnál és összetett érvelésnél. Artifacts funkcióval élő React/HTML appokat generál. Extended Thinking móddal lépésről lépésre gondolkodik.",
    extra:["Artifacts (élő kód/UI generálás)","200K token kontextus","Extended Thinking mód","PDF/dokumentumelemzés","Webes keresés (beta)","Claude Code (terminál ügynök)","Projects (memória)","MCP integráció"],
    url:"https://claude.ai",
    pricing:[{tier:"Free",price:"Ingyenes",info:"Claude 3.5 Haiku, napi limit"},{tier:"Pro",price:"$20/hó",info:"Claude 3.7 Sonnet, 5× több üzenet, Projects"},{tier:"Team",price:"$30/fő/hó",info:"Csapat funkciók, magasabb limitek"},{tier:"Enterprise",price:"Egyedi",info:"SSO, audit log, compliance"}]},
  { name:"Gemini", cat:"Chat & asszisztens", tags:["szöveg","kép","kód"], icon:"✨", free:true,
    desc:"Google AI – Gmail, Drive, Docs, Sheets integráció. Gemini 2.0 Flash Thinking az egyik leggyorsabb érvelő modell, 1 millió token kontextussal.",
    extra:["1M token kontextus","Google Workspace integráció","Deep Research","Imagen 3 képgenerálás","Gemini Live (hang + kamera)","Gems (egyéni asszisztensek)","NotebookLM integráció","Videó- és hangelemzés"],
    url:"https://gemini.google.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"Gemini 2.0 Flash, alapfunkciók"},{tier:"Advanced",price:"$19.99/hó",info:"Gemini Ultra, 1M kontextus, Workspace AI"},{tier:"Business",price:"$24/fő/hó",info:"Google Workspace integráció, admin"}]},
  { name:"Grok", cat:"Chat & asszisztens", tags:["szöveg","kép"], icon:"⚡", free:true,
    desc:"xAI (Elon Musk) chatbotja – valós idejű X/Twitter adatokhoz fér hozzá. Aurora modellel képet generál az Imagine paranccsal.",
    extra:["Aurora képgenerálás (Imagine parancs)","X/Twitter valós idejű adatok","DeepSearch (mélykeresés)","Think mód (érvelő AI)","Big Brain mód (Grok 3)","Videó- és hangelemzés","Valós idejű hírek"],
    url:"https://grok.com",
    pricing:[{tier:"Free (X-en)",price:"Ingyenes",info:"Korlátozott Grok 2, napi limittel"},{tier:"X Premium+",price:"$22/hó",info:"Grok 3, Aurora, DeepSearch, Think mód"},{tier:"SuperGrok",price:"$30/hó",info:"Magasabb limitek, priority access"}]},
  { name:"Perplexity", cat:"Chat & asszisztens", tags:["keresés","szöveg"], icon:"🔍", free:true,
    desc:"AI-alapú kereső és kutató asszisztens – minden válaszhoz forráshivatkozást ad. Computer Use / Agent mód: képes böngészőt vezérelni.",
    extra:["Forráshivatkozásos válaszok","Pro Search (mélykeresés)","⭐ Computer Use / Agent mód","Spaces (megosztott kutatás)","Fájl- és PDF-elemzés","Képgenerálás (DALL·E/SDXL)","API elérés","Valós idejű webes adatok"],
    url:"https://perplexity.ai",
    pricing:[{tier:"Free",price:"Ingyenes",info:"5 Pro Search/nap, alapkeresés"},{tier:"Pro",price:"$20/hó",info:"300+ Pro Search/nap, Computer Use, PDF"},{tier:"Enterprise",price:"Egyedi",info:"SSO, dedikált kapacitás, audit"}]},
  { name:"Microsoft Copilot", cat:"Chat & asszisztens", tags:["szöveg","kép","kód"], icon:"🪟", free:true,
    desc:"Microsoft AI – Windows 11, Edge és Office 365 teljes integrációval. GPT-4o alapú, Designer funkcióval DALL·E 3 képeket generál.",
    extra:["Designer képgenerálás (DALL·E 3)","Office 365 deep integráció","Bing valós idejű keresés","Copilot Studio (bot builder)","Windows 11 beépített","Edge sidebar"],
    url:"https://copilot.microsoft.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"GPT-4o, Designer, Bing keresés"},{tier:"Pro",price:"$20/hó",info:"Priority access, több Designer kredit, Office AI"},{tier:"M365 Business",price:"$30/fő/hó",info:"Teljes Office integráció, Teams Copilot"}]},
  { name:"Meta AI", cat:"Chat & asszisztens", tags:["szöveg","kép"], icon:"🦙", free:true,
    desc:"Meta Llama 3.3 alapú AI – beépítve Facebook, Instagram, WhatsApp és Messenger appokba. Imagine funkcióval képeket és animált GIF-eket generál.",
    extra:["Imagine képgenerálás","Animált GIF generálás","WhatsApp/Instagram/FB integráció","Llama 3.3 nyílt modell","Web search","Teljesen ingyenes"],
    url:"https://meta.ai",
    pricing:[{tier:"Free",price:"Ingyenes",info:"Llama 3.3, Imagine, web search – nincs fizetős csomag"}]},
  { name:"DeepSeek", cat:"Chat & asszisztens", tags:["szöveg","kód","elemzés"], icon:"🐋", free:true,
    desc:"Kínai fejlesztésű, rendkívül erős és ingyenes AI. DeepSeek R1 az egyik legjobb érvelő modell – versenyez az OpenAI o1-gyel, de ingyenes.",
    extra:["R1 érvelő mód (Chain of Thought)","Kód generálás (DeepCoder)","Nyílt forráskód","Helyi futtatás lehetséges","API elérés (nagyon olcsó)","Webes keresés"],
    url:"https://chat.deepseek.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"DeepSeek R1, V3, web keresés – minden ingyenes"},{tier:"API V3",price:"$0.14/1M token",info:"Input token ár"},{tier:"API R1",price:"$0.55/1M token",info:"Érvelő modell API ára"}]},

  { name:"Suno", cat:"Zene", tags:["zene"], icon:"🎵", free:true, affiliate:true,
    desc:"Szövegpromptból teljes, énekelt zeneszámot generál – hangszerelés, énekhang, mixelés egyszerre.",
    extra:["Szöveg → teljes dal (ének + hangszer)","4 perc hosszú dalok (V4)","Custom mode (saját dalszöveg)","Cover/remix funkció","Stem letöltés (Pro)","Stílus referencia","Dal szerkesztés (inpainting)"],
    url:"https://suno.com/invite/@affilion",
    pricing:[{tier:"Free",price:"Ingyenes",info:"50 kredit/nap (~10 dal), nem kereskedelmi"},{tier:"Pro",price:"$8/hó",info:"2500 kredit/hó, kereskedelmi jogok, prioritás"},{tier:"Premier",price:"$24/hó",info:"10 000 kredit/hó, stem letöltés, max minőség"}]},
  { name:"Udio", cat:"Zene", tags:["zene"], icon:"🎶", free:true,
    desc:"Suno főriválisa – kiemelkedő hangminőséggel és részletgazdag stílusvezérléssel.",
    extra:["Prémium hangminőség","Stílusvezérlés","Chapters (dal struktúra)","Remix és extend","Custom lyrics","Inpainting (dal szerkesztés)"],
    url:"https://udio.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"10 generálás/nap"},{tier:"Standard",price:"$10/hó",info:"1200 kredit/hó, kereskedelmi jogok"},{tier:"Pro",price:"$30/hó",info:"4800 kredit/hó, prioritás, max minőség"}]},
  { name:"Mubert", cat:"Zene", tags:["zene"], icon:"🎧", free:true,
    desc:"Hangulathoz, videóhoz, podcasthoz igazodó royalty-free háttérzenét generál AI-jal.",
    extra:["Royalty-free licenc","Videóhoz igazítás (hossz/BPM)","API integráció","Hangulat- és műfajszűrő"],
    url:"https://mubert.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"25 track/hó, nem kereskedelmi"},{tier:"Creator",price:"$14/hó",info:"500 track/hó, kereskedelmi jogok"},{tier:"Pro",price:"$39/hó",info:"Korlátlan, SFX, API"}]},

  { name:"ElevenLabs", cat:"Hang & voice", tags:["hang"], icon:"🔊", free:true,
    desc:"A legjobb hangklónozó és szöveg-hang konverziós eszköz. 1 perces hangmintából klónoz hangot.",
    extra:["Hangklónozás (1 perces mintából)","32+ nyelv","AI Dubbing (videó szinkron)","Voice Design (hangjellemzők)","SFX (effekthang generálás)","Audiobook generálás","API elérés","Conversational AI (bot hangja)"],
    url:"https://elevenlabs.io",
    pricing:[{tier:"Free",price:"Ingyenes",info:"10 000 karakter/hó, 3 hangklón"},{tier:"Starter",price:"$5/hó",info:"30 000 kar/hó, 10 klón, kereskedelmi"},{tier:"Creator",price:"$22/hó",info:"100 000 kar/hó, prof. klónozás"},{tier:"Pro",price:"$99/hó",info:"500 000 kar/hó, 30 prof. klón"}]},
  { name:"Whisper / Whisper.cpp", cat:"Hang & voice", tags:["hang"], icon:"🎙", free:true,
    desc:"OpenAI hang-szöveg modellje, helyi gépen is futtatható ingyenesen. 99 nyelvet támogat.",
    extra:["99 nyelv","Helyi gépen futtatható","Ingyenes & nyílt forráskód","SRT/VTT felirat export","Whisper.cpp (gyors, optimalizált)"],
    url:"https://openai.com/research/whisper",
    pricing:[{tier:"Nyílt forráskód",price:"Ingyenes",info:"GitHub-ról letölthető, helyi futtatás"},{tier:"OpenAI API",price:"$0.006/perc",info:"Felhőalapú API hívás"}]},
  { name:"Descript", cat:"Hang & voice", tags:["hang","video"], icon:"✂️", free:true,
    desc:"Szövegszerkesztőként kezeli a hang- és videófájlokat – szöveg törlésével a médiát is törli.",
    extra:["Szöveg alapú hang/videó vágás","Overdub (hangcsere AI-jal)","Zaj eltávolítás","Filler words törlés auto","Screen recorder","Automatikus felirat"],
    url:"https://descript.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"1 óra átirat/hó, alapfunkciók"},{tier:"Creator",price:"$24/hó",info:"10 óra/hó, Overdub, AI funkciók"},{tier:"Business",price:"$40/fő/hó",info:"Korlátlan, csapat funkciók"}]},

  { name:"Midjourney", cat:"Képgenerálás", tags:["kép"], icon:"🖼", free:false,
    desc:"A legjobb esztétikájú AI képgeneráló – V7 modellel fotorealisztikus és festői stílusú képeket egyaránt.",
    extra:["Legjobb esztétikai minőség (V7)","Style Reference (sref)","Character Reference (cref)","Niji 6 (anime mód)","Inpainting (Vary Region)","Upscale (4K)","Personalization (egyéni stílus)"],
    url:"https://midjourney.com",
    pricing:[{tier:"Basic",price:"$10/hó",info:"200 generálás/hó – nincs ingyenes szint"},{tier:"Standard",price:"$30/hó",info:"15 óra Fast GPU, korlátlan Relax mód"},{tier:"Pro",price:"$60/hó",info:"30 óra Fast, Stealth mód (privát)"},{tier:"Mega",price:"$120/hó",info:"60 óra Fast, max párhuzamosság"}]},
  { name:"Ideogram", cat:"Képgenerálás", tags:["kép"], icon:"🔤", free:true,
    desc:"Szöveg-a-képben páratlan minőséggel – logók, plakátok, tipográfiai képek generáláshoz ideális.",
    extra:["Szöveg képbe (legjobb minőség)","Magic Prompt (prompt javítás)","Remixelés / Inpainting","Reális fotó generálás","Logo és plakát sablonok","Canvas szerkesztő"],
    url:"https://ideogram.ai",
    pricing:[{tier:"Free",price:"Ingyenes",info:"10 slow generálás/nap"},{tier:"Basic",price:"$8/hó",info:"400 priority generálás/hó"},{tier:"Plus",price:"$20/hó",info:"1000 priority generálás/hó"},{tier:"Pro",price:"$60/hó",info:"4000 priority + API"}]},
  { name:"Adobe Firefly", cat:"Képgenerálás", tags:["kép"], icon:"🔥", free:true,
    desc:"Kereskedelmileg 100% biztonságos AI képgeneráló, Adobe szoftverekbe mélyen integrálva.",
    extra:["Kereskedelmileg biztonságos","Photoshop Generative Fill","Generative Expand","Stílus referencia","Illustrator vektorgenerálás","Express integráció"],
    url:"https://firefly.adobe.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"25 generative kredit/hó"},{tier:"Firefly Premium",price:"$9.99/hó",info:"100 kredit/hó, priority"},{tier:"Creative Cloud",price:"$54.99/hó",info:"Teljes Adobe suite + Firefly"}]},
  { name:"Stable Diffusion", cat:"Képgenerálás", tags:["kép"], icon:"🌀", free:true,
    desc:"Nyílt forráskódú, helyi gépre telepíthető képgeneráló – teljes kontroll, nincs cenzúra, nincs előfizetés.",
    extra:["Helyi futtatás (nincs adatküldés)","Nyílt forráskód","ControlNet (pózcontrol)","LoRA modellek (stílus/karakter)","Inpainting/Outpainting","ComfyUI workflow","SDXL / Flux / SD3 modellek"],
    url:"https://stability.ai",
    pricing:[{tier:"Helyi (ingyenes)",price:"Ingyenes",info:"Saját GPU szükséges, nincs limit"},{tier:"DreamStudio API",price:"$10 = 1000 kredit",info:"Felhős API, nincs saját GPU"}]},
  { name:"Leonardo.AI", cat:"Képgenerálás", tags:["kép"], icon:"🎨", free:true,
    desc:"Game asset, illusztráció és karakter generálásra optimalizált platform.",
    extra:["Game asset generálás","Motion (kép animálása)","Phoenix (fotorealisztikus)","Konzisztens karakterek","ControlNet","3D textúra generálás","Canvas szerkesztő"],
    url:"https://leonardo.ai",
    pricing:[{tier:"Free",price:"Ingyenes",info:"150 token/nap (~30 kép)"},{tier:"Apprentice",price:"$10/hó",info:"8500 token/hó"},{tier:"Artisan",price:"$24/hó",info:"25 000 token/hó, API"},{tier:"Maestro",price:"$48/hó",info:"60 000 token/hó"}]},
  { name:"Flux (Black Forest Labs)", cat:"Képgenerálás", tags:["kép"], icon:"⚗️", free:true,
    desc:"A legújabb nyílt modell, Midjourney minőségét megközelítő eredményekkel.",
    extra:["Flux Pro 1.1 Ultra (4MP)","Flux Dev (nyílt, helyi)","Flux Schnell (gyors, ingyenes)","Fill (inpainting)","Redux (style transfer)","API elérés"],
    url:"https://blackforestlabs.ai",
    pricing:[{tier:"Flux Schnell",price:"Ingyenes",info:"Nyílt forráskód, helyi futtatás"},{tier:"API (Flux Pro)",price:"$0.055/kép",info:"Felhős API, nincs havi díj"}]},
  { name:"DZINE – Média Labor ⭐", cat:"Képgenerálás", tags:["kép","video"], icon:"🧪", free:true, affiliate:true,
    desc:"All-in-one AI kreatív platform – képek, videók, hangok egyben, fix havi előfizetésért.",
    extra:["Kép-, videó-, hanggeneráló egyben","Fix előfizetés (nincs kredit-stressz)","Több modell egy helyen (MJ, SDXL, Flux)","Automatizálási workflow-k","Kereskedelmi licenc","⭐ Média Labor ajánlott eszköz"],
    url:"https://www.dzine.ai/referrals/47NQZav2",
    pricing:[{tier:"Starter",price:"~$9/hó",info:"Alap kép + videó generálás"},{tier:"Pro",price:"~$29/hó",info:"Teljes hozzáférés, fix kredit pool"},{tier:"Business",price:"~$79/hó",info:"Csapat, API, kereskedelmi jog"}]},

  { name:"Runway", cat:"Videógenerálás", tags:["video"], icon:"🎬", free:true,
    desc:"A legtöbb funkciójú AI videóeszköz. Gen-3 Alpha Turbo modellel szövegből és képből generál.",
    extra:["Gen-3 Alpha Turbo modell","Szöveg → videó","Kép → videó animálás","Act-One (expresszió átvitel)","Motion Brush","Inpainting videóban","Camera controls","Videó hosszabbítás"],
    url:"https://runwayml.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"125 kredit (~25 mp videó), vízjel"},{tier:"Standard",price:"$15/hó",info:"625 kredit/hó, nincs vízjel"},{tier:"Pro",price:"$35/hó",info:"2250 kredit/hó, 4K upscale"},{tier:"Unlimited",price:"$95/hó",info:"Korlátlan Turbo generálás"}]},
  { name:"Kling AI", cat:"Videógenerálás", tags:["video"], icon:"📽", free:true,
    desc:"Kínai fejlesztés, de globálisan elismert videógeneráló. Kling 2.0 Master modellel 3 perces videókat generál.",
    extra:["Kling 2.0 Master (3 perces videó)","Lip sync","1080p / 4K","Kamera kontrolok","Image to Video","Virtual Try-On (ruha próbálás)"],
    url:"https://klingai.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"66 kredit/nap (~10 videó)"},{tier:"Standard",price:"$10/hó",info:"660 kredit/hó"},{tier:"Pro",price:"$35/hó",info:"3000 kredit/hó, prioritás"}]},
  { name:"HeyGen", cat:"Videógenerálás", tags:["video"], icon:"👤", free:true,
    desc:"AI avatárral és hangklónozással személyre szabott videók. Video Translation funkcióval meglévő videódat 40+ nyelvre fordítja.",
    extra:["AI avatar (fotódból)","Video Translation (40+ nyelv)","Streaming Avatar (valós idejű)","Hangklónozás","Interaktív AI prezentáció","Custom avatar betanítás"],
    url:"https://heygen.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"1 kredit (~1 perc), korlátozott"},{tier:"Creator",price:"$29/hó",info:"15 kredit/hó, kereskedelmi jog"},{tier:"Team",price:"$89/hó",info:"30 kredit/hó, custom avatar"}]},
  { name:"Sora", cat:"Videógenerálás", tags:["video"], icon:"🎞", free:false,
    desc:"OpenAI videógenerálója – fizikailag helyes, fotorealisztikus videók szövegpromptból.",
    extra:["Fotorealisztikus fizika","Storyboard mód","Remix videó","Loop generálás","Blend (két videó keverése)","ChatGPT Plus-ba beépítve"],
    url:"https://openai.com/sora",
    pricing:[{tier:"Plus (ChatGPT)",price:"$20/hó",info:"50 priority videó/hó, 480p"},{tier:"Pro (ChatGPT)",price:"$200/hó",info:"Korlátlan Sora, 1080p, 20 mp"}]},
  { name:"Pika", cat:"Videógenerálás", tags:["video"], icon:"🌊", free:true,
    desc:"Képeket és szöveget animál Pika 2.0 modellel. Pikaffects effektekkel gyors, kreatív videók.",
    extra:["Pika 2.0 modell","Lip sync","Pikaffects (effektek)","Pika Scenes (jelenetépítés)","Sound effects generálás","Kép animálás"],
    url:"https://pika.art",
    pricing:[{tier:"Free",price:"Ingyenes",info:"150 kredit/hó, vízjel"},{tier:"Basic",price:"$8/hó",info:"700 kredit/hó, nincs vízjel"},{tier:"Standard",price:"$28/hó",info:"2000 kredit/hó"}]},

  { name:"GitHub Copilot", cat:"Kód & fejlesztés", tags:["kód"], icon:"💻", free:true,
    desc:"A legnépszerűbb AI kódkiegészítő – valós idejű javaslatok VS Code, JetBrains, Neovim szerkesztőkben.",
    extra:["Inline kódkiegészítés (real-time)","Copilot Chat (kód magyarázat)","Copilot Workspace (agent)","PR összefoglalók","CLI integráció","Multi-model (Claude/GPT-4o/Gemini)"],
    url:"https://github.com/features/copilot",
    pricing:[{tier:"Free",price:"Ingyenes",info:"2000 kódkiegészítés/hó, 50 chat/hó"},{tier:"Pro",price:"$10/hó",info:"Korlátlan, multi-model, Workspace"},{tier:"Business",price:"$19/fő/hó",info:"Vállalati policy, audit log"}]},
  { name:"Cursor", cat:"Kód & fejlesztés", tags:["kód"], icon:"⌨", free:true,
    desc:"AI-first kódszerkesztő – VS Code fork, minden extension működik. Composer módban több fájlt egyszerre szerkeszt.",
    extra:["Codebase-szintű szerkesztés","Agent mód (terminál hozzáférés)","Multi-file Composer","Codebase Q&A","Claude 3.7 / GPT-4o / Gemini","Tab (intelligent autocomplete)","Privacy mód"],
    url:"https://cursor.sh",
    pricing:[{tier:"Free (Hobby)",price:"Ingyenes",info:"2 hetes Pro trial, utána korlátozott"},{tier:"Pro",price:"$20/hó",info:"500 fast request/hó, korlátlan slow"},{tier:"Business",price:"$40/fő/hó",info:"Csapatkezelés, zero data retention"}]},
  { name:"Lovable", cat:"Kód & fejlesztés", tags:["kód","weboldal"], icon:"❤️", free:true, affiliate:true,
    desc:"Szövegpromptból teljes fullstack weboldalakat és appokat épít – backend, adatbázis, autentikáció egyszerre.",
    extra:["Fullstack app generálás","Supabase DB integráció","GitHub sync","Azonnali deploy","Shadcn/ui komponensek","Stripe integráció","Valós idejű előnézet","Visual szerkesztő"],
    url:"https://lovable.dev/invite/PBZ4OPL",
    pricing:[{tier:"Free",price:"Ingyenes",info:"5 üzenet/nap, 1 projekt"},{tier:"Starter",price:"$20/hó",info:"100 üzenet/hó, 3 projekt"},{tier:"Launch",price:"$50/hó",info:"500 üzenet/hó, korlátlan projekt"},{tier:"Scale",price:"$100/hó",info:"1000 üzenet/hó, csapat funkciók"}]},
  { name:"Bolt.new", cat:"Kód & fejlesztés", tags:["kód","weboldal"], icon:"⚡", free:true,
    desc:"StackBlitz által, promptból teljes webalkalmazásokat épít és futtat böngészőben.",
    extra:["Böngészőben futó Node.js","React/Next.js/Vite support","NPM csomagok","Azonnali preview","Export kód","Netlify deploy"],
    url:"https://bolt.new",
    pricing:[{tier:"Free",price:"Ingyenes",info:"Korlátozott token/nap"},{tier:"Pro",price:"$20/hó",info:"10M token/hó, prioritás"}]},
  { name:"v0 by Vercel", cat:"Kód & fejlesztés", tags:["kód"], icon:"🧩", free:true,
    desc:"UI komponenseket és teljes oldalakat generál React + Tailwind + shadcn kódban.",
    extra:["React/Tailwind/shadcn generálás","Azonnali preview","Vercel deploy","Képből kód (screenshot → UI)","Iteratív szerkesztés"],
    url:"https://v0.dev",
    pricing:[{tier:"Free",price:"Ingyenes",info:"200 kredit/hó"},{tier:"Premium",price:"$20/hó",info:"5000 kredit/hó, prioritás"}]},
  { name:"Replit AI", cat:"Kód & fejlesztés", tags:["kód"], icon:"🧑‍💻", free:true,
    desc:"Böngészőből futtatható AI fejlesztői környezet – Agent móddal természetes nyelvi utasításból épít.",
    extra:["Böngészős IDE + futtatás","Replit Agent (app builder)","Deploy egy kattintással","Multiplayer kódolás","50+ programnyelv"],
    url:"https://replit.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"Alap IDE, korlátozott AI"},{tier:"Core",price:"$25/hó",info:"Replit Agent, erősebb gép, több tárhely"}]},

  { name:"Make (Integromat)", cat:"Automatizálás", tags:["automatizálás"], icon:"⚙️", free:true,
    desc:"Vizuális no-code workflow builder – 1900+ app összekapcsolása drag-and-drop módon.",
    extra:["1900+ app integráció","AI modul (OpenAI, Claude)","Webhook support","Adattranszformáció","HTTP/API hívás","Ütemezett futtatás","Error handling","Scenario templates"],
    url:"https://make.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"1000 művelet/hó, 2 aktív scenario"},{tier:"Core",price:"$10.59/hó",info:"10 000 művelet/hó, korlátlan scenario"},{tier:"Pro",price:"$18.82/hó",info:"10 000+ műv., full log history"},{tier:"Teams",price:"$34.12/hó",info:"Csapatmunka, több felhasználó"}]},
  { name:"n8n", cat:"Automatizálás", tags:["automatizálás"], icon:"🔄", free:true,
    desc:"Nyílt forráskódú, önhosztolható workflow automatizáló – fejlesztőknek és haladóknak.",
    extra:["Önhosztolható (ingyenes)","Nyílt forráskód","AI Agent node (LLM integráció)","Kód node (JS/Python)","400+ integráció","Webhook + HTTP","Verziókövetés","Community templates"],
    url:"https://n8n.io",
    pricing:[{tier:"Self-hosted",price:"Ingyenes",info:"Saját szerveren korlátlan, open source"},{tier:"Cloud Starter",price:"$24/hó",info:"2500 workflow execution/hó"},{tier:"Cloud Pro",price:"$60/hó",info:"10 000 execution/hó, prioritás"}]},
  { name:"Zapier", cat:"Automatizálás", tags:["automatizálás"], icon:"🔌", free:true,
    desc:"A legnépszerűbb no-code automatizáló – 7000+ app integrációval.",
    extra:["7000+ integráció (legtöbb)","AI Zap generálás","Chatbot builder (Interfaces)","Tables (beépített adatbázis)","Delay, filter, paths logika","Legkönnyebb UI"],
    url:"https://zapier.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"100 feladat/hó, 5 Zap"},{tier:"Professional",price:"$29.99/hó",info:"750 feladat/hó, korlátlan Zap"},{tier:"Team",price:"$103.50/hó",info:"2000 feladat/hó, csapat"}]},
  { name:"Relevance AI", cat:"Automatizálás", tags:["automatizálás","agent"], icon:"🤖", free:true,
    desc:"AI Agent építő platform – saját AI ügynököket hozol létre, amelyek önállóan dolgoznak.",
    extra:["AI agent builder (no-code)","Multi-agent workflow","Tool integráció (100+)","Long-term memória","Web scraping agent","Sales/marketing automatizálás"],
    url:"https://relevanceai.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"100 kredit/nap, 1 agent"},{tier:"Team",price:"$199/hó",info:"Korlátlan agent, több felhasználó"}]},

  { name:"Notion AI", cat:"Produktivitás", tags:["szöveg","szervezés"], icon:"📝", free:false,
    desc:"Notion-ba beépített AI – dokumentumok írása, összefoglalók, Q&A az összes Notion tartalomra.",
    extra:["Dokumentum írás/összefoglalás","Q&A az összes Notion tartalomra","AI adatbázis mező","Fordítás (35+ nyelv)","Tone változtatás","AI autofill táblázatban"],
    url:"https://notion.so/product/ai",
    pricing:[{tier:"AI addon (Free Notion)",price:"+$10/hó",info:"AI addon a meglévő ingyenes Notion-hoz"},{tier:"Plus + AI",price:"$18/hó",info:"Korlátlan oldalak + AI"},{tier:"Business + AI",price:"$25/hó",info:"Csapat + AI funkciók"}]},
  { name:"Gamma", cat:"Produktivitás", tags:["prezentáció","szöveg"], icon:"📊", free:true,
    desc:"AI-alapú prezentáció, dokumentum és weboldal készítő. Szövegből profi diák másodpercek alatt.",
    extra:["Prezentáció generálás","AI weboldal builder","Beágyazható médiák","Analitika (megtekintések)","Export PDF/PPT","Csapatmunka"],
    url:"https://gamma.app",
    pricing:[{tier:"Free",price:"Ingyenes",info:"400 AI kredit, Gamma branding"},{tier:"Plus",price:"$10/hó",info:"Korlátlan AI, no branding, export"},{tier:"Pro",price:"$20/hó",info:"Custom domain, analitika, prioritás"}]},
  { name:"Otter.ai", cat:"Produktivitás", tags:["hang","szöveg"], icon:"🦦", free:true,
    desc:"Megbeszélések, interjúk automatikus átírása és összefoglalása valós időben.",
    extra:["Valós idejű átirat","AI meeting összefoglaló","Zoom/Teams/Meet integráció","AI Chat (kérdés a meetingről)","Action items kinyerés","Keresés az összes átiratban"],
    url:"https://otter.ai",
    pricing:[{tier:"Free",price:"Ingyenes",info:"300 perc/hó, 30 perc/meeting"},{tier:"Pro",price:"$16.99/hó",info:"1200 perc/hó, import funkciók"},{tier:"Business",price:"$30/fő/hó",info:"6000 perc/hó, admin"}]},

  { name:"Consensus", cat:"Kutatás", tags:["keresés","tudomány"], icon:"🔬", free:true,
    desc:"Tudományos cikkekben keres AI-jal – peer-reviewed forrásokból válaszol.",
    extra:["Peer-reviewed cikkek keresése","Konszenzus mutató","Citáció export","GPT-4 alapú összefoglalók","200M+ cikk adatbázis"],
    url:"https://consensus.app",
    pricing:[{tier:"Free",price:"Ingyenes",info:"20 keresés/hó"},{tier:"Premium",price:"$11.99/hó",info:"Korlátlan keresés, GPT-4 összefoglalók"}]},
  { name:"Elicit", cat:"Kutatás", tags:["keresés","tudomány"], icon:"📚", free:true,
    desc:"Kutatási asszisztens – szakirodalom keresés, összefoglalás, adatkinyerés táblázatba.",
    extra:["PDF elemzés és összefoglalás","Adat kinyerés táblázatba","Kutatás szintézis","8M+ cikk adatbázis","Automata irodalomjegyzék"],
    url:"https://elicit.com",
    pricing:[{tier:"Free",price:"Ingyenes",info:"5 forrás/keresés"},{tier:"Plus",price:"$12/hó",info:"Korlátlan forrás, PDF upload, export"}]},
];

const categories = ["Összes","Chat & asszisztens","Zene","Hang & voice","Képgenerálás","Videógenerálás","Kód & fejlesztés","Automatizálás","Produktivitás","Kutatás"];

const tagColors: Record<string, { bg: string; tc: string }> = {
  szöveg:{bg:"#EAF3DE",tc:"#27500A"},kép:{bg:"#E6F1FB",tc:"#0C447C"},video:{bg:"#FAECE7",tc:"#712B13"},zene:{bg:"#EEEDFE",tc:"#3C3489"},kód:{bg:"#FAEEDA",tc:"#633806"},hang:{bg:"#E1F5EE",tc:"#085041"},keresés:{bg:"#F1EFE8",tc:"#444441"},automatizálás:{bg:"#FCEBEB",tc:"#791F1F"},agent:{bg:"#FAEEDA",tc:"#854F0B"},prezentáció:{bg:"#E6F1FB",tc:"#185FA5"},szervezés:{bg:"#EAF3DE",tc:"#3B6D11"},tudomány:{bg:"#EEEDFE",tc:"#534AB7"},weboldal:{bg:"#E1F5EE",tc:"#0F6E56"},elemzés:{bg:"#F1EFE8",tc:"#5F5E5A"}
};

const PricingModal = ({ tool, onClose }: { tool: Tool | null; onClose: () => void }) => {
  if (!tool) return null;
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-5"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl p-7 max-w-[460px] w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-5">
          <div className="text-[26px] w-11 h-11 bg-[#f7f6f3] rounded-xl flex items-center justify-center shrink-0">{tool.icon}</div>
          <div>
            <div className="font-bold text-base text-[#1a1a1a]">{tool.name.replace(" ⭐","")}</div>
            <div className="text-[11px] text-[#bbb] italic mt-0.5">árak 2026 márciusi frissítéssel</div>
          </div>
          <button className="ml-auto text-2xl text-[#ccc] leading-none hover:text-[#888]" onClick={onClose}>×</button>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          {tool.pricing.map((p, i) => (
            <div key={i} className={`flex justify-between items-start p-3 rounded-xl ${i === 0 && tool.free ? "bg-[#f0faf4] border border-[#bce8c8]" : "bg-[#f8f7f4] border border-[#eee]"}`}>
              <div>
                <div className="font-semibold text-[13px] text-[#1a1a1a]">{p.tier}</div>
                <div className="text-xs text-[#888] mt-0.5 leading-snug">{p.info}</div>
              </div>
              <div className={`font-bold text-sm whitespace-nowrap ml-3 ${i === 0 && tool.free ? "text-[#1a7a3c]" : "text-[#1a1a1a]"}`}>{p.price}</div>
            </div>
          ))}
        </div>
        {tool.affiliate && (
          <div className="mb-3 p-2 px-3 bg-[#fff8f0] rounded-lg border border-[#ffd9a8] text-xs text-[#a05a10] leading-relaxed">
            🔗 Affiliate link – Média Labor ajánlás. Regisztrációddal ingyen támogatod a szervert.
          </div>
        )}
        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 bg-[#1a1a1a] text-white rounded-xl text-[13px] font-semibold hover:bg-[#333] no-underline transition-colors">
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
      <div className="min-h-screen pt-20" style={{ background: "#f9f8f5", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <div className="max-w-[980px] mx-auto px-5 py-7">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[30px]">🧠</span>
            <h1 className="text-[30px] font-extrabold text-[#1a1a1a] tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>AI Eszköztár</h1>
          </div>
          <p className="text-[13px] text-[#999] mt-1 mb-6">
            {filtered.length} eszköz · Kártyára kattintva megnyílik az oldal · „Csomagok" gombra az árak · <em>árak 2026 márciusi frissítéssel</em>
          </p>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Keresés eszközök, funkciók között..."
            className="w-full py-2.5 px-3.5 text-sm border-[1.5px] border-[#ddd] rounded-[10px] mb-3.5 bg-white text-[#1a1a1a] outline-none focus:border-[#888]"
            style={{ fontFamily: "inherit" }}
          />

          <div className="flex gap-1.5 flex-wrap mb-7">
            {categories.map(cat => (
              <button
                key={cat}
                className={`py-1 px-3.5 rounded-full border-[1.5px] text-[13px] whitespace-nowrap transition-colors ${activeCat === cat ? "bg-[#1a1a1a] text-white border-[#1a1a1a] font-bold" : "bg-white text-[#666] border-[#ddd] hover:border-[#bbb]"}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-[#bbb] text-center py-12 text-[15px]">Nincs találat.</p>
          ) : (
            categories.slice(1).filter(c => grouped[c]).map(cat => (
              <div key={cat}>
                <div className="flex items-center gap-2.5 mb-3 mt-2">
                  <span className="text-[11px] font-bold tracking-wider text-[#bbb] uppercase">{cat}</span>
                  <div className="flex-1 h-px bg-[#eee]" />
                  <span className="text-[11px] text-[#ccc]">{grouped[cat].length} eszköz</span>
                </div>
                <div className="grid gap-2.5 mb-7" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(275px, 1fr))" }}>
                  {grouped[cat].map(t => (
                    <a
                      key={t.name}
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border-[1.5px] border-[#ebebeb] rounded-[14px] p-3.5 px-4 flex flex-col gap-2 no-underline text-inherit transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-[#ddd]"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="text-[22px] w-[38px] h-[38px] flex items-center justify-center bg-[#f7f6f3] rounded-[10px] shrink-0">{t.icon}</div>
                        <div>
                          <div className="text-sm font-bold text-[#1a1a1a]">{t.name}</div>
                          <div className="flex gap-1 flex-wrap mt-0.5">
                            {t.affiliate && <span className="text-[10px] py-0.5 px-1.5 rounded-full font-semibold text-white" style={{ background: "linear-gradient(135deg,#ff6b35,#f7c59f)" }}>Affiliate</span>}
                            {t.free
                              ? <span className="text-[10px] py-0.5 px-1.5 rounded-full font-semibold bg-[#EAF3DE] text-[#27500A]">Van ingyenes</span>
                              : <span className="text-[10px] py-0.5 px-1.5 rounded-full font-semibold bg-[#FAEEDA] text-[#633806]">Csak fizetős</span>
                            }
                          </div>
                        </div>
                      </div>
                      <p className="text-[12.5px] text-[#555] leading-relaxed">{t.desc}</p>
                      {t.extra.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {t.extra.map((e, i) => (
                            <span key={i} className="text-[11px] bg-[#f4f3f0] text-[#555] py-0.5 px-2 rounded-md font-medium">✦ {e}</span>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {t.tags.map(tg => {
                          const c = tagColors[tg] || { bg: "#f0ede8", tc: "#444" };
                          return <span key={tg} className="text-[10.5px] py-0.5 px-2 rounded-full font-semibold" style={{ background: c.bg, color: c.tc }}>{tg}</span>;
                        })}
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-1">
                        <span className="text-[11px] text-[#ccc]">{t.url.replace("https://","").split("/")[0]} ↗</span>
                        <button
                          className="text-[11px] font-semibold bg-[#f4f3f0] border-none text-[#555] py-1 px-2.5 rounded-md hover:bg-[#e8e6e0] transition-colors"
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

          <p className="text-center text-[#ccc] text-[11.5px] mt-2">
            🔗 Affiliate linkeknél a regisztráció ingyen támogatja a Média Labort · <em>árak 2026 márciusi frissítéssel</em>
          </p>
        </div>
      </div>
      <Footer />
      <PricingModal tool={modalTool} onClose={() => setModalTool(null)} />
    </>
  );
};

export default Eszkoztarak;

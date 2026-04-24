export const site = {
  name: "Simone Pepe",
  handle: "sjmvne",
  role: "Developer · Milano",
  location: "Milano, IT",
  email: "simonepepemail@gmail.com",
  phone: "+39 348 460 1320",
  social: {
    linkedin: "https://linkedin.com/in/simonepepe00",
    instagram: "https://instagram.com/sjmvne",
    github: "https://github.com/sjmvne",
    webhub: "https://webhub.agency",
  },
} as const;

export const hero = {
  greeting: "Ciao, sono",
  name: "Simone",
  tagline:
    "Sviluppo software — per lavoro e per hobby. Di giorno MES/ERP in Accenture, la sera progetti miei: siti, tool AI, app che mi servono.",
  meta: "Milano · due cani · una fotocamera",
  statusLine: {
    label: "Attualmente su",
    value: "progetto MES aerospace",
  },
} as const;

export const about = {
  title: "Chi sono",
  paragraphs: [
    "Ho cominciato con SAP ABAP in Altea. Poi sono passato a SAP MII e IoT industriale (Lamborghini, Luxottica, CIT). Dal 2023 sono in Accenture: prima due anni su una dashboard SAPUI5 per CNH Industrial, ora su DELMIA Apriso tra automotive e aerospace.",
    "Fuori dall'ufficio ho messo in piedi WebHub, una piccola digital agency che porto avanti nei weekend. E costruisco strumenti che mi servono: un server MCP per cercare nella documentazione Apriso, un assistente AI offline per scenari senza rete, qualche app per problemi domestici.",
    "Mi interessa il codice che qualcuno usa davvero. I problemi concreti più delle astrazioni. E finire le cose, anche quando non vengono perfette.",
  ],
  stats: [
    { label: "Anni su MES/ERP", value: "5+" },
    { label: "Clienti enterprise", value: "6" },
    { label: "Progetti personali", value: "7+" },
    { label: "Cani", value: "2" },
  ],
} as const;

export type TimelineItem = {
  year: string;
  title: string;
  org: string;
  description: string;
  tag: "education" | "work" | "project" | "milestone";
};

export const timeline: TimelineItem[] = [
  {
    year: "2013 · 2019",
    title: "Diploma di Perito Informatico",
    org: "ITIS G. Riva, Saronno",
    description:
      "Basi solide: Java, C++, MySQL, reti e sistemi. Capisco che mi piace programmare e che voglio farlo in azienda, non in startup sperimentale.",
    tag: "education",
  },
  {
    year: "2018",
    title: "Stage sistemista",
    org: "F1 Consulting · Milano",
    description:
      "Un mese e mezzo di IT support. Porto a casa una cosa preziosa: saper scrivere documentazione chiara per colleghi che non sono tecnici.",
    tag: "work",
  },
  {
    year: "2019",
    title: "Corso SAP ABAP",
    org: "F1 Consulting School",
    description:
      "Tre settimane intensive. È da qui che comincia davvero la mia carriera.",
    tag: "education",
  },
  {
    year: "2019 · 2020",
    title: "ABAP Junior Developer",
    org: "Altea Federation",
    description:
      "Primi progetti veri per Automotive Lighting, AGOS, Lu-Ve. Imparo che prima di scrivere codice bisogna capire come lavora il cliente.",
    tag: "work",
  },
  {
    year: "2020 · 2023",
    title: "IoT / SAP MII Developer",
    org: "Altea Federation",
    description:
      "Si apre un secondo capitolo: Lamborghini, Luxottica, Elettronica Aster, CIT. Progetto Coldchain per CIT — capisco cosa vuol dire codice con conseguenze fisiche.",
    tag: "work",
  },
  {
    year: "2023 · 2025",
    title: "Senior Frontend Developer",
    org: "Accenture · CNH Industrial",
    description:
      "Due anni e mezzo su una dashboard SAPUI5 enterprise per la supply chain. Entro come developer, esco come lead maintainer lato frontend.",
    tag: "milestone",
  },
  {
    year: "2024 · oggi",
    title: "Fondazione WebHub",
    org: "webhub.agency",
    description:
      "Una digital agency tutta mia, accanto al lavoro corporate. Siti, SEO, advertising, social per PMI e piccoli brand.",
    tag: "project",
  },
  {
    year: "2025 · oggi",
    title: "DELMIA Apriso Developer",
    org: "Accenture · Agrati, Aerospace",
    description:
      "Tre certificazioni Dassault Systèmes in due mesi. Process Builder, Business Components, integrazioni tra ERP e MES.",
    tag: "work",
  },
  {
    year: "2025 · oggi",
    title: "AI tooling personale",
    org: "apriso-docs · Hermit Survival AI",
    description:
      "Esploro LLM integration, MCP server, RAG offline. Corsi Anthropic, Claude Code nel workflow quotidiano.",
    tag: "project",
  },
];

export type SkillLevel = "Senior" | "Working" | "Familiar" | "Exposure";

export type Skill = {
  name: string;
  level: SkillLevel;
  note?: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  description: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "mes-erp",
    label: "MES / ERP",
    description: "Core professionale, 5+ anni",
    skills: [
      { name: "SAP MII", level: "Senior", note: "Workbench, XacuteQuery, Illuminator" },
      { name: "SAPUI5 / OpenUI5", level: "Senior", note: "MVC, Router, Web Workers, i18n" },
      { name: "SAP ME", level: "Working" },
      { name: "SAP PCo", level: "Working" },
      { name: "ABAP", level: "Working" },
      { name: "DELMIA Apriso", level: "Working", note: "Process Builder, BC, DFC" },
      { name: "Oracle ERP ↔ MES", level: "Working" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    description: "Enterprise e digital agency",
    skills: [
      { name: "JavaScript ES6", level: "Senior" },
      { name: "HTML / CSS", level: "Senior" },
      { name: "XML Views & Fragments", level: "Senior" },
      { name: "React / Next.js", level: "Working" },
      { name: "Tailwind CSS", level: "Working" },
      { name: "WordPress", level: "Working" },
    ],
  },
  {
    id: "backend",
    label: "Backend & Data",
    description: "Database e integrazione",
    skills: [
      { name: "SQL Server", level: "Working" },
      { name: "Oracle", level: "Familiar" },
      { name: "SAP HANA", level: "Familiar" },
      { name: "REST / JSON APIs", level: "Senior" },
      { name: "OData", level: "Working" },
      { name: "Java", level: "Familiar" },
    ],
  },
  {
    id: "ai",
    label: "AI / LLM",
    description: "Area in crescita rapida",
    skills: [
      { name: "Anthropic API", level: "Working", note: "Uso quotidiano" },
      { name: "MCP (Model Context Protocol)", level: "Working" },
      { name: "Prompt Engineering", level: "Working" },
      { name: "Retrieval / BM25", level: "Working" },
      { name: "Perplexity API", level: "Familiar" },
      { name: "RAG offline", level: "Working", note: "llama.cpp, GGUF" },
    ],
  },
  {
    id: "iot",
    label: "Integrazione / IoT",
    description: "Shop floor e macchine industriali",
    skills: [
      { name: "OPC UA / DA", level: "Working" },
      { name: "MQTT", level: "Working" },
      { name: "IoT Gateway Eurotech", level: "Working" },
    ],
  },
  {
    id: "design",
    label: "Design & Media",
    description: "Post-produzione, hobby pro",
    skills: [
      { name: "Adobe Photoshop", level: "Working" },
      { name: "Adobe Lightroom", level: "Working" },
      { name: "Adobe Illustrator", level: "Familiar" },
      { name: "Adobe After Effects", level: "Familiar" },
      { name: "Blender", level: "Familiar", note: "Render 3D per Lisa Corti" },
    ],
  },
];

export const levelTone: Record<SkillLevel, string> = {
  Senior: "bg-accent-soft text-accent border-accent/30",
  Working: "bg-surface text-foreground/90 border-border",
  Familiar: "bg-surface/60 text-muted border-border",
  Exposure: "bg-surface/40 text-muted/70 border-border",
};

export type ProjectCategory = "featured" | "side";
export type ProjectStatus = "live" | "in-progress" | "planning" | "personal" | "archived";

export type Project = {
  slug: string;
  category: ProjectCategory;
  client: string;
  title: string;
  period: string;
  role: string;
  team?: string;
  teaser: string;
  stack: string[];
  status?: ProjectStatus;
  url?: string;
  urlLabel?: string;
  highlight?: { label: string; value: string }[];
  sections: {
    context: string;
    work: string[];
    stackDetail: string;
    learnings: string;
  };
};

export const projects: Project[] = [
  {
    slug: "cnh-material-coverage",
    category: "featured",
    client: "CNH Industrial",
    title: "Material Coverage Dashboard",
    period: "Mag 2023 · Set 2025",
    role: "Senior Frontend · Lead maintainer",
    team: "9 developer, Accenture",
    teaser:
      "Dashboard SAPUI5 enterprise per la supply chain. Due anni e mezzo come lead maintainer lato frontend.",
    stack: [
      "SAPUI5",
      "SAP MII",
      "JavaScript ES6",
      "Web Workers",
      "jQuery",
      "XLSX · JSZip",
      "i18n",
    ],
    highlight: [
      { label: "Durata", value: "2 anni e 5 mesi" },
      { label: "Ruolo", value: "Lead FE" },
      { label: "Plant gestiti", value: "3" },
    ],
    sections: {
      context:
        "CNH produce macchine agricole e industriali su più stabilimenti, con centinaia di fornitori e migliaia di codici. I responsabili dei materiali avevano bisogno di un tool real-time per rispondere a domande concrete: quali componenti rischiano di fermare la produzione? Quali ordini ai fornitori vanno aperti? Quali spedizioni sono in ritardo?",
      work: [
        "Analisi del runout produttivo giorno per giorno con priorità visive",
        "Gestione dei call-off verso i fornitori (apertura, monitoraggio, chiusura)",
        "Tracking delle spedizioni in transito con integrazione esterna e tolleranze per plant",
        "Escalation multi-livello verso il team di supply chain",
        "Versione multi-plant con override configurabili per tre stabilimenti",
        "Export Excel asincrono via Web Worker per dataset oltre le 50k righe",
        "Refactoring del layer condiviso per ridurre duplicazione e bug di regressione",
      ],
      stackDetail:
        "SAPUI5, SAP MII come middleware, JavaScript ES6, pattern MVC con XML Views e Fragments, Web Workers per l'export pesante, i18n multilingua, Git branch-based.",
      learnings:
        "Entrare in una codebase di centinaia di commit e diventare 'quello che sa dove sono le cose' non è una questione di talento, è una questione di metodo. Ho imparato a leggere il codice degli altri con curiosità, non con giudizio. E che la soluzione giusta non è sempre quella più elegante.",
    },
  },
  {
    slug: "aerospace-apriso",
    category: "featured",
    client: "Cliente aerospace Tier-1",
    title: "MES Apriso Implementation",
    period: "Feb 2026 · in corso",
    role: "Apriso Developer",
    teaser:
      "Implementazione DELMIA Apriso come MES per un'azienda aerospace. Integrazione tra ERP e shop floor.",
    stack: [
      "DELMIA Apriso",
      "Process Builder",
      "Business Components",
      "SQL Server",
      "Oracle ERP",
      "Postman",
    ],
    highlight: [
      { label: "Settore", value: "Aerospace" },
      { label: "Stato", value: "In corso" },
    ],
    sections: {
      context:
        "Un'azienda aerospace Tier-1 italiana sta migrando il proprio MES su DELMIA Apriso. L'obiettivo è gestire Item, Routing, Documenti e Engineering Change Orders, interfacciando Apriso con l'ERP Oracle già in uso.",
      work: [
        "Personalizzazioni in Process Builder per estendere i workflow standard",
        "Business Components custom per logiche specifiche del cliente",
        "Stored procedure SQL Server per trasformazioni dati",
        "Manutenzione evolutiva delle interfacce ERP ↔ MES esistenti",
        "Motore di ricerca interno sulla documentazione Apriso, nato come tool personale e poi utile al team",
      ],
      stackDetail:
        "DELMIA Apriso, Process Builder, Business Components, SQL Server, Oracle ERP, payload XML/JSON, Postman per testing end-to-end.",
      learnings:
        "Apriso richiede un ribaltamento mentale rispetto a SAPUI5: qui non lavori fuori e poi esponi via API, stai dentro il runtime e tutto passa per le sue astrazioni. Ho impiegato un paio di mesi a interiorizzarlo, poi la produttività è decollata.",
    },
  },
  {
    slug: "agrati-dispatching",
    category: "featured",
    client: "Agrati Group",
    title: "Production Dispatching Frontend",
    period: "Dic 2025 · Feb 2026",
    role: "Senior Developer",
    team: "3-4 developer",
    teaser:
      "Interfaccia drag & drop per assegnare ordini ai macchinari di officina in tempo reale.",
    stack: ["DELMIA Apriso", "Process Builder", "JavaScript", "SQL Server"],
    highlight: [
      { label: "Durata", value: "~3 mesi" },
      { label: "Settore", value: "Automotive" },
    ],
    sections: {
      context:
        "Agrati produce componenti di fissaggio per l'automotive. Gli ordini di produzione devono essere distribuiti dinamicamente sui macchinari in base a disponibilità, carichi, priorità. Serviva uno strumento in cui il capo reparto potesse spostare e riassegnare ordini in modo visivo, senza passare per le schermate gestionali tradizionali.",
      work: [
        "Frontend drag & drop per il dispatching degli ordini sulle postazioni",
        "Integrazione con il layer Apriso per persistenza e validazione",
        "Gestione real-time della disponibilità dei macchinari",
      ],
      stackDetail:
        "DELMIA Apriso, Process Builder, JavaScript vanilla per il layer drag & drop, SQL Server per persistenza.",
      learnings:
        "Il primo progetto reale su Apriso dopo le certificazioni. È servito a rompere il ghiaccio sulla piattaforma, capire cosa funziona e cosa invece va aggirato. Primo cliente, primo deploy produttivo: più di ogni corso.",
    },
  },
  {
    slug: "lamborghini-mes",
    category: "featured",
    client: "Automobili Lamborghini",
    title: "MES Line Support & Development",
    period: "Ott 2021 · Dic 2022",
    role: "Developer · Supporto turni",
    teaser:
      "App SAPUI5 per le postazioni operatore in catena di montaggio. Reperibilità per le emergenze in linea.",
    stack: ["SAP MII", "SAP ME", "SAP PCo", "MQTT", "SAP HANA", "SAPUI5"],
    highlight: [
      { label: "Durata", value: "~14 mesi" },
      { label: "Modalità", value: "Reperibilità turni" },
    ],
    sections: {
      context:
        "In catena di montaggio ogni postazione ha un'app SAPUI5 dedicata che guida l'operatore: pesca dati da HANA e MII, traccia tempi e qualità, gestisce le anomalie. Se qualcosa si rompe, la linea rischia di fermarsi. E fermarsi costa.",
      work: [
        "Sviluppo e bug-fixing sulle app in catena di montaggio",
        "Back-end MII con query HANA, front-end SAPUI5 per gli operatori",
        "Reperibilità telefonica su turni per le emergenze linea",
      ],
      stackDetail:
        "SAP MII, SAP ME, SAP PCo, MQTT, database HANA, frontend SAPUI5.",
      learnings:
        "Quando ti chiamano alle 22 perché un operatore è bloccato e la linea sta per fermarsi, non hai il lusso della soluzione elegante. Hai 15 minuti per capire, sistemare, documentare. Ho imparato lì cosa vuol dire delivery-first.",
    },
  },

  {
    slug: "webhub",
    category: "side",
    client: "WebHub",
    title: "webhub.agency",
    period: "2024 · oggi",
    role: "Fondatore · Developer",
    teaser:
      "Digital agency per PMI e piccoli brand. Oltre 10 clienti tra siti web, brand material e piccole consulenze digitali.",
    stack: ["WordPress", "SEO", "Advertising", "Branding", "E-commerce"],
    status: "live",
    url: "https://webhub.agency",
    urlLabel: "webhub.agency",
    highlight: [
      { label: "Clienti", value: "10+" },
      { label: "Servizi", value: "Web · Print · Social" },
    ],
    sections: {
      context:
        "Una digital agency fondata in parallelo al lavoro in Accenture. Nasce dall'esigenza di stare fuori dal corporate per almeno una parte del tempo: ragionare con clienti PMI, consegnare velocemente, avere il cantiere sempre aperto.",
      work: [
        "Siti web WordPress con temi custom o configurazioni sartoriali",
        "SEO on-page e local SEO per brand con target regionale",
        "Social media management e advertising per clienti brand",
        "Brand material: biglietti da visita, flyer, identità visiva leggera",
        "Consulenze digitali per piccole attività che non hanno budget enterprise",
      ],
      stackDetail:
        "WordPress come CMS principale, pagine statiche dove ha senso, Figma per il layer grafico, suite Adobe per i materiali di stampa.",
      learnings:
        "Vendere software a una PMI ha regole opposte al lavoro in Accenture. Al cliente non interessa quale framework, interessa quando va online e quanto costa. Ho imparato a scrivere preventivi, gestire aspettative, chiudere progetti in tempi certi.",
    },
  },
  {
    slug: "apriso-docs",
    category: "side",
    client: "Tool personale",
    title: "apriso-docs — MCP Server",
    period: "2025 · oggi",
    role: "Solo · Python",
    teaser:
      "MCP server che indicizza 60.000 chunk di documentazione DELMIA Apriso e li espone a Claude via ricerca BM25.",
    stack: ["Model Context Protocol", "Python", "BM25", "Crawler", "HTM · PDF · XML"],
    status: "personal",
    highlight: [
      { label: "Chunk indicizzati", value: "~60k" },
      { label: "Uso", value: "Personale · team" },
    ],
    sections: {
      context:
        "La documentazione ufficiale di DELMIA Apriso non è indicizzata da Google in modo utilizzabile. Cercare una colonna di una tabella o capire come funziona una Business Component richiede ore di navigazione tra manuali. L'ho sistemato una volta per sempre.",
      work: [
        "Crawler offline sulla documentazione ufficiale (HTM, PDF, schema DB, XML)",
        "Pipeline di tokenizzazione e indicizzazione BM25 cross-source",
        "Esposizione via Model Context Protocol a Claude e qualunque LLM MCP-compatible",
        "Query in linguaggio naturale tradotte in ricerca strutturata sulla doc",
      ],
      stackDetail:
        "Python per orchestrazione e indicizzazione, BM25 come algoritmo di retrieval, MCP come interfaccia verso l'LLM.",
      learnings:
        "Il ROI di uno strumento costruito per te stesso è altissimo: ore risparmiate tutte le settimane. E costruirlo mi ha insegnato quanto la documentazione tecnica industriale sia il contrario di 'cercabile'.",
    },
  },
  {
    slug: "hermit-survival-ai",
    category: "side",
    client: "Progetto personale",
    title: "Hermit Survival AI",
    period: "2026 · in corso",
    role: "Solo · Prototipo RAG offline",
    teaser:
      "Assistente AI offline che interroga file ZIM di Kiwix (manuali survival, ricette, articoli) senza nessuna connessione di rete.",
    stack: ["Python", "llama.cpp", "GGUF", "Kiwix ZIM", "RAG", "Fedora", "LineageOS"],
    status: "in-progress",
    highlight: [
      { label: "Target", value: "Offline totale" },
      { label: "Piattaforme", value: "Linux · Android" },
    ],
    sections: {
      context:
        "Un assistente che funzioni davvero senza rete, pensato per scenari low-connectivity: acqua potabile, conservazione cibi, pronto soccorso, riparazioni di base. L'idea è trasformare i file ZIM di Kiwix (librerie survival, manuali tecnici, ricette) in una base di conoscenza interrogabile in linguaggio naturale, da un modello AI che gira in locale.",
      work: [
        "Pipeline RAG che estrae i passaggi rilevanti dai file ZIM e li passa al modello come contesto",
        "Integrazione tra modelli quantizzati GGUF (llama.cpp) e contenuti statici Kiwix",
        "Ambiente replicabile su Fedora desktop e in futuro su Android con LineageOS + root via Termux",
        "Query in linguaggio naturale, risposte sintetiche in italiano",
      ],
      stackDetail:
        "Python per orchestrazione e retrieval, file ZIM di Kiwix come knowledge base, modelli GGUF quantizzati (es. TinyLlama) con llama.cpp come engine, Fedora Linux su laptop e LineageOS + Termux sul telefono.",
      learnings:
        "Costruire un sistema RAG davvero offline significa ripensare il tooling 'da desktop' per ambienti ibridi con risorse limitate. E progettare non solo per le feature, ma per cosa succede quando la rete non c'è.",
    },
  },
  {
    slug: "3kking",
    category: "side",
    client: "Progetto personale",
    title: "3kking.app",
    period: "2025 · oggi",
    role: "Solo · Product + Dev",
    teaser:
      "Trekking companion: organizzazione uscite, inventario zaini, spese condivise, to-do, chat, community.",
    stack: ["React Native", "Mobile-first", "Community"],
    status: "in-progress",
    url: "https://3kking.app",
    urlLabel: "3kking.app",
    highlight: [
      { label: "Focus", value: "Mobile" },
      { label: "Stato", value: "In sviluppo" },
    ],
    sections: {
      context:
        "Organizzare un trekking con un gruppo di amici significa mettere insieme percorso, meteo, chi porta cosa, chi paga il carburante, dove si dorme, quali farmaci infilare nel kit. 3kking è un tentativo di raccogliere tutto questo in un posto solo.",
      work: [
        "Organizzazione uscite: luogo, meteo, mappa interattiva, percorsi",
        "Inventario zaini condiviso con ownership (chi porta cosa)",
        "Gestione spese comuni e auto",
        "To-do list del trekking, chat interna al gruppo",
        "Community: trekking fatti, recensioni, contatti tra appassionati",
      ],
      stackDetail:
        "React Native, architettura mobile-first, backend community da definire.",
      learnings:
        "Un'app consumer ha un costo di polish nascosto enorme. Sta imparando a riconoscere quali dettagli sono quelli che fanno davvero la differenza per l'utente — e quali sono vezzi.",
    },
  },
  {
    slug: "ds-checker",
    category: "side",
    client: "Progetto personale",
    title: "DS Checker",
    period: "2024 · 2025",
    role: "Solo",
    teaser:
      "Web app che valuta prodotti cosmetici in ottica dermatite seborroica. Classifica ingredienti via Perplexity API.",
    stack: ["Next.js", "Perplexity API", "Tailwind"],
    status: "live",
    url: "https://sjmvne.github.io/DS-Checker/",
    urlLabel: "sjmvne.github.io/DS-Checker",
    highlight: [
      { label: "Tipo", value: "Web app" },
      { label: "Stato", value: "Live su GitHub Pages" },
    ],
    sections: {
      context:
        "Avevo bisogno di un modo veloce per valutare shampoo, creme e detergenti senza leggere 40 blog dermatologici ogni volta. Inserisci un prodotto o i suoi ingredienti, ottieni una classificazione: indicato, sconsigliato, neutro, con motivazione.",
      work: [
        "Frontend Next.js minimal con form di input",
        "Integrazione con Perplexity API per il lookup ingredienti",
        "Logica di classificazione per ingredienti noti come trigger di dermatite seborroica",
      ],
      stackDetail:
        "Next.js per il frontend, API di Perplexity per la ricerca contestuale, deploy su GitHub Pages.",
      learnings:
        "Un tool costruito per risolvere un problema personale è già metà validato. Il resto è metterlo online in 4 ore e lasciare che funzioni.",
    },
  },
  {
    slug: "calcolo-crocchette",
    category: "side",
    client: "Progetto personale",
    title: "Calcolo Crocchette",
    period: "2024 · in rewrite",
    role: "Solo",
    teaser:
      "Tool di stima del fabbisogno calorico canino e valutazione della qualità del mangime.",
    stack: ["Next.js", "Nutrizione canina", "UX"],
    status: "archived",
    url: "https://sjmvne.github.io/alimentazione-cani/",
    urlLabel: "sjmvne.github.io/alimentazione-cani",
    highlight: [
      { label: "Tipo", value: "Web app" },
      { label: "Stato", value: "Da rewrite" },
    ],
    sections: {
      context:
        "I miei due cani e il loro mangime. Leggere etichette a occhio per capire se il rapporto proteine/carboidrati/additivi è accettabile mi stancava. Ho fatto un tool che lo fa al posto mio.",
      work: [
        "Calcolatore del fabbisogno calorico canino per peso e attività",
        "Analisi etichette mangimi (proteine, carboidrati, ceneri, additivi)",
        "Classificazione qualitativa dei prodotti analizzati",
      ],
      stackDetail:
        "Next.js, deploy su GitHub Pages. La repository è più vecchia e va riscritta — la nuova versione avrà UX più curata e più alimenti coperti.",
      learnings:
        "Un primo prototipo ti dice subito se l'idea ha senso. Poi però va rimesso a posto, e quello è il lavoro vero. Sto per affrontarlo.",
    },
  },
  {
    slug: "flip7",
    category: "side",
    client: "Progetto personale",
    title: "Flip 7",
    period: "2024 · 2025",
    role: "Solo · Dev + UX",
    teaser:
      "Push-your-luck card game digitalizzato. Multiplayer real-time con bot, tema custom, supporto PWA.",
    stack: ["Vanilla JS", "PeerJS", "PWA", "State Machine"],
    status: "live",
    url: "https://sjmvne.github.io/Flip7/",
    urlLabel: "sjmvne.github.io/Flip7",
    highlight: [
      { label: "Tipo", value: "Multiplayer real-time" },
      { label: "Extra", value: "Bot · PWA · Temi" },
    ],
    sections: {
      context:
        "Flip 7 è un gioco di carte push-your-luck che giro da qualche tempo con gli amici. Mi andava di digitalizzarlo per partite veloci a distanza, con il minimo possibile di frizione.",
      work: [
        "Logica di gioco completa: mani, bust, stop, punteggi",
        "Multiplayer real-time via PeerJS (peer-to-peer, nessun server)",
        "Bot per giocare anche da soli o riempire i posti mancanti",
        "Tema custom e supporto PWA per installarlo come app",
      ],
      stackDetail:
        "Vanilla JavaScript per non appesantire, PeerJS per il multiplayer peer-to-peer, service worker per la PWA, estetica web moderna senza librerie di UI.",
      learnings:
        "Progetto di puro piacere. Mi ha insegnato che si può costruire qualcosa di finito e divertente anche senza stack complessi — Vanilla JS e un protocollo P2P bastano. E che i bot con una logica decente valgono più di dieci feature di matchmaking.",
    },
  },
];

export const caseStudies = projects.filter((p) => p.category === "featured");
export const sideProjects = projects.filter((p) => p.category === "side");

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  status: "earned" | "in-progress";
};

export const certifications: Certification[] = [
  {
    title: "DELMIA Brand Essentials",
    issuer: "Dassault Systèmes",
    date: "Ott 2025",
    status: "earned",
  },
  {
    title: "DELMIA Operations Management Essentials",
    issuer: "Dassault Systèmes",
    date: "Nov 2025",
    status: "earned",
  },
  {
    title: "DELMIA Apriso Process Builder Implement",
    issuer: "Dassault Systèmes",
    date: "Nov 2025",
    status: "earned",
  },
  {
    title: "Anthropic Claude Engineering",
    issuer: "Anthropic",
    date: "In corso",
    status: "in-progress",
  },
];

export type StackIconKey =
  | "sap"
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs"
  | "tailwind"
  | "html"
  | "css"
  | "wordpress"
  | "mysql"
  | "anthropic"
  | "claude"
  | "perplexity"
  | "blender"
  | "git"
  | "bash"
  | "linux"
  | "postman"
  | "jquery"
  | "lodash"
  | "mqtt"
  | null;

export type StackItem = {
  name: string;
  icon?: StackIconKey;
};

export type StackCategory = {
  id: string;
  label: string;
  items: StackItem[];
};

export const stackCategories: StackCategory[] = [
  {
    id: "mes",
    label: "MES / ERP",
    items: [
      { name: "SAPUI5", icon: "sap" },
      { name: "SAP MII", icon: "sap" },
      { name: "SAP ME", icon: "sap" },
      { name: "SAP PCo", icon: "sap" },
      { name: "ABAP", icon: "sap" },
      { name: "SAP HANA", icon: "sap" },
      { name: "DELMIA Apriso", icon: null },
      { name: "Oracle ERP", icon: null },
    ],
  },
  {
    id: "web",
    label: "Web",
    items: [
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "WordPress", icon: "wordpress" },
      { name: "jQuery", icon: "jquery" },
      { name: "Lodash", icon: "lodash" },
    ],
  },
  {
    id: "data",
    label: "Data",
    items: [
      { name: "SQL Server", icon: null },
      { name: "Oracle", icon: null },
      { name: "MySQL", icon: "mysql" },
      { name: "REST", icon: null },
      { name: "OData", icon: null },
      { name: "MQTT", icon: "mqtt" },
    ],
  },
  {
    id: "ai",
    label: "AI / LLM",
    items: [
      { name: "Anthropic API", icon: "anthropic" },
      { name: "Claude Code", icon: "claude" },
      { name: "MCP", icon: null },
      { name: "Perplexity", icon: "perplexity" },
      { name: "BM25 / Retrieval", icon: null },
      { name: "llama.cpp", icon: null },
    ],
  },
  {
    id: "design",
    label: "Design",
    items: [
      { name: "Photoshop", icon: null },
      { name: "Lightroom", icon: null },
      { name: "Illustrator", icon: null },
      { name: "After Effects", icon: null },
      { name: "Blender", icon: "blender" },
    ],
  },
  {
    id: "dev",
    label: "Dev",
    items: [
      { name: "Git", icon: "git" },
      { name: "Bash", icon: "bash" },
      { name: "Linux", icon: "linux" },
      { name: "Postman", icon: "postman" },
      { name: "VS Code", icon: null },
    ],
  },
];

export type TravelCity = {
  city: string;
  country: string;
  coords: [number, number];
  year?: string;
  note?: string;
};

export const travels: TravelCity[] = [
  { city: "Vienna", country: "Austria", coords: [48.2082, 16.3738] },
  { city: "Valencia", country: "Spagna", coords: [39.4699, -0.3763] },
  { city: "Tenerife", country: "Spagna", coords: [28.2916, -16.6291] },
  { city: "Lisbona", country: "Portogallo", coords: [38.7223, -9.1393], note: "Roadtrip Portogallo" },
  { city: "Porto", country: "Portogallo", coords: [41.1579, -8.6291], note: "Roadtrip Portogallo" },
  { city: "Parigi", country: "Francia", coords: [48.8566, 2.3522] },
  { city: "Copenhagen", country: "Danimarca", coords: [55.6761, 12.5683] },
  { city: "Siviglia", country: "Spagna", coords: [37.3886, -5.9823] },
  { city: "Milano", country: "Italia", coords: [45.4642, 9.19], note: "Home base" },
];

export const dogs = [
  {
    name: "Whisky",
    breed: "Border Collie",
    age: "5 anni",
    description:
      "Il classico Border: intelligente, instancabile, ti guarda come se stesse già calcolando dove lancerai la prossima palla prima che tu ci pensi. In vacanza vuole sapere dove stiamo andando prima di noi.",
  },
  {
    name: "Lady",
    breed: "Pastore Australiano",
    age: "3 anni",
    description:
      "Più dolce, più collosa, in perenne ricerca di coccole. Whisky le ha insegnato tutti i giochi, ma il risultato è una sua interpretazione personale — più caotica.",
  },
];

export const interests = [
  {
    title: "Fotografia",
    description:
      "Reportage di viaggio, architettura urbana, ritratti dei cani. Lightroom e Photoshop in post.",
  },
  {
    title: "Montagna e trekking",
    description:
      "Da qui nasce anche 3kking.app. Preparare uno zaino ha lo stesso ritmo di un deploy.",
  },
  {
    title: "Strumentazione nerd",
    description:
      "Due droni DJI: Avata 2 per il FPV, Neo 2 per le riprese quotidiane. Un po' di tempo su hardware e gadget, ma solo se finiscono davvero nel workflow.",
  },
  {
    title: "Videogiochi",
    description:
      "Cooperativi con amici, di solito. La modalità social preferita dopo la cena.",
  },
];

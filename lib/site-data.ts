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
    "Costruisco software per l'industria e tool per risolvere problemi quotidiani. Di giorno in Accenture tra sistemi MES e dashboard enterprise, la sera esploro AI, fotografia e tutto ciò che può essere automatizzato.",
  meta: "Crafting digital experiences",
  statusLine: {
    label: "Attualmente su",
    value: "progetto MES aerospace",
  },
} as const;

export const about = {
  title: "Chi sono",
  paragraphs: [
    "Ho passato gli ultimi anni tra fabbriche e sistemi enterprise, imparando che un bug non è mai solo un errore di logica, ma un problema reale per chi sta lavorando. Ho gestito codice su cui poggiavano linee di produzione critiche: un'esperienza che ti insegna il valore della responsabilità e della concretezza.",
    "Il mio percorso è iniziato tra i sistemi SAP e si è evoluto verso architetture più moderne, ma la filosofia è rimasta la stessa: il software deve servire a qualcosa di concreto. Oggi divido il mio tempo tra la consulenza enterprise e la mia agenzia, WebHub, cercando sempre l'equilibrio tra pragmatismo tecnico e curiosità per le nuove tecnologie.",
    "Mi interessa il codice che qualcuno usa davvero. I problemi reali più delle astrazioni. E finire le cose, possibilmente bene, senza troppi giri di parole.",
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
      "Basi di informatica industriale. È qui che ho capito che la programmazione non è solo logica, ma uno strumento per creare impatto reale nel mondo del lavoro.",
    tag: "education",
  },
  {
    year: "2018",
    title: "Stage sistemista",
    org: "F1 Consulting · Milano",
    description:
      "Supporto IT sul campo. Qui ho imparato la skill più preziosa: tradurre il linguaggio tecnico in soluzioni comprensibili per chi deve solo lavorare meglio.",
    tag: "work",
  },
  {
    year: "2019",
    title: "Corso SAP ABAP",
    org: "F1 Consulting School",
    description:
      "Tre settimane intensive di ABAP. È qui che ho capito che la programmazione può essere bellissima o estremamente frustrante. Ho scelto entrambe.",
    tag: "education",
  },
  {
    year: "2019 · 2020",
    title: "ABAP Junior Developer",
    org: "Altea Federation",
    description:
      "Primi passi nel mondo corporate per Automotive Lighting, AGOS e Lu-Ve. Imparo che prima di scrivere codice bisogna ascoltare chi quel codice dovrà usarlo ogni giorno.",
    tag: "work",
  },
  {
    year: "2020 · 2023",
    title: "IoT / SAP MII Developer",
    org: "Altea Federation",
    description:
      "Capitolo IoT: Lamborghini, Luxottica, CIT. Sviluppo soluzioni dove il codice ha conseguenze fisiche. Se il sistema si ferma, si ferma la produzione. Una bella palestra per i nervi.",
    tag: "work",
  },
  {
    year: "2023 · 2025",
    title: "Senior Frontend Developer",
    org: "Accenture · CNH Industrial",
    description:
      "Due anni e mezzo su una dashboard SAPUI5 enorme. Sono entrato come developer e ne sono uscito come punto di riferimento per il frontend, imparando che la manutenzione di una codebase critica richiede più metodo che genio.",
    tag: "milestone",
  },
  {
    year: "2024 · oggi",
    title: "Fondazione WebHub",
    org: "webhub.agency",
    description:
      "La mia agenzia. Un modo per sporcarmi le mani con progetti diversi dal solito corporate: siti per piccoli brand e soluzioni digitali sartoriali, senza troppi giri di parole.",
    tag: "project",
  },
  {
    year: "2025 · oggi",
    title: "DELMIA Apriso Developer",
    org: "Accenture · Agrati, Aerospace",
    description:
      "Certificazioni e implementazioni MES Apriso in settori ad alta precisione. Process Builder, Business Components e integrazioni tra ERP e officina.",
    tag: "work",
  },
  {
    year: "2025 · oggi",
    title: "AI tooling personale",
    org: "apriso-docs · Hermit Survival AI",
    description:
      "Esploro il potenziale degli LLM per rendere la documentazione tecnica industriale realmente interrogabile. Un tool nato per risolvere una mia frustrazione e diventato un asset per il team.",
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
    description: "Il mio core professionale",
    skills: [
      { name: "SAP MII", level: "Senior", note: "Workbench, XacuteQuery, Illuminator" },
      { name: "SAPUI5 / OpenUI5", level: "Senior", note: "MVC, Web Workers, i18n" },
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
    description: "Enterprise e progetti web",
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
    description: "Database e integrazioni",
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
    description: "Sperimentazione e automazione",
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
    description: "Dalle macchine al database",
    skills: [
      { name: "OPC UA / DA", level: "Working" },
      { name: "MQTT", level: "Working" },
      { name: "IoT Gateway Eurotech", level: "Working" },
    ],
  },
  {
    id: "design",
    label: "Design & Media",
    description: "Post-produzione e 3D per passione",
    skills: [
      { name: "Adobe Photoshop", level: "Working" },
      { name: "Adobe Lightroom", level: "Working" },
      { name: "Adobe Illustrator", level: "Familiar" },
      { name: "Adobe After Effects", level: "Familiar" },
      { name: "Blender", level: "Familiar", note: "Render per Lisa Corti" },
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
      "Gestione critica della supply chain. Due anni e mezzo a scalare una dashboard che non poteva permettersi di sbagliare.",
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
        "In una produzione massiva come quella di CNH, sapere quale componente fermerà la linea domani è vitale. I responsabili dei materiali avevano bisogno di uno strumento real-time per gestire migliaia di codici e ordini fornitori senza perdersi nel rumore dei dati.",
      work: [
        "Analisi del runout produttivo con visualizzazione delle priorità critiche",
        "Gestione completa dei call-off e monitoraggio spedizioni in ritardo",
        "Tracking dei transiti con tolleranze personalizzate per ogni stabilimento",
        "Motore di export Excel asincrono via Web Worker per gestire oltre 50k righe senza bloccare la UI",
        "Refactoring del layer condiviso tra i plant per abbattere i bug di regressione",
      ],
      stackDetail:
        "Architettura MVC basata su SAPUI5, con SAP MII come middleware. Uso intensivo di XML Views, Fragments e Web Workers per le operazioni pesanti.",
      learnings:
        "Entrare in una codebase enorme e diventarne il punto di riferimento mi ha insegnato che la chiarezza batte l'eleganza. Ho imparato a leggere il codice degli altri con curiosità, non con giudizio, e che la soluzione 'giusta' è quella che regge il carico della realtà.",
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
      "Implementazione di DELMIA Apriso in ambito aerospace. Integrazione dati tra Oracle ERP e shop floor.",
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
        "Migrazione del MES per un'azienda aerospace italiana. L'obiettivo è la gestione di workflow complessi (Item, Routing, ECO) interfacciati con l'ERP Oracle.",
      work: [
        "Personalizzazione di workflow in Process Builder per estendere le logiche standard",
        "Sviluppo di Business Components custom per la gestione dati specifica",
        "Scrittura di stored procedure SQL Server per trasformazioni dati complesse",
        "Manutenzione evolutiva delle interfacce ERP ↔ MES",
      ],
      stackDetail:
        "L'ecosistema DELMIA Apriso richiede un approccio integrato tra Process Builder, logiche DB e validazioni end-to-end via Postman.",
      learnings:
        "Apriso richiede un ribaltamento mentale rispetto allo sviluppo web tradizionale: lavori all'interno del runtime e delle sue astrazioni. Una sfida di adattamento che, una volta superata, sblocca una produttività incredibile.",
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
      "Dispatching degli ordini in tempo reale per le linee automotive. Drag & drop per l'officina.",
    stack: ["DELMIA Apriso", "Process Builder", "JavaScript", "SQL Server"],
    highlight: [
      { label: "Durata", value: "~3 mesi" },
      { label: "Settore", value: "Automotive" },
    ],
    sections: {
      context:
        "Agrati aveva bisogno di un modo visivo e veloce per distribuire gli ordini di produzione sui macchinari. Serviva uno strumento che permettesse ai capi reparto di riassegnare i carichi di lavoro con un semplice trascinamento.",
      work: [
        "Sviluppo del frontend drag & drop per il dispatching degli ordini",
        "Integrazione diretta con la persistenza dei dati in Apriso",
        "Gestione in tempo reale della disponibilità dei macchinari",
      ],
      stackDetail:
        "Process Builder accoppiato con JavaScript vanilla per gestire l'interazione drag & drop in modo fluido.",
      learnings:
        "Il mio primo progetto reale su Apriso. Mi è servito a rompere il ghiaccio con la piattaforma e a capire cosa funziona davvero in produzione, al di là dei corsi di certificazione.",
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
      "Supporto critico alla linea di montaggio. Se l'operatore si ferma, si ferma tutto. Qui si impara il pragmatismo.",
    stack: ["SAP MII", "SAP ME", "SAP PCo", "MQTT", "SAP HANA", "SAPUI5"],
    highlight: [
      { label: "Durata", value: "~14 mesi" },
      { label: "Modalità", value: "Reperibilità turni" },
    ],
    sections: {
      context:
        "In catena di montaggio, ogni postazione operatore è guidata da un'app che traccia tempi, qualità e anomalie. Se il sistema ha un problema, la linea si ferma e i costi esplodono.",
      work: [
        "Sviluppo e bug-fixing sulle app SAPUI5 dedicate alla produzione",
        "Backend basato su query HANA e integrazioni MII",
        "Supporto critico su turni per risolvere le emergenze in linea",
      ],
      stackDetail:
        "Uno stack SAP industriale completo: MII, ME, PCo per la comunicazione con le macchine e frontend SAPUI5 per l'interfaccia uomo-macchina.",
      learnings:
        "Quando ricevi una chiamata alle 22 perché la linea è bloccata, impari a dare priorità alla soluzione. Hai pochi minuti per capire, sistemare e ripartire. È stata la mia palestra di delivery-first.",
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
      "La mia digital agency per PMI e piccoli brand. Un modo per stare fuori dal corporate e costruire soluzioni veloci e concrete.",
    stack: ["WordPress", "SEO", "Advertising", "Branding", "E-commerce"],
    status: "live",
    url: "https://webhub.agency",
    urlLabel: "webhub.agency",
    highlight: [
      { label: "Clienti", value: "10+" },
      { label: "Servizi", value: "Web · Branding · Social" },
    ],
    sections: {
      context:
        "WebHub nasce dalla voglia di gestire progetti dall'inizio alla fine, ragionando con i clienti sulle loro necessità reali senza i tempi del mondo enterprise.",
      work: [
        "Sviluppo siti WordPress personalizzati",
        "SEO on-page e strategie local per brand regionali",
        "Gestione identità visiva e materiali promozionali",
        "Consulenza digitale diretta per piccole attività",
      ],
      stackDetail:
        "WordPress come base per la velocità di consegna, Figma per il design e suite Adobe per la produzione di materiali creativi.",
      learnings:
        "Vendere software a una PMI è l'opposto del lavoro corporate. Al cliente interessa quanto costa e se funziona. Ho imparato a gestire budget, aspettative e scadenze in modo molto più serrato.",
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
      "Automatizzo le parti noiose del lavoro. Un server MCP per interrogare 60.000 chunk di documentazione tecnica senza impazzire.",
    stack: ["Model Context Protocol", "Python", "BM25", "Crawler", "HTM · PDF · XML"],
    status: "personal",
    highlight: [
      { label: "Chunk indicizzati", value: "~60k" },
      { label: "Uso", value: "Personale · team" },
    ],
    sections: {
      context:
        "Cercare un'informazione specifica tra migliaia di pagine di documentazione Apriso era una perdita di tempo. Ho deciso di risolverlo costruendo un bridge tra l'AI e i manuali.",
      work: [
        "Crawler per l'estrazione di dati da manuali HTM, PDF e schemi DB",
        "Indicizzazione BM25 per una ricerca testuale efficace",
        "Integrazione via MCP per permettere all'AI di navigare nella documentazione",
      ],
      stackDetail:
        "Python per l'orchestrazione, BM25 come motore di ricerca leggero e MCP come standard di comunicazione con gli LLM.",
      learnings:
        "Il tempo risparmiato ogni settimana è il miglior ritorno sull'investimento possibile. Mi ha insegnato quanto sia importante costruirsi i propri strumenti.",
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
      "Assistente AI totalmente offline per scenari senza rete. Manuali tecnici e survival sempre in tasca.",
    stack: ["Python", "llama.cpp", "GGUF", "Kiwix ZIM", "RAG", "Fedora", "LineageOS"],
    status: "in-progress",
    highlight: [
      { label: "Target", value: "Offline totale" },
      { label: "Piattaforme", value: "Linux · Android" },
    ],
    sections: {
      context:
        "Un esperimento per vedere quanto lontano si può andare con l'AI locale. Un assistente che non ha bisogno di internet per interrogare manuali tecnici e informazione critica.",
      work: [
        "Pipeline RAG ottimizzata per girare su hardware locale",
        "Integrazione con i file ZIM di Kiwix come base di conoscenza",
        "Prototipazione su Fedora Linux e preparazione per Android (Termux)",
      ],
      stackDetail:
        "Modelli GGUF quantizzati su llama.cpp, Python per l'estrazione del contesto dai database statici.",
      learnings:
        "Progettare per scenari offline significa ripensare tutto il tooling moderno che diamo per scontato. Una bella sfida di efficienza e risorse limitate.",
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
      "Un assistente per il trekking. Tutto quello che serve per organizzare un'uscita di gruppo senza perdersi i pezzi.",
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
        "Organizzare un'uscita di gruppo significa gestire meteo, zaini, spese e itinerari. 3kking prova a mettere tutto in un unico posto per evitare lo spam su WhatsApp.",
      work: [
        "Gestione zaini condivisa per non portare tre fornellini e zero tende",
        "Calcolatore delle spese comuni e della logistica auto",
        "Integrazione mappe e itinerari interattivi",
      ],
      stackDetail:
        "Sviluppato in React Native con un focus totale sulla UX in mobilità.",
      learnings:
        "Le app consumer richiedono un livello di rifinitura che nel corporate spesso si ignora. Sto imparando quali dettagli fanno davvero la differenza per chi le usa in cima a una montagna.",
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
      "Un gioco di carte push-your-luck digitalizzato. Multiplayer P2P, bot e zero frizione.",
    stack: ["Vanilla JS", "PeerJS", "PWA", "State Machine"],
    status: "live",
    url: "https://sjmvne.github.io/Flip7/",
    urlLabel: "sjmvne.github.io/Flip7",
    highlight: [
      { label: "Tipo", value: "Multiplayer P2P" },
      { label: "Extra", value: "Bot · PWA · Temi" },
    ],
    sections: {
      context:
        "Volevo giocare a Flip 7 a distanza con gli amici senza dover configurare server o account. Così l'ho costruito come PWA peer-to-peer.",
      work: [
        "Logica di gioco completa basata su una state machine solida",
        "Multiplayer real-time tramite PeerJS (nessun server centrale)",
        "Sviluppo di bot per partite veloci anche in solitaria",
        "Supporto PWA per l'installazione su mobile",
      ],
      stackDetail:
        "Vanilla JavaScript per la massima velocità, PeerJS per la connessione diretta e CSS moderno senza framework pesanti.",
      learnings:
        "È stato un progetto di puro piacere. Mi ha ricordato che si possono fare cose bellissime anche con strumenti semplici, se l'idea di base è solida.",
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
      "Border Collie classico: più intelligente di me, mi guarda come se stesse già calcolando il refactoring del mio codice prima ancora che io prema Invio. In vacanza vuole sempre sapere dove stiamo andando prima di noi.",
  },
  {
    name: "Lady",
    breed: "Pastore Australiano",
    age: "3 anni",
    description:
      "Dolce e perennemente in cerca di coccole. Whisky le ha insegnato tutti i giochi, ma il risultato è una sua interpretazione personale — decisamente più caotica e rumorosa.",
  },
];

export const interests = [
  {
    title: "Fotografia & Videomaking FPV",
    description:
      "Reportage urbani, ritratti ai cani e riprese aeree. Volare in FPV (DJI Avata 2) e pilotare droni mi permette di unire l'aspetto tecnico dei controlli alla ricerca visiva dell'inquadratura perfetta. Uso Lightroom, Photoshop e Premiere per la post.",
  },
  {
    title: "Montagna & Trekking",
    description:
      "Da qui nasce anche 3kking.app. Preparare uno zaino e pianificare un itinerario in quota richiede lo stesso focus e la stessa gestione degli imprevisti di un buon deploy in produzione.",
  },
  {
    title: "Hardware & Setup",
    description:
      "Sperimento spesso con nuovo hardware, automazioni e tool di produttività. Ma ho una regola d'oro: se un gadget o un setup non semplifica davvero il workflow quotidiano, non dura a lungo sulla scrivania.",
  },
  {
    title: "Scienza e Spazio, Natura",
    description:
      "Appassionato di esplorazione spaziale, astrofisica e natura. Quando non guardo schermi, cerco di capire come funzionano l'universo e il mondo fisico attorno a noi, trovando ispirazione nella complessità immensa dei sistemi naturali.",
  },
];

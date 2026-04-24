# sjmvne.dev

Portfolio personale e CV digitale di Simone Pepe.

Il progetto raccoglie in un unico sito il profilo professionale, l'esperienza su MES ed ERP, i progetti principali, alcuni interessi personali e una mappa interattiva dei viaggi. L'obiettivo non e mostrare un template generico, ma raccontare percorso, stack e lavori in modo diretto.

## Cosa contiene

- Home single-page con sezioni dedicate a profilo, timeline, skill, stack, certificazioni, progetti, interessi e contatti
- Pagine separate per progetti, fotografia e cani
- Mappa viaggi con Mapbox e fallback automatico quando il token non e configurato
- Tema chiaro/scuro con persistenza lato client
- Animazioni leggere con Motion su reveal, metriche e componenti hero
- Metadata SEO, sitemap, robots e opengraph image generata via App Router

## Stack

- Next.js 16 con App Router
- React 19
- TypeScript strict
- Tailwind CSS v4
- Motion
- react-map-gl + mapbox-gl
- next-themes
- Vercel Analytics e Speed Insights

## Route principali

- /: homepage principale
- /projects/[slug]: dettaglio dei case study
- /dogs: pagina dedicata a Whisky e Lady
- /photo: pagina fotografia
- /robots.txt
- /sitemap.xml
- /opengraph-image

## Struttura del progetto

```text
app/
	layout.tsx
	page.tsx
	dogs/page.tsx
	photo/page.tsx
	projects/[slug]/page.tsx
components/
	sections/
	map/
	motion/
	providers/
	terminal/
	ui/
lib/
	site-data.ts
	utils.ts
public/
	cv/
```

Il contenuto principale vive in lib/site-data.ts. Le sezioni della homepage leggono da li, cosi copy e dati restano centralizzati.

## Avvio locale

### Prerequisiti

- Node.js 20+
- pnpm

### Installazione

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Il sito sara disponibile su http://localhost:3000.

## Variabili ambiente

La mappa usa Mapbox solo se e presente questa variabile:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_public_mapbox_token
```

Se il token manca, il sito continua a funzionare e mostra un fallback testuale con la lista delle citta visitate.

## Script disponibili

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm typecheck
pnpm format
pnpm format:check
```

## Verifica prima del deploy

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Deploy

Il target principale e Vercel.

Passi consigliati:

1. Importare il repository su Vercel
2. Configurare NEXT_PUBLIC_MAPBOX_TOKEN nelle environment variables, se si vuole la mappa interattiva
3. Eseguire il primo deploy su main
4. Collegare il dominio sjmvne.dev

## Note

- Il progetto usa App Router e componenti server/client dove serve
- Il token Mapbox e pubblico per definizione, quindi va esposto solo tramite variabile NEXT_PUBLIC_MAPBOX_TOKEN
- Non e presente una test suite dedicata: la validazione corrente passa da lint, typecheck e build

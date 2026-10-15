# Οδηγός Deployment — ProΣτέγη (Vercel + Neon PostgreSQL)

Το project έχει προσαρμοστεί για deployment στη **Vercel** με βάση δεδομένων **PostgreSQL (Neon)**.

## Τι άλλαξε

| Αρχείο | Αλλαγή |
|---|---|
| `next.config.mjs` (νέο — σβήστηκε το `next.config.ts`) | Αφαιρέθηκε το `output: "standalone"` (αιτία χαμένων CSS assets), προστέθηκε `images.formats` |
| `tailwind.config.ts` | **Διαγράφηκε** — νεκρός v3 κώδικας που δεν διαβάζεται από το Tailwind v4 |
| `postcss.config.mjs` | Παραμένει ως έχει (ήδη σωστό για v4: `@tailwindcss/postcss`) |
| `prisma/schema.prisma` | `provider = "postgresql"` + `directUrl` για migrations |
| `package.json` | `build: "prisma generate && next build"`, `postinstall: "prisma generate"`, `start: "next start"` — σβήστηκαν τα `cp -r ... standalone` |
| `.env` / `.env.example` | Neon connection strings (pooled + direct) |
| `src/lib/db.ts` | Query logging μόνο σε development |
| `db/custom.db`, `DATABASE_URL=file:...` | Αφαιρέθηκαν — το hardcoded τοπικό path δεν δουλεύει στο cloud |

## Βήματα deployment

### 1. Δημιουργία βάσης στο Neon (δωρεάν)
1. Συνδέσου στο https://console.neon.tech και δημιουργία project (π.χ. `prostegi`).
2. Από το **Connection Details** πάρε ΚΑΙ τις δύο παραλλαγές:
   - **Pooled** (το host περιέχει `-pooler`) → αυτό είναι το `DATABASE_URL`
   - **Direct** (χωρίς `-pooler`) → αυτό είναι το `DIRECT_URL`
3. Συμπλήρωσέ τα στο `.env` τοπικά ΚΑΙ αργότερα στη Vercel (Environment Variables).

### 2. Δημιουργία tables στη βάση
```bash
bun install            # ή npm install — τρέχει αυτόματα το prisma generate
bunx prisma db push    # ή npm run db:push — δημιουργεί contact_leads & order_requests
```

### 3. Push σε GitHub
```bash
git add -A
git commit -m "Prepare for Vercel + Neon PostgreSQL"
git push origin main
```
Σημείωση: το `.gitignore` ήδη εξαιρεί τα `.env*` — τα credentials ΔΕΝ ανεβαίνουν στο repo.

### 4. Import στη Vercel
1. https://vercel.com → **Add New → Project** → επίλεξε το repo.
2. Το Next.js αναγνωρίζεται αυτόματα — μην αλλάξεις Build/Output settings.
3. Στο βήμα **Environment Variables** πρόσθεσε (για Production + Preview):
   - `DATABASE_URL` = pooled Neon string
   - `DIRECT_URL` = direct Neon string
4. **Deploy**.

### 5. Custom domain (www.prostegi.gr)
1. Vercel → Project → **Settings → Domains** → πρόσθεσε `prostegi.gr` και `www.prostegi.gr`.
2. Στον πάροχο DNS ρύθμισε ό,τι ζητήσει η Vercel (συνήθως A record `76.76.21.21` ή CNAME `cname.vercel-dns.com`).
3. Το `SITE_URL` στο `src/lib/seo.ts` είναι ήδη `https://www.prostegi.gr` — δεν χρειάζεται αλλαγή.

## Χρήσιμες εντολές
```bash
npm run dev          # τοπική ανάπτυξη (συνδέεται στο Neon με το .env)
npm run db:studio    # Prisma Studio — βλέπεις leads/παραγγελίες σε UI
npm run db:push      # σπρώχνει αλλαγές schema στη βάση
npm run build        # ντοπικός έλεγχος production build
```

## Σημειώσεις
- Τα προϊόντα/πακέτα είναι στατικά δεδομένα (`src/lib/products-data.ts`, `paketa-data.ts`) — ΔΕΝ εξαρτώνται από τη βάση. Η βάση αποθηκεύει μόνο **leads φόρμας** και **παραγγελίες καλαθιού**.
- Αν σβήσεις/αλλάξεις τη Neon βάση, ξανατρέξε `bunx prisma db push`.
- Το API hello world (`/api`) μπορεί να σβηστεί ελεύθερα — είναι demo route.

# Danseskole - Online Kursregistrering

En moderne React-applikasjon for online registrering og betaling av dansekurs, bygget med Appwrite som backend og Vipps for betalinger.

## ✨ Funksjoner

- 🎭 **Kurskataloger** - Vis alle tilgjengelige dansekurs med detaljer
- 👥 **Multi-student registrering** - Registrer flere studenter i en bestilling
- 💰 **Fleksible prispakker** - 1, 2, eller 3+ klasser med automatiske rabatter
- 👨‍👩‍👧‍👦 **Familierabatt** - 50% rabatt for danser nr. 2+ (på 3+ klasser pakken)
- 🛒 **Handlekurv** - Legg til/fjern studenter og se pristotaler
- 💳 **Vipps betaling** - Sikker betaling med Vipps integration
- 📱 **Responsive design** - Fungerer perfekt på mobil og desktop
- ⚡ **Real-time inventory** - Live oppdatering av ledige plasser

## 🛠 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS
- **Backend:** Appwrite (Database, Auth)
- **Betaling:** Vipps eCom API
- **Icons:** Lucide React
- **Deployment:** Vercel/Netlify ready

## 📋 Forutsetninger

1. **Node.js** 18+ installert
2. **Appwrite** konto og prosjekt opprettet
3. **Vipps** utviklerkonto (for produksjon)

## 🚀 Kom i gang

### 1. Klon prosjektet

```bash
git clone <repo-url>
cd danseskole
```

### 2. Installer dependencies

```bash
npm install
```

### 3. Sett opp environment variabler

```bash
cp .env.local.example .env.local
# Rediger .env.local med dine Appwrite verdier
```

### 4. Sett opp Appwrite database

#### Opprett collections:

1. **dance_classes** - Dansekurs informasjon
2. **schedules** - Timeplan for kursene
3. **pricing_packages** - Prispakker og rabatter
4. **orders** - Kundebestillinger
5. **order_items** - Bestillingsdetaljer
6. **family_groups** - Familie grupper for rabatter

#### Importer test data:

Bruk JSON-filene i `/data` mappen for å populere collections med test data.

### 5. Start utviklingsserver

```bash
npm run dev
```

Applikasjonen kjører nå på `http://localhost:5173`

## 📊 Database Struktur

### dance_classes

- Informasjon om alle dansekurs (Jazz, Ballett, Hiphop, etc.)
- Instruktør, aldersgruppe, varighet, beskrivelse

### schedules

- Timeplan for hver klasse
- Dag, tid, rom, maks studenter, ledige plasser

### pricing_packages

- Prispakker: Toddler, 1 klasse, 2 klasser, 3+ klasser
- Klippekort og tilleggsavgifter (Kompani)

### orders

- Kundebestillinger med kontaktinfo
- Status: cart, reserved, paid, cancelled

### order_items

- Detaljer for hver student i bestillingen
- Kobling til valgte klasser og timeplan

## 🔄 Brukerreise

1. **Hjem** - Landingsside med informasjon
2. **Kurs** - Legg til studenter og velg klasser
3. **Handlekurv** - Se sammendrag og priser
4. **Kasse** - Fyll inn kontaktinfo
5. **Betaling** - Betale med Vipps
6. **Bekreftelse** - Vis resultat og send kvittering

## 💳 Betaling

### Test modus (standard)

- Mock Vipps integration for utvikling
- Ingen ekte betalinger

### Produksjon

- Krever Vipps merchant avtale
- Oppdater `VITE_MOCK_PAYMENTS=false` i .env

## 🎨 Design System

### Farger

- **Primary:** Purple (600-700)
- **Success:** Green (600-700)
- **Warning:** Yellow/Orange (500-600)
- **Danger:** Red (600-700)

### Komponenter

- Responsivt design med mobile-first
- Konsistent spacing og typography
- Tilgjengelige skjemaer og navigasjon

## 📱 Responsive Design

- **Mobile:** < 768px - Stacked layout, hamburger menu
- **Tablet:** 768px - 1024px - Responsive grid
- **Desktop:** > 1024px - Full layout med sidebar

## 🔧 Deployment

### Vercel (anbefalt)

```bash
npm run build
vercel --prod
```

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Environment variabler

Husk å sette opp alle VITE\_ variabler i deployment platform.

## 🧪 Testing

### Mock betaling

Når `VITE_MOCK_PAYMENTS=true`:

- Simulert Vipps flow
- Testknapper for godkjenn/avbryt
- Ingen ekte API kall

### Vipps test

Med Vipps test credentials:

- Test telefon: 12345678
- Test PIN: 1234
- Bruk beløp < 1000 kr

## 🔍 Troubleshooting

### Vanlige problemer

**Appwrite connection failed:**

- Sjekk VITE_APPWRITE_PROJECT_ID
- Verifiser database og collection ID-er

**Vipps betaling feiler:**

- Kontroller at mock payments er aktivert
- Sjekk Vipps credentials og URLs

**Build errors:**

- Sjekk at alle dependencies er installert
- Verifiser Node.js versjon (18+)

## 📞 Support

For spørsmål eller problemer:

1. Sjekk denne README
2. Se Appwrite dokumentasjon
3. Kontakt Brattås Utvikling @ kontakt@brattaasutvikling.no

## 📄 Lisens

MIT License - se LICENSE fil for detaljer.

---

**Utviklet med ❤️ for dansegleden!** 💃🕺

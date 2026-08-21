# AD Niamey 2000

**Assemblée de Dieu Niamey 2000** — Site officiel de l'église

> *Annoncer la bonne nouvelle de Christ à Niamey, au Niger et au-delà.*

📍 Niamey, Niger — Quartier Yantala
📧 adniamey2000@gmail.com
🌐 [adniamey2000.vercel.app](https://adniamey2000.vercel.app)

---

## Notre mission

L'Assemblée de Dieu Niamey 2000 est une communauté chrétienne vivante qui annonce l'Évangile de Jésus-Christ. Nous sommes une famille de foi où l'amour de Dieu transforme des vies. Que vous soyez membre, visiteur ou de passage, vous êtes chez vous ici.

### Horaires des cultes

- **Dimanche** — Culte principal : 9h00
- **Mercredi** — Étude biblique : 18h00
- **Vendredi** — Prière : 18h00

---

## Le site

Site bilingue **FR / EN** construit avec les technologies modernes du web.

### Fonctionnalités

- **Pages publiques** : Accueil, À propos, Sermons, Événements, Galerie, Annonces, Contact
- **Bilingue** : français et anglais sur toutes les pages
- **Ruban d'annonces** défilant sur toutes les pages
- **Verset du jour** via l'API YouVersion, traduit automatiquement en français
- **Formulaire de contact** avec pièce jointe (PDF, Word, Excel, image)
- **Espace d'administration** complet (`/admin`)
- **Bouton don** (Mobile Money, banque, PayPal)
- **SEO optimisé** : Open Graph, JSON-LD, sitemap, robots.txt
- **Responsive** : adapté mobile, tablette et desktop

### Espace d'administration

- Gestion des sermons (YouTube)
- Gestion des événements
- Gestion des départements et de l'équipe
- Galerie photos
- Annonces et horaires
- Paramètres du site

---

## Stack technique

| Technologie | Usage |
|---|---|
| [Next.js 16](https://nextjs.org) | Framework (App Router, Turbopack) |
| [Prisma 7](https://www.prisma.io) | ORM + Prisma Postgres |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling |
| [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) | Stockage images |
| [Vercel](https://vercel.com) | Déploiement |
| [YouVersion API](https://developers.bible.com) | Verset du jour |

---

## Démarrage

Prérequis : Node.js 20+, npm.

```bash
git clone https://github.com/adniamey2000/adniamey2000.git
cd adniamey2000
npm install
cp .env.example .env
```

Configurez les variables dans `.env` puis :

```bash
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

> Le seed crée un compte admin : `admin@adniamey2000.org` / `admin123` — changez-le immédiatement.

---

## Scripts

| Commande | Description |
|--- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run lint` | ESLint |

---

## Déploiement Vercel

1. Importez le dépôt sur [vercel.com](https://vercel.com/new)
2. Créez un store **Blob** (Settings → Storage)
3. Ajoutez les variables d'environnement (voir `.env.example`)
4. Le site se déploie automatiquement à chaque push

---

## Structure

```
prisma/              Schéma, migrations et seed
public/images/       Images statiques (hero, en-têtes, logo)
src/app/[lang]/      Pages publiques (fr / en)
src/app/admin/       Espace d'administration
src/app/api/         Routes API (contact, blob, newsletter, admin)
src/components/      Composants React
src/lib/             i18n, mail, versets, prisma, paramètres
```

---

## Licence

© 2026 AD Niamey 2000 — Assemblée de Dieu au Niger. Tous droits réservés.

# AD Niamey 2000

Site officiel de l'Assemblée de Dieu Niamey 2000 — une famille de foi où l'amour de Dieu transforme des vies.

Construit avec [Next.js](https://nextjs.org) (App Router), [Prisma](https://www.prisma.io), SQLite, Tailwind CSS v4 et i18n FR/EN.

## Fonctionnalités

- Pages publiques : Accueil, À propos, Équipe, Sermons, Événements, Galerie, Blog (annonces), Contact
- Bilingue FR / EN (toutes les pages)
- Ruban d'annonces défilant (type télé) sur toutes les pages
- Verset du jour (`/api/verse-of-the-day`) — traduit automatiquement en français
- Formulaire de contact avec pièce jointe (PDF, Word, Excel, image — 10 Mo max)
- Espace d'administration (`/admin`) : sermons, événements, départements, équipe, galerie, horaires, annonces, dons, paramètres
- Bouton « Faire un don » avec les moyens de paiement (Mobile Money, banque, PayPal…)
- Inscription newsletter

## Démarrage

Prérequis : Node.js 20+, npm.

```bash
npm install
```

Copiez le fichier d'environnement et renseignez les variables :

```bash
cp .env.example .env
```

Variables disponibles :

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | URL de la base SQLite (ex. `file:./dev.db`) |
| `SMTP_HOST` | Serveur SMTP pour l'envoi des e-mails |
| `SMTP_PORT` | Port SMTP (587 par défaut) |
| `SMTP_SECURE` | `true` si SMTP sécurisé (TLS) |
| `SMTP_USER` | Utilisateur SMTP |
| `SMTP_PASS` | Mot de passe SMTP |
| `SMTP_FROM` | Expéditeur des e-mails |
| `CONTACT_TO` | Destinataire des messages du formulaire de contact |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site |
| `YOUVERSION_API_KEY` / `YVP_APP_KEY` | Clé API YouVersion (optionnel, pour le verset du jour) |
| `YVP_LSG_BIBLE_ID` | ID de la traduction LSG (optionnel) |

Initialisez la base et le compte administrateur :

```bash
npx prisma db push
npx prisma db seed
```

> Le seed crée un compte administrateur par défaut : `admin@adniamey2000.org` / `admin123` — **changez ce mot de passe immédiatement**.

Lancez le serveur de développement :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Lancement du build de production |
| `npm run lint` | ESLint |

## Déploiement

### Vercel

1. Poussez le dépôt sur GitHub et importez-le dans Vercel.
2. Renseignez les variables d'environnement (voir tableau ci-dessus).
3. **Base de données** : le site utilise SQLite en local. Sur Vercel, la base est éphémère et non persistante — pour un déploiement durable, basculez sur Postgres (ex. Neon ou Supabase) et mettez à jour `prisma/schema.prisma` (`provider = "postgresql"`) avec `DATABASE_URL` correspondante, puis `npx prisma migrate deploy`.

## Structure

```
prisma/              Schéma Prisma, migrations et seed
public/images/       Images statiques (hero, en-têtes, à-propos, logo…)
src/app/[lang]/      Pages publiques (fr / en)
src/app/admin/       Espace d'administration
src/app/api/         Routes API (contact, verset, newsletter, admin…)
src/components/      Composants (header, footer, formulaires…)
src/lib/             i18n, mail, versets, prisma, paramètres
src/generated/prisma Client Prisma généré
```

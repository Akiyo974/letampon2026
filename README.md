# Le Tampon 2026 — Site de campagne municipale

Site officiel de la liste **Alexis Chaussalet** pour les élections municipales 2026 à Le Tampon (La Réunion).

Construit avec **Next.js 16**, **TypeScript** et **Tailwind CSS v4**.

---

## Stack technique

| Technologie | Rôle |
|---|---|
| Next.js 16.2 (App Router) | Framework React SSR/SSG |
| TypeScript | Typage statique |
| Tailwind CSS v4 | Styles utilitaires |
| Vercel | Hébergement & déploiement continu |

---

## Pages publiques

| Route | Description |
|---|---|
| `/` | Accueil — présentation de la campagne |
| `/la-liste` | Les 55 colistiers (photo, métier, quartier, biographie) |
| `/programme` | Programme en français et en créole (visionneuse plein écran) |
| `/contact` | Formulaire de contact |
| `/actualites` | Blog / actualités de campagne |
| `/dons` | Page de don |

## Panneau d'administration

| Route | Description |
|---|---|
| `/admin` | Tableau de bord (accès protégé par mot de passe) |
| `/admin/liste` | Gestion des colistiers |
| `/admin/programme` | Gestion du programme |
| `/admin/actualites` | Gestion des actualités |
| `/admin/settings` | Paramètres du site |

---

## Développement local

### Prérequis
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Akiyo974/letampon2026.git
cd letampon2026
npm install
```

### Variables d'environnement

Créez un fichier `.env.local` à la racine :

```env
ADMIN_PASSWORD=letampon2026
ADMIN_SECRET=letampon2026admin
```

### Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build de production

```bash
npm run build
npm run start
```

---

## Déploiement sur Vercel

### Première mise en ligne

1. Allez sur [vercel.com](https://vercel.com) → **Continue with GitHub**
2. **Add New Project** → sélectionnez `Akiyo974/letampon2026`
3. Avant de déployer, ajoutez les **variables d'environnement** :
   - `ADMIN_PASSWORD` → `letampon2026`
   - `ADMIN_SECRET` → `letampon2026admin`
4. Cliquez **Deploy** — le site sera en ligne en ~2 minutes sur `letampon2026.vercel.app`

### Mises à jour

Chaque `git push` sur la branche `main` redéploie automatiquement le site :

```bash
git add .
git commit -m "Description du changement"
git push
```

### Domaine personnalisé (optionnel)

Dans les paramètres du projet Vercel → **Domains** → ajoutez `letampon2026.com` ou `www.letampon2026.com`, puis mettez à jour les enregistrements DNS chez votre registrar.

---

## Couleurs de la charte graphique

| Nom | Hex |
|---|---|
| Violet | `#9C35DD` |
| Vert | `#4EB168` |
| Jaune | `#FEED00` |
| Rouge | `#EF1923` |

---

## Contributeurs

- **Alexis Chaussalet** — Tête de liste
- Développement : GitHub Copilot × [krato](https://github.com/Akiyo974)

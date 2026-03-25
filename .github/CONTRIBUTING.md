# Guide de contribution

Merci de votre intérêt pour le projet **Le Tampon 2026** !

## Comment contribuer

### Signaler un bug

1. Vérifiez que le bug n'a pas déjà été signalé dans les [Issues](https://github.com/Akiyo974/letampon2026/issues)
2. Créez une nouvelle issue avec le template **Bug Report**
3. Décrivez le bug, les étapes pour le reproduire, et le comportement attendu

### Proposer une amélioration

1. Ouvrez une issue avec le template **Feature Request** avant de coder
2. Attendez la validation avant de démarrer le développement
3. Référencez l'issue dans votre Pull Request

### Soumettre du code

```bash
# 1. Forkez le dépôt
# 2. Clonez votre fork
git clone https://github.com/VOTRE_USERNAME/letampon2026.git

# 3. Créez une branche
git checkout -b fix/nom-du-correctif

# 4. Faites vos changements, puis testez
npm run build
npm run lint

# 5. Committez
git commit -m "fix: description courte du correctif"

# 6. Poussez et ouvrez une Pull Request
git push origin fix/nom-du-correctif
```

## Conventions

- **Messages de commit** : suivre [Conventional Commits](https://www.conventionalcommits.org/fr/) (`fix:`, `feat:`, `docs:`, `chore:`)
- **TypeScript** : pas de `any`, typage strict
- **CSS** : classes Tailwind uniquement, pas de styles inline
- **Langue** : commentaires de code en français

## Stack

- Next.js 16 · App Router · TypeScript · Tailwind CSS v4
- Contenu dans `content/pages/*.json` (éditable sans code)

## Questions

Ouvrez une [Discussion GitHub](https://github.com/Akiyo974/letampon2026/discussions) ou écrivez à contact@letampon2026.com.

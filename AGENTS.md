<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Règles du projet

- **Avant chaque push** : lancer `npm run build` (ou `npx tsc --noEmit` + `npm run lint` si le build local bloque sur Neon DNS). Ne jamais push sans vérification.
- **Runtime** : les routes qui importent Prisma ou `@/lib/admin` doivent utiliser `runtime = "nodejs"`, jamais `edge`.
- **Dépôt** : push sur `origin` = `https://github.com/adniamey2000/adniamey2000.git`
- **Email officiel** : `adniamey2000@gmail.com`
- **SMTP** : Gmail via `koffilevis21@gmail.com` (app password)

# Telepítés

- Klónozza le a git repository-t.

- Telepítse a backendhez szükséges csomagokat.

```bash
api > npm install
```

- Indítsa el a mysql szervert, valamint nevezze át a `.env.example` fájlt `.env`-re.

- Írja át a `.env` fájlban a `DATABASE_URL`-t a megfelelő connection URL-re.

- Migrálja a Prisma modelleket a mysql szerverre.

```bash
api > npx prisma migrate deploy
```

- Indítsa el a backend szervert.

```bash
api > npm start
```

- Nyissa meg a `public/index.html` fájlt.

- Ha minden jól ment, akkor működnie kellene.
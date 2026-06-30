# Vezirka API

Express, TypeScript, Knex and PostgreSQL backend.

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

## Scripts

- `npm run dev`: start the API in watch mode
- `npm run build`: compile TypeScript to `dist`
- `npm start`: run the compiled API
- `npm run migrate:make -- migration_name`: create a migration
- `npm run migrate:latest`: run pending migrations
- `npm run migrate:rollback`: roll back the latest migration batch
- `npm run seed:make -- seed_name`: create a seed file
- `npm run seed:run`: run seeds

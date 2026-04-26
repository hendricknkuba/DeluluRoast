# DeluluRoast

DeluluRoast is a playful K-pop roast studio built as a monorepo with a React frontend and a Fastify API.

Users pick a roast mode, choose a severity, enter a K-pop target, and get a short roast designed to feel polished, fast, and shareable.

## Stack

- `apps/web` — React, Vite, Tailwind CSS
- `apps/api` — Fastify, Zod, OpenAI
- `packages/shared` — shared types and constants

## Monorepo

```text
apps/
  api/      Fastify backend
  web/      React frontend
packages/
  shared/   Shared types and constants
```

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Create local environment

```bash
cp .env.example .env
```

Fill in the values you need, especially:

- `OPENAI_API_KEY`
- `VITE_API_URL`
- `ALLOWED_ORIGINS`

## Run Locally

Start the frontend:

```bash
pnpm dev:web
```

Start the API:

```bash
pnpm dev:api
```

By default, the web app calls the API configured in `VITE_API_URL`.

## API

Main endpoints:

- `GET /health`
- `POST /roasts/generate`

## Scripts

From the repo root:

```bash
pnpm dev:web
pnpm dev:api
pnpm build
pnpm typecheck
pnpm test
pnpm lint
```

## Notes

- The frontend is designed to feel lightweight, premium, and mobile-first.
- The API validates input, applies rate limiting, and supports roast disambiguation flows.
- Shared types live in `packages/shared` to keep the web and API aligned.

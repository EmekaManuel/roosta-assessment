# Assessment submission — Roosta

Copy the sections below into your submission form.

---

## GitHub repository

**https://github.com/EmekaManuel/roosta-assessment**

Branch: `fix/bonus-points` (or `main` after merge)

**Live demo:** https://roosta-assessment.netlify.app

---

## Setup instructions

```bash
git clone https://github.com/EmekaManuel/roosta-assessment.git
cd roosta-assessment
npm install
cp .env.example .env   # optional
npm run dev
```

Open **http://localhost:3000**.

**Requirements:** Node.js 20+, npm 10+.

**Note:** No backend is required. Mock auth and mock API data are used when `NEXT_PUBLIC_API_URL` is unset.

**Quick test path:** Sign up → complete onboarding → dashboard → transactions → settings → refresh (business name persists) → sign out / sign in.

**Production build:** `npm run build` then `npm run start`.

**Tests:** `npm test`

---

## Architecture decisions (short explanation)

I organized the app as a **feature-first Next.js App Router** project. Each domain (auth, dashboard, transactions, settings) owns its components, Zod schemas, React Query hooks, and types, and exports only through a barrel `index.ts`. Route files under `app/` stay **presentation-only** so reviewers can follow data flow from feature `api/` → hooks → UI without digging through routing code.

**Shared code** (`src/shared/`) holds reusable layout, feedback components, the Axios `api-client`, and cross-cutting schemas (e.g. Nigerian phone, transaction status enums). Features never import each other, which keeps modules replaceable and avoids circular dependencies.

**State:** TanStack Query handles async lists and summaries with centralized `QUERY_KEYS` and cache invalidation after mutations. Zustand stores auth and the **business profile from onboarding**, persisted to `localStorage` so the dashboard top bar and settings reflect the user’s business after refresh. Transaction filters live in the **URL** so filters are bookmarkable and work with the browser back button.

**API layer:** One `apiClient` attaches tokens and handles 401s. For this assessment, query/mutation functions use mock data with simulated delays; the same hooks can call real REST endpoints later without changing UI components.

**UX:** Skeleton loaders, empty states, error retry UI, responsive sidebar + mobile sheet nav, and live-feed polling that stops when the tab is hidden. Forms use React Hook Form + Zod + Shadcn for accessible, validated inputs.

More detail: [README.md](./README.md) and [ASSESSMENT.md](./ASSESSMENT.md).

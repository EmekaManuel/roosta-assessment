# Roosta — Frontend Assessment

SaaS dashboard for Nigerian micro service businesses: transaction monitoring, risk insights, and business settings. Built with **Next.js (App Router)**, **TypeScript**, **TanStack Query**, **Zustand**, **Shadcn/UI**, and **Zod**.

**Live demo:** [https://roosta-assessment.netlify.app](https://roosta-assessment.netlify.app)

**Repository:** [https://github.com/EmekaManuel/roosta-assessment](https://github.com/EmekaManuel/roosta-assessment)

---

## Setup instructions

### Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** 10+

### 1. Clone and install

```bash
git clone https://github.com/EmekaManuel/roosta-assessment.git
cd roosta-assessment
npm install
```

### 2. Environment variables (optional)

Copy the example file and adjust if needed:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | No | App URL for booking links (defaults to browser origin in dev) |
| `NEXT_PUBLIC_API_URL` | No | Backend API base URL; **unset = mock data + mock auth** |

The assessment build runs fully in **mock mode** without a backend.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Other commands

```bash
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
npm test         # Vitest unit tests
```

### 5. Try the app (mock auth)

1. **Sign up** with any name, email, and password (min 8 characters).
2. Complete **onboarding** (business name, slug, category, hours, etc.).
3. Open **Dashboard** — stats, chart, and risk summary use your business context.
4. **Transactions** — filter, paginate, open detail sheet; live feed toasts simulate activity.
5. **Settings** — edit business profile; changes persist in local storage.
6. **Sign out** and sign back in — business profile is restored.

Use any email/password; credentials are not validated against a real API in mock mode.

### Deploy (Netlify)

- **Build command:** `npm run build`
- **Publish:** use Netlify’s Next.js runtime (do not set a custom publish directory)
- **Env:** leave `NEXT_PUBLIC_BASE_PATH` unset (app serves from site root)

---

## Architecture decisions (short)

### Feature-first folders

Business logic lives under `src/features/<name>/` (auth, dashboard, transactions, settings). Each feature owns `api/`, `components/`, `schemas/`, `types/`, and a barrel `index.ts`. **Pages in `app/` are dumb** — they only compose feature components, so routing stays thin and testable.

### Shared layer

Cross-cutting UI and utilities sit in `src/shared/`: Shadcn `ui/`, layout (sidebar, top bar), feedback (empty/error/loading), data widgets (`StatCard`, badges), Zod schemas (phone, business profile, transaction enums), `api-client`, and constants (`QUERY_KEYS`, env keys).

Features **do not import each other**; shared code is the only coupling point.

### State management

| Concern | Approach |
|--------|----------|
| Server/async data | **TanStack Query** — queries in `api/queries.ts`, mutations in `api/mutations.ts`, keys from `QUERY_KEYS` |
| Auth session | **Zustand** `auth-store` + token in localStorage (mock JWT for assessment) |
| Business profile (onboarding) | **Zustand** `business-store` + `localStorage` so name/settings survive refresh |
| Transaction filters | **URL search params** via `useTransactionUrlState` (shareable, back-button friendly) |

### API handling

All HTTP goes through **`shared/lib/api-client.ts`** (Axios, auth header, global 401 → logout). Mock implementations in feature `api/` simulate latency; swapping to a real backend means changing `queryFn` / `mutationFn` only, not components.

Zod is the **source of truth** for form shapes; TypeScript types are inferred with `z.infer`.

### UI/UX

- Loading skeletons and **error states with retry** (`QueryErrorState`) on main data views.
- **Empty states** and `BusinessSetupGate` when onboarding is incomplete.
- **Responsive layout**: desktop sidebar, mobile sheet nav, scrollable tables.
- Live transaction polling **pauses when the tab is hidden** to limit unnecessary work.

### Performance

React Query `staleTime`, `enabled: !!businessId`, `placeholderData` on paginated lists, and `optimizePackageImports` in `next.config.ts` for smaller bundles.

---

## Project structure

```
src/
├── app/
│   ├── (auth)/              # login, signup, onboarding
│   └── (dashboard)/         # dashboard, transactions, settings
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── transactions/
│   └── settings/
└── shared/
    ├── components/
    ├── hooks/
    ├── lib/
    ├── schemas/
    ├── store/
    └── types/
```

See **[ASSESSMENT.md](./ASSESSMENT.md)** for a detailed mapping to the evaluation rubric (components, state, responsive design, API, UX, folders, performance).

---

## Tech stack

- Next.js 16 · React 19 · TypeScript (strict)
- Tailwind CSS 4 · Shadcn/UI · Radix
- TanStack React Query v5 · Zustand
- React Hook Form · Zod · Axios · date-fns · Recharts · Sonner

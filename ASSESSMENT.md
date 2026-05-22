# Roosta Assessment — Architecture & Quality Map

This document maps the codebase to the evaluation criteria for reviewers.

## 1. Component structure and reusability

| Pattern | Location |
|--------|----------|
| Presentational + container split | Feature `components/` own UI; pages in `app/` only compose |
| Shared primitives | `StatCard`, `TablePagination`, `EmptyState`, `PageHeader`, `RiskLevelBadge`, `TransactionStatusBadge` |
| Layout composition | `DashboardShell`, `Sidebar`, `TopBar` (+ `TopBarNotifications`, `TopBarAccountMenu`, `MobileNav`) |
| Reused nav | `SidebarNavContent` shared by desktop sidebar and mobile sheet |
| Domain gates | `BusinessSetupGate`, `QueryErrorState` |

**Conventions:** Props interfaces named `<Component>Props`; no `React.FC`; sub-150-line components where practical (large wizards noted).

## 2. State management

| Layer | Use |
|-------|-----|
| **Zustand** | `auth-store` (session user/token), `business-store` (onboarding profile) |
| **TanStack Query** | Dashboard, transactions, settings data; keys from `QUERY_KEYS` |
| **URL state** | Transaction filters/page via `useTransactionUrlState` |
| **localStorage** | Dev mock auth + persisted business profile (`business-storage.ts`) |

Hydration: `AuthHydrator` restores auth + business on load. Logout clears both stores.

## 3. Responsive design

- Mobile nav: `MobileNav` (sheet) for `< md`; desktop `Sidebar` for `md+`
- Grids: `sm:` / `lg:` / `xl:` on dashboard stats and analytics
- Tables: horizontal scroll wrapper + `min-w-[640px]` on transactions table
- TopBar: truncated business name on small screens; compact `LiveFeedStatus` on mobile
- Detail sheet: `w-full sm:max-w-[520px]`
- Dashboard padding: `p-4 sm:p-6`

## 4. Clean code practices

- TypeScript strict; types inferred from Zod where applicable
- Shared enums: `shared/schemas/transaction.ts`, `shared/schemas/businessProfile.ts`, `businessCategories.ts`
- Feature barrels: import `@/features/<name>` only (no deep `api/` paths)
- Env access: `API_BASE_URL`, `APP_BASE_URL`, `TOKEN_KEY` in `shared/lib/constants.ts`
- No `any`; import order: React → third-party → shared → features

## 5. API handling

- **Single client:** `shared/lib/api-client.ts` (axios, auth header, 401 → logout)
- **All HTTP** through `apiClient`; no raw `fetch`
- **Query keys:** `QUERY_KEYS` in `shared/lib/constants.ts`
- **Mutations:** invalidate related queries + Sonner toasts (`onError` / `onSuccess`)
- **Mock layer:** `dummy.ts` + simulated delays in feature `api/` (swap `queryFn` for real endpoints when backend is ready)
- **Response types:** `ApiResponse<T>`, `PaginatedResponse<T>` in `shared/types/api.ts`

## 6. UI/UX

- Loading: skeletons (stats, chart, risk, transactions, detail sheet), `LoadingSpinner` (settings)
- Empty: `EmptyState` (transactions list, business setup gate)
- Errors: `QueryErrorState` with retry on dashboard, transactions, settings, detail sheet
- Feedback: Sonner toasts (auth, settings, live transaction feed)
- Motion: `AnimatedSection`, table row stagger
- Theme toggle; live feed indicator; risk badges and chart

## 7. Folder organization

```
src/
├── app/(auth)/          # Auth routes — dumb pages
├── app/(dashboard)/     # Dashboard shell + dumb pages
├── features/
│   ├── auth/            # api, components, schemas, store, types, index.ts
│   ├── dashboard/
│   ├── transactions/
│   └── settings/
└── shared/
    ├── components/      # ui (Shadcn), layout, feedback, data
    ├── hooks/
    ├── lib/
    ├── schemas/
    ├── store/
    └── types/
```

Each feature: `api/queries.ts`, `api/mutations.ts`, `components/`, `schemas/`, `types/`, `index.ts`.

## 8. Performance considerations

- React Query `staleTime` (2–5 min) and `enabled: !!businessId`
- `placeholderData` on paginated transactions (smoother page changes)
- Live feed polling: 12s interval, **paused when tab hidden** (`visibilitychange`)
- Query deduplication for shared `useDashboardSummary` subscribers
- Package import optimization in `next.config.ts` (`optimizePackageImports`)
- Font `display: swap` in root layout

---

## Quick reviewer checklist

- [ ] Sign up → onboarding → dashboard shows **your** business name (persisted)
- [ ] Resize to mobile → hamburger menu works
- [ ] Transactions: filter, paginate, open detail sheet
- [ ] Settings: edit business profile → refresh → values persist
- [ ] Sign out → sign in → business profile restored from storage

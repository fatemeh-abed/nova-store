# NOVA Store

A bilingual (Persian/English), public-only storefront built incrementally with Next.js App Router and TypeScript.

## Status
**Phase 1 scaffold only.** Product listings, API requests, cart, newsletter, theme switching UI and checkout are **not implemented**. No authentication, checkout, payment or order submission is planned.

## Requirements
Node.js 20.9+ (Node 22 LTS recommended), npm and internet access for initial install.

## Quick start
```bash
npm install
cp .env.example .env.local # on Windows: copy .env.example .env.local
npm run dev
```
Visit `http://localhost:3000/fa` or `/en`.

## Verification
```bash
npm run type-check
npm run lint
npm run build
npm run format:check
```

**Important:** The scaffold was generated in an offline environment without npm registry access. Dependency installation, lint, type-check and build could not be executed or verified. No lockfile is included; generate `package-lock.json` with `npm install` and commit it. If a package version is no longer available, resolve versions against the registry before proceeding.

## Environment
- `NEXT_PUBLIC_API_BASE_URL`: FakeStoreAPI endpoint.
- `NEXT_PUBLIC_SITE_URL`: canonical site origin for SEO (set to your production domain on deployment).

Do not commit `.env.local` or secrets. Public env variables are visible to browsers.

## Architecture
- `src/app/[locale]`: locale-aware App Router pages and layout
- `src/i18n`: next-intl routing, navigation and request config
- `src/proxy.ts`: Next.js 16 locale proxy
- `src/shared/StyledComponentsRegistry.tsx`: styled-components server-side style injection
- `src/context`: theme context foundation
- `src/shared/theme.ts`: design tokens
- `src/dictionary`: all storefront copy (fa/en)
- `src/utils/routes.ts`: centralized app routes
- `src/api`, `src/requests`, `src/storage`, `src/types`, `src/validations`: reserved for subsequent phases
- `docs`: supplied desktop/mobile/cart reference imagery

## API limitations (for future phases)
FakeStoreAPI is a mock API. POST does not persist data. It does not provide genuine server-side search/filter/sort/pagination; future storefront pagination, search, filtering and sorting will run on the client over fetched products. All future HTTP requests must go through one shared Axios instance.

## Implementation notes
This phase includes a minimal localized placeholder page to make the scaffold navigable, not the finished reference UI. The default theme is light; a toggle and persistence will be introduced later. The cart will use Zustand persist with SSR-safe hydration in a later phase. The design reference includes checkout actions, but the NOVA brief explicitly excludes checkout and payment, so those controls will not be implemented.

## Suggested first commit
```bash
git add .
git commit -m "chore: scaffold NOVA Store phase one"
```

## Phase 2 — core architecture
- `src/api/axiosInstance.ts`: one Axios client, timeout and normalized errors.
- `src/requests/productRequests.ts`: typed product/category endpoints; optional AbortSignal.
- `src/types`: product, cart, and request/sort enums.
- `src/utils/productCatalog.ts`: pure local search/filter/sort/pagination (six per page).
- `src/utils/cartTotals.ts`: pure cart totals; `formatPrice.ts`: USD formatting.
- `src/storage/useCartStore.ts`: Zustand cart persisted in localStorage.
- `useCartHydrated` should gate cart-dependent UI to prevent SSR/client mismatch.
- FakeStoreAPI prices are **USD**, not toman; do not silently relabel them.

Phase 2 does not implement visual storefront, forms, or checkout.

Run checks: `npm run type-check`, `npm run lint`, `npm run build`.

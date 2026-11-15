# NOVA Store

Public bilingual (fa/en) e-commerce demo built with Next.js App Router, strict TypeScript, next-intl, Styled Components, Zustand, Axios, Formik and Yup.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `/fa` or `/en` at `http://localhost:3000`.

## Checks

```bash
npm run type-check
npm run lint
npm run build
```

## Architecture

- `src/api`: single Axios instance and API error mapping
- `src/requests`: typed FakeStoreAPI requests
- `src/hooks/useProductCatalog.ts`: product-list UI state and memoized selection
- `src/utils`: pure catalog and cart calculations
- `src/storage`: persisted Zustand cart with hydration status
- `src/components`: storefront and cart feature components
- `src/shared`: reusable presentation components
- `src/dictionary`: translated UI strings
- `src/context`: theme context and mode switch
- `src/app`: locale routes and SEO metadata

## Limitations

FakeStoreAPI is a mock service. POST operations do not persist; there is no real server-side search, filtering, sorting or pagination. The catalog fetches products and performs these operations in the browser, six per page. The cart is a local demo; checkout, payments, authentication and order submission are intentionally absent. Product data is English-only because it originates from FakeStoreAPI. Newsletter submission validates locally and sends no email. Prices use USD and do not imply conversion to Iranian toman. Cart state is non-sensitive and persisted in localStorage; never put secrets or tokens there.

## Verification status

The source has been reviewed, but package installation, TypeScript, lint, production build and browser QA must be executed in an environment with dependencies installed. Do not treat these checks as passed until run locally.

## Reference images

`references/design-1.png` and `references/design-2.png` are the supplied layout references.

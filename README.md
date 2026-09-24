# PerfumPoj — Haute Parfumerie Storefront

A scalable, feature-oriented Angular e-commerce application engineered for independent, parallel development across multi-developer engineering teams.

---

## 1. Project Overview

PerfumPoj is an artisanal perfume e-commerce web application built with modern Angular standalone architecture, Tailwind CSS v4, and Angular Signals. 

The architecture strictly adheres to **Feature Ownership > Global Shared Ownership**:
* Developers implement user stories in complete isolation within feature boundaries (`src/app/features/*`).
* Common global files (`app.routes.ts`, `app.ts`, global stores, monolithic services) are kept lean or avoided entirely, virtually eliminating Git merge conflicts during concurrent feature delivery.

---

## 2. Technology Stack

* **Framework:** [Angular 21](https://angular.dev/) (Modern Standalone Architecture, SSR & Hydration)
* **Language:** [TypeScript 5.9](https://www.typescriptlang.org/) (Strict Mode)
* **Routing:** Angular Router (Lazy-loaded feature routes with component input binding)
* **State Management:** Angular Signals (`signal`, `computed`, `effect`)
* **API & Networking:** Angular `HttpClient` with functional interceptors and SSR-compatible `withFetch()`
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Testing:** [Vitest](https://vitest.dev/) via `@angular/build:unit-test`
* **Linter & Formatter:** ESLint (`angular-eslint`, `typescript-eslint`) and Prettier
* **Package Manager:** [pnpm](https://pnpm.io/) (v12)

---

## 3. Prerequisites

* **Node.js:** `>= 20.17.0` (LTS recommended)
* **pnpm:** `>= 9.0.0` (configured with `pnpm@12.6.0`)

---

## 4. Installation

```bash
# Clone the repository and install dependencies
pnpm install
```

---

## 5. Development Commands

| Command | Description |
| :--- | :--- |
| `pnpm start` | Runs the Angular development server at `http://localhost:4200/` |
| `pnpm run build` | Compiles the production application and server bundles |
| `pnpm run lint` | Runs ESLint across all TypeScript and HTML template files |
| `pnpm test` | Runs unit tests in interactive watch mode via Vitest |
| `pnpm run test:ci` | Runs all unit tests once in non-interactive CI mode |
| `pnpm run serve:ssr:perfumPoj` | Runs the compiled Node.js SSR server |

---

## 6. Project Architecture

The codebase enforces a unidirectional dependency hierarchy:

```
app (Root Orchestration & Composition)
 ↓
core (Infrastructure Singletons: Interceptors, Storage, Guards)
 ↓
features (Isolated Business Domains: Products, Cart)
 ↓
shared (Reusable Primitives: Buttons, Inputs, Layout, Pipes)
```

```text
src/
├── app/
│   ├── core/                          # Infrastructure singletons (NO business logic)
│   │   ├── interceptors/              # Functional HTTP interceptors (api.interceptor.ts)
│   │   ├── services/                  # Global singletons (storage.service.ts)
│   │   └── index.ts                   # Core public barrel export
│   │
│   ├── shared/                        # Reusable primitives (NO business logic)
│   │   ├── components/                # UI primitives (ButtonComponent, InputComponent)
│   │   ├── layout/                    # Layout shells (HeaderComponent, FooterComponent)
│   │   ├── pipes/                     # Shared pipes (PriceFormatPipe)
│   │   └── index.ts                   # Shared public barrel export
│   │
│   ├── features/                      # Domain features (Isolated, feature-owned)
│   │   ├── products/                  # Product Discovery & Details (US-01 .. US-04)
│   │   │   ├── components/            # product-card, product-grid, product-search, product-filters, product-sort
│   │   │   ├── pages/                 # products-list, product-details
│   │   │   ├── services/              # products.service.ts (API client with mock fallback)
│   │   │   ├── models/                # product.model.ts (domain types & filters)
│   │   │   ├── state/                 # products.state.ts (Signals store)
│   │   │   ├── products.routes.ts     # Feature routes (lazy loaded)
│   │   │   └── index.ts               # Public feature interface
│   │   │
│   │   └── cart/                      # Shopping Cart (US-05 .. US-08)
│   │       ├── components/            # cart-item, cart-summary
│   │       ├── pages/                 # cart-page
│   │       ├── services/              # cart.service.ts (checkout API boundary)
│   │       ├── models/                # cart-item.model.ts (domain types)
│   │       ├── state/                 # cart.state.ts (Signals store with SSR-safe persistence)
│   │       ├── cart.routes.ts         # Feature routes (lazy loaded)
│   │       └── index.ts               # Public feature interface
│   │
│   ├── app.ts                         # Root application component
│   ├── app.html                       # Shell layout (Header -> RouterOutlet -> Footer)
│   ├── app.config.ts                  # Application providers (Router, HttpClient, Hydration)
│   ├── app.routes.ts                  # Thin lazy-route composition
│   └── app.routes.server.ts           # SSR server route configuration
│
└── environments/
    ├── environment.ts                 # Production configuration
    └── environment.development.ts     # Local development configuration
```

---

## 7. Feature Ownership & User Story Map

Developers assigned to a story work almost exclusively within the designated feature directory:

| User Story | Title & Scope | Primary Working Directory |
| :--- | :--- | :--- |
| **US-01** | **Browse Products:** Catalog display, responsive grid, empty/loading states | `features/products/pages/products-list/`, `features/products/components/product-grid/` |
| **US-02** | **Search Products:** Olfactory, brand, and title real-time search | `features/products/components/product-search/` |
| **US-03** | **Filter & Sort:** Olfactive family filtering and sorting dropdown | `features/products/components/product-filters/`, `features/products/components/product-sort/` |
| **US-04** | **Product Details:** Notes pyramid, volume selection, gallery | `features/products/pages/product-details/`, `features/products/components/product-card/` |
| **US-05** | **View Shopping Cart:** Line items, volume badge, pricing | `features/cart/pages/cart-page/`, `features/cart/components/cart-item/` |
| **US-06** | **Update Quantities:** Increment / decrement item quantity | `features/cart/components/cart-item/`, `features/cart/state/cart.state.ts` |
| **US-07** | **Remove Items:** Delete line item from cart state | `features/cart/components/cart-item/`, `features/cart/state/cart.state.ts` |
| **US-08** | **Order Summary:** Calculate subtotal, shipping tier, tax, checkout | `features/cart/components/cart-summary/`, `features/cart/state/cart.state.ts` |

---

## 8. Developer Workflow

Follow this procedure when implementing a user story:

1. **Pick Story:** Identify your assigned user story (e.g. `US-03: Filter Products`).
2. **Locate Feature:** Navigate to the dedicated feature directory (`src/app/features/products/`).
3. **Implement Locally:**
   - Modify or expand components in `features/products/components/`.
   - Update domain models in `features/products/models/product.model.ts` if new fields are required.
   - Adjust feature state signals in `features/products/state/products.state.ts`.
4. **Colocate Tests:** Add or update unit tests colocated next to your feature files (`*.spec.ts`).
5. **Verify Feature:** Run tests and linting:
   ```bash
   pnpm test:ci
   pnpm run lint
   pnpm run build
   ```
6. **Commit:** Your commit will only touch files inside `features/products/`, avoiding Git conflicts with teammates working on `features/cart/` or global files.

---

## 9. Shared File Policy & Git Conflict Prevention

To prevent merge conflicts when multiple developers work simultaneously:

### ⚠️ Protected Shared Files (Modify only with team alignment)
* `src/app/app.routes.ts` — Top-level router composition only. Do NOT add individual feature routes here; add them inside `<feature>.routes.ts`.
* `src/app/app.config.ts` — Global application providers. Do NOT register feature-specific services here.
* `src/app/app.ts` / `src/app/app.html` — Top-level shell.
* `src/styles.css` — Global typography and Tailwind directives.
* `package.json` — Do NOT add packages without architectural review.

### 🛡️ Cross-Feature Interaction Rule
* Do **not** import internal files of another feature directly (e.g., `import from '../cart/components/cart-item'`).
* When communicating across features, consume only the public API exported from that feature's `index.ts` (e.g., `import { CartState } from '../cart'`).
* Shared UI code (`src/app/shared/`) must remain dumb and reusable — never introduce business logic or domain models into `shared/`.

---

## 10. Environment Setup

* `src/environments/environment.ts`: Production environment settings.
* `src/environments/environment.development.ts`: Development settings with `enableMockFallback: true`.

> **Security Rule:** Never hard-code API keys, passwords, private tokens, or credentials into source control.

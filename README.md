# NASA Scout

Angular take-home assessment: a Scout near-Earth-object table (Part 1) and a contact form (Part 2).

## Running the app

```bash
npm install
cp src/environments/environment.sample.ts src/environments/environment.ts
npm start
```

Open `http://localhost:4200`.

`environment.ts` is gitignored; `environment.sample.ts` is the committed template. It only holds `primeNgLicense`, which gates PrimeNG's paid block templates — none are used here, so the placeholder value works fine and nothing needs to be filled in to run the app.

The Scout API (`https://ssd-api.jpl.nasa.gov/scout.api`) has no CORS headers and forbids being called from a browser directly, so `ng serve` proxies `/scout-api` to it (see `proxy.conf.json`). This only works in dev — see Trade-offs below for production.

## Running tests

```bash
npm test
```

Vitest, run via `@angular/build:unit-test`. Covers the Scout store (load/loading/error), the Scout API client, the home page (grid, search, refresh, drawer), the error overlay, and the contact form (validation, submit/success/reset flow).

## Assumptions and trade-offs

- **Production API access**: the dev proxy only exists in `ng serve`. A production build has nowhere to send `/scout-api/*` requests — a real deployment would need a small backend or serverless function to proxy the call server-side. Out of scope here.
- **Stale data on refresh failure**: if Refresh fails, the store keeps the last successful `objects` instead of clearing the grid, and surfaces the failure as a banner/status text instead. Chosen so a flaky retry doesn't wipe a table that was working a second ago.
- **AG Grid module registration**: `AllCommunityModule` is registered wholesale instead of only the specific feature modules in use, trading bundle size for not having to track down "module not registered" errors one at a time. A production app with a real bundle budget would register only what's used.
- **Threat index**: the derived/computed field averages the NEO and PHA hazard scores into a single 0–1 value, bucketed into Low/Medium/High and used to sort the grid by default.
- **Contact form submission**: there's no real backend, so `ContactStore.submit()` fakes ~1s of latency before marking the message as sent. It mirrors `ScoutStore`'s SignalStore pattern (state + a method that patches it), even though there's no actual async failure path to handle.
- **No RxJS in app code**: data fetching uses `fetch`/`async`-`await` and signals rather than `HttpClient` + observables. Kept for the simpler, more direct store code this app's scope calls for.

# AGENTS.md — Sentosa (Laravel + React/Inertia)

## Stack
- Laravel 13, PHP 8.3+, MySQL (local) / SQLite (test)
- React 18 + Inertia.js 2, Vite 8, Tailwind CSS 3 + DaisyUI 4
- Pest PHP 4 for testing, Laravel Pint for PHP CS, ESLint + Prettier for JS
- CDN-loaded in `resources/views/app.blade.php`: DaisyUI 4.10.2, Tailwind 3 (play CDN), Font Awesome 6.5.1, SweetAlert2, Leaflet, DataTables + jQuery
- Tailwind config + PostCSS exist but CDN script is the active CSS pipeline

## Key commands
```bash
composer run dev       # concurrent: php artisan serve + queue + logs + Vite
composer run test      # config:clear then php artisan test
npm run build          # vite build
npm run dev            # vite dev server
npm run lint           # eslint resources/js --ext .js,.jsx --fix
composer run setup     # full project bootstrap (composer install + .env + key + migrate + npm build)
```

## JS path aliases (jsconfig.json)
- `@/*` → `resources/js/*`
- `ziggy-js` → `vendor/tightenco/ziggy`

## Architecture
- **Routes**: `routes/web.php` (admin CRUD + produksi namespace), `routes/auth.php` (Breeze auth), `routes/console.php`
- **Admin controllers**: `app/Http/Controllers/admin/` — 12 controllers (Bahan, Customer, Dashboard, Desain, Distributor, Home, Jabatan, KategoriDesain, Kurir, Pengguna, Produksi, Suplayer)
- **Produksi controllers**: `app/Http/Controllers/produksi/` — FinishingController, ProduksiController
- **Pages**: `resources/js/Pages/Admin/*.jsx` — one page per entity + Home/Home.jsx
- **Admin layout**: `resources/js/Layouts/AdminLayout.jsx` — DaisyUI drawer with role-based menus (admin, desain/desainer, produksi, customer service)
- **Models**: `app/Models/` — 16 Eloquent models
- **Entrypoint**: `resources/js/app.jsx` → resolves `Pages/{name}.jsx` via Vite glob import

## Test quirks
- Pest Feature tests use `RefreshDatabase` with `:memory:` SQLite (see `phpunit.xml` and `tests/Pest.php`)
- Always run `composer run test` (not bare `php artisan test`) — it clears config first. CI runs `php artisan test` directly.
- Two suites: `tests/Unit`, `tests/Feature`. No admin CRUD tests exist yet (only ExampleTest + ProfileTest).

## PHP style
- Laravel Pint (preset: `laravel`, disabled: `no_unused_imports`) — run `./vendor/bin/pint`
- StyleCI in `.styleci.yml` (laravel preset)

## JS style
- ESLint (`eslint:recommended` + `react/recommended` + `react-hooks/recommended` + `prettier`)
- Rules: `react/react-in-jsx-scope` off, `react/prop-types` off, `no-undef` off
- Prettier: `singleQuote: true`, organizes imports + Tailwind classes via plugins

## .npmrc has `ignore-scripts=true`
- npm lifecycle scripts will NOT run; run `npm install` (not `npm ci`)

## Notable conventions
- Indonesian language for UI, flash messages, commit messages
- Controllers use `function` or `public function` (both work in PHP 8)
- Flash messages via `->with('success', '...')` on redirects
- Random codes like `'BH-' . rand(0, 100000)` in controllers (not DB-generated)
- Controller `delete($id)` method (not `destroy`)
- Route name collisions: GET + PUT for `produksi.produksi` and `finishing.finishing` share the same name
- Role-based menu filtering in `AdminLayout.jsx` — checks `auth.user.role` for admin/desain/produksi/customer service

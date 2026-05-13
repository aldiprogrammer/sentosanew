# AGENTS.md — Sentosa (Laravel + React/Inertia)

## Stack
- Laravel 13, PHP 8.3+, MySQL (local) / SQLite (test)
- React 18 + Inertia.js 2, Vite 8, Tailwind CSS 3 + DaisyUI 4
- Pest PHP for testing, Laravel Pint for PHP CS, ESLint + Prettier for JS

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
- **Routes**: `routes/web.php` (admin CRUD), `routes/auth.php` (Breeze auth), `routes/console.php`
- **Admin controllers**: `app/Http/Controllers/admin/` — 10 controllers, each renders an Inertia page
- **Pages**: `resources/js/Pages/Admin/*.jsx` — one page per entity
- **Admin layout**: `resources/js/Layouts/AdminLayout.jsx` (DaisyUI drawer)
- **Models**: `app/Models/` — basic Eloquent models (Customer, Bahan, Desain, Produksi, etc.)
- **Entrypoint**: `resources/js/app.jsx` → resolves `Pages/{name}.jsx` via Vite glob import

## Test quirks
- Pest Feature tests use `RefreshDatabase` with `:memory:` SQLite (see `phpunit.xml`)
- Always run `composer run test` (not bare `php artisan test`) — it clears config first
- Two suites: `tests/Unit`, `tests/Feature`

## PHP style
- Laravel Pint (preset: `laravel`) — run `./vendor/bin/pint`
- StyleCI config in `.styleci.yml` (laravel preset)

## JS style
- ESLint (`eslint:recommended` + `react/recommended` + `react-hooks/recommended` + `prettier`)
- Prettier with `singleQuote: true`, `prettier-plugin-tailwindcss`, `prettier-plugin-organize-imports`
- Prettier organizes imports and Tailwind classes on format

## .npmrc has `ignore-scripts=true`
- npm lifecycle scripts (postinstall, etc.) will NOT run automatically
- Run `npm install` (not `npm ci`) to avoid script failures

## Notable conventions
- Indonesian language for UI, comments, commit messages
- Controllers use `function` not `public function` (both work in PHP 8)
- Flash messages via `->with('success', '...')` on redirects
- Random codes like `'CS-' . rand(0, 100000)` in controllers (not DB-generated)
- CRUD routes follow pattern: `/{entity}` (index/store), `/{entity}/{id}` (show/update/delete)
- Several route names are duplicated (e.g. `kategoridesain` used for pengguna, bahan routes)

# CLAUDE.md

## Design — OBRIGATÓRIO
Lê o ficheiro `design.md` na raiz deste projecto ANTES de escrever qualquer código de UI.
Todas as regras são obrigatórias e sem excepção.
NUNCA uses cores, fontes, radius ou componentes que não estejam definidos no design.md.
Se o design.md define um componente da biblioteca para o caso, usa-o — NUNCA cries alternativas.

---

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # Type-check + production build (tsc -b && vite build)
npm run lint       # ESLint
npm run preview    # Preview production build locally
```

No test runner is configured in this project.

## What this project is

Bee2Pay is a **hosted payment link** page for hotel reservations. The user lands on this page, sees their reservation summary, and fills a multi-step form (Personal Data → Address → Payment). It is a single-page, no-router React app.

There are also standalone HTML prototypes (`v1-pay.html`, `v2-pay.html`, `v3-pay.html`, `v1.html`, `v2.html`, `v3.html`) that predate the React app and are used for rapid UI iteration. `make_v3.py` is a script that generates v3 variants from v2 HTML files.

## Architecture

```
src/
  data/reservation.ts        # All reservation data (hardcoded mock, meant to become dynamic)
  styles/tokens.css          # Global CSS custom properties (colors, typography, sizing)
  styles/global.css          # Base resets and font import
  App.tsx                    # Root layout: <Sidebar> (left) + <main><PaymentForm></main> (right)
  components/
    Sidebar/                 # Fixed left panel: logo, language selector, ReservationSummary, SecurityBadges
    PaymentForm/             # Scrollable right panel: 3-step form (Step 1 active, Steps 2–3 disabled)
    ReservationSummary/      # Reads from src/data/reservation.ts, renders booking details + totals
    SecurityBadges/          # Static badges: LGPD, PCI, SSL, 256-bit
    FormField/               # Polymorphic input: text | email | date | select | phone | document
```

### Key conventions

- **CSS Modules** (`.module.css`) for all component styles — no CSS-in-JS, no Tailwind.
- **Design tokens** live in `src/styles/tokens.css` as CSS custom properties (`--color-primary`, `--input-height`, etc.). Always use tokens instead of hardcoded values.
- **`FormField`** is the single input primitive. Adding a new input type means extending its `type` union and adding a new render branch inside `FormField.tsx`.
- **Reservation data** (`src/data/reservation.ts`) is the single source of truth for all booking content rendered in the sidebar and form headers. When the app becomes dynamic, this is the file to replace with an API call.
- The sidebar width is controlled by `--sidebar-width: 683px` in tokens.css and applied in `App.module.css`.

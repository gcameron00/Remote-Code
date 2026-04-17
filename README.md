# Music Catalogue

A personal music media catalogue web app for browsing and managing a physical collection — LPs, CDs, Cassettes, 7-inches, 12-inches, and more. Built as a static site deployed via Cloudflare Pages.

## Features

- **Grid browse** — responsive card grid with cover art, metadata, and genre tags
- **Cover Flow** — 3D cover art browser, Apple CoverFlow-style, with keyboard and touch navigation
- **Filter & search** — filter by media type, genre, and condition; full-text search across artist, title, and label
- **Detail view** — modal with full metadata, notes, and tracklist
- **Admin panel** — PIN-protected CRUD interface for adding, editing, and deleting records
- **Light / dark mode** — follows system preference

## Pages

| Path | Description |
|---|---|
| `/` | Main catalogue — browse, filter, search, cover flow |
| `/about/` | About this collection |
| `/admin/` | Admin panel (PIN: `1234`) |

## Data Model

Each record in the catalogue has the following fields:

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier |
| `title` | `string` | Album / release title |
| `artist` | `string` | Artist or band name |
| `year` | `number` | Release year |
| `label` | `string` | Record label |
| `mediaType` | `string` | `LP`, `CD`, `Cassette`, `7-inch`, `12-inch`, `MiniDisc` |
| `genres` | `string[]` | Genre tags |
| `condition` | `string` | `Mint`, `VG+`, `VG`, `Good`, `Poor` |
| `coverUrl` | `string?` | Cover image URL — auto-generated if omitted |
| `notes` | `string` | Free-text collector notes |
| `tracklist` | `string[]` | Track listing |

## Tech Stack

- Pure HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step
- ES modules for clean code organisation
- `localStorage` for admin persistence (demo mode)
- Deployed via Cloudflare Pages

## Admin Access

Default PIN is **`1234`**. This can be changed from within the admin panel.

> **Demo note:** All admin changes are stored in your browser's `localStorage`. They persist across page reloads on the same device but are not synced across devices. Use "Reset to defaults" in the admin panel to restore the original catalogue.

## Local Development

Serve the files with any static web server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:3000` (or `http://localhost:8080`).

## Project Structure

```
/
├── index.html              Main catalogue page
├── about/
│   └── index.html          About page
├── admin/
│   └── index.html          Admin panel
├── assets/
│   ├── css/
│   │   └── styles.css      All styles
│   ├── js/
│   │   ├── data.js         Catalogue data & localStorage persistence
│   │   ├── app.js          Main catalogue app (grid, cover flow, filters)
│   │   └── admin.js        Admin panel logic
│   └── favicon.svg
└── README.md
```

## Roadmap

- [ ] Image upload / external cover art URL support
- [ ] Export catalogue as JSON / CSV
- [ ] Barcode / Discogs lookup for auto-filling metadata
- [ ] Listening history and play counts
- [ ] Multi-user support with server-side persistence

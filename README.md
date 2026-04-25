# TZ Store

SPA product catalog with search, filtering, likes, creation, editing, and deletion. Built as a frontend test assignment. Deployed via GitHub Pages.

Demo: https://nastassja-dev.github.io/tz-store/
---

## Setup & Run

| Command | Description |
|--------|------------|
| `npm install` | Install dependencies |
| `npm run dev` | Run dev server |
| `npm run build` | Build project |

---

## Tech Stack

| Layer | Technology |
|------|----------|
| Language | TypeScript |
| UI | React 18 |
| State | Redux Toolkit |
| Routing | React Router v6 |
| Forms | react-hook-form |
| Styling | SCSS Modules |
| Icons | lucide-react |
| Build | Vite |
| Deploy | gh-pages |

---

## API

Base URL: https://fakestoreapi.com

| Method | Endpoint | Description |
|--------|---------|------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get single product |
| POST | `/products` | Create product (stored locally) |


---

## Routing

| Path | Page |
|------|-----|
| `/products` | Products list |
| `/products/:id` | Product details |
| `/products/:id/edit` | Edit product |
| `/create-product` | Create product |
| `*` | Redirect to `/products` |

---

## Store (productsSlice)

| Field | Description |
|------|------------|
| items | All products |
| likedIds | Liked product IDs |
| filter | `all` \| `liked` |
| search | Search query |
| currentPage | Pagination state |
| status | `idle` \| `loading` \| `error` |

### Actions

- `fetchProducts`
- `addProduct`
- `updateProduct`
- `deleteProduct`
- `toggleLike`
- `setFilter`
- `setSearch`
- `setPage`

---

## Features

- API data fetching
- Search with debounce (300ms)
- Filter (all / liked)
- Client-side pagination
- Like / unlike products
- Create / edit / delete products
- Product detail view
- Image upload (drag & drop + URL)
- Optimized rendering (`useMemo`)

---

## UI Principles

| Rule | Description |
|-----|------------|
| Style | Minimal, monochrome |
| Accent | `#E8C840` (limited usage) |
| Borders | `1px solid` |
| Shadows | None (except focus) |
| Icons | Outline, stroke 1.5px |
| Font | Inter |

---

## Deployment

### Vite config
```ts
base: '/repo-name/'

---

## Scripts

```
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```
___

## Notes
Copy dist/index.html → dist/404.html for routing support

___

## Author

Nastassja Kamenskikh
GitHub: https://github.com/nastassja-dev
LinkedIn: https://www.linkedin.com/in/anastasiia-kamenskikh/


# Connecting Backend (Laravel) with Frontend (React)

## Overview

- **Backend (compressedPDF-cms):** Laravel + Vue admin for SEO and content. Exposes a **public API** (no auth) for pages and blogs with SEO data.
- **Frontend (React, `src/`):** Vite + React app. Fetches pages/blogs from the backend and displays them with SEO (title, meta, Open Graph).

## Backend – Public API (no login)

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/public/pages` | List published pages (for nav) |
| GET | `/api/public/pages/{slug}` | Single page by slug (content + SEO) |
| GET | `/api/public/blogs` | List published blogs |
| GET | `/api/public/blogs/{slug}` | Single blog by slug (content + SEO) |
| GET | `/api/public/contact` | Contact settings (email, phone, address) for display |
| POST | `/api/public/contact/send` | Submit contact form; email is sent to the address set in **CMS Content Manager** |

**Blog API response:** The frontend accepts `{ blogs: [...] }`, Laravel-style `{ data: [...] }`, `{ data: { data: [...] } }` (pagination), or a direct array. Each blog may include `og_image` or `image` (full URL) for the cover/featured image.

**Contact form:** The email where contact form submissions are received is set in **CMS → Content Manager** (Contact email). The frontend POSTs to `/api/public/contact/send` with `name`, `email`, `subject`, `message`, and `accepts_terms`. Ensure Laravel mail is configured (e.g. `.env` `MAIL_*` and `MAIL_FROM_ADDRESS`).

**Legal pages (Terms & Conditions, Privacy):** The contact form and footer link to `/:lang/page/terms` and `/:lang/page/privacy`. Create CMS **Pages** with slugs `terms` and `privacy` (e.g. "Terms & Conditions", "Privacy policy" or "Legal & Privacy") so those routes show the correct content.

**CMS blog image & SEO:** The CMS blog Create/Edit forms include an **SEO / Meta tags** section with Meta title, Meta description, Canonical URL, Meta robots, OG title, OG description, and **OG image URL** (used as the article cover on the blog list and for social sharing). The public API returns these so the frontend can set full meta tags and `og:type=article` for each article.

## Run both

1. **Start Laravel (backend)**  
   From `compressedPDF-cms`:
   ```bash
   npm run dev:all
   ```
   Backend: **http://localhost:8000**

2. **Start React (frontend)**  
   From project root:
   ```bash
   cp .env.example .env   # first time only
   npm run dev
   ```
   Frontend: **http://localhost:5000** (or port in `vite.config.js`)

3. **Point React to the backend**  
   In the React app root, create or edit `.env`:
   ```
   VITE_API_URL=http://localhost:8000
   ```
   Restart `npm run dev` after changing `.env`.

## Frontend behaviour

- **Home page:** Shows a “Pages” and “Blog” section (if the backend returns data) with links to CMS content.
- **Page by slug:** `/:lang/page/:slug` (e.g. `/en/page/about-us`) loads the page from the API and sets document title, meta description, canonical, robots, and Open Graph from the backend.
- **Blog by slug:** `/:lang/blog/:slug` same for blog posts.

CORS is allowed from `http://localhost:5000` and `http://localhost:5173` (see `compressedPDF-cms/config/cors.php`). For other origins, add them to `allowed_origins` in that file.

## If the blog list shows "No blog posts yet"

1. **Backend running?** Start the Laravel app from `compressedPDF-cms` (e.g. `npm run dev:all` or `php artisan serve` on port 8000).
2. **API URL?** In the React app `.env`, set `VITE_API_URL=http://localhost:8000` and restart `npm run dev`.
3. **Public endpoint:** The frontend calls `GET /api/public/blogs`. In the CMS, ensure this route returns only **published** blogs and that the response is either `{ blogs: [...] }` or `{ data: [...] }` (or a direct array). The frontend normalizes all of these.
4. **Published flag:** In the CMS, the blog must be marked "Published" (checkbox on the blog form) so the public API includes it.

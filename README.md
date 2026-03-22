# OmmSulaim Website

This project is built with Next.js App Router.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Owner-only Admin Dashboard

You can now manage both **Blog** and **Shop** from a private dashboard instead of editing source files.

### 1) Set admin password

Create or update `.env.local`:

```bash
ADMIN_PASSWORD=choose-a-strong-password
```

To enable Google Analytics (GA4), also add:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Analytics is consent-gated: tracking starts only after a visitor accepts the cookie prompt.

### 2) Login

- Visit `/admin/login`
- Enter your `ADMIN_PASSWORD`

### 3) Manage content

- `/admin` lets you create, edit, and delete blog posts
- `/admin` lets you create, edit, and delete shop products by category
- Blog editor supports image upload:
	- Upload cover image directly
	- Upload inline image and auto-insert into post content

## Data files used by dashboard

- Blog data: `blog.json`
- Shop data: `shop.json`

All dashboard changes are written directly to these files and reflected on public pages.

Uploaded images are stored in `public/uploads` and referenced as `/uploads/...`.

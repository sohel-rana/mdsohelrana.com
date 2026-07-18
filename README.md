# mdsohelrana.com

Personal portfolio of **Md. Sohel Rana** — Founder & CEO @ [NerdDevs](https://nerddevs.com), AI & SaaS Architect.

Built with [Astro](https://astro.build) · Deployed automatically to **GitHub Pages** on every push to `main`.

## Editing content

All site content lives in **one file**: [`src/data/profile.ts`](src/data/profile.ts) — bio, stats, projects, experience, skills, company info. Edit it, push, done. You should never need to touch the components for a content change.

| What | Where |
|---|---|
| Content (bio, projects, jobs, skills) | `src/data/profile.ts` |
| Colors / fonts / spacing tokens | `src/styles/global.css` (`:root`) |
| Sections & markup | `src/components/*.astro` |
| SEO / meta / JSON-LD | `src/layouts/Base.astro` |
| CV file | `public/Md-Sohel-Rana-CV.pdf` |
| Social share image | `public/og.png` |

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## First deploy (one-time setup)

### 1. Create the repo and push

```bash
cd /Users/sohel/Projects/GitProjects/NodeJS/mdsohelrana
gh repo create sohel-rana/mdsohelrana.com --public --source=. --push
```

Or without the GitHub CLI: create an empty repo at github.com/new, then

```bash
git remote add origin git@github.com:sohel-rana/mdsohelrana.com.git
git push -u origin main
```

### 2. Enable GitHub Pages

Repo → **Settings → Pages**:

- **Source**: `GitHub Actions` (not "Deploy from a branch")
- **Custom domain**: `mdsohelrana.com` → Save
- Tick **Enforce HTTPS** once the certificate is issued (a few minutes after DNS resolves)

### 3. DNS records (at your domain registrar)

| Type | Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `sohel-rana.github.io` |

The `public/CNAME` file (already in this repo) keeps the custom domain bound across deploys.

### 4. Done — it's automatic from now on

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to Pages. No server, no VPS, nothing to maintain.

## Project structure

```
├── .github/workflows/deploy.yml   # CI: build + deploy to Pages
├── astro.config.mjs               # site URL, inlined CSS
├── public/                        # static assets (CNAME, CV, og.png, favicon)
└── src/
    ├── data/profile.ts            # ← ALL content lives here
    ├── styles/global.css          # design tokens + base styles
    ├── layouts/Base.astro         # <head>, SEO, JSON-LD, reveal script
    ├── components/                # Nav, Hero, Work, Experience, Skills, Nerddevs, Contact
    └── pages/index.astro          # single page assembling the sections
```

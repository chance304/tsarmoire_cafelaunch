# TSA CAFE — Pre-Launch Microsite

Invitation microsite for the **TSA CAFE** breakfast event (May 12) by T's Armoire.  
Live at: `launch.tsarmoiremanufacturing.com.np`

---

## What it is

A 4-page single-page app with a curtain-wipe transition system. Visitors move through an opening page, the event story, a registration form, and a thank-you page. Submissions are saved to a Google Sheet and trigger a confirmation email to the registrant.

## File structure

```
index.html          — markup only, no inline styles or scripts
assets/
  style.css         — all styles and responsive breakpoints
  app.js            — transitions, form logic, Apps Script POST
apps-script/
  Code.gs           — backend: writes to Google Sheet + sends confirmation email
CNAME               — GitHub Pages custom domain
DEPLOYMENT.md       — step-by-step deploy guide (Apps Script + GitHub Pages)
```

## Local development

Open `index.html` directly in a browser — no build step or server required.

For a local server (avoids CORS edge cases):

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploying changes

1. Edit files, verify locally
2. `git add` + `git commit` + `git push origin main`
3. GitHub Pages auto-deploys from `main` — live in ~30 seconds

See `DEPLOYMENT.md` for the full Apps Script setup.

## Design tokens

| Token | Value |
|---|---|
| Background | `#0d0b08` (near-black warm) |
| Accent gold | `rgba(197, 163, 105, …)` |
| Headline font | Cormorant Garamond (300/400) |
| UI font | Montserrat (200/300/400/500) |

## Known TODOs

- `#bg` in `style.css` has a placeholder comment — replace gradient with confirmed photo once design team provides it

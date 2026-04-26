# TSA CAFE — Pre-Launch Microsite

Invitation microsite for the **TSA CAFE** breakfast event (May 6) by T's Armoire.  
Live at: `launch.tsarmoiremanufacturing.com.np`

---

## What it is

A 5-page single-page app with a curtain-wipe transition system. Visitors move through an opening page, the event story, a social media consent screen, a registration form, and a thank-you page. Submissions are saved to a Google Sheet and trigger a confirmation email to the registrant.

## File structure

```
index.html          — markup only, no inline styles or scripts
assets/
  style.css         — all styles and responsive breakpoints
  app.js            — transitions, form logic, Apps Script POST
  bg_info.jpeg      — confirmed background photo (TSA founder in studio)
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
| Background | `#f6f4f0` (off-white warm) |
| Primary text | `#151514` (near-black warm) |
| Accent decorative | `#Daccb4` (warm tan — rules, progress bar) |
| Accent tag/focus | `#7a6948` / `#baac8a` (darker earth tones) |
| Font | Jost 200/300/400/500 + italic 300 (Google Fonts) |

## Pages

| # | ID | Content |
|---|---|---|
| 1 | `#p0` | Opening — TSA CAFE |
| 2 | `#p1` | The Experience — event story |
| 3 | `#p2` | Social Consent — Yes/No |
| 4 | `#p3` | Registration Form |
| 5 | `#p4` | Thank You |

## Form fields collected

| Field | Required | Notes |
|---|---|---|
| Full Name | Yes | |
| Email Address | Yes | Confirmation email + duplicate check |
| Instagram Handle | No | |
| TikTok Handle | No | |
| Phone Number | No | |
| Social Consent | Auto | Set from consent page — `yes` or `no` |

## Known TODOs

- `SCRIPT_URL` in `assets/app.js` points to a personal account deployment — redeploy from org account per `DEPLOYMENT.md` and update the URL
- Replace `GA_MEASUREMENT_ID` in `index.html` with the real Google Analytics property ID
- Replace `og:image` placeholder path in `index.html` with the confirmed event photo

# TSA CAFÉ — Slot Reservation Microsite

Slot reservation microsite for the **TSA Café** 3-day event (May 8, 9 & 10) by T's Armoire.  
Live at: `launch.tsarmoiremanufacturing.com.np`

---

## What it is

A 5-page single-page app with a curtain-wipe transition system. Visitors move through an opening page, the event story, a "What to Expect" content page, a date + time slot picker with a details form, and a confirmation page. Reservations are saved to a Google Sheet and trigger a confirmation email with the guest's chosen date and time.

## File structure

```
index.html          — markup only, no inline styles or scripts
assets/
  style.css         — all styles and responsive breakpoints
  app.js            — transitions, slot picker logic, form validation, Apps Script POST/GET
  bg_info.jpeg      — confirmed background photo (TSA founder in studio)
apps-script/
  Code.gs           — backend: slot availability (doGet), reservations (doPost), confirmation email
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
| 1 | `#p0` | Opening — TSA Café Reservation |
| 2 | `#p1` | The Experience — event story |
| 3 | `#p2` | What to Expect — experience highlights + Reserve your spot button |
| 4 | `#p3` | Slot Reservation — date picker → time slot picker → details form |
| 5 | `#p4` | Confirmation — "You're in. Your table is reserved." |

## Form fields collected

| Field | Required | Notes |
|---|---|---|
| Date | Yes | May 8, May 9, or May 10 — selected via button picker |
| Time Slot | Yes | One of 7 hourly slots — greyed out if at capacity (10/slot) |
| Full Name | Yes | |
| Email Address | Yes | Confirmation email sent + duplicate check |
| Instagram Handle | No | |
| TikTok Handle | No | |
| Phone Number | No | |

## Slot capacity

Each time slot holds a maximum of **10 reservations per day**. The frontend fetches live booking counts via `doGet` when the guest reaches the reservation page, and greys out full slots. The backend enforces the cap server-side on every `doPost`.

## Known TODOs

- `SCRIPT_URL` in `assets/app.js` needs to be updated after deploying the new `Code.gs` — see `DEPLOYMENT.md`
- Replace `GA_MEASUREMENT_ID` in `index.html` with the real Google Analytics property ID
- Replace `og:image` placeholder path in `index.html` with the confirmed event photo

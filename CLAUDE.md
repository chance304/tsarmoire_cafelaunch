# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page slot reservation microsite for the **TSA Café** 3-day event (May 8, 9 & 10) by T's Armoire. Deployed via GitHub Pages to `launch.tsarmoiremanufacturing.com.np` (CNAME).

No build step, no dependencies, no test suite.

## File structure

```
index.html              — markup only (no inline styles or scripts)
assets/
  style.css             — all styles, design tokens, responsive breakpoints
  app.js                — SPA transitions, slot picker logic, form validation, Apps Script GET/POST
  bg_info.jpeg          — confirmed background photo (TSA founder in studio, portrait)
apps-script/
  Code.gs               — Google Apps Script backend (slot availability doGet, reservations doPost, confirmation email)
CNAME                   — GitHub Pages custom domain
README.md               — project overview and local dev instructions
DEPLOYMENT.md           — step-by-step Apps Script + GitHub Pages deploy guide
```

## Development

Open `index.html` directly in a browser. No server required; all assets are local or loaded from Google Fonts CDN.

To preview on a local server (avoids CORS edge cases):
```bash
python3 -m http.server 8080
```

## Architecture

`index.html` is a **5-page** single-page app with a curtain-wipe transition system:

- **Pages** (`#p0`–`#p4`): absolutely positioned, toggled via `.active` class
- **Transitions**: CSS `scaleY` curtain (`#curtain`) with a 3-phase JS timer sequence in `go(dir)` — defined in `assets/app.js`
- **Stagger animations**: `.entering` class triggers CSS `@keyframes sIn` with `nth-child` delays on `.s` elements — defined in `assets/style.css`
- **Chrome**: wordmark, page counter, progress bar, and nav arrows update via `syncChrome()`

### Page index

| cur | ID  | Page | Nav behaviour |
|-----|-----|------|---------------|
| 0   | #p0 | Opening | forward arrow visible |
| 1   | #p1 | The Experience | forward arrow visible |
| 2   | #p2 | What to Expect | forward arrow hidden — "Reserve your spot →" button only |
| 3   | #p3 | Slot Reservation | forward arrow hidden — date/slot picker then submit; scrollable |
| 4   | #p4 | Confirmation | both nav arrows hidden |

Keyboard (ArrowRight/Enter) and swipe navigation are disabled on pages 2 and 3.

### Slot picker flow (#p3)

Three-step progressive reveal on a single scrollable page:
1. **Date buttons** — May 8 / May 9 / May 10 (always visible)
2. **Time slot buttons** — 7 hourly slots, revealed after date selected; full slots (≥ 10 bookings) get `.full` class and are `disabled`
3. **Details form** — name, email (required), Instagram, TikTok, phone (optional); revealed after slot selected

Slot availability is fetched via `doGet(?action=slots)` every time the user enters #p3. Full-slot state is also enforced server-side on `doPost`.

## Backend

Reservations use a Google Apps Script Web App (`SCRIPT_URL` in `assets/app.js`).  
The script source lives in `apps-script/Code.gs`.  
See `DEPLOYMENT.md` for setup and re-deploy instructions.

`SCRIPT_URL` must be updated after deploying the `Code.gs` to the T's Armoire org account.

**`doGet(?action=slots)` — slot availability:**  
Returns booking counts per date and time slot so the frontend can grey out full slots.  
Response shape: `{ ok: true, slots: { "May 8": { "10:30 AM – 11:30 AM": N, ... }, ... } }`

**`doPost` — reservation:**  
Fields sent in POST body:

```
id, name, email, instagram, tiktok, phone, date, time_slot, registered_at
```

**Sheet name:** `Reservations`  
**Sheet columns:** ID · Name · Email · Instagram · TikTok · Phone · Date · Time Slot · Registered At  
**Capacity:** 10 reservations per date+slot combination — enforced server-side on every POST.

## Design tokens

- Background: `#f6f4f0` (off-white warm — matches tsarmoire.com)
- Background image: `assets/bg_info.jpeg` — portrait photo, positioned `80% center` on desktop, `65% center` on mobile; layered warm gradient overlay for legibility
- Primary text: `#151514` (near-black warm)
- Accent (decorative): `#Daccb4` (warm tan — rules, progress bar)
- Accent (tags/focus): `#7a6948` / `#baac8a` (dark earth tones)
- Font: **Jost** (200/300/400/500 + italic 300) via Google Fonts

## Known TODOs

- `SCRIPT_URL` in `assets/app.js` needs updating after deploying `Code.gs` to the org account — see `DEPLOYMENT.md`
- Replace `GA_MEASUREMENT_ID` in `index.html` with the real Google Analytics property ID
- Replace `og:image` placeholder in `index.html` with the confirmed event photo
- Update `CNAME` if this deployment uses a different domain

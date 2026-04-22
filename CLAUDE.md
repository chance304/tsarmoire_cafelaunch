# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page invitation microsite for the **TSA CAFE** pre-launch event (May 12) by T's Armoire. Deployed via GitHub Pages to `launch.tsarmoiremanufacturing.com.np` (CNAME).

No build step, no dependencies, no test suite.

## File structure

```
index.html              — markup only (no inline styles or scripts)
assets/
  style.css             — all styles, design tokens, responsive breakpoints
  app.js                — SPA transitions, form validation, Apps Script POST
apps-script/
  Code.gs               — Google Apps Script backend (Sheet write + confirmation email)
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

`index.html` is a 4-page single-page app with a curtain-wipe transition system:

- **Pages** (`#p0`–`#p3`): absolutely positioned, toggled via `.active` class
- **Transitions**: CSS `scaleY` curtain (`#curtain`) with a 3-phase JS timer sequence in `go(dir)` — defined in `assets/app.js`
- **Stagger animations**: `.entering` class triggers CSS `@keyframes sIn` with `nth-child` delays on `.s` elements — defined in `assets/style.css`
- **Chrome**: wordmark, page counter, progress bar, and nav arrows update via `syncChrome()`

## Backend

Registrations POST to a Google Apps Script Web App (`SCRIPT_URL` in `assets/app.js`).  
The script source lives in `apps-script/Code.gs`.  
See `DEPLOYMENT.md` for setup and re-deploy instructions.

Current deployment is on a **personal account** pending migration to the T's Armoire org account — update `SCRIPT_URL` in `assets/app.js` after the org deployment is complete.

**Fields collected:** name, email, instagram, tiktok, phone, registered_at  
**Sheet columns:** ID · Name · Email · Instagram · TikTok · Phone · Registered At

## Design tokens

- Background: `#0d0b08` (near-black warm)
- Accent gold: `rgba(197, 163, 105, …)` — used for tags, rules, progress bar, and hover states
- Fonts: Cormorant Garamond (headlines) + Montserrat (UI/body), both from Google Fonts

## Known TODOs

- `#bg` in `assets/style.css` has a placeholder comment — replace gradient with confirmed photo once design team provides it
- `SCRIPT_URL` in `assets/app.js` points to a personal account deployment — redeploy from org account per `DEPLOYMENT.md` and update the URL

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-file static invitation microsite for the **TSA CAFE** pre-launch event (May 12) by T's Armoire. Deployed via GitHub Pages to `launch.tsarmoiremanufacturing.com.np` (CNAME).

No build step, no dependencies, no test suite — everything lives in `index.html`.

## Development

Open `index.html` directly in a browser. No server required; all assets are inline or loaded from Google Fonts CDN.

To preview on a local server (avoids CORS edge cases with future form backends):
```bash
python3 -m http.server 8080
```

## Architecture

`index.html` is a 4-page single-page app with a curtain-wipe transition system:

- **Pages** (`#p0`–`#p3`): absolutely positioned, toggled via `.active` class
- **Transitions**: CSS `scaleY` curtain (`#curtain`) with a 3-phase JS timer sequence in `go(dir)`
- **Stagger animations**: `.entering` class triggers CSS `@keyframes sIn` with `nth-child` delays on `.s` elements
- **Chrome**: wordmark, page counter, progress bar, and nav arrows update via `syncChrome()`

## Known TODOs in the code

- `handleSubmit()` in the `<script>` block has a `/* TODO: wire up to backend / email service */` comment — form submission currently just advances to the thank-you page without persisting data
- `#bg` has a placeholder comment for replacing the gradient with a confirmed photo once the design team provides it

## Design tokens

- Background: `#0d0b08` (near-black warm)
- Accent gold: `rgba(197, 163, 105, …)` — used for tags, rules, progress bar, and hover states
- Fonts: Cormorant Garamond (headlines) + Montserrat (UI/body), both from Google Fonts

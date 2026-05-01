# Deployment Guide

## Overview

The site has two parts to deploy:
1. **Frontend** — static files on GitHub Pages (automatic on push to `main`)
2. **Backend** — Google Apps Script Web App (manual deploy, once per account)

---

## 1. Apps Script setup (backend)

This must be done from the **T's Armoire Google account**, not a personal account.

### Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and sign in as T's Armoire
2. Create a new spreadsheet, name it: `TSA CAFÉ Reservations`
3. Leave it empty — the script creates the header row automatically on first submission

The sheet will have the following columns once the first submission arrives:

| ID | Name | Email | Instagram | TikTok | Phone | Date | Time Slot | Registered At |

### Step 2 — Create the Apps Script project

1. In the spreadsheet, click **Extensions → Apps Script**
2. Delete all placeholder code
3. Copy the contents of `apps-script/Code.gs` from this repo and paste it in
4. Click **Save** (name the project anything, e.g. `TSA CAFÉ Reservations Backend`)

### Step 3 — Deploy as a Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to "Select type" and choose **Web App**
3. Set:
   - **Description**: `TSA CAFÉ Reservations v1` (or anything)
   - **Execute as**: `Me` (the T's Armoire account)
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. Authorize the permissions when prompted (allow access to Sheets and Gmail)
6. Copy the **Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec
   ```

### Step 4 — Update the frontend

Open `assets/app.js` and replace the `SCRIPT_URL` value with the new URL:

```js
const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_NEW_URL_HERE/exec';
```

Commit and push:

```bash
git add assets/app.js
git commit -m "Update SCRIPT_URL to org account deployment"
git push origin main
```

---

## 2. Re-deploying the Apps Script after code changes

If you edit `apps-script/Code.gs`, you must create a **new version** for changes to take effect. Editing the script does not update existing deployments.

1. Open the Apps Script project
2. Click **Deploy → Manage deployments**
3. Click the edit (pencil) icon on the active deployment
4. Under "Version", select **New version**
5. Click **Deploy**

> This updates the existing deployment URL — no need to change `SCRIPT_URL` in `app.js`.

### If migrating from a previous deployment (e.g. personal → org account)

If rows were already collected under a previous deployment, ensure all column headers are present in row 1 of the sheet:

```
A: ID  B: Name  C: Email  D: Instagram  E: TikTok  F: Phone  G: Date  H: Time Slot  I: Registered At
```

Missing columns will cause new submissions to write data to the wrong columns.

---

## 3. GitHub Pages (frontend)

No manual action needed. GitHub Pages serves from the `main` branch root.

- **Custom domain**: set via `CNAME` file — update this file if the domain changes
- **DNS**: CNAME record pointing to `<github-username>.github.io` must be set at your DNS provider

Every `git push origin main` deploys automatically. Changes are live within ~30 seconds.

---

## 4. Post-deploy — remaining team tasks

Before the site goes live:

- [ ] Update `SCRIPT_URL` in `assets/app.js` with the new Apps Script Web App URL
- [ ] Replace `og:image` in `index.html` with the confirmed event photo (currently placeholder `assets/og-image.jpg`)
- [ ] Replace `GA_MEASUREMENT_ID` in `index.html` with the real Google Analytics property ID
- [ ] Update `CNAME` if the domain for this deployment differs from `launch.tsarmoiremanufacturing.com.np`

---

## Verification checklist

After deploying a new Apps Script URL:

- [ ] Open the live site — opening page shows TSA CAFÉ, dates May 8, 9 & 10, counter reads 01 / 05
- [ ] Navigate forward through pages 1–3 (opening → experience → what to expect) using the forward arrow
- [ ] On page 3 (What to Expect), click "Reserve your spot →" — confirms it advances to the slot picker
- [ ] On page 4 (slot picker), click a date — time slots should appear
- [ ] Select a time slot — the details form should appear below
- [ ] Confirm full slots (10 bookings) appear greyed out and are not selectable
- [ ] Submit the form with all fields filled — confirm it waits for server response before advancing to confirmation page
- [ ] Confirm the confirmation page shows "You're In" / "Your table is reserved."
- [ ] Confirm a new row appears in the Google Sheet with all 9 columns populated (ID, Name, Email, Instagram, TikTok, Phone, Date, Time Slot, Registered At)
- [ ] Confirm the test email inbox receives the confirmation email with the correct date and time slot
- [ ] Submit the same email again — server should return `duplicate` error; form should show "Already reserved with this email"
- [ ] Test slot full response: manually insert 10 rows for one slot, then try to book it — server should return `slot_full`; frontend should deselect the slot and prompt to choose another
- [ ] Kill network mid-submit — form should show "Something went wrong — please try again" and re-enable the button
- [ ] Submit leaving Instagram, TikTok, and phone blank — sheet should show empty cells, no error
- [ ] Test on mobile — date/slot buttons are tappable, form scrolls, no swipe navigation on slot picker page
- [ ] Check the `Errors` tab in the Google Sheet exists and logs any backend failures

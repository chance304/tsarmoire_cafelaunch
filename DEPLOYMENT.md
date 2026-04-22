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
2. Create a new spreadsheet, name it: `TSA CAFE Registrations`
3. Leave it empty — the script creates the header row automatically on first submission

The sheet will have the following columns once the first submission arrives:

| ID | Name | Email | Instagram | TikTok | Phone | Registered At |

### Step 2 — Create the Apps Script project

1. In the spreadsheet, click **Extensions → Apps Script**
2. Delete all placeholder code
3. Copy the contents of `apps-script/Code.gs` from this repo and paste it in
4. Click **Save** (name the project anything, e.g. `TSA CAFE Backend`)

### Step 3 — Deploy as a Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to "Select type" and choose **Web App**
3. Set:
   - **Description**: `TSA CAFE v1` (or anything)
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
git commit -m "Switch Apps Script to org account deployment"
git push origin main
```

---

## 2. Re-deploying the Apps Script after code changes

If you edit `apps-script/Code.gs`, you must create a **new deployment** for changes to take effect. Editing the script does not update existing deployments.

1. Open the Apps Script project
2. Click **Deploy → New deployment**
3. Copy the new URL
4. Update `SCRIPT_URL` in `assets/app.js` and push

> You can also manage existing deployments via **Deploy → Manage deployments** and create a new version under the same deployment to avoid changing the URL.

### If migrating an existing Sheet (e.g. from a personal account)

If rows were already collected under a previous deployment, the old sheet will be missing the `TikTok` and `Phone` columns. Before going live on the org account:

1. Open the existing sheet
2. Insert two columns between `Instagram` and `Registered At`
3. Name them `TikTok` and `Phone` (must match exactly)

New submissions will populate those columns. Old rows will simply have empty cells there.

---

## 3. GitHub Pages (frontend)

No manual action needed. GitHub Pages serves from the `main` branch root.

- **Custom domain**: set via `CNAME` file (`launch.tsarmoiremanufacturing.com.np`)
- **DNS**: CNAME record pointing to `<github-username>.github.io` must be set at your DNS provider

Every `git push origin main` deploys automatically. Changes are live within ~30 seconds.

---

## Verification checklist

After deploying a new Apps Script URL:

- [ ] Open the live site and navigate to the registration form (page 3)
- [ ] Submit the form with all fields filled in — name, email, Instagram, TikTok, and phone
- [ ] Confirm a new row appears in the Google Sheet with all 7 columns populated
- [ ] Confirm the test email inbox receives the confirmation email
- [ ] Submit again leaving TikTok and phone blank — sheet should show empty cells for those columns, not an error
- [ ] Submit again with the same email — form should block with "Already registered"
- [ ] Test on mobile (form page should not advance via swipe — only via submit)

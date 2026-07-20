# Newsletter Signup → Google Sheets Setup

The newsletter form on the home page (`index.html`) is set up to save subscriber
emails to a Google Sheet using a free Google Apps Script web app. It takes about
5 minutes to connect. No paid services are needed.

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) (signed in to the Google
   account that should own the subscriber list).
2. Create a new spreadsheet and name it something like **Newsletter Subscribers**.
3. In row 1, add two headers: `Email` in cell A1 and `Date` in cell B1.

## Step 2 — Add the Apps Script

1. In that spreadsheet, open **Extensions → Apps Script**.
2. Delete any code in the editor and paste this:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var email = (e.parameter.email || '').trim();

  if (email && email.indexOf('@') !== -1) {
    sheet.appendRow([email, new Date()]);
  }

  return ContentService.createTextOutput('OK');
}
```

3. Click the **Save** (disk) icon.

## Step 3 — Deploy it as a web app

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, and approve the permissions when Google asks
   (you may need to click "Advanced → Go to ... (unsafe)" — this is normal for
   your own scripts).
5. Copy the **Web app URL** it gives you (it looks like
   `https://script.google.com/macros/s/AKfycb.../exec`).

## Step 4 — Paste the URL into the website

1. Open `index.html` and find this line (search for `NEWSLETTER_SCRIPT_URL`):

   ```javascript
   const NEWSLETTER_SCRIPT_URL = '';
   ```

2. Paste your web app URL between the quotes:

   ```javascript
   const NEWSLETTER_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```

3. Commit and push the change (or edit the file directly on GitHub).

That's it — every signup on the home page will now appear as a new row in the
Google Sheet with the date it was submitted.

## Notes

- Until the URL is filled in, the form shows a message asking visitors to email
  info@downtownmanteca.com instead, so nothing silently breaks.
- If you ever edit the Apps Script code, you must redeploy it
  (**Deploy → Manage deployments → Edit → New version**) for changes to take
  effect. The URL stays the same.
- To stop collecting signups, disable the deployment in
  **Deploy → Manage deployments**.

# Google Sheet Lead Storage Setup for HireAxis

Follow this step-by-step guide to store all form submissions from the HireAxis website directly into your Google Sheet in real-time.

---

## Step 1: Create a New Google Sheet

1. Open [Google Sheets](https://sheets.new) and create a new spreadsheet.
2. Name the sheet: **`HireAxis Lead Submissions`**.
3. In **Row 1**, set the following column headers (A1 to H1):
   - **A1**: `Timestamp`
   - **B1**: `Full Name`
   - **C1**: `Email`
   - **D1**: `Phone / WhatsApp`
   - **E1**: `Target Country`
   - **F1**: `Work Rights`
   - **G1**: `Target Role`
   - **H1**: `Resume / File Name`

---

## Step 2: Add the Google Apps Script

1. In your Google Sheet, click on **Extensions &rarr; Apps Script** in the top menu.
2. Delete any code inside `Code.gs` and paste the following script:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Append new row with form data
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.targetCountry || '',
      data.workRights || '',
      data.targetRole || '',
      data.fileName || 'No file uploaded'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Row added' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
```

3. Click the **Save** icon (💾) or press `Ctrl + S` / `Cmd + S`.

---

## Step 3: Deploy as a Web App

1. In the top right corner of the Apps Script editor, click **Deploy &rarr; New deployment**.
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `HireAxis Form Submissions API`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial: must be "Anyone" so website visitors can submit)*
4. Click **Deploy**.
5. When prompted, click **Authorize Access**, choose your Google account, click **Advanced &rarr; Go to HireAxis (unsafe)** (Google's standard prompt for personal scripts), and click **Allow**.
6. Copy the generated **Web app URL** (starts with `https://script.google.com/macros/s/.../exec`).

---

## Step 4: Connect the Web App URL to the Project

1. Create a `.env` file in the project root:
```env
VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

2. That's it! Every submission on `/contact` will now automatically append a row to your Google Sheet in real-time.

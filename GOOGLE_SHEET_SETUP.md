# Google Sheet & Google Drive Storage Setup for HireAxis

Follow this step-by-step guide to store all form submissions from the HireAxis website into your **Google Sheet** and automatically save uploaded **Resume PDFs into Google Drive**.

---

## 📂 How It Works
1. When a user fills out the contact form and attaches their PDF resume:
2. The form details are saved as a new row in your **Google Sheet**.
3. The uploaded PDF is automatically created inside a **`HireAxis Resumes`** folder in your **Google Drive**.
4. The clickable **Google Drive PDF link** is automatically placed in **Column I** of your Google Sheet row.

---

## Step 1: Create a New Google Sheet

1. Open [Google Sheets](https://sheets.new) and create a new spreadsheet.
2. Name the spreadsheet: **`HireAxis Lead Submissions`**.
3. In **Row 1**, set the following column headers across cells **A1 to I1**:
   - **A1**: `Timestamp`
   - **B1**: `Full Name`
   - **C1**: `Email`
   - **D1**: `Phone / WhatsApp`
   - **E1**: `Target Country`
   - **F1**: `Work Rights`
   - **G1**: `Target Role`
   - **H1**: `Resume File Name`
   - **I1**: `Google Drive PDF Link`

---

## Step 2: Add the Google Apps Script

1. In your Google Sheet, click **Extensions &rarr; Apps Script** in the top menu.
2. Replace all code in `Code.gs` with the following:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    var driveFileUrl = "No file uploaded";

    // 1. If PDF/DOCX file data is present, upload it directly to Google Drive
    if (data.fileData && data.fileName) {
      try {
        var folderName = "HireAxis Resumes";
        var folders = DriveApp.getFoldersByName(folderName);
        var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

        var decoded = Utilities.base64Decode(data.fileData);
        var mimeType = data.fileMimeType || "application/pdf";
        var blob = Utilities.newBlob(decoded, mimeType, data.fileName);
        var file = folder.createFile(blob);

        // Allow view access via link
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        driveFileUrl = file.getUrl();
      } catch (err) {
        driveFileUrl = "Error saving file: " + err.toString();
      }
    }

    // 2. Append new row with all details + clickable Google Drive link
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.targetCountry || '',
      data.workRights || '',
      data.targetRole || '',
      data.fileName || 'No file uploaded',
      driveFileUrl
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Row and PDF saved' }))
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

3. Click the **Save** icon (💾) or press `Ctrl + S`.

---

## Step 3: Deploy as a Web App

1. In the top right corner, click **Deploy &rarr; New deployment**.
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**.
3. Set the fields:
   - **Description**: `HireAxis Form & PDF Upload API`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial: must be "Anyone" so visitors can upload without Google login)*
4. Click **Deploy**.
5. When prompted, click **Authorize Access**, choose your Google account, click **Advanced &rarr; Go to HireAxis (unsafe)** (Google's standard prompt for personal developer scripts), and click **Allow**.
6. Copy the generated **Web app URL** (`https://script.google.com/macros/s/.../exec`).

---

## Step 4: Add the URL to Your Website

Add your Web app URL to your `.env` file (or in **Vercel Project Settings &rarr; Environment Variables**):

```env
VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

---

## 🎯 Verification

1. Submit a test application on `/contact` and attach a sample PDF.
2. Open your Google Sheet &rarr; you will see the lead in real-time.
3. Open your Google Drive &rarr; you will see a new folder named **`HireAxis Resumes`** containing the uploaded PDF!
4. Clicking the link in **Column I** of your sheet will open the PDF directly in Google Drive.

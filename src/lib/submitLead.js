// Lead submission to the Google Apps Script web app.
//
// Used by BOTH the /contact page form and the landing popup form, so every
// submission lands in the same sheet with the same columns (A-I) and resumes
// go to the same "HireAxis Resumes" Drive folder. See GOOGLE_SHEET_SETUP.md.
//
// The payload shape is deliberately frozen - adding a key here without adding
// a matching column in Code.gs silently drops the data.

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB, matches the copy on the form
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

/** Reads a File into the base64 string Apps Script expects. */
export function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64 = typeof result === 'string' && result.includes(',') ? result.split(',')[1] : '';
      resolve({ name: file.name, type: file.type || 'application/pdf', base64 });
    };
    reader.onerror = () => reject(new Error('Could not read that file. Please try another.'));
    reader.readAsDataURL(file);
  });
}

/** Returns an error string, or null when the file is acceptable. */
export function validateResumeFile(file) {
  if (file.size > MAX_FILE_BYTES) {
    return 'File size exceeds 5 MB. Please upload a smaller file.';
  }
  const name = file.name.toLowerCase();
  if (!ALLOWED_EXTENSIONS.some((extension) => name.endsWith(extension))) {
    return 'Please upload a PDF, DOC, or DOCX file.';
  }
  return null;
}

export function buildLeadPayload(formData, fileData) {
  return {
    timestamp: new Date().toLocaleString(),
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    targetCountry: formData.targetCountry,
    workRights: formData.workRights === 'yes' ? 'Yes' : 'No',
    targetRole: formData.targetRole,
    fileName: fileData.name || '',
    fileData: fileData.base64 || '',
    fileMimeType: fileData.type || 'application/pdf',
    agreePrivacy: formData.agreePrivacy ? 'Yes' : 'No'
  };
}

/**
 * Posts a lead to the Apps Script endpoint and reports whether it landed.
 *
 * The body is JSON but the Content-Type is text/plain on purpose. An
 * application/json POST is a "preflighted" request, and Apps Script cannot
 * answer the OPTIONS preflight - which is why this previously had to use
 * mode:'no-cors' and got back an opaque response it could not read. text/plain
 * keeps it a "simple request": no preflight, and the reply stays readable, so a
 * failure is a failure instead of a silent success. Apps Script still receives
 * the body unchanged via e.postData.contents, so Code.gs needs no edits.
 *
 * @returns {Promise<{stored: boolean, confirmed: boolean, reason?: string}>}
 *          confirmed:true means Apps Script explicitly acknowledged the row.
 */
export async function submitLead(payload) {
  const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

  // Treat the untouched .env placeholder as "not configured". Without this the
  // opaque fallback below would swallow the 404 and report a false success.
  const isConfigured =
    sheetUrl && sheetUrl.trim().length > 0 && !sheetUrl.includes('YOUR_DEPLOYMENT_ID');

  if (!isConfigured) {
    console.warn(
      'VITE_GOOGLE_SHEET_URL is not set to a real Apps Script URL - NOTHING WAS STORED. ' +
        'Put your /exec URL in .env and restart the dev server. See GOOGLE_SHEET_SETUP.md.',
      payload
    );
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { stored: false, confirmed: false, reason: 'not-configured' };
  }

  const body = JSON.stringify(payload);
  const headers = { 'Content-Type': 'text/plain;charset=utf-8' };

  try {
    const response = await fetch(sheetUrl, { method: 'POST', headers, body });
    const result = await response.json();

    if (result.status === 'success') {
      return { stored: true, confirmed: true };
    }
    throw new Error(result.message || 'Apps Script reported an error');
  } catch (error) {
    // The readable path can still fail on older deployments or odd redirects.
    // Retry opaquely rather than lose the lead, but do not claim confirmation.
    console.warn('Could not confirm the submission, retrying opaquely:', error.message);
    try {
      await fetch(sheetUrl, { method: 'POST', mode: 'no-cors', headers, body });
      return { stored: true, confirmed: false, reason: error.message };
    } catch (fallbackError) {
      return { stored: false, confirmed: false, reason: fallbackError.message };
    }
  }
}

export const TARGET_COUNTRIES = [
  'United Kingdom',
  'United States',
  'Canada',
  'New Zealand',
  'Germany',
  'Singapore',
  'UAE',
  'Malta',
  'Australia'
];

import React, { useRef, useState } from 'react';
import {
  buildLeadPayload,
  readFileAsBase64,
  submitLead,
  validateResumeFile,
  TARGET_COUNTRIES
} from '../lib/submitLead';

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  targetCountry: '',
  workRights: 'yes',
  targetRole: '',
  agreePrivacy: false
};

/**
 * The application/enquiry form. Rendered on /contact and inside the landing
 * popup - both write the same row to the same Google Sheet.
 *
 * @param {boolean}  compact    Tightens spacing and hides the resume field for the modal
 * @param {function} onSuccess  Fired after a successful submit
 * @param {string}   idPrefix   Keeps input ids unique when both instances mount
 */
export default function ApplicationForm({ compact = false, onSuccess, idPrefix = 'app' }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [fileData, setFileData] = useState({ name: '', type: '', base64: '' });
  const [fileError, setFileError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const fileInputRef = useRef(null);

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const error = validateResumeFile(file);
    if (error) {
      setFileError(error);
      setFileData({ name: '', type: '', base64: '' });
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setFileError(null);
    try {
      setFileData(await readFileAsBase64(file));
    } catch (readError) {
      setFileError(readError.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitLead(buildLeadPayload(formData, fileData));

      if (!result.stored && result.reason !== 'not-configured') {
        // A genuine delivery failure - never show "Thank you" over a lost lead.
        setSubmitError(
          "We couldn't submit your details just now. Please try again, or email info@hireaxis.co."
        );
        return;
      }

      setSubmitted(true);
      onSuccess && onSuccess();
    } catch (error) {
      console.error('Lead submission error:', error);
      setSubmitError(
        "We couldn't submit your details just now. Please try again, or email info@hireaxis.co."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-success">
        <div className="form-success-icon" aria-hidden="true">✓</div>
        <h3 className="form-success-title">Thank you for submitting!</h3>
        <p className="form-success-text">
          Our team will review your details and contact you within one business day with exact
          country pricing and onboarding details.
        </p>
      </div>
    );
  }

  return (
    <form className={`contact-form ${compact ? 'is-compact' : ''}`} onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor={`${idPrefix}-name`}>Full name*</label>
        <input
          id={`${idPrefix}-name`}
          type="text"
          required
          placeholder="Enter Your full name"
          className="form-input"
          value={formData.fullName}
          onChange={update('fullName')}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor={`${idPrefix}-email`}>Email address*</label>
        <input
          id={`${idPrefix}-email`}
          type="email"
          required
          placeholder="Enter Your email address"
          className="form-input"
          value={formData.email}
          onChange={update('email')}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor={`${idPrefix}-phone`}>Phone / WhatsApp number*</label>
        <input
          id={`${idPrefix}-phone`}
          type="tel"
          required
          placeholder="Enter Your phone/Whatsapp number"
          className="form-input"
          value={formData.phone}
          onChange={update('phone')}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor={`${idPrefix}-country`}>Target country*</label>
        <select
          id={`${idPrefix}-country`}
          required
          className="form-select"
          value={formData.targetCountry}
          onChange={update('targetCountry')}
        >
          <option value="">Select your target country</option>
          {TARGET_COUNTRIES.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <span className="form-label">
          Do you currently have valid work rights in that country?*
        </span>
        <div className="form-radio-group">
          <label className="form-radio-label">
            <input
              type="radio"
              name={`${idPrefix}-workRights`}
              value="yes"
              checked={formData.workRights === 'yes'}
              onChange={update('workRights')}
            />
            Yes
          </label>
          <label className="form-radio-label">
            <input
              type="radio"
              name={`${idPrefix}-workRights`}
              value="no"
              checked={formData.workRights === 'no'}
              onChange={update('workRights')}
            />
            No
          </label>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor={`${idPrefix}-role`}>Target role / job title*</label>
        <input
          id={`${idPrefix}-role`}
          type="text"
          required
          placeholder="e.g. Software Engineer, Marketing Manager"
          className="form-input"
          value={formData.targetRole}
          onChange={update('targetRole')}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor={`${idPrefix}-file`}>
          Resume upload [PDF, DOC, DOCX, max 5 MB]
        </label>
        <div className="file-upload-box">
          <label className="file-upload-btn" htmlFor={`${idPrefix}-file`}>Choose File</label>
          <input
            id={`${idPrefix}-file`}
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <span className={`file-upload-name ${fileData.name ? 'has-file' : ''}`}>
            {fileData.name || 'No file chosen'}
          </span>
        </div>
        {fileError && <p className="form-field-error" role="alert">{fileError}</p>}
      </div>

      <label className="privacy-checkbox-label">
        <input
          type="checkbox"
          required
          checked={formData.agreePrivacy}
          onChange={update('agreePrivacy')}
          style={{ marginTop: '3px' }}
        />
        <span>
          I agree to the Privacy Policy and consent to HireAxis processing my data to respond to
          enquiry.*
        </span>
      </label>

      {submitError && (
        <p className="form-submit-error" role="alert">{submitError}</p>
      )}

      <button type="submit" className="btn btn-dark" style={{ marginTop: '12px' }} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Enquiry →'}
      </button>
    </form>
  );
}

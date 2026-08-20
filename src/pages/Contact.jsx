import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    targetCountry: '',
    workRights: 'yes',
    targetRole: '',
    fileName: '',
    agreePrivacy: false
  });

  const [fileData, setFileData] = useState({
    name: '',
    type: '',
    base64: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5 MB. Please upload a smaller file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        const base64 = typeof result === 'string' && result.includes(',') ? result.split(',')[1] : '';
        setFileData({
          name: file.name,
          type: file.type || 'application/pdf',
          base64: base64
        });
        setFormData((prev) => ({ ...prev, fileName: file.name }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

    const payload = {
      timestamp: new Date().toLocaleString(),
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      targetCountry: formData.targetCountry,
      workRights: formData.workRights === 'yes' ? 'Yes' : 'No',
      targetRole: formData.targetRole,
      fileName: fileData.name || formData.fileName || '',
      fileData: fileData.base64 || '',
      fileMimeType: fileData.type || 'application/pdf',
      agreePrivacy: formData.agreePrivacy ? 'Yes' : 'No'
    };

    if (sheetUrl && sheetUrl.trim().length > 0) {
      try {
        await fetch(sheetUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        setSubmitted(true);
      } catch (err) {
        console.error('Error submitting form to Google Sheet:', err);
        setSubmitted(true);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 400);
    }
  };

  return (
    <div className="contact-page section-wrapper">
      <div className="container">
        {/* Pill */}
        <div className="pill-container">
          <span className="category-pill">CONTACT</span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="page-title highlight">
          Start Your Applications This Week
        </h1>
        <p className="page-subtitle">
          Fill in the form and we'll come back within [one business day] with your country's pricing and next steps. Prefer to talk first? Every channel below reaches a real person.
        </p>

        {/* Form Container with Background Woman Image */}
        <div className="contact-hero-container">
          <img 
            src="/images/contact_woman_bg.png" 
            alt="HireAxis Dedicated Support Team" 
            className="contact-bg-woman-img" 
          />

          <div className="contact-form-card">
            <h2 className="contact-form-title">Tell Us About Your Search</h2>

            {submitted ? (
              <div style={{ padding: '30px 20px', textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#E0EEEB',
                  color: '#0D5C4F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  margin: '0 auto 16px auto'
                }}>
                  ✓
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#013E41', marginBottom: '8px' }}>
                  Thank you for submitting!
                </h3>
                <p style={{ fontSize: '14.5px', color: '#4B5563' }}>
                  Our team will review your details and contact you within one business day with exact country pricing and onboarding details.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full name*</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter Your full name" 
                    className="form-input"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email address*</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter Your email address" 
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp number*</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="Enter Your phone/Whatsapp number" 
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Target country*</label>
                  <select 
                    required 
                    className="form-select"
                    value={formData.targetCountry}
                    onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                  >
                    <option value="">Select your target country</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Germany">Germany</option>
                    <option value="Singapore">Singapore</option>
                    <option value="UAE">UAE</option>
                    <option value="Malta">Malta</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Do you currently have valid work rights in that country?*</label>
                  <div className="form-radio-group">
                    <label className="form-radio-label">
                      <input 
                        type="radio" 
                        name="workRights" 
                        value="yes" 
                        checked={formData.workRights === 'yes'}
                        onChange={(e) => setFormData({ ...formData, workRights: e.target.value })}
                      />
                      Yes
                    </label>
                    <label className="form-radio-label">
                      <input 
                        type="radio" 
                        name="workRights" 
                        value="no" 
                        checked={formData.workRights === 'no'}
                        onChange={(e) => setFormData({ ...formData, workRights: e.target.value })}
                      />
                      No
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Target role / job title*</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Software Engineer, Marketing Manager" 
                    className="form-input"
                    value={formData.targetRole}
                    onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Resume upload [PDF, DOC, DOCX, max 5 MB]</label>
                  <div className="file-upload-box">
                    <label className="file-upload-btn" htmlFor="resume-file">
                      Choose File
                    </label>
                    <input 
                      id="resume-file"
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <span style={{ fontSize: '13px', color: formData.fileName ? '#111827' : '#94A3B8' }}>
                      {formData.fileName || "No file chosen"}
                    </span>
                  </div>
                </div>

                <label className="privacy-checkbox-label">
                  <input 
                    type="checkbox" 
                    required 
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                    style={{ marginTop: '3px' }}
                  />
                  <span>I agree to the Privacy Policy and consent to HireAxis processing my data to respond to enquiry.*</span>
                </label>

                <button 
                  type="submit" 
                  className="btn btn-dark" 
                  style={{ marginTop: '12px' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Enquiry \u2192"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Contact Info & Socials Row */}
        <div className="contact-info-social-row">
          {/* Get in Touch */}
          <div>
            <h2 className="contact-channels-title">Get in touch</h2>
            <div className="contact-channels-list">
              <div className="contact-channel-item">
                <div className="channel-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <span className="channel-value">info@hireaxis.co</span>
              </div>

              <div className="contact-channel-item">
                <div className="channel-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span className="channel-value">XYZ</span>
              </div>

              <div className="contact-channel-item">
                <div className="channel-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span className="channel-value">XYZ</span>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div>
            <h2 className="social-channels-title">Follow our Social Media</h2>
            <div className="social-icons-row">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn linkedin" aria-label="LinkedIn">
                in
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn facebook" aria-label="Facebook">
                f
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn instagram" aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn whatsapp" aria-label="WhatsApp">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

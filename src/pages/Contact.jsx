import React from 'react';
import ApplicationForm from '../components/ApplicationForm';

export default function Contact() {
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
            <ApplicationForm idPrefix="contact" />
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

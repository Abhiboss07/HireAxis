import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Headline Banner */}
        <div className="footer-headline">
          Your Job Search,<br />
          Handled Smarter.
        </div>

        {/* 3 Columns Main Grid */}
        <div className="footer-main-grid">
          {/* Column 1: About HireAxis */}
          <div className="footer-col footer-col-about">
            <h3 className="footer-col-title">About HireAxis</h3>
            <p className="footer-about-text">
              Finding the right job takes time. HireAxis helps make the process simpler with structured job application support designed to help candidates move forward in their careers.
            </p>
            <Link to="/" className="footer-logo-link">
              <img 
                src="/images/logo_white.webp" 
                alt="HireAxis" 
                className="footer-brand-logo"
                loading="lazy"
                decoding="async"
                width="180"
                height="64"
              />
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col footer-col-links">
            <h3 className="footer-col-title">Quick Links</h3>
            <ul className="footer-link-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Social & Countries We Cover */}
          <div className="footer-col footer-col-social-countries">
            {/* Social Section */}
            <div className="footer-social-section">
              <h3 className="footer-col-title">Social</h3>
              <div className="footer-social-row">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="YouTube">
                  <svg width="30" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Countries We Cover Section */}
            <div className="footer-countries-section">
              <h3 className="footer-col-title">Countries We Cover</h3>
              <div className="footer-select-pill-container">
                <select 
                  className="footer-select-pill"
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) {
                      window.location.href = '/services';
                    }
                  }}
                  aria-label="Select target Country"
                >
                  <option value="" disabled>Select your target Country</option>
                  <option value="uk">🇬🇧 UK (United Kingdom)</option>
                  <option value="australia">🇦🇺 Australia</option>
                  <option value="canada">🇨🇦 Canada</option>
                  <option value="us">🇺🇸 US (United States)</option>
                  <option value="germany">🇩🇪 Germany</option>
                  <option value="singapore">🇸🇬 Singapore</option>
                  <option value="malta">🇲🇹 Malta</option>
                  <option value="new-zealand">🇳🇿 New Zealand</option>
                  <option value="uae">🇦🇪 UAE (United Arab Emirates)</option>
                </select>
                <div className="footer-select-chevron-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Contact Info Bar */}
        <div className="footer-contact-divider-wrap">
          <div className="footer-contact-bar">
            {/* Phone */}
            <div className="footer-contact-box">
              <div className="footer-icon-badge footer-icon-badge-outline">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="footer-contact-text">
                <a href="tel:+919999350051">+91 9999350051</a>,<br />
                <a href="tel:+447440361086">+44 7440 361086</a>
              </div>
            </div>

            {/* Email */}
            <div className="footer-contact-box">
              <div className="footer-icon-badge footer-icon-badge-filled">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="footer-contact-text">
                <a href="mailto:info@hireaxis.co">info@hireaxis.co</a>
              </div>
            </div>

            {/* Address */}
            <div className="footer-contact-box">
              <div className="footer-icon-badge footer-icon-badge-outline">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="footer-contact-text">
                XYZ
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom-copyright">
          &copy;2026 HireAxis. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

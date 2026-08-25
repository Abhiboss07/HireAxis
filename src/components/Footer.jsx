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

        {/* 4 Columns Main Grid */}
        <div className="footer-main-grid">
          {/* Column 1: About HireAxis */}
          <div className="footer-col footer-col-about">
            <h3 className="footer-col-title">About HireAxis</h3>
            <p className="footer-about-text">
              Finding the right job takes time. HireAxis helps make the process simpler with structured job application support designed to help candidates move forward in their careers.
            </p>
            <Link to="/" className="footer-logo-link">
              <img src="/images/logo_white.png" alt="HireAxis" className="footer-brand-logo" />
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
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

          {/* Column 3: Countries We Cover */}
          <div className="footer-col">
            <h3 className="footer-col-title">Countries We Cover</h3>
            <ul className="footer-country-list">
              <li><span className="country-flag">🇬🇧</span> UK</li>
              <li><span className="country-flag">🇦🇺</span> Australia</li>
              <li><span className="country-flag">🇨🇦</span> Canada</li>
              <li><span className="country-flag">🇺🇸</span> US</li>
              <li><span className="country-flag">🇩🇪</span> Germany</li>
              <li><span className="country-flag">🇸🇬</span> Singapore</li>
              <li><span className="country-flag">🇲🇹</span> Malta</li>
              <li><span className="country-flag">🇳🇿</span> New Zealand</li>
              <li><span className="country-flag">🇦🇪</span> UAE</li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="footer-col">
            <h3 className="footer-col-title">Social</h3>
            <ul className="footer-link-list">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Youtube</a></li>
            </ul>
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

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        {/* Brand & Contact */}
        <div className="footer-brand">
          <Link to="/" className="logo-link">
            <img src="/images/logo.png" alt="HireAxis" className="footer-logo-img" />
          </Link>
          <div className="footer-contact-info">
            <div className="footer-contact-item">
              <span className="footer-contact-label">Phone:</span> xyz
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-label">Email:</span> info@hireaxis.co
            </div>
            <div className="footer-contact-item" style={{ marginTop: '12px' }}>
              <span className="footer-contact-label">Address:</span> xyz
            </div>
          </div>
        </div>

        {/* Column 1 */}
        <div className="footer-column">
          <ul className="footer-links">
            <li><Link to="/services">Hiring</Link></li>
            <li><Link to="/services">Job Searching</Link></li>
            <li><Link to="/contact">Join Us</Link></li>
            <li><Link to="/about">Meet The Team</Link></li>
            <li><Link to="/#how-it-works">How It Works For Clients</Link></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="footer-column">
          <ul className="footer-links">
            <li><Link to="/services">Hiring</Link></li>
            <li><Link to="/services">Job Searching</Link></li>
            <li><Link to="/contact">Join Us</Link></li>
            <li><Link to="/about">Meet The Team</Link></li>
            <li><Link to="/#how-it-works">How It Works For Clients</Link></li>
          </ul>
        </div>

        {/* Column 3 - Socials */}
        <div className="footer-column">
          <ul className="footer-social-links">
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          ©2026 HireAxis. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

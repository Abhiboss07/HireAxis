import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 12);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  const handleHowItWorksClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('how-it-works');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo-link">
          <img 
            src="/images/logo_white.webp" 
            alt="HireAxis" 
            className="header-logo-img"
            fetchPriority="high"
            decoding="async"
            width="160"
            height="38"
          />
        </Link>

        <nav>
          <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <li className="nav-item">
              <Link 
                to="/#how-it-works" 
                onClick={handleHowItWorksClick}
              >
                How It Works
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/services" 
                className={location.pathname === '/services' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/pricing" 
                className={location.pathname === '/pricing' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/faq" 
                className={location.pathname === '/faq' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={location.pathname === '/about' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/contact" 
                className={location.pathname === '/contact' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/contact" className="nav-cta-btn">
            Start My Applications &rarr;
          </Link>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}

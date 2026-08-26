import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const flags = [
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "United States", flag: "🇺🇸" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "Singapore", flag: "🇸🇬" },
    { name: "UAE", flag: "🇦🇪" },
    { name: "Malta", flag: "🇲🇹" }
  ];

  return (
    <div className="about-page section-wrapper">
      <div className="container">
        {/* Pill */}
        <div className="pill-container">
          <span className="category-pill">About</span>
        </div>

        {/* Page Title */}
        <h1 className="page-title">
          We Apply. You Interview. <span className="highlight">That's the Whole Idea.</span>
        </h1>

        {/* Why HireAxis Exists */}
        <div className="about-section">
          <h2 className="section-title">
            <span className="black-text">Why HireAxis </span>Exists
          </h2>

          <div className="about-exists-section">
            <div className="about-exists-left">
              <img 
                src="/images/about_woman_tablet.webp" 
                alt="HireAxis Dedicated Application Team" 
                className="about-exists-img"
                loading="lazy"
                decoding="async"
                width="480"
                height="320"
              />
            </div>
            <div className="about-exists-right">
              <p className="about-exists-text">
                A serious job search is a part-time job: 10 to 15 hours a week of searching, filtering, and form-filling. The people best placed to get hired (working professionals, students in their final stretch, newcomers settling into a country) are exactly the people who don't have those hours. HireAxis was built to close that gap: a dedicated team that runs the application workload with the consistency it demands, while candidates spend their limited time on the part that actually needs them: interviews.
              </p>
            </div>
          </div>
        </div>

        {/* What We Believe */}
        <div className="about-section">
          <h2 className="section-title">
            <span className="black-text">What We </span>Believe
          </h2>

          <div className="about-beliefs-grid">
            <div className="belief-item">
              <div className="belief-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className="belief-text">
                <h3 className="belief-title">Consistency beats intensity.</h3>
                <p className="belief-desc">Fifty applications spread over five weeks outperforms fifty desperate weekend. We're built for cadence.</p>
              </div>
            </div>

            <div className="belief-item">
              <div className="belief-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <div className="belief-text">
                <h3 className="belief-title">Transparency is the product</h3>
                <p className="belief-desc">Every application we submit is visible in your tracker. If see it, we didn't do it.</p>
              </div>
            </div>

            <div className="belief-item">
              <div className="belief-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              <div className="belief-text">
                <h3 className="belief-title">Quality applications, honestly counted</h3>
                <p className="belief-desc">One tailored application to a matched role is ten blind blasts. We count what we submit, and we only submit what fits.</p>
              </div>
            </div>

            <div className="belief-item">
              <div className="belief-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="belief-text">
                <h3 className="belief-title">No false promises</h3>
                <p className="belief-desc">We don't guarantee jobs, arrange visas, or claim insider access to employers. Anyone who does is selling you a story.</p>
              </div>
            </div>
          </div>
        </div>

        {/* What HireAxis Is and Isn't */}
        <div className="about-section">
          <h2 className="section-title">
            <span className="black-text">What HireAxis Is </span>and Isn't
          </h2>

          <table className="about-table">
            <thead>
              <tr>
                <th>HireAxis IS</th>
                <th>HireAxis IS NOT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A job application service for candidates with valid work rights</td>
                <td>A recruitment agency paid by employers</td>
              </tr>
              <tr>
                <td>Human-reviewed, tracked, weekly application support</td>
                <td>A visa, sponsorship, or migration consultancy</td>
              </tr>
              <tr>
                <td>A flat-rate, published-price service</td>
                <td>A "guaranteed job" scheme</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Where We Operate */}
        <div className="about-operate-section">
          <h2 className="section-title">
            <span className="black-text">Where We </span>Operate
          </h2>
          <p className="about-operate-subtitle">
            HireAxis supports candidates in the United Kingdom, United States, Canada, Australia, Zealand, Germany, Singapore, the UAE, and Malta.
          </p>

          <div className="about-flags-row">
            {flags.map((item, idx) => (
              <div key={idx} className="about-flag-circle" title={item.name}>
                <span>{item.flag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner with Dual Buttons */}
        <div className="bottom-cta-banner">
          <img 
            src="/images/bottom_cta_banner.webp" 
            alt="Autopilot Search Banner" 
            className="bottom-cta-bg-img"
            loading="lazy"
            decoding="async"
            width="1200"
            height="180"
          />
          <div className="bottom-cta-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0D5C4F',
                fontSize: '22px'
              }}>
                🎓
              </div>
              <h2 className="bottom-cta-text">Put Your Search on Autopilot</h2>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/#how-it-works" className="btn btn-lime">
                See How It Works &rarr;
              </Link>
              <Link to="/pricing" className="btn btn-outline-white">
                View Pricing &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

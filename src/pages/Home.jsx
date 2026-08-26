import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from '../components/Accordion';

export default function Home() {
  const homeFaqItems = [
    {
      question: "Can someone really apply to jobs for me?",
      answer: "Yes. A job application service like HireAxis legally applies to roles on your behalf using your resume and profile, with your consent. You remain the candidate; we handle the search, tailoring, and submission workload, while you attend the interviews."
    },
    {
      question: "Is it worth paying someone to apply for jobs?",
      answer: "If you're applying to fewer than 10 roles a week, the maths usually favours help. Landing interviews is a volume and consistency game: HireAxis submits 50 to 200 tailored applications per package, which is difficult to sustain alongside a job, studies, or a move abroad."
    },
    {
      question: "Do you guarantee a job?",
      answer: "No, and you should be wary of any service that does. We guarantee consistent, human reviewed, fully tracked applications. Interview and hiring decisions always rest with employers."
    }
  ];

  const countries = [
    { name: "United Kingdom", img: "/images/country_uk.webp", flag: "🇬🇧" },
    { name: "United States", img: "/images/country_usa.webp", flag: "🇺🇸" },
    { name: "Canada", img: "/images/country_canada.webp", flag: "🇨🇦" },
    { name: "New Zealand", img: "/images/country_new_zealand.webp", flag: "🇳🇿" },
    { name: "Germany", img: "/images/country_germany.webp", flag: "🇩🇪" },
    { name: "Singapore", img: "/images/country_singapore.webp", flag: "🇸🇬" },
    { name: "UAE", img: "/images/country_uae.webp", flag: "🇦🇪" },
    { name: "Malta", img: "/images/country_malta.webp", flag: "🇲🇹" }
  ];

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="home-hero-left">
            <h1 className="home-hero-title">
              The Job Application Service That Applies on Your Behalf
            </h1>
            <p className="home-hero-desc">
              You bring valid work rights and a career goal. HireAxis handles the tailoring, and applying, submitting human-reviewed applications for you every week across 9 countries, and flagging you the moment an interview comes in.
            </p>
            <div className="home-hero-buttons">
              <Link to="/contact" className="btn btn-dark">
                Start My Applications &rarr;
              </Link>
              <Link to="/pricing" className="btn btn-outline-dark">
                See Pricing
              </Link>
            </div>
          </div>
          <div className="home-hero-right">
            <img 
              src="/images/hero_laptop_succulent.webp" 
              alt="HireAxis Job Application Tracker Dashboard" 
              className="hero-laptop-img"
              fetchPriority="high"
              decoding="async"
              width="540"
              height="340"
            />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="container">
          <div className="home-stats-bar">
            <div className="stat-item">
              <div className="stat-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">128,540+</span>
                <span className="stat-label">Applications Submitted</span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">16,320+</span>
                <span className="stat-label">Interviews Delivered</span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">100%</span>
                <span className="stat-label">Human-Reviewed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Green Quote Banner */}
      <section className="container home-quote-section">
        <div className="quote-banner-container">
          <img 
            src="/images/home_quote_banner.webp" 
            alt="HireAxis Dedicated Application Support Banner" 
            className="quote-banner-img" 
            loading="lazy"
            decoding="async"
            width="1200"
            height="220"
          />
          <div className="quote-banner-text-overlay">
            HireAxis is a job application service that searches, tailors, and submits job applications behalf of candidates who already hold valid work rights in their target country. It is not a recruitment agency, visa consultancy, or sponsorship provider; it is dedicated application support for people who are qualified to work but don't have 15 hours a week to spend on job boards.
          </div>
        </div>
      </section>

      {/* 3. How Our Job Application Service Works */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How Our Job Application Service Works</h2>
          
          <div className="steps-flow-container">
            {/* Step 1 */}
            <div className="step-card">
              <div className="step-icon-circle">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <div className="step-connector-dots"></div>
              <h3 className="step-title">1. Tell us your target.</h3>
              <p className="step-desc">
                Share your role, industry, preferred locations, and salary range in minute onboarding call, and upload your current resume.
              </p>
            </div>

            {/* Step 2 */}
            <div className="step-card">
              <div className="step-icon-circle">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                  <line x1="7" y1="8" x2="17" y2="8"></line>
                  <line x1="7" y1="12" x2="17" y2="12"></line>
                  <line x1="7" y1="16" x2="13" y2="16"></line>
                </svg>
              </div>
              <div className="step-connector-dots"></div>
              <h3 className="step-title">2. We optimize your profile.</h3>
              <p className="step-desc">
                Our team rewrites your resume into an ATS-ready format passes automated screening and matches what employers in your target country expect.
              </p>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <div className="step-icon-circle">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </div>
              <div className="step-connector-dots"></div>
              <h3 className="step-title">3. We apply every week.</h3>
              <p className="step-desc">
                Real people find relevant openings across job boards and career pages, tailor each submission, and apply on your behalf, consistently, every single week.
              </p>
            </div>

            {/* Step 4 */}
            <div className="step-card">
              <div className="step-icon-circle">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="step-title">4. You take the interviews.</h3>
              <p className="step-desc">
                Every application is logged in your tracker. When an responds, we flag it immediately so you can prepare and show up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Who is HireAxis For? */}
      <section className="who-is-for-section">
        <div className="container">
          <h2 className="section-title">Who is HireAxis For?</h2>
          
          <div className="who-cards-grid">
            {/* Card 1 */}
            <div className="who-card">
              <div className="who-card-img-wrap">
                <img 
                  src="/images/who_students.webp" 
                  alt="Students and Graduates" 
                  className="who-card-img" 
                  loading="lazy"
                  decoding="async"
                  width="360"
                  height="220"
                />
              </div>
              <h3 className="who-card-title">Students &amp; graduates</h3>
              <p className="who-card-desc">
                build momentum with consistent weekly applications while your studies or start your career.
              </p>
            </div>

            {/* Card 2 */}
            <div className="who-card">
              <div className="who-card-img-wrap">
                <img 
                  src="/images/who_movers.webp" 
                  alt="Newcomers and Recent Movers" 
                  className="who-card-img" 
                  loading="lazy"
                  decoding="async"
                  width="360"
                  height="220"
                />
              </div>
              <h3 className="who-card-title">Newcomers &amp; recent movers</h3>
              <p className="who-card-desc">
                settled in a new country with the right to work? We the local job market's norms for you.
              </p>
            </div>

            {/* Card 3 */}
            <div className="who-card">
              <div className="who-card-img-wrap">
                <img 
                  src="/images/who_professionals.webp" 
                  alt="Busy Professionals" 
                  className="who-card-img" 
                  loading="lazy"
                  decoding="async"
                  width="360"
                  height="220"
                />
              </div>
              <h3 className="who-card-title">Busy professionals</h3>
              <p className="who-card-desc">
                keep your current job while we quietly run your next-move search background.
              </p>
            </div>

            {/* Card 4 */}
            <div className="who-card">
              <div className="who-card-img-wrap">
                <img 
                  src="/images/who_switchers.webp" 
                  alt="Career Switchers" 
                  className="who-card-img" 
                  loading="lazy"
                  decoding="async"
                  width="360"
                  height="220"
                />
              </div>
              <h3 className="who-card-title">Career switchers</h3>
              <p className="who-card-desc">
                changing industries or roles? We help position transferable skills where they count.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. What's Included in Every Plan */}
      <section className="whats-included-section">
        <div className="container">
          <h2 className="section-title">
            What's Included <span className="black-text">in Every Plan</span>
          </h2>

          <div className="whats-included-grid">
            <div className="included-features-list">
              <div className="included-feature-card">
                <div className="feature-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                </div>
                <div className="feature-text-info">
                  <span className="feature-heading">Weekly job applications</span>
                  <span className="feature-subtext">50 to 200 tailored, human-reviewed applications per</span>
                </div>
              </div>

              <div className="included-feature-card">
                <div className="feature-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <div className="feature-text-info">
                  <span className="feature-heading">ATS resume optimization</span>
                  <span className="feature-subtext">Rewritten and formatted to pass applicant tracking systems</span>
                </div>
              </div>

              <div className="included-feature-card">
                <div className="feature-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <div className="feature-text-info">
                  <span className="feature-heading">Application tracker</span>
                  <span className="feature-subtext">A live log of everything submitted, pending, and answered</span>
                </div>
              </div>

              <div className="included-feature-card">
                <div className="feature-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
                <div className="feature-text-info">
                  <span className="feature-heading">Interview alerts</span>
                  <span className="feature-subtext">Same-day notification when an employer responds</span>
                </div>
              </div>

              <div className="included-feature-card">
                <div className="feature-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                </div>
                <div className="feature-text-info">
                  <span className="feature-heading">Market &amp; role strategy</span>
                  <span className="feature-subtext">We target the roles where your profile actually converts</span>
                </div>
              </div>
            </div>

            <div className="whats-included-right">
              <img 
                src="/images/whats_included_laptop_mug.webp" 
                alt="HireAxis Dashboard and Analytics Widget" 
                className="whats-included-img" 
                loading="lazy"
                decoding="async"
                width="500"
                height="400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Countries We Cover */}
      <section className="countries-section">
        <div className="container">
          <h2 className="section-title">
            Countries <span className="black-text">We Cover</span>
          </h2>

          <div className="countries-grid">
            {countries.map((country, index) => (
              <Link to="/contact" key={index} className="country-card">
                <div className="country-img-container">
                  <img 
                    src={country.img} 
                    alt={country.name} 
                    className="country-img" 
                    loading="lazy"
                    decoding="async"
                    width="320"
                    height="200"
                  />
                </div>
                <div className="country-bottom-bar">
                  <div className="country-flag-name">
                    <span className="country-flag-icon">{country.flag}</span>
                    <span className="country-name">{country.name}</span>
                  </div>
                  <span className="country-arrow">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why Candidates Choose HireAxis */}
      <section className="why-choose-section">
        <div className="container">
          <h2 className="section-title">
            Why Candidates Choose <span className="lime-text">HireAxis</span>
          </h2>

          <div className="why-choose-grid">
            <div className="why-choose-card">
              <div className="why-icon-wrap">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="why-card-title">Applications, not promises.</h3>
              <p className="why-card-desc">
                We guarantee consistent, quality submissions, knowing that hiring decisions always belong to employers.
              </p>
            </div>

            <div className="why-choose-card">
              <div className="why-icon-wrap">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 className="why-card-title">Every application visible.</h3>
              <p className="why-card-desc">
                Your tracker shows exactly what was sent, where, and when. Nothing happens behind closed doors.
              </p>
            </div>

            <div className="why-choose-card">
              <div className="why-icon-wrap">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="why-card-title">Humans, not bots.</h3>
              <p className="why-card-desc">
                Automated mass-applying gets accounts flagged and applications Every HireAxis submission is reviewed by a person before it goes out.
              </p>
            </div>

            <div className="why-choose-card">
              <div className="why-icon-wrap">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                  <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor" stroke="none">$</text>
                </svg>
              </div>
              <h3 className="why-card-title">Flat, published pricing.</h3>
              <p className="why-card-desc">
                A clear per-package rate for your country. No hidden fees, no maze.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Common Questions Accordion */}
      <section className="container section-wrapper">
        <h2 className="section-title">
          Common Questions <span className="black-text">Before You Start</span>
        </h2>
        <Accordion items={homeFaqItems} defaultOpen={0} />
      </section>

      {/* 9. Bottom CTA Banner */}
      <section className="container">
        <div className="bottom-cta-banner">
          <img 
            src="/images/bottom_cta_banner.webp" 
            alt="HireAxis Ready To Apply Banner" 
            className="bottom-cta-bg-img" 
            loading="lazy"
            decoding="async"
            width="1200"
            height="180"
          />
          <div className="bottom-cta-content">
            <h2 className="bottom-cta-text">Start Your Applications This Week</h2>
            <Link to="/contact" className="btn btn-lime">
              Get Started &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

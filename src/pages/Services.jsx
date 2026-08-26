import React from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div className="services-page section-wrapper">
      <div className="container">
        {/* Pill */}
        <div className="pill-container">
          <span className="category-pill">Services</span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="page-title">
          <span className="highlight">Job Application Assistance, </span>End to End
        </h1>
        <p className="page-subtitle">
          Every HireAxis package bundles four services around one goal: getting your profile front of the right employers, every week, without you living on job boards. Here's exactly what you get, with no vague "career coaching" filler.
        </p>

        {/* 1. Weekly Job Applications */}
        <div className="services-feature-row">
          <div className="services-feature-left">
            <h2 className="services-feature-title">
              Weekly Job Applications,<br />Submitted for You
            </h2>
            <p className="services-feature-text">
              The core of the service. Our team searches job boards, company career pages, and industry sites in your target country, matches openings to the role and location you've set, tailors your application, and submits it on your behalf.
            </p>
            <ul className="services-checklist">
              <li>50 to 200 applications per package, spread consistently week by week</li>
              <li>Each application matched to your target role, seniority, and location</li>
              <li>100% human-reviewed before submission, with no bulk-blast automation</li>
              <li>Cover notes adapted to each employer where the application requires one</li>
            </ul>
          </div>
          <div className="services-feature-right">
            <img 
              src="/images/services_laptop_window.webp" 
              alt="Weekly Job Applications Workspace" 
              className="services-feature-img"
              loading="lazy"
              decoding="async"
              width="460"
              height="300"
            />
          </div>
        </div>

        {/* 2. Green Consistency Banner */}
        <div className="services-consistency-banner">
          <h3 className="services-consistency-title">
            Why weekly consistency beats bursts
          </h3>
          <p className="services-consistency-text">
            Employers post on rolling schedules, and early applicants are up to [4x] more likely to be shortlisted. A steady weekly cadence means your profile lands while roles are fresh, not in a once-a-month batch after positions have closed.
          </p>
        </div>

        {/* 3. ATS Resume Optimization */}
        <div className="services-feature-row reverse">
          <div className="services-feature-left">
            <img 
              src="/images/services_resume.webp" 
              alt="ATS Resume Optimization and Keyword Formatting" 
              className="services-feature-img"
              loading="lazy"
              decoding="async"
              width="460"
              height="300"
            />
          </div>
          <div className="services-feature-right">
            <h2 className="services-feature-title">
              ATS Resume Optimization
            </h2>
            <p className="services-feature-text">
              Over 90% of large employers screen resumes with applicant tracking systems (ATS) human sees them. We rewrite and reformat your resume so it parses cleanly, mirrors the keywords of your target role, and matches the CV conventions of your target country (a German Lebenslauf, a UK CV, and a US resume are not the same document).
            </p>
            <ul className="services-checklist">
              <li>ATS-compatible structure and formatting</li>
              <li>Keyword alignment with your target job titles</li>
              <li>Country-specific conventions (length, photo, personal details, spelling)</li>
              <li>Delivered as an editable file you keep, whatever you do next</li>
            </ul>
          </div>
        </div>

        {/* 4. Live Application Tracking */}
        <div className="services-feature-row">
          <div className="services-feature-left">
            <h2 className="services-feature-title">
              Live Application Tracking
            </h2>
            <p className="services-feature-text">
              Every submission is logged the day it goes out: employer, role, date, and current status. always know what's submitted, what's pending, and what's had a response, and you can check it any time, from any device. When an employer replies, we flag the interview to you the same day.
            </p>
          </div>
          <div className="services-feature-right">
            <img 
              src="/images/services_tablet_form.webp" 
              alt="Live Application Tracker on Tablet" 
              className="services-feature-img"
              loading="lazy"
              decoding="async"
              width="460"
              height="300"
            />
          </div>
        </div>

        {/* 5. Interview Preparation Support */}
        <div className="services-feature-row reverse">
          <div className="services-feature-left">
            <img 
              src="/images/services_interview_queue.webp" 
              alt="Interview Preparation and Candidate Support" 
              className="services-feature-img"
              loading="lazy"
              decoding="async"
              width="460"
              height="300"
            />
          </div>
          <div className="services-feature-right">
            <h2 className="services-feature-title">
              Interview Preparation Support
            </h2>
            <p className="services-feature-text">
              When responses arrive, we help you convert them: role-specific preparation notes, questions for your industry in your target country, and guidance on local interview norms, from UK competency formats to US behavioural rounds.
            </p>
          </div>
        </div>

        {/* 6. What HireAxis Doesn't Do */}
        <div className="services-what-doesnt-do">
          <h2 className="services-what-doesnt-do-title">
            What HireAxis Doesn't Do (and why that protects you)
          </h2>
          <p className="services-what-doesnt-do-text">
            We are not a recruitment agency, migration consultancy, visa service, or sponsorship provider. We don't charge employers, we don't sell your data, and we never guarantee job offers. If a service in this space promises visas or guaranteed employment, that's the sign to walk away. HireAxis does one thing: professional application support for people who already hold work rights, and does it transparently.
          </p>
        </div>

        {/* 7. Bottom CTA Card */}
        <div className="services-bottom-cta-card">
          <div className="services-cta-left">
            <h3>Ready to Hand Off the Busywork?</h3>
            <p>Choose your country and package on the pricing page, and your applications start within business days.</p>
          </div>
          <Link to="/pricing" className="btn btn-dark">
            View Pricing &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

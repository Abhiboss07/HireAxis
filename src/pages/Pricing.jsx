import React from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <div className="pricing-page section-wrapper">
      <div className="container">
        {/* Pill */}
        <div className="pill-container">
          <span className="category-pill">Pricing</span>
        </div>

        {/* Main Title & Subtitle */}
        <h1 className="page-title">
          <span className="highlight">Transparent Pricing. Published, Flat, </span>Per Package.
        </h1>
        <p className="page-subtitle">
          No "book a call to find out the price." HireAxis charges a flat package rate that only by country. Every package includes resume optimization, weekly submissions, tracking, and interview alerts — the tiers differ only in application volume.
        </p>

        {/* Package Comparison Table */}
        <h2 className="section-title">
          <span className="black-text">Choose Your </span>Package
        </h2>

        <div className="pricing-table-container">
          <table className="pricing-table">
            <thead>
              <tr>
                <th style={{ width: '22%' }}></th>
                <th style={{ width: '26%' }}>STARTER</th>
                <th style={{ width: '26%' }} className="popular">GROWTH<br /><span style={{ fontSize: '13px', fontWeight: 500 }}>(most popular)</span></th>
                <th style={{ width: '26%' }}>PRO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="row-label">Applications</td>
                <td className="cell-data">50 tailored applications</td>
                <td className="cell-data">100 tailored applications</td>
                <td className="cell-data">200 tailored applications</td>
              </tr>
              <tr>
                <td className="row-label">Best for</td>
                <td className="cell-data">Testing the market or a focused niche search</td>
                <td className="cell-data">Most active job seekers</td>
                <td className="cell-data">Career switchers &amp; competitive markets</td>
              </tr>
              <tr>
                <td className="row-label">Price</td>
                <td className="cell-data">from [$X] (varies by country)</td>
                <td className="cell-data">from [$X]</td>
                <td className="cell-data">from [$X]</td>
              </tr>
              <tr>
                <td className="row-label">Includes</td>
                <td colSpan="3" style={{ textAlign: 'center', color: 'var(--color-text-body)', fontWeight: 500 }}>
                  ATS resume optimization &middot; weekly submissions &middot; live tracker &middot; same-day interview alerts &middot; market &amp; role strategy &middot; interview prep support
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cost Section */}
        <div className="pricing-cost-section">
          <div className="pricing-cost-left">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '16px' }}>
              <span className="black-text">What Does a </span>Job Application Service Cost?
            </h2>
            <p style={{ fontSize: '15.5px', color: 'var(--color-text-body)', lineHeight: 1.65 }}>
              HireAxis packages start at [$X] for 50 applications, which works out to roughly [$X] per tailored, human-reviewed application. Pricing varies by country and is always displayed before you enroll. There are no subscriptions, no hidden fees, and no charges to employers.
            </p>
          </div>
          <div className="pricing-cost-right">
            <img 
              src="/images/pricing_job_form_laptop.png" 
              alt="Transparent Application Service Pricing" 
              className="pricing-cost-img" 
            />
          </div>
        </div>

        {/* Eligibility Section */}
        <div className="pricing-eligibility-section">
          <h2 className="pricing-eligibility-title">
            Before You Enroll &mdash; <span>Eligibility</span>
          </h2>
          <ul className="pricing-eligibility-list">
            <li>You hold <strong>valid work rights</strong> in your target country (citizenship, PR, or a work-eligible visa)</li>
            <li>You have an up-to-date resume (we'll optimize it &mdash; it just needs to be current)</li>
            <li>You're available to attend interviews when they come</li>
          </ul>
          <p className="pricing-disclaimer">
            HireAxis is not a visa, sponsorship, migration, or recruitment service, and does not guarantee outcomes.
          </p>
        </div>

        {/* Pricing Questions Answered (3 Cards) */}
        <h2 className="section-title" style={{ marginTop: '60px' }}>
          Pricing Questions, Answered
        </h2>

        <div className="pricing-faq-cards-grid">
          {/* Card 1 */}
          <div className="pricing-faq-card">
            <div className="pricing-faq-card-img-wrap">
              <img 
                src="/images/pricing_hidden_fees.png" 
                alt="No Hidden Costs Guarantee" 
                className="pricing-faq-card-img" 
              />
            </div>
            <div className="pricing-faq-card-content">
              <h3 className="pricing-faq-card-title">Are there any hidden costs?</h3>
              <p className="pricing-faq-card-text">
                No. The package price is the full price. You'll never be charged per interview, per response, or for "premium" employers.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="pricing-faq-card">
            <div className="pricing-faq-card-img-wrap">
              <img 
                src="/images/pricing_question_blocks.png" 
                alt="Hired Early Policy" 
                className="pricing-faq-card-img" 
              />
            </div>
            <div className="pricing-faq-card-content">
              <h3 className="pricing-faq-card-title">What if I get hired before my applications run out?</h3>
              <p className="pricing-faq-card-text">
                Congratulations &mdash; that's the goal. [State the client's real policy here: e.g., pause remaining applications for X months / transfer to a nominated person / partial credit. Publish a real policy &mdash; do not leave this vague.]
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="pricing-faq-card">
            <div className="pricing-faq-card-img-wrap">
              <img 
                src="/images/pricing_refund_1040.png" 
                alt="Clear Refund Policy" 
                className="pricing-faq-card-img" 
              />
            </div>
            <div className="pricing-faq-card-content">
              <h3 className="pricing-faq-card-title">Do you offer refunds?</h3>
              <p className="pricing-faq-card-text">
                [State the client's real refund policy clearly. A published, specific refund policy materially improves conversion and AI-engine trust. Do not launch without one.]
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bottom-cta-banner">
          <img 
            src="/images/bottom_cta_banner.png" 
            alt="Pick Your Country Banner" 
            className="bottom-cta-bg-img" 
          />
          <div className="bottom-cta-content">
            <h2 className="bottom-cta-text">Pick Your Country to See Exact Pricing</h2>
            <Link to="/contact" className="btn btn-lime">
              Get Started &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

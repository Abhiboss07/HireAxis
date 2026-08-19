import React from 'react';
import Accordion from '../components/Accordion';

export default function FAQ() {
  const faqList = [
    {
      question: "What is HireAxis?",
      answer: "HireAxis is a job application service: our team searches, tailors, and submits job applications on your behalf in 9 countries. You must already hold valid work rights. We handle the application workload; you attend the interviews and make the decisions."
    },
    {
      question: "Can someone apply to jobs on my behalf?",
      answer: "Yes — with your consent, a service can legally submit applications for you using your resume and details. Employers evaluate the same candidate either way: you. HireAxis simply removes the 10–15 weekly hours of searching and form-filling."
    },
    {
      question: "Is HireAxis a recruitment agency?",
      answer: "No. Recruitment agencies work for employers and are paid by them. HireAxis works only for you, the candidate, for a flat published fee. We have no employer-side incentives and never charge employers."
    },
    {
      question: "Do job application services actually work?",
      answer: "They work at what they do: sustaining application volume and consistency that individuals rarely maintain. Interviews remain a function of your qualifications and the market — which is why we publish our process and tracker instead of promising outcomes."
    }
  ];

  return (
    <div className="faq-page section-wrapper" style={{ minHeight: '60vh' }}>
      <div className="container">
        {/* Pill */}
        <div className="pill-container">
          <span className="category-pill">FAQ</span>
        </div>

        {/* Title */}
        <h1 className="page-title highlight" style={{ marginBottom: '40px' }}>
          Every Question, Answered Honestly
        </h1>

        {/* Accordion Component */}
        <Accordion items={faqList} defaultOpen={0} />
      </div>
    </div>
  );
}

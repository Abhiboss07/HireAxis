// Client-side AI query helper for HireAxis Assistant

export async function queryHireAxisAI(userMessage, messageHistory = []) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userMessage,
        history: messageHistory
      })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        text: data.text,
        cta: data.cta || null
      };
    }
  } catch (err) {
    console.warn('Backend /api/chat not reachable, using local fallback intelligence:', err);
  }

  // Client-side fallback if serverless API is not currently running (e.g., local static preview)
  const q = (userMessage || '').toLowerCase();

  if (q.includes('price') || q.includes('cost') || q.includes('package') || q.includes('tier') || q.includes('rate') || q.includes('how much')) {
    return {
      text: "HireAxis provides 3 flat-rate packages:\n• Starter: $149 (50 tailored applications)\n• Growth: $249 (100 tailored applications)\n• Pro: $429 (200 tailored applications)\n\nEvery package includes ATS resume optimization, live tracking, and interview alerts.",
      cta: { label: "View Pricing Table", to: "/pricing" }
    };
  }

  if (q.includes('visa') || q.includes('sponsor') || q.includes('work right') || q.includes('permit') || q.includes('citizenship') || q.includes('eligibility')) {
    return {
      text: "Candidates must already hold valid legal work rights in their target country. HireAxis is dedicated application support for qualified candidates; we do not provide visa sponsorship or migration consultancy.",
      cta: { label: "Check FAQs", to: "/faq" }
    };
  }

  if (q.includes('country') || q.includes('where') || q.includes('uk') || q.includes('usa') || q.includes('canada') || q.includes('germany') || q.includes('dubai') || q.includes('uae') || q.includes('singapore') || q.includes('australia') || q.includes('zealand')) {
    return {
      text: "We support job applications in 9 target countries: United Kingdom, United States, Canada, Australia, New Zealand, Germany, Singapore, UAE, and Malta.",
      cta: { label: "Our Services", to: "/services" }
    };
  }

  if (q.includes('ats') || q.includes('resume') || q.includes('cv') || q.includes('tailor') || q.includes('cover letter')) {
    return {
      text: "Every application is customized for the target role with ATS keyword optimization and verified by our human team before submission.",
      cta: { label: "Learn About Services", to: "/services" }
    };
  }

  return {
    text: "Thanks for reaching out! HireAxis manages your entire job application workload across 9 countries with tailored submissions and human review. Would you like to check our pricing or speak directly with our team?",
    cta: { label: "Start Your Application", action: "contact" }
  };
}

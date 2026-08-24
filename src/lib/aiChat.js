// Client-side AI query helper for HireAxis Assistant
// Supports direct client-side Gemini invocation via VITE_GEMINI_API_KEY / GEMINI_API_KEY,
// backend serverless /api/chat invocation, and local intelligent knowledge base.

const HIREAXIS_SYSTEM_PROMPT = `
You are the official HireAxis AI Career & Application Advisor.
HireAxis is a premium job application service that searches, tailors, and submits job applications on behalf of qualified candidates who hold valid work rights in their target country.

Core Facts & Policies:
1. What We Do:
   - Professional job search, ATS resume optimization, and weekly application submission.
   - We maintain a live application tracker with status and application proofs.
   - We send real-time alerts when employers respond with interview requests.
   - 100% human-reviewed by experienced hiring specialists.

2. What We DO NOT Do:
   - We are NOT a visa consultancy, migration agency, or sponsorship provider.
   - Candidates MUST already possess valid work rights (citizenship, PR, graduate visa, or valid work permit) in their target country.
   - We do not guarantee jobs or sell data. We guarantee consistent, high-quality, tailored application execution.

3. Countries Supported (9 Countries):
   - United Kingdom, United States, Canada, Australia, New Zealand, Germany, Singapore, United Arab Emirates (UAE), and Malta.

4. Packages & Transparent Pricing (One-Time Flat Rates):
   - Starter: 50 Tailored Applications - $149 (ideal for testing the market or niche roles).
   - Growth: 100 Tailored Applications - $249 (most active search, balanced volume & speed).
   - Pro: 200 Tailored Applications - $429 (ideal for competitive markets & career switchers).
   - All packages include: ATS resume optimization, weekly submissions, live tracking spreadsheet, and interview alerts.

5. Instructions for your responses:
   - Be helpful, professional, transparent, and concise (2-4 sentences or short bullet points).
   - Guide users to take action: mention visiting /pricing to choose a tier or /contact to start their search.
   - If asked about visas, politely clarify that candidates must have existing work authorization in their target country.
`;

function getCtaForResponse(text) {
  const lower = (text || '').toLowerCase();
  if (lower.includes('pricing') || lower.includes('$149') || lower.includes('$249') || lower.includes('$429') || lower.includes('package')) {
    return { label: "View Pricing Table", to: "/pricing" };
  }
  if (lower.includes('contact') || lower.includes('start') || lower.includes('enroll') || lower.includes('apply')) {
    return { label: "Start Application", action: "contact" };
  }
  if (lower.includes('service') || lower.includes('ats') || lower.includes('how it works')) {
    return { label: "Our Services", to: "/services" };
  }
  if (lower.includes('eligibility') || lower.includes('visa') || lower.includes('faq')) {
    return { label: "Read FAQs", to: "/faq" };
  }
  return { label: "Start Application", action: "contact" };
}

async function callDirectGemini(apiKey, userMessage, messageHistory = []) {
  const contents = [];
  for (const turn of messageHistory.slice(-6)) {
    contents.push({
      role: turn.from === 'user' ? 'user' : 'model',
      parts: [{ text: turn.text }]
    });
  }
  contents.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  const candidateModels = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-2.5-flash-lite', 'gemini-1.5-flash'];
  for (const modelName of candidateModels) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: HIREAXIS_SYSTEM_PROMPT }]
            },
            contents: contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 350
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates && data.candidates[0];
        const replyText = candidate?.content?.parts?.[0]?.text;
        if (replyText) {
          return {
            text: replyText.trim(),
            cta: getCtaForResponse(replyText)
          };
        }
      }
    } catch (err) {
      console.warn(`Direct call to ${modelName} failed:`, err);
    }
  }

  throw new Error('All Gemini model candidates failed');
}

export async function queryHireAxisAI(userMessage, messageHistory = []) {
  // 1. Check for client-side Gemini API key
  const clientGeminiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
  if (clientGeminiKey && clientGeminiKey.trim()) {
    try {
      return await callDirectGemini(clientGeminiKey.trim(), userMessage, messageHistory);
    } catch (err) {
      console.warn('Direct Gemini API call error, trying backend route:', err);
    }
  }

  // 2. Try backend serverless route /api/chat
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
        cta: data.cta || getCtaForResponse(data.text)
      };
    }
  } catch (err) {
    console.warn('Backend /api/chat not reachable, using local fallback intelligence:', err);
  }

  // 3. Client-side knowledge base fallback
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

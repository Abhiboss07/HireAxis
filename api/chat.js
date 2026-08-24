// POST /api/chat
//
// AI Chat endpoint for HireAxis Assistant.
// Supports Google Gemini API (GEMINI_API_KEY) and OpenAI API (OPENAI_API_KEY).
// If no API key is provided, returns an intelligent contextual response from the HireAxis knowledge base.

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

function getFallbackAnswer(userQuery) {
  const q = (userQuery || '').toLowerCase();

  if (q.includes('price') || q.includes('cost') || q.includes('package') || q.includes('tier') || q.includes('rate') || q.includes('how much')) {
    return {
      text: "HireAxis offers flat, one-time package pricing with no subscriptions:\n• Starter: $149 (50 tailored applications)\n• Growth: $249 (100 tailored applications)\n• Pro: $429 (200 tailored applications)\n\nEvery package includes full ATS resume optimization, weekly submissions, and a live tracking sheet.",
      cta: { label: "View Pricing Table", to: "/pricing" }
    };
  }

  if (q.includes('visa') || q.includes('sponsor') || q.includes('work right') || q.includes('permit') || q.includes('citizenship') || q.includes('eligibility')) {
    return {
      text: "Candidates must already hold valid legal work rights (such as citizenship, PR, a graduate visa, or work-eligible visa) in their target country. HireAxis is dedicated application support for work-authorized professionals; we do not provide visa sponsorship or immigration advice.",
      cta: { label: "Check Eligibility", to: "/faq" }
    };
  }

  if (q.includes('country') || q.includes('where') || q.includes('uk') || q.includes('usa') || q.includes('canada') || q.includes('germany') || q.includes('dubai') || q.includes('uae') || q.includes('singapore') || q.includes('australia') || q.includes('zealand')) {
    return {
      text: "We currently support job applications in 9 target countries: United Kingdom, United States, Canada, Australia, New Zealand, Germany, Singapore, UAE, and Malta.",
      cta: { label: "See How It Works", to: "/services" }
    };
  }

  if (q.includes('ats') || q.includes('resume') || q.includes('cv') || q.includes('tailor') || q.includes('cover letter')) {
    return {
      text: "Yes! Every single application is customized. We optimize your resume with exact ATS keywords and tailor each submission to match the job description, verified by our human team before sending.",
      cta: { label: "Our Services", to: "/services" }
    };
  }

  if (q.includes('how long') || q.includes('timeline') || q.includes('speed') || q.includes('cadence') || q.includes('start')) {
    return {
      text: "Once enrolled, we review your resume within 1-2 business days. Submissions begin immediately at a consistent cadence (10 to 30 tailored applications per week depending on your package).",
      cta: { label: "Get Started Today", action: "contact" }
    };
  }

  if (q.includes('refund') || q.includes('guarantee') || q.includes('offer')) {
    return {
      text: "We guarantee 100% human review, high-quality tailoring, and full transparent tracking for every application submitted. While no ethical service can guarantee an employer's hiring decision, if you get hired before your package finishes, we can pause or credit your remaining applications.",
      cta: { label: "Read Our FAQs", to: "/faq" }
    };
  }

  return {
    text: "Thanks for asking! HireAxis handles the tedious job search, tailoring, and application submissions for you across 9 countries so you can focus on interviews. We offer 3 flat-rate packages starting at $149.",
    cta: { label: "Start Application", action: "contact" }
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const { message = '', history = [] } = body;

  if (!message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const geminiApiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;

  // 1. Try Gemini API if key is present
  if (geminiApiKey) {
    try {
      const contents = [];
      
      // Add context history
      for (const turn of history.slice(-6)) {
        contents.push({
          role: turn.from === 'user' ? 'user' : 'model',
          parts: [{ text: turn.text }]
        });
      }

      // Add user current message
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: HIREAXIS_SYSTEM_PROMPT }]
          },
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates && data.candidates[0];
        const replyText = candidate?.content?.parts?.[0]?.text;
        if (replyText) {
          return res.status(200).json({
            text: replyText.trim(),
            source: 'gemini'
          });
        }
      } else {
        const errData = await response.json().catch(() => null);
        console.warn('Gemini API returned error status:', response.status, errData);
      }
    } catch (err) {
      console.error('Gemini API call failed, falling back:', err);
    }
  }

  // 2. Try OpenAI API if key is present
  if (openaiApiKey) {
    try {
      const messages = [
        { role: 'system', content: HIREAXIS_SYSTEM_PROMPT }
      ];

      for (const turn of history.slice(-6)) {
        messages.push({
          role: turn.from === 'user' ? 'user' : 'assistant',
          content: turn.text
        });
      }
      messages.push({ role: 'user', content: message });

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: messages,
          max_tokens: 300,
          temperature: 0.7
        })
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content;
        if (replyText) {
          return res.status(200).json({
            text: replyText.trim(),
            source: 'openai'
          });
        }
      }
    } catch (err) {
      console.error('OpenAI API call failed, falling back:', err);
    }
  }

  // 3. Fallback to knowledge base responder
  const fallback = getFallbackAnswer(message);
  return res.status(200).json({
    text: fallback.text,
    cta: fallback.cta,
    source: 'knowledge-base'
  });
}

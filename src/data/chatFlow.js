// ---------------------------------------------------------------------------
// Scripted content for the HireAxis assistant.
//
// Every answer here is canned - there is no model behind it - so the bot can
// never invent a price, refund term, or immigration claim. Answers are drawn
// from the copy already on the site (FAQ, Home, Pricing, Services, About) and
// prices are read from packages.js so the two can never disagree.
//
// To add a question: drop another { q, a } into the relevant topic.
// ---------------------------------------------------------------------------

import { PACKAGES, formatPrice, formatUnitPrice } from './packages';

export const CHAT_GREETING =
  "Hi! I'm the HireAxis assistant. Pick a topic and I'll answer straight away.";

const cheapest = PACKAGES.reduce((low, pkg) => (pkg.amountMinor < low.amountMinor ? pkg : low), PACKAGES[0]);

const priceLines = PACKAGES.map(
  (pkg) => `${pkg.name}: ${pkg.applications} tailored applications for ${formatPrice(pkg.amountMinor)}`
).join('\n');

export const CHAT_TOPICS = [
  {
    id: 'how-it-works',
    label: 'How it works',
    questions: [
      {
        q: 'Can someone really apply to jobs for me?',
        a: 'Yes. With your consent, HireAxis legally applies to roles on your behalf using your resume and profile. You remain the candidate; we handle the search, tailoring, and submission workload, while you attend the interviews.'
      },
      {
        q: 'What exactly do you do each week?',
        a: 'We search for roles that match your target, tailor your resume to each one for ATS compatibility, submit the application, log it in your live tracker, and alert you the same day an interview request comes in.'
      },
      {
        q: 'Is my resume reviewed by a human?',
        a: 'Yes. Every application is human-reviewed before it is submitted. We do not mass-blast a single generic resume.'
      },
      {
        q: 'How do I track what has been sent?',
        a: 'You get a live tracker listing every role applied to, the date, and its current status, so you can see exactly what your package has been spent on.',
        cta: { label: 'See what is included', to: '/services' }
      }
    ]
  },
  {
    id: 'pricing',
    label: 'Pricing & packages',
    questions: [
      {
        q: 'What do the packages cost?',
        a: `Flat, published rates that vary only by country:\n\n${priceLines}\n\nThat works out to roughly ${formatUnitPrice(cheapest)} per tailored, human-reviewed application. No subscriptions and no per-interview charges.`,
        cta: { label: 'View full pricing', to: '/pricing' }
      },
      {
        q: 'Are there hidden costs?',
        a: 'No. The package price is the full price. You are never charged per interview, per response, or for "premium" employers, and we never charge employers.'
      },
      {
        q: "What's included in every package?",
        a: 'ATS resume optimization, weekly submissions, a live tracker, same-day interview alerts, market and role strategy, and interview prep support. The tiers differ only in application volume.'
      },
      {
        q: 'How do I pay?',
        a: 'Checkout is handled securely by Razorpay - card, netbanking, UPI, and wallets. You are charged once, up front, for the package you choose.',
        cta: { label: 'Choose a package', to: '/pricing' }
      }
    ]
  },
  {
    id: 'eligibility',
    label: 'Am I eligible?',
    questions: [
      {
        q: 'What do I need to qualify?',
        a: 'Three things: valid work rights in your target country (citizenship, PR, or a work-eligible visa), an up-to-date resume, and availability to attend interviews when they come.'
      },
      {
        q: 'Do you help with visas or sponsorship?',
        a: 'No. HireAxis is not a visa, sponsorship, migration, or recruitment service. We only work with candidates who already hold valid work rights in the country they are targeting.'
      },
      {
        q: 'Are you a recruitment agency?',
        a: 'No. Recruitment agencies work for employers and are paid by them. HireAxis works only for you, the candidate, for a flat published fee. We have no employer-side incentives.'
      },
      {
        q: 'Which countries do you cover?',
        a: 'Nine: the United Kingdom, United States, Canada, New Zealand, Germany, Singapore, UAE, Malta, and Australia.'
      }
    ]
  },
  {
    id: 'results',
    label: 'Results & guarantees',
    questions: [
      {
        q: 'Do you guarantee a job?',
        a: 'No, and you should be wary of any service that does. We guarantee consistent, human-reviewed, fully tracked applications. Interview and hiring decisions always rest with employers.'
      },
      {
        q: 'Is it worth paying someone to apply for jobs?',
        a: 'If you are applying to fewer than 10 roles a week, the maths usually favours help. Landing interviews is a volume and consistency game, and sustaining 50 to 200 tailored applications alongside a job, studies, or a move abroad is difficult.'
      },
      {
        q: 'Do job application services actually work?',
        a: 'They work at what they do: sustaining application volume and consistency that individuals rarely maintain. Interviews remain a function of your qualifications and the market, which is why we publish our process and tracker instead of promising outcomes.'
      },
      {
        q: 'What if I get hired before my applications run out?',
        a: "That's the goal. Message our team and we'll confirm how your remaining applications are handled for your package.",
        cta: { label: 'Ask the team', action: 'contact' }
      }
    ]
  }
];

// Rendered as a persistent chip under the topic list.
export const CHAT_HANDOFF = {
  label: 'Talk to a human',
  message:
    "Happy to hand you over. Share your details and a real person will reply within one business day - or email info@hireaxis.co.",
  action: 'contact'
};

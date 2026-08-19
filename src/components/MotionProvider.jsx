import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// A small, dependency-free reveal system. It only animates opacity and
// transforms, leaving the resting Canva layout untouched.
export default function MotionProvider() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const revealSelector = [
      '.section-title', '.page-title', '.page-subtitle', '.home-quote-section',
      '.steps-flow-container', '.whats-included-grid', '.why-choose-grid',
      '.accordion-list', '.bottom-cta-banner', '.services-feature-row',
      '.services-consistency-banner', '.services-what-doesnt-do',
      '.services-bottom-cta-card', '.pricing-table-container',
      '.pricing-cost-section', '.pricing-eligibility-section',
      '.pricing-faq-cards-grid', '.about-exists-section', '.about-beliefs-grid',
      '.about-table', '.about-operate-section', '.contact-hero-container',
      '.contact-info-social-row'
    ].join(', ');
    const cardSelector = [
      '.who-card', '.country-card', '.why-choose-card', '.pricing-faq-card',
      '.step-card', '.belief-item'
    ].join(', ');
    const revealItems = [...document.querySelectorAll(revealSelector)];
    const cards = [...document.querySelectorAll(cardSelector)];

    revealItems.forEach((element) => element.classList.add('motion-reveal'));
    cards.forEach((element, index) => {
      element.classList.add('motion-reveal', 'motion-card');
      element.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

    [...new Set([...revealItems, ...cards])].forEach((element) => {
      // Never leave above-the-fold content hidden while the observer is being
      // scheduled; only sections below the first viewport receive a reveal.
      if (element.getBoundingClientRect().top < window.innerHeight * 1.08) {
        element.classList.add('is-visible');
      } else {
        observer.observe(element);
      }
    });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

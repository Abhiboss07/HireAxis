import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CHAT_GREETING, CHAT_HANDOFF, CHAT_TOPICS } from '../data/chatFlow';
import { useApplicationModal } from './ApplicationModal';

// A scripted FAQ assistant: topic chips -> question chips -> canned answer.
// No network calls and no model, so it is instant and can never improvise.
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: CHAT_GREETING }]);
  const [activeTopic, setActiveTopic] = useState(null);
  const navigate = useNavigate();
  const { open: openApplicationModal } = useApplicationModal();
  const threadRef = useRef(null);
  const panelRef = useRef(null);

  // Keep the newest message in view as the thread grows.
  useEffect(() => {
    const thread = threadRef.current;
    if (thread) thread.scrollTop = thread.scrollHeight;
  }, [messages, activeTopic, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const say = (entries) => setMessages((previous) => [...previous, ...entries]);

  const handleTopic = (topic) => {
    setActiveTopic(topic);
    say([
      { from: 'user', text: topic.label },
      { from: 'bot', text: `Sure - here's what people usually ask about ${topic.label.toLowerCase()}.` }
    ]);
  };

  const handleQuestion = (question) => {
    say([
      { from: 'user', text: question.q },
      { from: 'bot', text: question.a, cta: question.cta }
    ]);
  };

  const handleCta = (cta) => {
    if (cta.action === 'contact') {
      setIsOpen(false);
      openApplicationModal();
      return;
    }
    if (cta.to) {
      setIsOpen(false);
      navigate(cta.to);
    }
  };

  const handleHandoff = () => {
    say([{ from: 'user', text: CHAT_HANDOFF.label }, { from: 'bot', text: CHAT_HANDOFF.message }]);
    setActiveTopic(null);
    setTimeout(() => {
      setIsOpen(false);
      openApplicationModal();
    }, 900);
  };

  const resetToTopics = () => {
    setActiveTopic(null);
    say([{ from: 'bot', text: 'What else can I help with?' }]);
  };

  return (
    <>
      <button
        type="button"
        className={`chatbot-launcher ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-controls="hireaxis-chat-panel"
        aria-label={isOpen ? 'Close the HireAxis assistant' : 'Open the HireAxis assistant'}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="chatbot-panel" id="hireaxis-chat-panel" role="dialog" aria-label="HireAxis assistant" ref={panelRef}>
          <header className="chatbot-header">
            <div className="chatbot-avatar" aria-hidden="true">HA</div>
            <div className="chatbot-header-text">
              <span className="chatbot-header-title">HireAxis Assistant</span>
              <span className="chatbot-header-status">Answers to common questions</span>
            </div>
            <button type="button" className="chatbot-header-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </header>

          <div className="chatbot-thread" ref={threadRef} aria-live="polite">
            {messages.map((message, index) => (
              <div key={index} className={`chat-msg chat-msg-${message.from}`}>
                <div className="chat-bubble">{message.text}</div>
                {message.cta && (
                  <button type="button" className="chat-cta" onClick={() => handleCta(message.cta)}>
                    {message.cta.label} →
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="chatbot-options">
            {activeTopic ? (
              <>
                {activeTopic.questions.map((question) => (
                  <button key={question.q} type="button" className="chat-chip" onClick={() => handleQuestion(question)}>
                    {question.q}
                  </button>
                ))}
                <button type="button" className="chat-chip chat-chip-ghost" onClick={resetToTopics}>
                  ← All topics
                </button>
              </>
            ) : (
              <>
                {CHAT_TOPICS.map((topic) => (
                  <button key={topic.id} type="button" className="chat-chip" onClick={() => handleTopic(topic)}>
                    {topic.label}
                  </button>
                ))}
                <button type="button" className="chat-chip chat-chip-accent" onClick={handleHandoff}>
                  {CHAT_HANDOFF.label}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

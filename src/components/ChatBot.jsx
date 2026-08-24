import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CHAT_GREETING, CHAT_HANDOFF, CHAT_TOPICS } from '../data/chatFlow';
import { useApplicationModal } from './ApplicationModal';
import { queryHireAxisAI } from '../lib/aiChat';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: CHAT_GREETING }]);
  const [activeTopic, setActiveTopic] = useState(null);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const navigate = useNavigate();
  const { open: openApplicationModal } = useApplicationModal();
  const threadRef = useRef(null);
  const panelRef = useRef(null);
  const inputRef = useRef(null);

  // Keep the newest message in view as the thread grows.
  useEffect(() => {
    const thread = threadRef.current;
    if (thread) thread.scrollTop = thread.scrollHeight;
  }, [messages, activeTopic, isOpen, isThinking]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    if (inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const say = (entries) => setMessages((previous) => [...previous, ...entries]);

  const handleTopic = (topic) => {
    setActiveTopic(topic);
    say([
      { from: 'user', text: topic.label },
      { from: 'bot', text: `Sure! Here are the common questions about ${topic.label.toLowerCase()}:` }
    ]);
  };

  const handleQuestion = (question) => {
    say([
      { from: 'user', text: question.q },
      { from: 'bot', text: question.a, cta: question.cta }
    ]);
  };

  const handleCustomSubmit = async (e) => {
    if (e) e.preventDefault();
    const query = inputText.trim();
    if (!query || isThinking) return;

    setInputText('');
    const userTurn = { from: 'user', text: query };
    say([userTurn]);
    setIsThinking(true);

    try {
      const result = await queryHireAxisAI(query, messages);
      say([{ from: 'bot', text: result.text, cta: result.cta }]);
    } catch (err) {
      console.error('AI chat error:', err);
      say([{ from: 'bot', text: "HireAxis provides dedicated job application support across 9 countries. You can check our pricing or reach out directly to our team.", cta: { label: "View Pricing", to: "/pricing" } }]);
    } finally {
      setIsThinking(false);
    }
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
              <span className="chatbot-header-title">HireAxis AI Assistant</span>
              <span className="chatbot-header-status">Instant answers &amp; custom advice</span>
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
            {isThinking && (
              <div className="chat-msg chat-msg-bot">
                <div className="chat-bubble chat-bubble-typing">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
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

          {/* Custom AI Input */}
          <form className="chatbot-input-form" onSubmit={handleCustomSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder="Ask a question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isThinking}
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={isThinking || !inputText.trim()}
              aria-label="Send question"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

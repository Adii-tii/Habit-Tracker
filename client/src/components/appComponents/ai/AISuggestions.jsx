import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../../UserContext';
import { Trash2 } from 'lucide-react';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite:generateContent?key=' + GEMINI_API_KEY;
const CHAT_STORAGE_KEY = 'aiSuggestionsChatHistory';

const AISuggestions = ({ onAcceptSuggestion, fetchHabits }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasStartedConversation, setHasStartedConversation] = useState(false);
  const timerIntervalRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (!user) {
      localStorage.removeItem(CHAT_STORAGE_KEY);
      setMessages([]);
    }
  }, [user]);

  const handleClearSession = () => {
    setMessages([]);
    localStorage.removeItem(CHAT_STORAGE_KEY);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { label: "Fitness", prompt: "Suggest some fitness habits for beginners" },
    { label: "Learning", prompt: "Help me build better learning habits" },
    { label: "Productivity", prompt: "I need help with work productivity habits" },
    { label: "Wellness", prompt: "Suggest mindfulness and wellness habits" },
    { label: "Bo's choice", prompt: "Surprise me with some habit suggestions" }
  ];

  const SYSTEM_PROMPT =
    'You are Bo, a helpful assistant for a habit tracker app. Your job is to help users with both habits and tasks. If the user input is a greeting (like "hi", "hello", "hey"), respond with a friendly greeting and ask how you can help. For any other input, always try to suggest tasks or habits, or answer the user\'s request. When suggesting, reply with a clear, actionable suggestion in the format: "Suggested Task: [task text] (Tag: [tag], Type: [type])". If the user gives a broad goal (e.g., "I want to lose weight"), reply with a list of 2-4 specific suggestions, each on a new line, each starting with "Suggested Task: [task text] (Tag: [tag], Type: [type])". If the user asks for detailed tasks, use your knowledge base to act like a specialist in that field and curate detailed tasks or habits, providing subtasks and deadlines as appropriate. After suggesting, always ask: "Would you like more detailed tasks or deadlines for any of these?" If the user says yes or specifies a task, reply with a list of detailed subtasks, each with a suggested deadline in the format: "Subtask: ... (Deadline: ...)", and keep the conversation going naturally.';

  const sendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;
    
    const userMsg = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setHasStartedConversation(true);

    try {
      const history = messages
        .filter(m => m.role === 'user' || m.role === 'ai')
        .map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.text}`)
        .join('\n');
      const prompt = `${SYSTEM_PROMPT}\n${history}\nUser: ${messageText}`;
      const res = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: prompt }] }
          ],
        })
      });
      const data = await res.json();
      console.log('Gemini API response:', data);
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'ai', text: `Gemini API error: ${data.error.message}` }]);
      } else if (!data.candidates || data.candidates.length === 0) {
        setMessages(prev => [...prev, { role: 'ai', text: 'Gemini API returned no suggestions.' }]);
      } else {
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a suggestion.';
        const suggestionLines = aiText.split('\n').filter(line => /^Suggested (Task|Habit):/i.test(line.trim()));
        const suggestions = suggestionLines.map(line => {
          const match = line.match(/^Suggested (Task|Habit):\s*(.*?)\s*\(Tag:\s*([^,]+),\s*Type:\s*([^)]+)\)/i);
          if (match) {
            return { text: match[2].trim(), tag: match[3].trim(), type: match[4].trim() };
          } else {
            return { text: line.replace(/^Suggested (Task|Habit):/i, '').trim(), tag: 'general', type: 'checklist' };
          }
        });
        
        if (suggestions.length > 0) {
          setMessages(prev => [...prev, { role: 'ai-suggestions', suggestions }]);
        } else {
          setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Error contacting Gemini API.' }]);
    }
    setLoading(false);
  };

  const handleAccept = async (suggestion) => {
    if (onAcceptSuggestion) onAcceptSuggestion(suggestion.text);
    try {
      const userId = user?._id || user?.id;
      if (!userId) {
        setMessages(prev => [...prev, { role: 'system', text: 'Could not create task: user not found.' }]);
        return; 
      }
      // Sanitize type
      const allowedTypes = ['time', 'checklist', 'counter'];
      const safeType = allowedTypes.includes((suggestion.type || '').toLowerCase()) ? suggestion.type.toLowerCase() : 'checklist';
      const res = await fetch('http://localhost:5000/api/habits/saveHabit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: suggestion.text,
          userId,
          notes: suggestion.text,
          category: suggestion.tag || 'ai',
          priority: 'medium',
          type: safeType,
        })
      });
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'system', text: `Task created: ${suggestion.text}` }]);
        if (typeof fetchHabits === 'function') fetchHabits();
      } else {
        setMessages(prev => [...prev, { role: 'system', text: ' Failed to create task.' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'system', text: 'Error creating task.' }]);
    }
  };

  const LoadingDots = () => (
    <div className="flex justify-start mb-6">
      <div className="bg-gray-100 rounded-2xl px-6 py-4 max-w-2xl">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
          <span className="text-gray-600 text-sm">Bo is thinking...</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="fixed top-6 right-8 z-50 group">
        <button
          onClick={handleClearSession}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-100 hover:bg-yellow-200 shadow transition-colors focus:outline-none"
          aria-label="Clear chat"
        >
          <Trash2 size={25} className="text-yellow-500 group-hover:scale-110 transition-transform" />
        </button>
        <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-3 py-1 shadow pointer-events-none transition-opacity duration-200 whitespace-nowrap">
          Clear chat
        </div>
      </div>
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-6 px-6 pt-6">
        <div className="text-center">
          <h1 className="text-4xl font-normal text-gray-700 mb-2">
            Good afternoon, <span className="text-yellow-500 font-bold">{user?.name || 'there'}</span>
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {!hasStartedConversation ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
            <div className="w-full max-w-3xl">
              <div className="mb-8">
                <div className="relative bg-gray-50 border border-gray-300 rounded-2xl shadow-sm overflow-hidden">
                  <textarea
                    className="w-full px-6 py-4 bg-transparent resize-none outline-none text-gray-800 placeholder-gray-500 text-lg"
                    placeholder="How can I help you today?"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    rows="3"
                    disabled={loading}
                  />
                  <div className="flex justify-end items-center px-4 py-3 border-t border-gray-200">
                    <button
                      onClick={() => sendMessage()}
                      disabled={loading || !input.trim()}
                      className="p-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-black rounded-lg transition-colors flex items-center gap-2"
                    >Send
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(0deg)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l18-6-6 18-2-7-7-2z" />
                        </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-row flex-wrap gap-3 mb-6 justify-start items-center">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(action.prompt)}
                    className="relative px-5 py-2 bg-white text-black rounded-full border border-yellow-500 shadow transition-all duration-200 focus:outline-none text-base overflow-hidden group"
                    style={{ minWidth: 'unset' }}
                  >
                    <span className="relative z-10">{action.label}</span>
                    <span className="absolute left-0 top-0 h-full w-0 group-hover:w-full transition-all duration-300 bg-yellow-300 opacity-40 z-0" style={{ borderRadius: '9999px' }}></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6">
            <div className="max-w-4xl mx-auto py-6">
              {messages.map((msg, idx) => (
                msg.role === 'ai-suggestions' ? (
                  <div key={idx} className="mb-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Suggested Tasks</h3>
                      <div className="space-y-4">
                        {msg.suggestions.map((s, i) => (
                          <div
                            key={i}
                            className="mb-0 flex flex-col bg-white rounded-2xl shadow-sm relative hover:shadow-md transition-all border border-gray-100 px-0 pt-0 pb-2"
                          >
                            <div className="flex-1 flex flex-col justify-center px-6 py-4">
                              <div className="font-semibold text-lg text-black mb-2">{s.text}</div>
                              <div className="flex gap-2 mb-3">
                                {s.tag && (
                                  <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">{s.tag}</span>
                                )}
                                {s.type && (
                                  <span className="inline-block bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">{s.type}</span>
                                )}
                              </div>
                              <div className="flex gap-2 justify-end items-center mt-2">
                                <button
                                  className="px-3 py-1 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 font-semibold text-xs transition-all"
                                  onClick={() => handleAccept(s)}
                                >Accept</button>
                                <button
                                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-semibold text-xs transition-all"
                                  onClick={() => setMessages(prev => [...prev, { role: 'system', text: `Rejected: ${s.text}` }])}
                                >Reject</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={idx} className={`flex mb-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-6 py-4 rounded-2xl max-w-2xl ${
                      msg.role === 'user' 
                        ? 'bg-yellow-500 text-black' 
                        : msg.role === 'ai' 
                          ? 'bg-gray-100 text-black' 
                          : 'bg-gray-200 text-gray-700'
                    }`}>
                      <span className="whitespace-pre-wrap">{msg.text}</span>
                    </div>
                  </div>
                )
              ))}
              {loading && <LoadingDots />}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {hasStartedConversation && (
          <div className="border-t border-gray-200 px-6 py-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gray-50 border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <textarea
                  className="w-full px-6 py-4 bg-transparent resize-none outline-none text-gray-800 placeholder-gray-500"
                  placeholder="Ask for more habits or task suggestions..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  rows="2"
                  disabled={loading}
                />
                <div className="flex justify-between items-center px-4 py-3 border-t border-gray-200">
                  <div className="flex space-x-2">
                    
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">Bo Assistant</span>
                    <button
                      onClick={() => sendMessage()}
                      disabled={loading || !input.trim()}
                      className="p-2 px-4 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-black rounded-lg transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestions;

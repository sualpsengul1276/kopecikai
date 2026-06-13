import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store';
import { palette } from '../theme';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AskAIScreen() {
  const { theme, dogName, dogBreed, dogGender } = useStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const systemPrompt = `You are Pawgress AI, a friendly and expert dog training assistant. 
The user's dog profile: Name: ${dogName || 'unknown'}, Breed: ${dogBreed || 'unknown'}, Gender: ${dogGender}.
Give concise, practical, encouraging advice tailored to this specific dog. Keep replies to 2-4 sentences unless a detailed answer is truly needed.`;

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || import.meta.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey || '',
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-calls': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 512,
          system: systemPrompt,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Sorry, I could not get a response.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  const SUGGESTIONS = [
    `How do I teach ${dogName || 'my dog'} to sit?`,
    'What treats work best for training?',
    'How long should each session be?',
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', background:palette.offWhite }}>
      {/* Header */}
      <div style={{ background:'#fff', padding:'52px 24px 16px', borderBottom:`1px solid ${palette.gray100}` }}>
        <h1 style={{ fontWeight:900, fontSize:24, color:palette.gray900, margin:0 }}>Ask AI 🤖</h1>
        <p style={{ color:palette.gray400, fontWeight:600, fontSize:14, margin:'4px 0 0' }}>
          Powered by Claude · knows {dogName || 'your dog'}
        </p>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'16px 20px', display:'flex', flexDirection:'column', gap:12 }}>
        {messages.length === 0 && (
          <div style={{ textAlign:'center', paddingTop:32 }}>
            <span style={{ fontSize:48 }}>🐾</span>
            <p style={{ fontWeight:800, fontSize:18, color:palette.gray900, margin:'12px 0 6px' }}>Hi! I'm your dog trainer AI</p>
            <p style={{ color:palette.gray400, fontSize:14, fontWeight:600, margin:'0 0 28px' }}>Ask me anything about {dogName || 'your dog'}'s training</p>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => setInput(s)} style={{
                  background:'#fff', border:`2px solid ${theme.primaryLight}`,
                  borderRadius:14, padding:'12px 16px', textAlign:'left',
                  color:theme.primary, fontWeight:700, fontSize:13, fontFamily:'Nunito', cursor:'pointer',
                }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{ display:'flex', flexDirection:'column', alignItems: m.role==='user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth:'82%',
              background: m.role === 'user' ? theme.primary : '#fff',
              color: m.role === 'user' ? '#fff' : palette.gray900,
              borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              padding:'12px 16px',
              boxShadow: m.role === 'assistant' ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
              fontWeight:600, fontSize:15, lineHeight:1.5,
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 0' }}>
            <div style={{ width:8, height:8, borderRadius:4, background:theme.primary, animation:'pulse 1s infinite' }} />
            <div style={{ width:8, height:8, borderRadius:4, background:theme.primaryLight, animation:'pulse 1s infinite 0.2s' }} />
            <div style={{ width:8, height:8, borderRadius:4, background:theme.primaryLight, animation:'pulse 1s infinite 0.4s' }} />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{ background:'#fff', borderTop:`1px solid ${palette.gray100}`, padding:'12px 16px 28px', display:'flex', gap:10 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask anything about your dog..."
          style={{
            flex:1, border:`2px solid ${input ? theme.primary : palette.gray100}`,
            borderRadius:14, padding:'12px 16px',
            fontSize:15, fontFamily:'Nunito', fontWeight:600,
            outline:'none', color:palette.gray900, transition:'border-color 0.2s',
          }}
        />
        <button
          onClick={send}
          disabled={!input.trim() || loading}
          style={{
            background: input.trim() && !loading ? theme.primary : palette.gray100,
            border:'none', borderRadius:14, padding:'12px 16px',
            cursor: input.trim() && !loading ? 'pointer' : 'default',
            fontSize:20, transition:'all 0.2s',
          }}
        >
          {loading ? '⏳' : '↑'}
        </button>
      </div>
    </div>
  );
}

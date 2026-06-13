import { useState } from 'react';
import { useStore } from '../store';
import { palette } from '../theme';

const AGES = ['< 1 year', '1–2 years', '3–5 years', '6–9 years', '10+ years'];
const SIZES = [
  { label:'Small', sub:'< 10 kg', emoji:'🐩' },
  { label:'Medium', sub:'10–25 kg', emoji:'🐕' },
  { label:'Large', sub:'25–45 kg', emoji:'🦮' },
];

export default function OnboardingDetails() {
  const { goto, setDogGender, theme } = useStore();
  const [gender, setGender] = useState<'male'|'female'>('male');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');

  const handleGender = (g: 'male'|'female') => { setGender(g); setDogGender(g); };

  return (
    <div style={{ minHeight:'100vh', background:'#fff', padding:'56px 24px 32px', display:'flex', flexDirection:'column' }}>
      <div style={{ marginBottom:28 }}>
        <div style={{ display:'flex', gap:6, marginBottom:24 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ flex:1, height:4, borderRadius:2, background: i<=2 ? theme.primary : palette.gray100 }} />
          ))}
        </div>
        <p style={{ color:palette.gray400, fontWeight:700, fontSize:14 }}>Step 2 of 3</p>
        <h2 style={{ fontWeight:900, fontSize:28, color:palette.gray900, marginTop:4 }}>Tell us about them</h2>
      </div>

      <p style={{ fontWeight:800, fontSize:16, marginBottom:10 }}>Gender</p>
      <div style={{ display:'flex', gap:10, marginBottom:24 }}>
        {(['male','female'] as const).map(g => (
          <button key={g} onClick={() => handleGender(g)} style={{
            flex:1, padding:'14px', borderRadius:14,
            border: `2px solid ${gender===g ? theme.primary : palette.gray100}`,
            background: gender===g ? theme.primarySurface : '#fff',
            fontWeight:800, fontSize:15, fontFamily:'Nunito, sans-serif',
            color: gender===g ? theme.primary : palette.gray600, cursor:'pointer',
          }}>
            {g==='male' ? '♂ Boy' : '♀ Girl'}
          </button>
        ))}
      </div>

      <p style={{ fontWeight:800, fontSize:16, marginBottom:10 }}>Age</p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:24 }}>
        {AGES.map(a => (
          <button key={a} onClick={() => setAge(a)} style={{
            padding:'9px 16px', borderRadius:20,
            border: `2px solid ${age===a ? theme.primary : palette.gray100}`,
            background: age===a ? theme.primarySurface : '#fff',
            color: age===a ? theme.primary : palette.gray600,
            fontWeight:700, fontSize:13, fontFamily:'Nunito, sans-serif', cursor:'pointer',
          }}>{a}</button>
        ))}
      </div>

      <p style={{ fontWeight:800, fontSize:16, marginBottom:10 }}>Size</p>
      <div style={{ display:'flex', gap:10, marginBottom:'auto' }}>
        {SIZES.map(s => (
          <button key={s.label} onClick={() => setSize(s.label)} style={{
            flex:1, padding:'16px 8px', borderRadius:14,
            border: `2px solid ${size===s.label ? theme.primary : palette.gray100}`,
            background: size===s.label ? theme.primarySurface : '#fff',
            display:'flex', flexDirection:'column', alignItems:'center', gap:6,
            cursor:'pointer',
          }}>
            <span style={{ fontSize:28 }}>{s.emoji}</span>
            <span style={{ fontWeight:800, fontSize:14, color: size===s.label ? theme.primary : palette.gray900, fontFamily:'Nunito' }}>{s.label}</span>
            <span style={{ fontSize:11, color:palette.gray400, fontFamily:'Nunito', fontWeight:600 }}>{s.sub}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => goto('onboarding-complete')}
        style={{
          marginTop:32, background:theme.primary, color:'#fff',
          border:'none', borderRadius:16, padding:'18px',
          fontSize:17, fontWeight:900, fontFamily:'Nunito, sans-serif', cursor:'pointer',
        }}
      >
        Continue →
      </button>
    </div>
  );
}

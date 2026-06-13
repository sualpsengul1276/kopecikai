import { useState } from 'react';
import { useStore } from '../store';
import { palette } from '../theme';
import Btn from '../components/Btn';

const AGES = [{ label:'0–6 ay', v:3 },{ label:'6–12 ay', v:9 },{ label:'1–2 yaş', v:18 },{ label:'2–5 yaş', v:36 },{ label:'5+ yaş', v:72 }];
const GENDERS = [{ label:'Erkek', emoji:'♂️', v:'male' as const, color:'#2F6FD0' },{ label:'Dişi', emoji:'♀️', v:'female' as const, color:'#B5417A' }];
const SIZES = [{ label:'Küçük', emoji:'🐩', v:'small' },{ label:'Orta', emoji:'🐕', v:'medium' },{ label:'Büyük', emoji:'🦮', v:'large' }];

export default function OnboardingDetails() {
  const { goto, setDogGender, theme, dogName } = useStore();
  const [age, setAge] = useState<number|null>(null);
  const [gender, setGender] = useState<'male'|'female'|null>(null);
  const [size, setSize] = useState<string|null>(null);

  const handleGender = (g: 'male'|'female') => { setGender(g); setDogGender(g); };

  return (
    <div style={{ minHeight:'100vh', background:palette.offWhite, padding:'24px 24px 40px' }}>
      <div style={{ height:6, background:palette.gray100, borderRadius:3, overflow:'hidden', marginBottom:16 }}>
        <div style={{ width:'40%', height:'100%', background:theme.primary, borderRadius:3 }} />
      </div>
      <p style={{ color:palette.gray400, fontSize:13, fontWeight:600, marginBottom:8 }}>2 / 4</p>
      <h2 style={{ fontWeight:900, fontSize:26, marginBottom:24 }}>{dogName || 'Köpeğin'} hakkında</h2>

      {/* Gender */}
      <p style={{ fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:0.5, color:palette.gray600, marginBottom:10 }}>Cinsiyet</p>
      <div style={{ display:'flex', gap:12, marginBottom:24 }}>
        {GENDERS.map(g => (
          <button key={g.v} onClick={() => handleGender(g.v)} style={{
            flex:1, padding:'18px 0', borderRadius:16, border:`2px solid ${gender===g.v ? g.color : palette.gray100}`,
            background: gender===g.v ? (g.v==='female' ? '#FDF0F7' : '#F0F5FF') : '#fff',
            display:'flex', flexDirection:'column', alignItems:'center', gap:8, cursor:'pointer',
          }}>
            <span style={{ fontSize:28 }}>{g.emoji}</span>
            <span style={{ fontWeight: gender===g.v ? 800 : 600, color: gender===g.v ? g.color : palette.gray600, fontSize:15 }}>{g.label}</span>
          </button>
        ))}
      </div>

      {/* Age */}
      <p style={{ fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:0.5, color:palette.gray600, marginBottom:10 }}>Yaş</p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:24 }}>
        {AGES.map(a => (
          <button key={a.v} onClick={() => setAge(a.v)} style={{
            padding:'10px 18px', borderRadius:12, border:`2px solid ${age===a.v ? theme.primary : palette.gray200}`,
            background: age===a.v ? theme.primary : '#fff',
            color: age===a.v ? '#fff' : palette.gray600, fontWeight:700, fontSize:14,
          }}>{a.label}</button>
        ))}
      </div>

      {/* Size */}
      <p style={{ fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:0.5, color:palette.gray600, marginBottom:10 }}>Boy</p>
      <div style={{ display:'flex', gap:10, marginBottom:36 }}>
        {SIZES.map(s => (
          <button key={s.v} onClick={() => setSize(s.v)} style={{
            flex:1, padding:'16px 0', borderRadius:16, border:`2px solid ${size===s.v ? theme.primary : palette.gray100}`,
            background: size===s.v ? theme.primarySurface : '#fff',
            display:'flex', flexDirection:'column', alignItems:'center', gap:6, cursor:'pointer',
          }}>
            <span style={{ fontSize:26 }}>{s.emoji}</span>
            <span style={{ fontWeight: size===s.v ? 800 : 600, color: size===s.v ? theme.primary : palette.gray600, fontSize:13 }}>{s.label}</span>
          </button>
        ))}
      </div>

      <Btn label="Devam Et →" onClick={() => goto('onboarding-complete')} disabled={!age || !gender || !size} />
      <button onClick={() => goto('onboarding-name')} style={{ background:'none', border:'none', color:palette.gray400, fontWeight:600, fontSize:14, marginTop:14, width:'100%' }}>← Geri</button>
    </div>
  );
}

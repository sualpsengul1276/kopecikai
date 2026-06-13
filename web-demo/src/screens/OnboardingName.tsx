import { useState } from 'react';
import { useStore } from '../store';
import { palette } from '../theme';

const BREEDS = ["Labrador", "Golden Retriever", "German Shepherd", "French Bulldog", "Beagle", "Poodle", "Husky", "Border Collie", "Chihuahua", "Other"];

export default function OnboardingName() {
  const { goto, setDogName, setDogBreed, theme } = useStore();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');

  return (
    <div style={{ minHeight:'100vh', background:'#fff', padding:'56px 24px 32px', display:'flex', flexDirection:'column' }}>
      <div style={{ marginBottom:32 }}>
        <div style={{ display:'flex', gap:6, marginBottom:24 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ flex:1, height:4, borderRadius:2, background: i===1 ? theme.primary : palette.gray100 }} />
          ))}
        </div>
        <p style={{ color:palette.gray400, fontWeight:700, fontSize:14 }}>Step 1 of 3</p>
        <h2 style={{ fontWeight:900, fontSize:28, color:palette.gray900, marginTop:4 }}>What's your dog's name?</h2>
      </div>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="e.g. Buddy"
        style={{
          border: `2px solid ${name ? theme.primary : palette.gray100}`,
          borderRadius:14, padding:'16px 18px',
          fontSize:18, fontWeight:700, fontFamily:'Nunito, sans-serif',
          outline:'none', color:palette.gray900,
          marginBottom:28, transition:'border-color 0.2s',
        }}
      />

      <p style={{ fontWeight:800, fontSize:16, color:palette.gray900, marginBottom:12 }}>Breed</p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:'auto' }}>
        {BREEDS.map(b => (
          <button key={b} onClick={() => setBreed(b)} style={{
            padding:'9px 16px', borderRadius:20,
            border: `2px solid ${breed===b ? theme.primary : palette.gray100}`,
            background: breed===b ? theme.primarySurface : '#fff',
            color: breed===b ? theme.primary : palette.gray600,
            fontWeight:700, fontSize:13, fontFamily:'Nunito, sans-serif', cursor:'pointer',
          }}>{b}</button>
        ))}
      </div>

      <button
        onClick={() => { setDogName(name); setDogBreed(breed); goto('onboarding-details'); }}
        disabled={!name}
        style={{
          marginTop:32, background: name ? theme.primary : palette.gray100,
          color: name ? '#fff' : palette.gray400,
          border:'none', borderRadius:16, padding:'18px',
          fontSize:17, fontWeight:900, fontFamily:'Nunito, sans-serif',
          cursor: name ? 'pointer' : 'default', transition:'all 0.2s',
        }}
      >
        Continue →
      </button>
    </div>
  );
}

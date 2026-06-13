import { useState } from 'react';
import { useStore } from '../store';
import { palette } from '../theme';
import Btn from '../components/Btn';

const BREEDS = ['Golden Retriever','Labrador','Alman Çoban','Fransız Bulldog','Beagle','Poodle','Husky','Diğer'];

export default function OnboardingName() {
  const { goto, setDogName, setDogBreed, theme } = useStore();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');

  return (
    <div style={{ minHeight:'100vh', background:palette.offWhite, padding:'24px 24px 40px' }}>
      {/* Progress */}
      <div style={{ height:6, background:palette.gray100, borderRadius:3, overflow:'hidden', marginBottom:16 }}>
        <div style={{ width:'20%', height:'100%', background:theme.primary, borderRadius:3, transition:'width 0.4s' }} />
      </div>
      <p style={{ color:palette.gray400, fontSize:13, fontWeight:600, marginBottom:8 }}>1 / 4</p>
      <h2 style={{ fontWeight:900, fontSize:26, marginBottom:6 }}>Köpeğin adı ne? 🐶</h2>
      <p style={{ color:palette.gray600, fontSize:15, marginBottom:32 }}>Ona özel bir program hazırlayacağız.</p>

      <label style={{ display:'block', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:0.5, color:palette.gray600, marginBottom:8 }}>İsim</label>
      <input
        autoFocus
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="örn. Karamel"
        style={{
          width:'100%', height:52, borderRadius:14, border:`2px solid ${name ? theme.primary : palette.gray200}`,
          padding:'0 16px', fontSize:16, fontWeight:600, color:palette.gray900,
          background:'#fff', outline:'none', marginBottom:20,
        }}
      />

      <label style={{ display:'block', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:0.5, color:palette.gray600, marginBottom:8 }}>Irk</label>
      <select
        value={breed}
        onChange={e => setBreed(e.target.value)}
        style={{
          width:'100%', height:52, borderRadius:14, border:`2px solid ${breed ? theme.primary : palette.gray200}`,
          padding:'0 16px', fontSize:16, fontWeight:600, color: breed ? palette.gray900 : palette.gray400,
          background:'#fff', outline:'none', marginBottom:40, appearance:'none',
        }}
      >
        <option value="">Irk seçin</option>
        {BREEDS.map(b => <option key={b} value={b}>{b}</option>)}
      </select>

      <Btn
        label="Devam Et →"
        onClick={() => { setDogName(name); setDogBreed(breed); goto('onboarding-details'); }}
        disabled={!name.trim()}
      />
    </div>
  );
}

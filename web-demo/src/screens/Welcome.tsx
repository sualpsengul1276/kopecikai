// @ts-nocheck
import { useStore } from '../store';
import { palette } from '../theme';
import Btn from '../components/Btn';

export default function WelcomeScreen() {
  const { goto } = useStore();
  return (
    <div style={{
      minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      background:'linear-gradient(160deg, #1A3B6E 0%, #2F6FD0 55%, #5B9AE8 100%)',
      padding:'32px 28px',
    }}>
      <div style={{ textAlign:'center', flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8 }}>
        <span style={{ fontSize:64 }}>🐾</span>
        <h1 style={{ fontFamily:'Nunito', fontWeight:900, fontSize:48, color:'#fff', letterSpacing:'-1px', margin:'8px 0 0' }}>
          Köpecik
        </h1>
        <p style={{ color:'rgba(255,255,255,0.8)', fontSize:18, fontWeight:600, marginTop:6 }}>
          Köpeğini eğit, birlikte büyü
        </p>
      </div>

      <div style={{ fontSize:120, margin:'24px 0' }}>🐕</div>

      <div style={{ display:'flex', gap:12, marginBottom:32 }}>
        {['XP +50 🎉', '🔥 Streak 7'].map(b => (
          <div key={b} style={{
            background:'rgba(255,255,255,0.2)', borderRadius:20,
            padding:'8px 16px', border:'1px solid rgba(255,255,255,0.3)',
            color:'#fff', fontWeight:700, fontSize:14,
          }}>{b}</div>
        ))}
      </div>

      <div style={{ width:'100%', maxWidth:380, display:'flex', flexDirection:'column', gap:12 }}>
        <button onClick={() => goto('onboarding-name')} style={{
          height:56, borderRadius:16, background:'#fff', border:'none',
          fontFamily:'Nunito', fontWeight:800, fontSize:17, color:'#2F6FD0',
          boxShadow:'0 4px 20px rgba(0,0,0,0.18)',
        }}>Başlayalım →</button>
        <button onClick={() => goto('home')} style={{
          background:'none', border:'none', color:'rgba(255,255,255,0.75)',
          fontFamily:'Nunito', fontWeight:600, fontSize:15, padding:'8px',
        }}>Demo'yu gör (giriş yap)</button>
      </div>
    </div>
  );
}

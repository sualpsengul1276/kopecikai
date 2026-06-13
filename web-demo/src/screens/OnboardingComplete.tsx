// @ts-nocheck
import { useStore } from '../store';
import { palette } from '../theme';

export default function OnboardingComplete() {
  const { goto, theme, dogName } = useStore();
  return (
    <div style={{
      minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      background:`linear-gradient(160deg, ${theme.primaryDark}, ${theme.primary}, ${theme.primaryLight})`,
      padding:'32px 28px',
    }}>
      <span style={{ fontSize:90, marginBottom:20 }}>🎉</span>
      <h1 style={{ fontWeight:900, fontSize:38, color:'#fff', marginBottom:12 }}>Hazırsın!</h1>
      <p style={{ color:'rgba(255,255,255,0.85)', fontSize:17, fontWeight:600, textAlign:'center', marginBottom:40, lineHeight:1.5 }}>
        {dogName ? `${dogName} için` : 'Köpeğin için'} kişisel eğitim programı oluşturuldu.
      </p>

      <div style={{ display:'flex', gap:12, width:'100%', maxWidth:340, marginBottom:40 }}>
        {[['⚡️','0 XP','Puan'],['🔥','0 Gün','Seri'],['🏆','Yeni','Seviye']].map(([e,v,l]) => (
          <div key={l} style={{
            flex:1, background:'rgba(255,255,255,0.2)', borderRadius:16, padding:'16px 8px',
            border:'1px solid rgba(255,255,255,0.3)', textAlign:'center',
          }}>
            <div style={{ fontSize:24, marginBottom:6 }}>{e}</div>
            <div style={{ fontWeight:800, fontSize:16, color:'#fff' }}>{v}</div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.75)', marginTop:4 }}>{l}</div>
          </div>
        ))}
      </div>

      <button onClick={() => goto('home')} style={{
        height:56, borderRadius:16, background:'#fff', border:'none',
        fontFamily:'Nunito', fontWeight:800, fontSize:17, color:theme.primary,
        padding:'0 48px', boxShadow:'0 4px 20px rgba(0,0,0,0.18)',
      }}>{dogName || 'Köpek'}le Başla! 🐾</button>
    </div>
  );
}

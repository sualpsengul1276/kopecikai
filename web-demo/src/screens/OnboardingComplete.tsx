import { useStore } from '../store';

export default function OnboardingComplete() {
  const { goto, theme, dogName } = useStore();
  return (
    <div style={{
      minHeight:'100vh',
      background:`linear-gradient(160deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'48px 32px', textAlign:'center',
    }}>
      <div style={{ fontSize:80, marginBottom:16 }}>🎉</div>
      <h2 style={{ color:'#fff', fontWeight:900, fontSize:32, margin:0 }}>You're all set!</h2>
      <p style={{ color:'rgba(255,255,255,0.8)', fontSize:17, fontWeight:600, marginTop:8, marginBottom:48 }}>
        {dogName ? `${dogName}'s` : "Your dog's"} training journey starts today
      </p>

      <div style={{ display:'flex', flexDirection:'column', gap:14, width:'100%', maxWidth:320 }}>
        {[
          { emoji:'🎯', label:'Personalized training plan' },
          { emoji:'📈', label:'Track progress daily' },
          { emoji:'🏆', label:'Earn XP & real rewards' },
        ].map(item => (
          <div key={item.label} style={{ display:'flex', alignItems:'center', gap:14, background:'rgba(255,255,255,0.15)', borderRadius:14, padding:'14px 18px' }}>
            <span style={{ fontSize:24 }}>{item.emoji}</span>
            <span style={{ color:'#fff', fontWeight:700, fontSize:15 }}>{item.label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => goto('home')}
        style={{
          marginTop:48, background:'#fff', color:theme.primary,
          border:'none', borderRadius:16, padding:'18px 56px',
          fontSize:18, fontWeight:900, fontFamily:'Nunito, sans-serif',
          cursor:'pointer', width:'100%', maxWidth:320,
          boxShadow:'0 8px 32px rgba(0,0,0,0.15)',
        }}
      >
        Start Training →
      </button>
    </div>
  );
}

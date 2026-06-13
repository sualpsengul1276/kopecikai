import { useStore } from '../store';
import { palette } from '../theme';

export default function ProfileScreen() {
  const { theme, dogName, dogBreed, dogGender, xp, streak, goto } = useStore();
  return (
    <div style={{ background:palette.offWhite, minHeight:'100vh' }}>
      {/* Header */}
      <div style={{ background:`linear-gradient(160deg, ${theme.primary}, ${theme.primaryDark})`, padding:'52px 24px 32px', textAlign:'center' }}>
        <div style={{ width:80, height:80, borderRadius:40, background:'rgba(255,255,255,0.25)', margin:'0 auto 12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:40 }}>🐕</div>
        <h2 style={{ color:'#fff', fontWeight:900, fontSize:24, margin:'0 0 4px' }}>{dogName || 'My Dog'}</h2>
        <p style={{ color:'rgba(255,255,255,0.75)', fontWeight:600, fontSize:14, margin:0 }}>{dogBreed || 'Mixed breed'} · {dogGender === 'male' ? '♂ Boy' : '♀ Girl'}</p>
      </div>

      <div style={{ padding:'16px 24px 100px', display:'flex', flexDirection:'column', gap:14, marginTop:-16 }}>
        {/* Stats row */}
        <div style={{ display:'flex', gap:12 }}>
          {[
            { label:'XP', value:String(xp), emoji:'⚡️' },
            { label:'Streak', value:`${streak}d`, emoji:'🔥' },
            { label:'Sessions', value:'24', emoji:'🎯' },
          ].map(s => (
            <div key={s.label} style={{ flex:1, background:'#fff', borderRadius:16, padding:'14px 10px', textAlign:'center', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
              <span style={{ fontSize:20 }}>{s.emoji}</span>
              <p style={{ fontWeight:900, fontSize:20, color:palette.gray900, margin:'4px 0 2px' }}>{s.value}</p>
              <p style={{ color:palette.gray400, fontWeight:700, fontSize:12, margin:0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Menu items */}
        {[
          { emoji:'🎁', label:'Rewards & Coupons', sub:'Redeem your XP' },
          { emoji:'📋', label:'Training History', sub:'All past sessions' },
          { emoji:'⚙️', label:'Settings', sub:'App preferences' },
          { emoji:'🔄', label:'Edit Dog Profile', sub:'Update info', action:() => goto('onboarding-name') },
        ].map(item => (
          <button key={item.label} onClick={item.action} style={{
            background:'#fff', borderRadius:18, padding:'16px 20px',
            border:'none', textAlign:'left', cursor:'pointer',
            display:'flex', alignItems:'center', gap:14,
            boxShadow:'0 2px 12px rgba(0,0,0,0.05)',
          }}>
            <span style={{ fontSize:24 }}>{item.emoji}</span>
            <div style={{ flex:1 }}>
              <p style={{ fontWeight:800, fontSize:15, color:palette.gray900, margin:0 }}>{item.label}</p>
              <p style={{ color:palette.gray400, fontWeight:600, fontSize:13, margin:0 }}>{item.sub}</p>
            </div>
            <span style={{ color:palette.gray200, fontSize:18 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

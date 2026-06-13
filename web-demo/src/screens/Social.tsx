import { useStore } from '../store';
import { palette } from '../theme';
import Card from '../components/Card';

const FEED = [
  { id:'1', user:'Selin K.', dog:'Pamuk',   avatar:'🐩', content:'Pamuk bugün ilk kez "yere yat" komutunu öğrendi! 🎉', likes:24, comments:5, time:'2 saat önce', xp:50, badge:'🏆 Yeni Başarı' },
  { id:'2', user:'Mert A.',  dog:'Karamel', avatar:'🐕', content:'5 km sabah yürüyüşü tamamlandı! Karamel çok mutluydu ☀️', likes:41, comments:8, time:'4 saat önce', xp:30, badge:null },
  { id:'3', user:'Zeynep T.',dog:'Şeker',   avatar:'🦊', content:'21 günlük seri! Şeker artık gerçek bir atlet 🔥', likes:67, comments:12, time:'Dün', xp:100, badge:'🔥 21 Gün Serisi' },
];

export default function SocialScreen() {
  const { theme } = useStore();
  return (
    <div style={{ padding:'24px 20px 32px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <h2 style={{ fontWeight:900, fontSize:26 }}>Topluluk 🐾</h2>
        <button style={{ background:theme.primary, color:'#fff', borderRadius:12, padding:'8px 16px', fontFamily:'Nunito', fontWeight:700, fontSize:14 }}>+ Paylaş</button>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {FEED.map(p => (
          <Card key={p.id}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
              <div style={{ width:44, height:44, borderRadius:22, background:palette.gray100, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>{p.avatar}</div>
              <div style={{ flex:1 }}>
                <p style={{ fontWeight:700, fontSize:14 }}>{p.user}</p>
                <p style={{ color:palette.gray400, fontSize:12, marginTop:2 }}>{p.dog} · {p.time}</p>
              </div>
              <div style={{ background:theme.primarySurface, borderRadius:8, padding:'3px 10px' }}>
                <span style={{ color:theme.primary, fontWeight:700, fontSize:12 }}>+{p.xp} XP</span>
              </div>
            </div>
            {p.badge && <div style={{ background:'#FEF3C7', borderRadius:8, padding:'6px 10px', marginBottom:10, alignSelf:'flex-start', display:'inline-block' }}>
              <span style={{ color:'#F59E0B', fontWeight:700, fontSize:12 }}>{p.badge}</span>
            </div>}
            <p style={{ fontSize:15, lineHeight:1.5, marginBottom:14 }}>{p.content}</p>
            <div style={{ display:'flex', gap:20 }}>
              {[`❤️ ${p.likes}`,`💬 ${p.comments}`,'🔁 Paylaş'].map(a => (
                <button key={a} style={{ background:'none', border:'none', color:palette.gray600, fontWeight:600, fontSize:14, fontFamily:'Nunito' }}>{a}</button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

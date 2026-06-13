import { useStore } from '../store';
import { palette } from '../theme';
import Card from '../components/Card';

const MODULES = [
  { id:'basics', title:'Temel Komutlar', emoji:'🎯', progress:0.6, lessons:8, completed:5, xp:200, color:'#2F6FD0', locked:false },
  { id:'leash',  title:'Tasma Eğitimi',  emoji:'🦮', progress:0.2, lessons:6, completed:1, xp:150, color:'#B5417A', locked:false },
  { id:'tricks', title:'Numaralar',      emoji:'✨', progress:0,   lessons:10,completed:0, xp:300, color:'#F59E0B', locked:true  },
  { id:'social', title:'Sosyalleşme',    emoji:'🐾', progress:0,   lessons:5, completed:0, xp:100, color:'#22C55E', locked:true  },
];

export default function TrainingScreen() {
  const { theme, dogName } = useStore();
  return (
    <div style={{ padding:'24px 20px 32px' }}>
      <h2 style={{ fontWeight:900, fontSize:26 }}>Antrenman 🏋️</h2>
      <p style={{ color:palette.gray400, marginTop:4, marginBottom:20 }}>{dogName || 'Köpeğin'} için modüller</p>

      {/* Active banner */}
      <div style={{
        background:`linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
        borderRadius:20, padding:'20px', marginBottom:20, display:'flex', alignItems:'center', gap:14,
      }}>
        <span style={{ fontSize:40 }}>🎯</span>
        <div style={{ flex:1 }}>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:0.5 }}>Devam Et</p>
          <p style={{ color:'#fff', fontWeight:800, fontSize:17, margin:'2px 0' }}>Ders 6: "Yere Yat"</p>
          <p style={{ color:'rgba(255,255,255,0.75)', fontSize:13 }}>Temel Komutlar • +30 XP</p>
        </div>
        <div style={{ width:48, height:48, borderRadius:24, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>▶</div>
      </div>

      <h3 style={{ fontWeight:800, fontSize:17, marginBottom:12 }}>Tüm Modüller</h3>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {MODULES.map(m => (
          <Card key={m.id} style={{ opacity: m.locked ? 0.6 : 1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:52, height:52, borderRadius:14, background:m.color+'18', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>{m.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontWeight:700, fontSize:15 }}>{m.title}</span>
                  {m.locked && <span>🔒</span>}
                </div>
                <p style={{ color:palette.gray400, fontSize:13, margin:'3px 0 8px' }}>{m.completed}/{m.lessons} ders • {m.xp} XP</p>
                <div style={{ height:5, background:palette.gray100, borderRadius:3, overflow:'hidden' }}>
                  <div style={{ width:`${m.progress*100}%`, height:'100%', background:m.color, borderRadius:3 }} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

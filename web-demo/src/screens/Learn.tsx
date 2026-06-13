import { useStore } from '../store';
import { palette } from '../theme';

const MODULES = [
  { id:'commands',  title:'Basic Commands',  emoji:'🐾', progress:0.6, lessons:8, completed:5, xp:200, locked:false },
  { id:'leash',     title:'Leash Training',  emoji:'🦮', progress:0.2, lessons:6, completed:1, xp:150, locked:false },
  { id:'tricks',    title:'Fun Tricks',      emoji:'✨', progress:0,   lessons:10,completed:0, xp:300, locked:true  },
  { id:'social',    title:'Socialization',   emoji:'🐕', progress:0,   lessons:5, completed:0, xp:100, locked:true  },
];

export default function LearnScreen() {
  const { theme, dogName } = useStore();
  return (
    <div style={{ background:palette.offWhite, minHeight:'100vh' }}>
      <div style={{ background:'#fff', padding:'52px 24px 20px', marginBottom:16 }}>
        <h1 style={{ fontWeight:900, fontSize:26, color:palette.gray900, margin:0 }}>Learn</h1>
        <p style={{ color:palette.gray400, fontWeight:600, fontSize:15, margin:'4px 0 0' }}>
          {dogName ? `${dogName}'s` : 'Your'} curriculum
        </p>
      </div>

      {/* Active lesson banner */}
      <div style={{ margin:'0 24px 20px' }}>
        <div style={{
          background:`linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
          borderRadius:20, padding:'20px',
          display:'flex', alignItems:'center', gap:14,
          boxShadow:`0 6px 20px ${theme.primary}40`,
        }}>
          <span style={{ fontSize:36 }}>🎯</span>
          <div style={{ flex:1 }}>
            <p style={{ color:'rgba(255,255,255,0.75)', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:0.5, margin:'0 0 2px' }}>Continue</p>
            <p style={{ color:'#fff', fontWeight:800, fontSize:17, margin:'0 0 2px' }}>Lesson 6: "Down"</p>
            <p style={{ color:'rgba(255,255,255,0.7)', fontSize:13, margin:0 }}>Basic Commands · +30 XP</p>
          </div>
          <div style={{ width:44, height:44, borderRadius:22, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>▶</div>
        </div>
      </div>

      <div style={{ padding:'0 24px 100px' }}>
        <p style={{ fontWeight:800, fontSize:13, color:palette.gray400, letterSpacing:0.8, textTransform:'uppercase', margin:'0 0 14px' }}>ALL MODULES</p>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {MODULES.map(m => (
            <div key={m.id} style={{
              background:'#fff', borderRadius:18, padding:'16px',
              boxShadow:'0 2px 12px rgba(0,0,0,0.05)',
              opacity: m.locked ? 0.55 : 1,
              display:'flex', alignItems:'center', gap:14,
            }}>
              <div style={{ width:52, height:52, borderRadius:14, background:theme.primarySurface, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>{m.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <span style={{ fontWeight:800, fontSize:15, color:palette.gray900 }}>{m.title}</span>
                  {m.locked && <span style={{ fontSize:13 }}>🔒</span>}
                </div>
                <p style={{ color:palette.gray400, fontSize:13, margin:'0 0 8px', fontWeight:600 }}>{m.completed}/{m.lessons} lessons · {m.xp} XP</p>
                <div style={{ height:5, background:palette.gray100, borderRadius:3, overflow:'hidden' }}>
                  <div style={{ width:`${m.progress*100}%`, height:'100%', background:theme.primary, borderRadius:3 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

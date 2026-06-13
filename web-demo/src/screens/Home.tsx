import { useStore } from '../store';
import { palette } from '../theme';

const EXPLORE = [
  { id:'commands',  label:'Commands',  emoji:'🐾', progress:0.6 },
  { id:'nutrition', label:'Nutrition', emoji:'🥗', progress:0.3 },
  { id:'grooming',  label:'Grooming',  emoji:'✂️', progress:0.15 },
  { id:'health',    label:'Health',    emoji:'💉', progress:0.45 },
];

function hour() { return new Date().getHours(); }
function greeting() {
  const h = hour();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const { theme, dogName, xp, streak, completedTasks, completeTask } = useStore();
  const lessonDone = completedTasks.includes('lesson-1');

  return (
    <div style={{ background: palette.offWhite, minHeight:'100vh' }}>

      {/* Top header */}
      <div style={{ background:'#fff', padding:'52px 24px 20px' }}>
        <p style={{ color:palette.gray400, fontWeight:700, fontSize:14, margin:0 }}>
          {greeting()} 🌿
        </p>
        <h1 style={{ fontWeight:900, fontSize:26, color:palette.gray900, margin:'2px 0 0', lineHeight:1.2 }}>
          {dogName ? `${dogName}'s training` : "Your dog's training"}
        </h1>
      </div>

      {/* Streak card */}
      <div style={{ padding:'16px 24px 0' }}>
        <div style={{
          background:'#fff', borderRadius:20, padding:'16px 20px',
          display:'flex', alignItems:'center', gap:16,
          boxShadow:'0 2px 12px rgba(0,0,0,0.05)',
        }}>
          <span style={{ fontSize:28 }}>🔥</span>
          <div>
            <p style={{ fontWeight:900, fontSize:22, color:palette.gray900, margin:0, lineHeight:1 }}>{streak}</p>
            <p style={{ color:palette.gray400, fontWeight:700, fontSize:13, margin:'2px 0 0' }}>days streak</p>
          </div>
          <div style={{ marginLeft:'auto' }}>
            <span style={{
              background: theme.primarySurface,
              color: theme.primary,
              fontWeight:800, fontSize:14,
              padding:'6px 14px', borderRadius:12,
            }}>+50 XP</span>
          </div>
        </div>
      </div>

      {/* TODAY section */}
      <div style={{ padding:'24px 24px 0' }}>
        <p style={{ fontWeight:800, fontSize:13, color:palette.gray400, letterSpacing:0.8, textTransform:'uppercase', margin:'0 0 12px' }}>TODAY</p>

        {/* Big lesson card */}
        <button
          onClick={() => !lessonDone && completeTask('lesson-1')}
          style={{
            width:'100%', border:'none', borderRadius:22, cursor: lessonDone ? 'default' : 'pointer',
            background:`linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
            padding:'22px 22px 18px', textAlign:'left',
            boxShadow:`0 8px 24px ${theme.primary}40`,
            opacity: lessonDone ? 0.8 : 1,
          }}
        >
          <div style={{ display:'inline-block', background:'rgba(255,255,255,0.25)', borderRadius:8, padding:'4px 12px', marginBottom:12 }}>
            <span style={{ color:'#fff', fontWeight:800, fontSize:12 }}>Week 3</span>
          </div>
          <p style={{ color:'#fff', fontWeight:900, fontSize:22, margin:'0 0 6px', lineHeight:1.2 }}>
            Teaching "sit"
          </p>
          <p style={{ color:'rgba(255,255,255,0.75)', fontWeight:700, fontSize:14, margin:'0 0 18px' }}>
            3 exercises · ~5 min
          </p>
          <div style={{
            background: lessonDone ? 'rgba(255,255,255,0.3)' : '#fff',
            borderRadius:13, padding:'12px 22px', display:'inline-flex', alignItems:'center', gap:8,
          }}>
            <span style={{ color: lessonDone ? '#fff' : theme.primary, fontWeight:900, fontSize:16 }}>
              {lessonDone ? '✓ Done' : 'Start →'}
            </span>
          </div>
        </button>
      </div>

      {/* EXPLORE section */}
      <div style={{ padding:'28px 24px 100px' }}>
        <p style={{ fontWeight:800, fontSize:13, color:palette.gray400, letterSpacing:0.8, textTransform:'uppercase', margin:'0 0 14px' }}>EXPLORE</p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {EXPLORE.map(item => (
            <div key={item.id} style={{
              background:'#fff', borderRadius:18, padding:'16px',
              boxShadow:'0 2px 12px rgba(0,0,0,0.05)',
            }}>
              <span style={{ fontSize:26 }}>{item.emoji}</span>
              <p style={{ fontWeight:800, fontSize:15, color:palette.gray900, margin:'8px 0 10px' }}>{item.label}</p>
              <div style={{ height:4, background:palette.gray100, borderRadius:2, overflow:'hidden' }}>
                <div style={{ width:`${item.progress*100}%`, height:'100%', background:theme.primary, borderRadius:2 }} />
              </div>
            </div>
          ))}
        </div>

        {/* XP summary */}
        <div style={{ marginTop:20, background:'#fff', borderRadius:18, padding:'16px 20px', display:'flex', alignItems:'center', gap:12, boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize:24 }}>⚡️</span>
          <div>
            <p style={{ fontWeight:900, fontSize:20, color:palette.gray900, margin:0 }}>{xp} XP</p>
            <p style={{ color:palette.gray400, fontWeight:600, fontSize:13, margin:0 }}>Total earned</p>
          </div>
          <button onClick={() => {}} style={{ marginLeft:'auto', background:theme.primarySurface, color:theme.primary, border:'none', borderRadius:12, padding:'8px 16px', fontWeight:800, fontSize:13, fontFamily:'Nunito', cursor:'pointer' }}>
            Rewards →
          </button>
        </div>
      </div>
    </div>
  );
}

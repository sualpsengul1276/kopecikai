import { useStore } from '../store';
import { palette } from '../theme';
import Card from '../components/Card';

const TASKS = [
  { id:'t1', emoji:'🌅', title:'Sabah yürüyüşü', dur:'20 dk', xp:30, done:false },
  { id:'t2', emoji:'🎯', title:'"Otur" komutu',  dur:'10 dk', xp:20, done:true  },
  { id:'t3', emoji:'🤝', title:'Sosyalleşme',    dur:'15 dk', xp:25, done:false },
  { id:'t4', emoji:'🎾', title:'Oyun zamanı',    dur:'15 dk', xp:15, done:false },
];

export default function HomeScreen() {
  const { theme, dogName, xp, streak, completedTasks, completeTask } = useStore();
  const done = TASKS.filter(t => t.done || completedTasks.includes(t.id)).length;
  const progress = done / TASKS.length;

  return (
    <div style={{ background:palette.offWhite }}>
      {/* Header */}
      <div style={{
        background:`linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
        padding:'24px 24px 32px', borderRadius:'0 0 28px 28px',
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <p style={{ color:'rgba(255,255,255,0.8)', fontSize:15, fontWeight:600 }}>Merhaba! 👋</p>
            <h1 style={{ color:'#fff', fontWeight:900, fontSize:26, marginTop:2 }}>{dogName || 'Köpeğin'} için</h1>
          </div>
          <div style={{ background:'rgba(255,255,255,0.2)', borderRadius:12, padding:'8px 14px', border:'1px solid rgba(255,255,255,0.3)' }}>
            <span style={{ color:'#fff', fontWeight:700, fontSize:15 }}>⚡️ {xp} XP</span>
          </div>
        </div>
        <p style={{ color:'rgba(255,255,255,0.85)', fontSize:14, fontWeight:600, marginTop:14 }}>🔥 {streak} günlük seri</p>
      </div>

      <div style={{ padding:'20px 20px 32px', display:'flex', flexDirection:'column', gap:20 }}>
        {/* Daily progress */}
        <Card>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
            <span style={{ fontWeight:800, fontSize:17 }}>Günlük Plan</span>
            <span style={{ fontWeight:800, fontSize:18, color:theme.primary }}>{done}/{TASKS.length}</span>
          </div>
          <div style={{ height:8, background:palette.gray100, borderRadius:4, overflow:'hidden' }}>
            <div style={{ width:`${progress*100}%`, height:'100%', background:theme.primary, borderRadius:4, transition:'width 0.4s' }} />
          </div>
          <p style={{ color:palette.gray400, fontSize:13, marginTop:8 }}>
            {done === TASKS.length ? '🎉 Harika! Tüm görevler tamamlandı!' : `${TASKS.length - done} görev kaldı`}
          </p>
        </Card>

        {/* Tasks */}
        <div>
          <h3 style={{ fontWeight:800, fontSize:17, marginBottom:12 }}>Bugünün Görevleri</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {TASKS.map(t => {
              const isDone = t.done || completedTasks.includes(t.id);
              return (
                <button key={t.id} onClick={() => !isDone && completeTask(t.id)} style={{
                  background:'#fff', borderRadius:20, padding:'16px', border:'none', textAlign:'left',
                  boxShadow:'0 2px 12px rgba(0,0,0,0.05)', opacity: isDone ? 0.6 : 1, cursor: isDone ? 'default' : 'pointer',
                  display:'flex', alignItems:'center', gap:14,
                }}>
                  <span style={{ fontSize:26 }}>{t.emoji}</span>
                  <div style={{ flex:1 }}>
                    <p style={{ fontWeight:700, fontSize:15, textDecoration: isDone ? 'line-through' : 'none', color: isDone ? palette.gray400 : palette.gray900 }}>{t.title}</p>
                    <p style={{ color:palette.gray400, fontSize:13, marginTop:2 }}>{t.dur}</p>
                  </div>
                  <div style={{ background:theme.primarySurface, borderRadius:8, padding:'4px 10px' }}>
                    <span style={{ color:theme.primary, fontWeight:700, fontSize:12 }}>+{t.xp} XP</span>
                  </div>
                  {isDone && <div style={{ width:22, height:22, borderRadius:11, background:palette.success, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ color:'#fff', fontSize:12, fontWeight:700 }}>✓</span>
                  </div>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

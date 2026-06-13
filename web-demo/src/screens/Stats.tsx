import { useStore } from '../store';
import { palette } from '../theme';

const WEEK = ['M','T','W','T','F','S','S'];
const BARS = [60, 85, 40, 95, 70, 30, 88];

export default function StatsScreen() {
  const { theme, dogName, xp, streak } = useStore();
  const maxBar = Math.max(...BARS);
  return (
    <div style={{ background:palette.offWhite, minHeight:'100vh' }}>
      <div style={{ background:'#fff', padding:'52px 24px 20px', marginBottom:16 }}>
        <h1 style={{ fontWeight:900, fontSize:26, color:palette.gray900, margin:0 }}>Stats</h1>
        <p style={{ color:palette.gray400, fontWeight:600, fontSize:15, margin:'4px 0 0' }}>
          {dogName ? `${dogName}'s` : 'Your'} progress
        </p>
      </div>

      <div style={{ padding:'0 24px 100px', display:'flex', flexDirection:'column', gap:16 }}>
        {/* Summary cards */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {[
            { label:'Total XP', value:`${xp}`, sub:'points earned', emoji:'⚡️' },
            { label:'Streak',   value:`${streak}`, sub:'days in a row', emoji:'🔥' },
            { label:'Sessions', value:'24', sub:'completed', emoji:'🎯' },
            { label:'This week', value:'5', sub:'sessions', emoji:'📅' },
          ].map(c => (
            <div key={c.label} style={{ background:'#fff', borderRadius:18, padding:'16px', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
              <span style={{ fontSize:22 }}>{c.emoji}</span>
              <p style={{ fontWeight:900, fontSize:24, color:palette.gray900, margin:'6px 0 2px' }}>{c.value}</p>
              <p style={{ color:palette.gray400, fontWeight:600, fontSize:12, margin:0 }}>{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Weekly bar chart */}
        <div style={{ background:'#fff', borderRadius:18, padding:'20px', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
          <p style={{ fontWeight:800, fontSize:16, color:palette.gray900, margin:'0 0 20px' }}>This week</p>
          <div style={{ display:'flex', alignItems:'flex-end', gap:8, height:100 }}>
            {BARS.map((h, i) => (
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                <div style={{ width:'100%', height:`${(h/maxBar)*84}px`, background: i===6 ? theme.primary : theme.primaryLight, borderRadius:6, transition:'height 0.4s' }} />
                <span style={{ color:palette.gray400, fontSize:11, fontWeight:700 }}>{WEEK[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div style={{ background:'#fff', borderRadius:18, padding:'20px', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
          <p style={{ fontWeight:800, fontSize:16, color:palette.gray900, margin:'0 0 14px' }}>Achievements</p>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {[
              { emoji:'🏆', title:'First Session', sub:'Completed your first training', done:true },
              { emoji:'🔥', title:'On Fire', sub:'7-day streak', done:true },
              { emoji:'🎓', title:'Graduate', sub:'Complete all basic commands', done:false },
            ].map(a => (
              <div key={a.title} style={{ display:'flex', alignItems:'center', gap:12, opacity: a.done ? 1 : 0.45 }}>
                <span style={{ fontSize:28 }}>{a.emoji}</span>
                <div>
                  <p style={{ fontWeight:800, fontSize:14, color:palette.gray900, margin:0 }}>{a.title}</p>
                  <p style={{ color:palette.gray400, fontSize:12, margin:0, fontWeight:600 }}>{a.sub}</p>
                </div>
                {a.done && <span style={{ marginLeft:'auto', color:theme.primary, fontSize:18 }}>✓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

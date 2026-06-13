import { useState } from 'react';
import { useStore } from '../store';
import { palette } from '../theme';
import Card from '../components/Card';

const QUESTS = {
  daily: [
    { id:'d1', title:'3 komut tekrarı', emoji:'🎯', progress:3, total:3,  xp:30,  done:true  },
    { id:'d2', title:'20 dk yürüyüş',   emoji:'🏃', progress:14, total:20, xp:40,  done:false },
    { id:'d3', title:'Fotoğraf paylaş', emoji:'📸', progress:0,  total:1,  xp:20,  done:false },
  ],
  weekly: [
    { id:'w1', title:'5 gün art arda antren.', emoji:'🔥', progress:3,   total:5,  xp:150, done:false },
    { id:'w2', title:'10 km toplam yürüyüş',  emoji:'🗺️', progress:6.4, total:10, xp:200, done:false },
  ],
  monthly: [
    { id:'m1', title:'30 günlük seri',       emoji:'📅', progress:14, total:30, xp:500, done:false },
    { id:'m2', title:'Tüm temel modülü bitir', emoji:'🎓', progress:5, total:8,  xp:600, done:false },
  ],
};

export default function QuestsScreen() {
  const { theme } = useStore();
  const [tab, setTab] = useState<'daily'|'weekly'|'monthly'>('daily');
  const quests = QUESTS[tab];

  return (
    <div style={{ padding:'24px 20px 32px' }}>
      <h2 style={{ fontWeight:900, fontSize:26, marginBottom:16 }}>Görevler 📋</h2>

      <div style={{ display:'flex', background:palette.gray100, borderRadius:12, padding:4, gap:4, marginBottom:20 }}>
        {(['daily','weekly','monthly'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex:1, padding:'8px 0', borderRadius:9, border:'none',
            background: tab===t ? theme.primary : 'transparent',
            color: tab===t ? '#fff' : palette.gray400, fontWeight:700, fontSize:13, fontFamily:'Nunito',
          }}>{t==='daily'?'Günlük':t==='weekly'?'Haftalık':'Aylık'}</button>
        ))}
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {quests.map(q => (
          <Card key={q.id}>
            <div style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
              <span style={{ fontSize:28, marginTop:2 }}>{q.emoji}</span>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                  <span style={{ fontWeight:700, fontSize:14, textDecoration:q.done?'line-through':'none', color:q.done?palette.gray400:palette.gray900 }}>{q.title}</span>
                  <div style={{ background:theme.primarySurface, borderRadius:8, padding:'3px 10px' }}>
                    <span style={{ color:theme.primary, fontWeight:700, fontSize:12 }}>+{q.xp} XP</span>
                  </div>
                </div>
                <div style={{ height:6, background:palette.gray100, borderRadius:3, overflow:'hidden' }}>
                  <div style={{ width:`${q.done?100:(q.progress/q.total)*100}%`, height:'100%', background:theme.primary, borderRadius:3 }} />
                </div>
                <p style={{ color:palette.gray400, fontSize:12, marginTop:6 }}>
                  {q.done ? '✅ Tamamlandı' : `${q.progress} / ${q.total}`}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

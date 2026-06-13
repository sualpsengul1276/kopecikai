import { useState } from 'react';
import { useStore } from '../store';
import { palette } from '../theme';
import Card from '../components/Card';

const LEVELS = [
  { xp:0,    level:1, title:'Yavru Köpek 🐶' },
  { xp:200,  level:2, title:'Meraklı Köpek 🐕' },
  { xp:500,  level:3, title:'Çevik Köpek 🏃' },
  { xp:1000, level:4, title:'Usta Köpek 🎯' },
  { xp:2000, level:5, title:'Şampiyon 🏆' },
  { xp:5000, level:6, title:'Efsane 👑' },
];

const REWARDS = [
  { id:'r1', title:'%10 Chewy İndirimi', brand:'Chewy',   emoji:'🦴', cost:200,  tier:'Bronz',  tierColor:'#CD7F32', canAfford:(xp:number)=>xp>=200 },
  { id:'r2', title:'BarkBox Örnek Kutu', brand:'BarkBox', emoji:'📦', cost:500,  tier:'Gümüş',  tierColor:'#8E97A5', canAfford:(xp:number)=>xp>=500 },
  { id:'r3', title:'Premium Modüller',   brand:'Köpecik', emoji:'🎓', cost:300,  tier:'Gümüş',  tierColor:'#8E97A5', canAfford:(xp:number)=>xp>=300 },
  { id:'r4', title:'1 Ay BarkBox',       brand:'BarkBox', emoji:'🎁', cost:1500, tier:'Altın',  tierColor:'#F59E0B', canAfford:(xp:number)=>xp>=1500 },
  { id:'r5', title:'Yıllık BarkBox',     brand:'BarkBox', emoji:'👑', cost:5000, tier:'Platin', tierColor:'#E5E4E2', canAfford:(xp:number)=>xp>=5000 },
];

export default function RewardsScreen() {
  const { theme, xp } = useStore();
  const [claimed, setClaimed] = useState<string[]>([]);
  const cur = [...LEVELS].reverse().find(l => xp >= l.xp) || LEVELS[0];
  const next = LEVELS.find(l => xp < l.xp);
  const prog = next ? (xp - cur.xp) / (next.xp - cur.xp) : 1;

  return (
    <div>
      {/* Header */}
      <div style={{
        background:`linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
        padding:'24px 24px 28px', borderRadius:'0 0 28px 28px', marginBottom:4,
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div>
            <p style={{ color:'rgba(255,255,255,0.8)', fontSize:14, fontWeight:600 }}>{cur.title}</p>
            <p style={{ color:'#fff', fontWeight:900, fontSize:32 }}>⚡️ {xp} XP</p>
          </div>
          <div style={{ background:'rgba(255,255,255,0.2)', borderRadius:16, padding:'10px 16px', border:'1px solid rgba(255,255,255,0.3)' }}>
            <span style={{ fontWeight:800, fontSize:18, color:'#fff' }}>Lv.{cur.level}</span>
          </div>
        </div>
        {next && <>
          <div style={{ height:8, background:'rgba(255,255,255,0.25)', borderRadius:4, overflow:'hidden', marginBottom:8 }}>
            <div style={{ width:`${prog*100}%`, height:'100%', background:'#fff', borderRadius:4 }} />
          </div>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:12, fontWeight:600 }}>{next.xp - xp} XP → {next.title}</p>
        </>}
      </div>

      <div style={{ padding:'20px', display:'flex', flexDirection:'column', gap:10 }}>
        <h3 style={{ fontWeight:800, fontSize:17, marginBottom:4 }}>Ödüller</h3>
        <div style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
          {REWARDS.map(r => {
            const afford = r.canAfford(xp);
            const isClaimed = claimed.includes(r.id);
            return (
              <Card key={r.id} style={{ width:'calc(50% - 6px)', opacity: afford ? 1 : 0.65 }}>
                <p style={{ fontWeight:700, fontSize:11, color:r.tierColor, textTransform:'uppercase', letterSpacing:0.5, marginBottom:8 }}>{r.tier}</p>
                <p style={{ fontSize:32, marginBottom:8 }}>{r.emoji}</p>
                <p style={{ fontSize:11, color:palette.gray400, textTransform:'uppercase', letterSpacing:0.4 }}>{r.brand}</p>
                <p style={{ fontWeight:700, fontSize:14, margin:'4px 0 6px' }}>{r.title}</p>
                <div style={{ background:afford ? theme.primarySurface : palette.gray50, borderRadius:8, padding:'3px 10px', marginBottom:10, display:'inline-block' }}>
                  <span style={{ color:afford ? theme.primary : palette.gray400, fontWeight:700, fontSize:12 }}>⚡️ {r.cost}</span>
                </div>
                <button
                  onClick={() => afford && !isClaimed && setClaimed(p=>[...p,r.id])}
                  style={{
                    width:'100%', padding:'8px', borderRadius:10, border:'none', fontFamily:'Nunito',
                    background: isClaimed ? palette.success : afford ? theme.primary : palette.gray200,
                    color:'#fff', fontWeight:700, fontSize:13,
                  }}
                >{isClaimed ? '✓ Alındı' : afford ? 'Al' : '🔒'}</button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { useStore } from '../store';
import { palette } from '../theme';
import Card from '../components/Card';

const USERS = [
  { rank:1, user:'Selin K.',  dog:'Pamuk',   avatar:'🐩', xp:4850, streak:28, medal:'🥇', bar:90, color:'#F59E0B' },
  { rank:2, user:'Mert A.',   dog:'Karamel', avatar:'🐕', xp:4210, streak:21, medal:'🥈', bar:65, color:'#8E97A5' },
  { rank:3, user:'Zeynep T.', dog:'Şeker',   avatar:'🦊', xp:3950, streak:19, medal:'🥉', bar:50, color:'#CD7F32' },
  { rank:4, user:'Ali B.',    dog:'Rex',     avatar:'🐶', xp:3400, streak:15, medal:null },
  { rank:5, user:'Ayşe M.',   dog:'Boncuk',  avatar:'🐩', xp:3100, streak:12, medal:null },
  { rank:12, user:'Sen',      dog:'Köpeğin', avatar:'⭐', xp:0,    streak:0,  medal:null, isMe:true },
];

export default function LeaderboardScreen() {
  const { theme } = useStore();
  const top3 = USERS.slice(0,3);
  const rest = USERS.slice(3);

  return (
    <div style={{ padding:'24px 20px 32px' }}>
      <h2 style={{ fontWeight:900, fontSize:26, marginBottom:20 }}>Liderlik 🏆</h2>

      {/* Podium */}
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'center', gap:8, height:200, marginBottom:20 }}>
        {[top3[1], top3[0], top3[2]].map((u, i) => {
          const h = i===1 ? 140 : i===0 ? 100 : 80;
          const c = i===1 ? '#F59E0B' : i===0 ? '#8E97A5' : '#CD7F32';
          return (
            <div key={u.rank} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center' }}>
              <span style={{ fontSize:32 }}>{u.avatar}</span>
              <span style={{ fontSize:20 }}>{u.medal}</span>
              <span style={{ fontWeight:700, fontSize:12, marginBottom:6, textAlign:'center' }}>{u.dog}</span>
              <div style={{ width:'100%', height:h, background:c, borderRadius:'8px 8px 0 0', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:10 }}>
                <span style={{ fontWeight:900, fontSize:20, color:'#fff' }}>{u.rank}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {rest.map((u: any) => (
          <Card key={u.rank} style={{ border: u.isMe ? `2px solid ${theme.primary}` : undefined }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <span style={{ fontWeight:800, fontSize:16, color:palette.gray400, width:28 }}>#{u.rank}</span>
              <div style={{ width:40, height:40, borderRadius:20, background:palette.gray100, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{u.avatar}</div>
              <div style={{ flex:1 }}>
                <p style={{ fontWeight:700, fontSize:14, color: u.isMe ? theme.primary : palette.gray900 }}>{u.dog} {u.isMe?'(Sen)':''}</p>
                <p style={{ color:palette.gray400, fontSize:12, marginTop:2 }}>{u.user} · 🔥 {u.streak} gün</p>
              </div>
              <div style={{ background: u.isMe ? theme.primarySurface : palette.gray50, borderRadius:8, padding:'4px 10px' }}>
                <span style={{ fontWeight:700, fontSize:13, color: u.isMe ? theme.primary : palette.gray600 }}>{u.xp} XP</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

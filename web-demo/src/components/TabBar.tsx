import { useStore } from '../store';
import type { Screen } from '../store';

const TABS: { screen: Screen; label: string; emoji: string }[] = [
  { screen: 'home',        label: 'Ev',      emoji: '🏠' },
  { screen: 'training',    label: 'Antren',  emoji: '🎯' },
  { screen: 'quests',      label: 'Görev',   emoji: '📋' },
  { screen: 'social',      label: 'Sosyal',  emoji: '🐾' },
  { screen: 'leaderboard', label: 'Lider',   emoji: '🏆' },
  { screen: 'rewards',     label: 'Ödül',    emoji: '⚡️' },
];

export default function TabBar() {
  const { screen, goto, theme } = useStore();
  return (
    <div style={{
      position:'fixed', bottom:0, left:0, right:0,
      background:'#fff', borderTop:'1px solid #E5E8EC',
      display:'flex', height:64, zIndex:100,
      boxShadow:'0 -2px 12px rgba(0,0,0,0.06)',
    }}>
      {TABS.map(t => {
        const active = screen === t.screen;
        return (
          <button
            key={t.screen}
            onClick={() => goto(t.screen)}
            style={{
              flex:1, display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center', gap:2,
              background:'none', padding:'6px 0',
            }}
          >
            <span style={{ fontSize:20 }}>{t.emoji}</span>
            <span style={{
              fontSize:10, fontWeight:700,
              color: active ? theme.primary : '#8E97A5',
              fontFamily:'Nunito, sans-serif',
            }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

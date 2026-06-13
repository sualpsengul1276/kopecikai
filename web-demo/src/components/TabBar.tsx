import { useStore } from '../store';
import type { Screen } from '../store';

const TABS: { screen: Screen; label: string; emoji: string }[] = [
  { screen: 'home',    label: 'Home',    emoji: '🏠' },
  { screen: 'learn',   label: 'Learn',   emoji: '📖' },
  { screen: 'ask-ai',  label: 'Ask AI',  emoji: '🤖' },
  { screen: 'stats',   label: 'Stats',   emoji: '📊' },
  { screen: 'profile', label: 'Me',      emoji: '👤' },
];

export default function TabBar() {
  const { screen, goto, theme } = useStore();
  return (
    <div style={{
      position:'fixed', bottom:0, left:0, right:0, maxWidth:430, margin:'0 auto',
      background:'#fff', borderTop:'1px solid #E5E8EC',
      display:'flex', height:68, zIndex:100,
      boxShadow:'0 -4px 20px rgba(0,0,0,0.06)',
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
              background:'none', border:'none', padding:'6px 0', cursor:'pointer',
            }}
          >
            <span style={{ fontSize:20, opacity: active ? 1 : 0.4 }}>{t.emoji}</span>
            <span style={{
              fontSize:10, fontWeight:800,
              color: active ? theme.primary : '#8E97A5',
              fontFamily:'Nunito, sans-serif',
            }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

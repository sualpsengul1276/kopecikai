import { palette } from '../theme';

export default function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: palette.white, borderRadius:20,
      boxShadow:'0 2px 16px rgba(0,0,0,0.06)', padding:20, ...style,
    }}>
      {children}
    </div>
  );
}

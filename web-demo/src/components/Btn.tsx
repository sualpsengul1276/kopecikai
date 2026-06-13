import { useStore } from '../store';
import { palette } from '../theme';

interface Props {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'outline';
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function Btn({ label, onClick, variant = 'primary', disabled, style }: Props) {
  const { theme } = useStore();
  if (variant === 'outline') return (
    <button onClick={onClick} disabled={disabled} style={{
      height:52, borderRadius:14, border:`2px solid ${theme.primary}`,
      color:theme.primary, fontWeight:800, fontSize:16, background:'none',
      width:'100%', opacity: disabled ? 0.5 : 1, ...style,
    }}>{label}</button>
  );
  return (
    <button onClick={onClick} disabled={disabled} style={{
      height:52, borderRadius:14, border:'none',
      background: disabled ? '#C8CDD5' : `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
      color: palette.white, fontWeight:800, fontSize:16,
      width:'100%', boxShadow: disabled ? 'none' : '0 4px 16px rgba(0,0,0,0.18)',
      transition:'opacity 0.15s', ...style,
    }}>{label}</button>
  );
}

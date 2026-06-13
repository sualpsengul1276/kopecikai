import { useStore } from '../store';

export default function WelcomeScreen() {
  const { goto, theme } = useStore();
  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(160deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '48px 32px',
    }}>
      <div style={{ fontSize: 88, marginBottom: 8 }}>🐾</div>
      <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 42, letterSpacing: -1, margin: 0 }}>Pawgress</h1>
      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, fontWeight: 600, marginTop: 8, marginBottom: 64, textAlign:'center' }}>
        Train smarter. Bond deeper.
      </p>

      <button
        onClick={() => goto('onboarding-name')}
        style={{
          background: '#fff',
          color: theme.primary,
          border: 'none',
          borderRadius: 18,
          padding: '18px 56px',
          fontSize: 18,
          fontWeight: 900,
          fontFamily: 'Nunito, sans-serif',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          width: '100%',
          maxWidth: 320,
        }}
      >
        Get Started →
      </button>
      <p style={{ color:'rgba(255,255,255,0.5)', fontSize:13, marginTop:24 }}>Already have an account? <span style={{color:'#fff', fontWeight:700, cursor:'pointer'}}>Sign in</span></p>
    </div>
  );
}

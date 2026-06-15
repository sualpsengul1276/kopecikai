import { useStore } from './store';
import { palette } from './theme';
import WelcomeScreen from './screens/Welcome';
import OnboardingName from './screens/OnboardingName';
import OnboardingDetails from './screens/OnboardingDetails';
import OnboardingComplete from './screens/OnboardingComplete';
import HomeScreen from './screens/Home';
import LearnScreen from './screens/Learn';
import CareScreen from './screens/Care';
import AskAIScreen from './screens/AskAI';
import ProfileScreen from './screens/Profile';
import TabBar from './components/TabBar';

const TAB_SCREENS = ['home','learn','care','ask-ai','profile'];

export default function App() {
  const { screen } = useStore();
  const isTab = TAB_SCREENS.includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':             return <WelcomeScreen />;
      case 'onboarding-name':     return <OnboardingName />;
      case 'onboarding-details':  return <OnboardingDetails />;
      case 'onboarding-complete': return <OnboardingComplete />;
      case 'home':    return <HomeScreen />;
      case 'learn':   return <LearnScreen />;
      case 'care':    return <CareScreen />;
      case 'ask-ai':  return <AskAIScreen />;
      case 'profile': return <ProfileScreen />;
      default:        return <WelcomeScreen />;
    }
  };

  return (
    <div style={{
      display:'flex', flexDirection:'column', minHeight:'100vh',
      background:palette.offWhite, maxWidth:430, margin:'0 auto',
      position:'relative', boxShadow:'0 0 60px rgba(0,0,0,0.12)',
    }}>
      <div style={{ flex:1, overflowY:'auto', paddingBottom: isTab ? 72 : 0 }}>
        {renderScreen()}
      </div>
      {isTab && <TabBar />}
    </div>
  );
}

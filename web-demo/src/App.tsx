import { useStore } from './store';
import { palette } from './theme';
import WelcomeScreen from './screens/Welcome';
import OnboardingName from './screens/OnboardingName';
import OnboardingDetails from './screens/OnboardingDetails';
import OnboardingComplete from './screens/OnboardingComplete';
import HomeScreen from './screens/Home';
import TrainingScreen from './screens/Training';
import QuestsScreen from './screens/Quests';
import SocialScreen from './screens/Social';
import LeaderboardScreen from './screens/Leaderboard';
import RewardsScreen from './screens/Rewards';
import TabBar from './components/TabBar';

const TAB_SCREENS = ['home','training','quests','social','leaderboard','rewards'];

export default function App() {
  const { screen } = useStore();
  const isTab = TAB_SCREENS.includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':             return <WelcomeScreen />;
      case 'onboarding-name':     return <OnboardingName />;
      case 'onboarding-details':  return <OnboardingDetails />;
      case 'onboarding-complete': return <OnboardingComplete />;
      case 'home':        return <HomeScreen />;
      case 'training':    return <TrainingScreen />;
      case 'quests':      return <QuestsScreen />;
      case 'social':      return <SocialScreen />;
      case 'leaderboard': return <LeaderboardScreen />;
      case 'rewards':     return <RewardsScreen />;
      default:            return <WelcomeScreen />;
    }
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:palette.offWhite }}>
      <div style={{ flex:1, overflowY:'auto', paddingBottom: isTab ? 72 : 0 }}>
        {renderScreen()}
      </div>
      {isTab && <TabBar />}
    </div>
  );
}

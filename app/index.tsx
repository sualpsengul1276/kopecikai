import { Redirect } from 'expo-router';
import { useAppStore } from '../src/store/appStore';

export default function Root() {
  const onboardingComplete = useAppStore((s) => s.onboardingComplete);
  return <Redirect href={onboardingComplete ? '/tabs' : '/onboarding'} />;
}

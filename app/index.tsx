import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAppStore } from '../src/store/appStore';

export default function Root() {
  const router = useRouter();
  const onboardingComplete = useAppStore((s) => s.onboardingComplete);

  useEffect(() => {
    if (onboardingComplete) {
      router.replace('/tabs');
    } else {
      router.replace('/onboarding');
    }
  }, []);

  return null;
}

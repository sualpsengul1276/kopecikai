import { create } from 'zustand';
import { Theme, mauveTheme, blueTheme } from '../theme/colors';

export type DogGender = 'male' | 'female';
export type DogSize = 'small' | 'medium' | 'large';

export interface DogProfile {
  name: string;
  breed: string;
  age: number; // months
  gender: DogGender;
  size: DogSize;
  photoUri?: string;
}

export interface OwnerProfile {
  name: string;
  wakeUpTime: string; // "07:00"
  workSchedule: 'home' | 'partTime' | 'fullTime';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
}

export interface AppState {
  theme: Theme;
  dog: Partial<DogProfile>;
  owner: Partial<OwnerProfile>;
  xp: number;
  streak: number;
  onboardingComplete: boolean;

  setDogGender: (gender: DogGender) => void;
  setDog: (dog: Partial<DogProfile>) => void;
  setOwner: (owner: Partial<OwnerProfile>) => void;
  addXP: (amount: number) => void;
  completeOnboarding: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: blueTheme,
  dog: {},
  owner: {},
  xp: 0,
  streak: 0,
  onboardingComplete: false,

  setDogGender: (gender) =>
    set((state) => ({
      theme: gender === 'female' ? mauveTheme : blueTheme,
      dog: { ...state.dog, gender },
    })),

  setDog: (dog) =>
    set((state) => ({ dog: { ...state.dog, ...dog } })),

  setOwner: (owner) =>
    set((state) => ({ owner: { ...state.owner, ...owner } })),

  addXP: (amount) =>
    set((state) => ({ xp: state.xp + amount })),

  completeOnboarding: () => set({ onboardingComplete: true }),
}));

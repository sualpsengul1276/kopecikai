import { create } from 'zustand';
import type { Theme } from './theme';
import { blueTheme, mauveTheme } from './theme';

export type Screen =
  | 'welcome'
  | 'onboarding-name'
  | 'onboarding-details'
  | 'onboarding-complete'
  | 'home'
  | 'learn'
  | 'stats'
  | 'profile'
  | 'ask-ai'
  | 'care';

interface State {
  screen: Screen;
  theme: Theme;
  dogName: string;
  dogGender: 'male' | 'female';
  dogBreed: string;
  xp: number;
  streak: number;
  completedTasks: string[];

  goto: (s: Screen) => void;
  setDogName: (n: string) => void;
  setDogGender: (g: 'male' | 'female') => void;
  setDogBreed: (b: string) => void;
  addXP: (n: number) => void;
  completeTask: (id: string) => void;
}

export const useStore = create<State>((set) => ({
  screen: 'welcome',
  theme: blueTheme,
  dogName: '',
  dogGender: 'male',
  dogBreed: '',
  xp: 0,
  streak: 7,
  completedTasks: [],

  goto: (screen) => set({ screen }),
  setDogName: (dogName) => set({ dogName }),
  setDogBreed: (dogBreed) => set({ dogBreed }),
  setDogGender: (dogGender) =>
    set({ dogGender, theme: dogGender === 'female' ? mauveTheme : blueTheme }),
  addXP: (n) => set((s) => ({ xp: s.xp + n })),
  completeTask: (id) =>
    set((s) => ({
      completedTasks: s.completedTasks.includes(id)
        ? s.completedTasks
        : [...s.completedTasks, id],
      xp: s.completedTasks.includes(id) ? s.xp : s.xp + 25,
    })),
}));

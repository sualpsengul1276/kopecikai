import { create } from 'zustand';
import { Theme, mauveTheme, blueTheme } from '../theme/colors';
import { WeeklySchedule } from '../services/aiSchedule';
import { WalkStats } from '../hooks/useGPSWalk';

export type DogGender = 'male' | 'female';
export type DogSize = 'small' | 'medium' | 'large';

export interface DogProfile {
  name: string;
  breed: string;
  age: number;
  gender: DogGender;
  size: DogSize;
  photoUri?: string;
}

export interface OwnerProfile {
  name: string;
  wakeUpTime: string;
  workSchedule: 'home' | 'partTime' | 'fullTime';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
}

export interface WalkRecord {
  id: string;
  date: string;
  stats: WalkStats;
  xpEarned: number;
}

export interface AppState {
  theme: Theme;
  dog: Partial<DogProfile>;
  owner: Partial<OwnerProfile>;
  xp: number;
  streak: number;
  onboardingComplete: boolean;
  schedule: WeeklySchedule | null;
  scheduleLoading: boolean;
  walks: WalkRecord[];
  completedTaskIds: string[];

  setDogGender: (gender: DogGender) => void;
  setDog: (dog: Partial<DogProfile>) => void;
  setOwner: (owner: Partial<OwnerProfile>) => void;
  addXP: (amount: number) => void;
  completeOnboarding: () => void;
  setSchedule: (schedule: WeeklySchedule | null) => void;
  setScheduleLoading: (v: boolean) => void;
  addWalk: (walk: WalkRecord) => void;
  completeTask: (taskId: string, xp: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: blueTheme,
  dog: {},
  owner: {},
  xp: 0,
  streak: 0,
  onboardingComplete: false,
  schedule: null,
  scheduleLoading: false,
  walks: [],
  completedTaskIds: [],

  setDogGender: (gender) =>
    set((state) => ({
      theme: gender === 'female' ? mauveTheme : blueTheme,
      dog: { ...state.dog, gender },
    })),

  setDog: (dog) => set((state) => ({ dog: { ...state.dog, ...dog } })),
  setOwner: (owner) => set((state) => ({ owner: { ...state.owner, ...owner } })),
  addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
  completeOnboarding: () => set({ onboardingComplete: true }),
  setSchedule: (schedule) => set({ schedule }),
  setScheduleLoading: (scheduleLoading) => set({ scheduleLoading }),

  addWalk: (walk) =>
    set((state) => ({
      walks: [walk, ...state.walks],
      xp: state.xp + walk.xpEarned,
    })),

  completeTask: (taskId, xp) =>
    set((state) => ({
      completedTaskIds: [...state.completedTaskIds, taskId],
      xp: state.xp + xp,
    })),
}));

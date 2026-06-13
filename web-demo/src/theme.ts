export type Gender = 'male' | 'female';

export const blueTheme = {
  primary: '#2F6FD0',
  primaryDark: '#1E4FA3',
  primaryLight: '#D6E6FF',
  primarySurface: '#F0F5FF',
  gender: 'male' as Gender,
};

export const mauveTheme = {
  primary: '#B5417A',
  primaryDark: '#8C2E5C',
  primaryLight: '#F2D6E8',
  primarySurface: '#FDF0F7',
  gender: 'female' as Gender,
};

export type Theme = typeof blueTheme;

export const palette = {
  white: '#FFFFFF',
  offWhite: '#F8F9FA',
  gray50: '#F2F4F6',
  gray100: '#E5E8EC',
  gray200: '#C8CDD5',
  gray400: '#8E97A5',
  gray600: '#4A5568',
  gray900: '#1A202C',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  xpGold: '#F59E0B',
  blue: '#2F6FD0',
  mauve: '#B5417A',
};

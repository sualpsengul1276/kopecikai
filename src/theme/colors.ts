export const palette = {
  mauve: '#B5417A',
  mauveDark: '#8C2E5C',
  mauveLight: '#F2D6E8',
  mauveSurface: '#FDF0F7',

  blue: '#2F6FD0',
  blueDark: '#1E4FA3',
  blueLight: '#D6E6FF',
  blueSurface: '#F0F5FF',

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
  xpGoldLight: '#FEF3C7',
};

export type Theme = {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  primarySurface: string;
  gender: 'male' | 'female';
};

export const mauveTheme: Theme = {
  primary: palette.mauve,
  primaryDark: palette.mauveDark,
  primaryLight: palette.mauveLight,
  primarySurface: palette.mauveSurface,
  gender: 'female',
};

export const blueTheme: Theme = {
  primary: palette.blue,
  primaryDark: palette.blueDark,
  primaryLight: palette.blueLight,
  primarySurface: palette.blueSurface,
  gender: 'male',
};

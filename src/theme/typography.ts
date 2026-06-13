export const fonts = {
  regular: 'Nunito_400Regular',
  medium: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  extraBold: 'Nunito_800ExtraBold',
  black: 'Nunito_900Black',
};

export const textStyles = {
  h1: { fontFamily: fonts.black, fontSize: 32, lineHeight: 40 },
  h2: { fontFamily: fonts.extraBold, fontSize: 26, lineHeight: 34 },
  h3: { fontFamily: fonts.bold, fontSize: 20, lineHeight: 28 },
  h4: { fontFamily: fonts.bold, fontSize: 17, lineHeight: 24 },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 22 },
  bodyMedium: { fontFamily: fonts.medium, fontSize: 15, lineHeight: 22 },
  caption: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18 },
  captionMedium: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 18 },
  label: { fontFamily: fonts.bold, fontSize: 12, lineHeight: 16, letterSpacing: 0.8 },
};

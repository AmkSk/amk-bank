import { configureFonts, DefaultTheme } from 'react-native-paper'

import { colors } from './Colors'
import { fontConfig } from './Typography'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.blue,
    secondary: colors.yellow,
    error: colors.red,
    background: colors.white,
    onSurface: colors.black,
    errorContainer: colors.red,
    onErrorContainer: colors.white,
  },
  fonts: configureFonts({ config: fontConfig }),
}

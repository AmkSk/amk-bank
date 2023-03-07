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
    backdrop: colors.gray,
  },
  fonts: configureFonts({ config: fontConfig }),
}

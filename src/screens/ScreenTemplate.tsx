import React, { useMemo } from 'react'
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native'
import { CommonStyles } from '../themes/CommonStyles'
import { MD3Theme, useTheme } from 'react-native-paper'
import { useDeviceInfoStore } from '../stores/deviceInfoStore'

interface Props {
  style?: ViewStyle
  children: React.ReactNode[] | React.ReactNode
}

/**
 * Wrapper view which contains basic styling - background color and margins. Can be used throughout the app
 *
 * @param style style applied to the parent view of the children. Optional parameter.
 * @param children content that is wrapped around
 * @constructor
 */
export function ScreenTemplate({ style, children }: Props) {
  const theme = useTheme()
  const isTablet = useDeviceInfoStore((state) => state.isTablet)
  const styles = useMemo(() => createStyleSheet(theme, isTablet), [theme, isTablet])

  return (
    <SafeAreaView style={[CommonStyles.flex1, styles.container]}>
      <View style={[CommonStyles.flex1, styles.content, style]}>{children}</View>
    </SafeAreaView>
  )
}

const createStyleSheet = (theme: MD3Theme, isTablet: boolean) => {
  const contentWidth = isTablet ? '60%' : '100%'

  return StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.colors.background,
    },
    content: {
      width: contentWidth,
      alignSelf: 'center',
      margin: 16,
    },
  })
}

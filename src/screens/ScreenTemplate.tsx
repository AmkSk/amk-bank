import React from 'react'
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native'
import { CommonStyles } from '../themes/CommonStyles'

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
  return (
    <SafeAreaView style={[CommonStyles.flex1, styles.container]}>
      <View style={[CommonStyles.flex1, styles.content, style]}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
  },
  content: {
    margin: 16,
  },
})

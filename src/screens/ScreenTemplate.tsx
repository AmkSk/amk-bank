import React from 'react'
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native'

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
    <SafeAreaView style={styles.container}>
      <View style={[style, styles.content]}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    margin: 16,
  },
})

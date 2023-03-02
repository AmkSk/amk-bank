import { HelperText, TextInput, TextInputProps } from 'react-native-paper'
import { TextInput as RnTextInput, View, ViewStyle } from 'react-native'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'
import React, { ForwardedRef } from 'react'

type Props = Omit<TextInputProps, 'error' | 'mode'> & {
  style?: ViewStyle
  errorMessage?: string
}

export const ValidatedTextInput = React.forwardRef(
  ({ style, errorMessage, ...textInputProps }: Props, ref: ForwardedRef<RnTextInput>) => {
    return (
      <View style={style}>
        <TextInput ref={ref} {...textInputProps} mode='outlined' error={errorMessage !== undefined} />
        {errorMessage !== undefined && <HelperText type='error'>{errorMessage}</HelperText>}
      </View>
    )
  },
)

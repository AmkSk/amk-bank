import { HelperText, TextInput, TextInputProps } from 'react-native-paper'
import { TextInput as RnTextInput, View, ViewStyle } from 'react-native'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'
import React, { ForwardedRef } from 'react'

type Props = TextInputProps & {
  style?: ViewStyle
  field: ControllerRenderProps<any, any>
  fieldState: ControllerFieldState
}

export const ValidatedTextInput = React.forwardRef(
  ({ style, field, fieldState, ...textInputProps }: Props, ref: ForwardedRef<RnTextInput>) => {
    return (
      <View style={style}>
        <TextInput
          ref={ref}
          {...textInputProps}
          mode='outlined'
          value={field.value}
          error={fieldState.error?.message !== undefined}
          onChangeText={field.onChange}
        />
        {fieldState.error !== undefined && <HelperText type='error'>{fieldState.error?.message}</HelperText>}
      </View>
    )
  },
)

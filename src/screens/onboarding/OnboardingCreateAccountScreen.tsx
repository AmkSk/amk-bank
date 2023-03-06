import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList, Routes } from '../../navigation/navigationTypes'
import { ScreenTemplate } from '../ScreenTemplate'
import { Button, Text, TextInput } from 'react-native-paper'
import { Strings } from '../../i18n/strings'
import { StyleSheet, TextInput as RnTextInput, View } from 'react-native'
import { useRef, useState } from 'react'
import { CommonStyles } from '../../themes/CommonStyles'
import { useOnboardingStore } from '../../stores/onboardingStore'
import { Controller, useForm } from 'react-hook-form'
import { ValidatedTextInput } from '../../components/ValidatedTextInput'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isNumeric from 'validator/lib/isNumeric'

export function OnboardingCreateAccountScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, Routes.OnboardingCreateAccountScreen>) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const phonePrefix = useOnboardingStore((state) => state.phonePrefix)
  const phoneNumber = useOnboardingStore((state) => state.phoneNumber)
  const setPhoneNumber = useOnboardingStore((state) => state.setPhoneNumber)
  const setPhonePrefix = useOnboardingStore((state) => state.setPhonePrefix)

  const { control, handleSubmit, formState } = useForm({
    mode: 'onChange',
    defaultValues: { phonePrefix, phoneNumber, password },
  })

  const phoneInput = useRef<RnTextInput>(null)
  const pwdInput = useRef<RnTextInput>(null)

  const handleNextPress = () => {
    handleSubmit((formData) => {
      setPhonePrefix(formData.phonePrefix)
      setPhoneNumber(formData.phoneNumber)
      setPassword(formData.password)
      navigation.navigate(Routes.OnboardingEmailScreen)
    })()
  }

  return (
    <ScreenTemplate>
      <Text variant='headlineMedium'>{Strings.onboarding_create_account_title}</Text>
      <Text variant='bodyMedium'>{Strings.onboarding_create_account_subtitle}</Text>
      <View style={[CommonStyles.mt16, styles.phoneNumberInputs]}>
        <Controller
          name='phonePrefix'
          render={({ field, fieldState }) => (
            <TextInput
              mode='outlined'
              value={field.value}
              error={fieldState.error !== undefined}
              style={CommonStyles.flex1}
              keyboardType='number-pad'
              returnKeyType='next'
              maxLength={3}
              label={Strings.onboarding_create_account_placeholder_country_prefix}
              placeholder={Strings.onboarding_create_account_placeholder_country_prefix}
              onSubmitEditing={() => phoneInput.current?.focus()}
              onChangeText={field.onChange}
            />
          )}
          rules={{
            required: Strings.validation_empty_field,
            validate: (value: string) => isNumeric(value),
          }}
          control={control}
        />

        <Controller
          name='phoneNumber'
          render={({ field, fieldState }) => (
            <ValidatedTextInput
              ref={phoneInput}
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
              style={[CommonStyles.ml8, styles.phoneNumberInput]}
              keyboardType='number-pad'
              returnKeyType='next'
              label={Strings.onboarding_create_account_placeholder_phone_number}
              placeholder={Strings.onboarding_create_account_placeholder_phone_number}
              onSubmitEditing={() => pwdInput.current?.focus()}
            />
          )}
          rules={{
            required: Strings.validation_empty_field,
            validate: (value: string) => isMobilePhone(value) || Strings.validation_phone_number,
          }}
          control={control}
        />
      </View>

      <Controller
        name='password'
        render={({ field, fieldState }) => (
          <ValidatedTextInput
            ref={pwdInput}
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
            style={CommonStyles.mt8}
            secureTextEntry={!showPassword}
            right={<TextInput.Icon icon='eye' onPress={() => setShowPassword(!showPassword)} />}
            label={Strings.onboarding_create_account_placeholder_pwd}
            placeholder={Strings.onboarding_create_account_placeholder_pwd}
          />
        )}
        control={control}
        rules={{ required: Strings.validation_empty_field }}
      />

      <View style={CommonStyles.flex1} />

      <Button mode='contained' onPress={handleNextPress} disabled={!formState.isValid}>
        {Strings.button_next}
      </Button>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  phoneNumberInputs: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  phoneNumberInput: {
    flex: 3,
  },
})

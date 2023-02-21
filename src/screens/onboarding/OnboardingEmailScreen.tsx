import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList } from '../../navigation/NavigationTypes'
import { Routes } from '../../navigation/Routes'
import { ScreenTemplate } from '../ScreenTemplate'
import { Button, Text, TextInput } from 'react-native-paper'
import { Strings } from '../../i18n/Strings'
import { View } from 'react-native'
import { CommonStyles } from '../../themes/CommonStyles'
import { useOnboardingStore } from '../../stores/onboardingStore'
import { Controller, useForm } from 'react-hook-form'
import isEmail from 'validator/lib/isEmail'
import { ValidatedTextInput } from '../../components/ValidatedTextInput'

export function OnboardingEmailScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, Routes.OnboardingEmailScreen>) {
  const email = useOnboardingStore((state) => state.email)
  const setEmail = useOnboardingStore((state) => state.setEmail)

  const { control, handleSubmit, formState } = useForm({
    mode: 'onChange',
    defaultValues: { email },
  })

  const onNextPress = () => {
    handleSubmit((formData) => {
      setEmail(formData.email)
      navigation.navigate(Routes.OnboardingPersonalInfoScreen)
    })()
  }
  return (
    <ScreenTemplate>
      <Text variant='headlineMedium'>{Strings.onboarding_email_title}</Text>
      <Text variant='bodyMedium'>{Strings.onboarding_email_subtitle}</Text>
      <Controller
        render={({ field, fieldState }) => (
          <ValidatedTextInput
            field={field}
            style={CommonStyles.mt16}
            fieldState={fieldState}
            keyboardType='email-address'
            returnKeyType='done'
            label={Strings.onboarding_email_placeholder}
            placeholder={Strings.onboarding_email_placeholder}
            left={<TextInput.Icon icon='email' />}
            onChangeText={field.onChange}
          />
        )}
        rules={{
          required: Strings.validation_empty_field,
          validate: (value: string) => isEmail(value) || Strings.validation_email,
        }}
        name='email'
        control={control}
      />

      <View style={CommonStyles.flex1} />

      <Button mode='contained' onPress={onNextPress} disabled={!formState.isValid}>
        {Strings.button_next}
      </Button>
    </ScreenTemplate>
  )
}

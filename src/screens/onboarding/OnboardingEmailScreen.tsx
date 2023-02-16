import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList } from '../../navigation/NavigationTypes'
import { Routes } from '../../navigation/Routes'
import { ScreenTemplate } from '../ScreenTemplate'
import { Button, Text, TextInput } from 'react-native-paper'
import { Strings } from '../../i18n/Strings'
import { View } from 'react-native'
import { useEffect, useState } from 'react'
import { CommonStyles } from '../../themes/CommonStyles'
import { useOnboardingStore } from '../../stores/onboardingStore'

export function OnboardingEmailScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, Routes.OnboardingEmailScreen>) {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const email = useOnboardingStore((state) => state.email)
  const setEmail = useOnboardingStore((state) => state.setEmail)

  useEffect(() => {
    // TODO: Add email validation
    setIsButtonEnabled(email !== '')
  }, [email])

  const onNextPress = () => navigation.navigate(Routes.OnboardingPersonalInfoScreen)

  return (
    <ScreenTemplate>
      <Text variant='headlineMedium'>{Strings.onboarding_email_title}</Text>
      <Text variant='bodyMedium'>{Strings.onboarding_email_subtitle}</Text>
      <TextInput
        mode='outlined'
        keyboardType='email-address'
        returnKeyType='done'
        style={CommonStyles.mt8}
        label={Strings.onboarding_email_placeholder}
        placeholder={Strings.onboarding_email_placeholder}
        left={<TextInput.Icon icon='email' />}
        value={email}
        onChangeText={setEmail}
      />

      <View style={CommonStyles.flex1} />

      <Button mode='contained' onPress={onNextPress} disabled={!isButtonEnabled}>
        {Strings.button_next}
      </Button>
    </ScreenTemplate>
  )
}

import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList } from '../../navigation/NavigationTypes'
import { Routes } from '../../navigation/Routes'
import { ScreenTemplate } from '../ScreenTemplate'
import { Button, Text, TextInput } from 'react-native-paper'
import { Strings } from '../../i18n/Strings'
import { StyleSheet, TextInput as RnTextInput, View } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { CommonStyles } from '../../themes/CommonStyles'

export function OnboardingCreateAccountScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, Routes.OnboardingCreateAccountScreen>) {
  const [prefix, setPrefix] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  useEffect(() => {
    // TODO: Add phone number validation
    setIsButtonEnabled(prefix !== '' && phoneNumber !== '' && password !== '')
  }, [prefix, phoneNumber, password])

  const phoneInput = useRef<RnTextInput>(null)
  const pwdInput = useRef<RnTextInput>(null)
  const onNextPress = () => navigation.navigate(Routes.OnboardingEmailScreen)

  return (
    <ScreenTemplate>
      <Text variant='headlineMedium'>{Strings.onboarding_create_account_title}</Text>
      <Text variant='bodyMedium'>{Strings.onboarding_create_account_subtitle}</Text>
      <View style={[CommonStyles.mt16, styles.phoneNumberInputs]}>
        <TextInput
          mode='outlined'
          style={CommonStyles.flex1}
          keyboardType='number-pad'
          returnKeyType='next'
          maxLength={3}
          label={Strings.onboarding_create_account_placeholder_country_prefix}
          placeholder={Strings.onboarding_create_account_placeholder_country_prefix}
          onSubmitEditing={() => phoneInput.current?.focus()}
          value={prefix}
          onChangeText={setPrefix}
        />
        <TextInput
          ref={phoneInput}
          mode='outlined'
          style={[CommonStyles.ml8, styles.phoneNumberInput]}
          keyboardType='number-pad'
          returnKeyType='next'
          label={Strings.onboarding_create_account_placeholder_phone_number}
          placeholder={Strings.onboarding_create_account_placeholder_phone_number}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          onSubmitEditing={() => pwdInput.current?.focus()}
        />
      </View>

      <TextInput
        style={CommonStyles.mt8}
        mode='outlined'
        value={password}
        ref={pwdInput}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        right={<TextInput.Icon icon='eye' onPress={() => setShowPassword(!showPassword)} />}
        label={Strings.onboarding_create_account_placeholder_pwd}
        placeholder={Strings.onboarding_create_account_placeholder_pwd}
      />

      <View style={CommonStyles.flex1} />

      <Button mode='contained' onPress={onNextPress} disabled={!isButtonEnabled}>
        {Strings.button_next}
      </Button>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  phoneNumberInputs: {
    flexDirection: 'row',
  },
  phoneNumberInput: {
    flex: 3,
  },
})

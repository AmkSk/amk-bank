import { Keyboard, StyleSheet, TextInput as RnTextInput, View } from 'react-native'
import { Button, MD3Theme, Text, TextInput, useTheme } from 'react-native-paper'
import { CommonStyles } from '../themes/CommonStyles'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Strings } from '../i18n/Strings'
import { ScreenTemplate } from './ScreenTemplate'
import { AmkBankApi } from '../network/AmkBankClient'
import { useLoadingAction } from '../hooks/useLoadingAction'

export default function LoginScreen() {
  const theme = useTheme()
  const styles = useMemo(() => createStyleSheet(theme), [theme])

  const [phonePrefix, setPhonePrefix] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoginButtonEnabled, enableLoginButton] = useState(false)
  const [isBioAuthButtonVisible, showBioAuthButton] = useState(true)

  const phoneInput = useRef<RnTextInput>(null)
  const pwdInput = useRef<RnTextInput>(null)

  useEffect(
    () => enableLoginButton(phonePrefix !== '' && phoneNumber !== '' && password !== ''),
    [phoneNumber, phonePrefix, password],
  )

  const { loadingAction: loginAction } = useLoadingAction(AmkBankApi.logIn(phonePrefix + phoneNumber, password))

  const handleLoginPress = () => {
    Keyboard.dismiss()
    loginAction()
      .then(() => console.log('LOGIN SUCCESSFUL'))
      .catch(() => console.error('LOGIN FAILED'))
  }
  const handleBioLoginPress = () => {}

  return (
    <ScreenTemplate>
      <Text variant='headlineMedium'>{Strings.login_title}</Text>
      <Text variant='bodyMedium'>{Strings.login_subtitle}</Text>
      <View style={[CommonStyles.mt16, styles.phoneNumberInputs]}>
        <TextInput
          mode='outlined'
          value={phonePrefix}
          style={CommonStyles.flex1}
          keyboardType='number-pad'
          returnKeyType='next'
          maxLength={3}
          label={Strings.onboarding_create_account_placeholder_country_prefix}
          placeholder={Strings.onboarding_create_account_placeholder_country_prefix}
          onSubmitEditing={() => phoneInput.current?.focus()}
          onChangeText={setPhonePrefix}
        />

        <TextInput
          ref={phoneInput}
          mode='outlined'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={[CommonStyles.ml8, styles.phoneNumberInput]}
          keyboardType='number-pad'
          returnKeyType='next'
          label={Strings.onboarding_create_account_placeholder_phone_number}
          placeholder={Strings.onboarding_create_account_placeholder_phone_number}
          onSubmitEditing={() => pwdInput.current?.focus()}
        />
      </View>

      <TextInput
        ref={pwdInput}
        value={password}
        onChangeText={setPassword}
        mode='outlined'
        style={CommonStyles.mt8}
        secureTextEntry={!showPassword}
        left={<TextInput.Icon icon='lock' />}
        right={<TextInput.Icon icon='eye' onPress={() => setShowPassword(!showPassword)} />}
        label={Strings.onboarding_create_account_placeholder_pwd}
        placeholder={Strings.onboarding_create_account_placeholder_pwd}
      />

      {isBioAuthButtonVisible && (
        <Button
          style={[CommonStyles.mt16, styles.bioAuthButton]}
          mode='text'
          icon='fingerprint'
          onPress={handleBioLoginPress}
        >
          {Strings.login_biometric_auth}
        </Button>
      )}

      <View style={CommonStyles.flex1} />

      <Button mode='contained' onPress={handleLoginPress} disabled={!isLoginButtonEnabled}>
        {Strings.login}
      </Button>
    </ScreenTemplate>
  )
}
const createStyleSheet = (theme: MD3Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    phoneNumberInputs: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    phoneNumberInput: {
      flex: 3,
    },
    bioAuthButton: {
      alignSelf: 'center',
    },
  })
}

import { AsyncStorage, Keyboard, StyleSheet, TextInput as RnTextInput, View } from 'react-native'
import { Button, MD3Theme, Text, TextInput, useTheme } from 'react-native-paper'
import { CommonStyles } from '../../themes/CommonStyles'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Strings } from '../../i18n/strings'
import { ScreenTemplate } from '../ScreenTemplate'
import { AmkBankApi } from '../../network/AmkBankClient'
import * as LocalAuthentication from 'expo-local-authentication'
import { USER_PREFERENCES } from '../../constants'
import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList, Routes } from '../../navigation/navigationTypes'
import { LoadingContext } from '../../hooks/loadingContext'
import * as SecureStore from 'expo-secure-store'
import { BiometricAuthDialog } from './BiometricAuthDialog'
import { UserContext } from '../../hooks/userContext'

const AUTH_RESULT_ERROR_CANCEL = 'user_cancel'

export function LoginScreen({ navigation }: NativeStackScreenProps<RootStackParamList, Routes.LoginScreen>) {
  const theme = useTheme()
  const styles = useMemo(() => createStyleSheet(theme), [theme])

  const [phonePrefix, setPhonePrefix] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isBioAuthButtonVisible, showBioAuthButton] = useState(false)
  const [isBioLoginDialogVisible, setBioLoginDialogVisible] = useState(false)
  const isLoginButtonEnabled = phonePrefix !== '' && phoneNumber !== '' && password !== ''

  const { showLoading } = useContext(LoadingContext)
  const { setUserLoggedIn } = useContext(UserContext)

  const phoneInput = useRef<RnTextInput>(null)
  const pwdInput = useRef<RnTextInput>(null)

  useEffect(() => {
    const fetchBioAuthSetUp = async () => {
      const value = await AsyncStorage.getItem(USER_PREFERENCES.biometricAuthSetUp)
      showBioAuthButton(value === 'true')
    }
    fetchBioAuthSetUp()
  }, [])

  const callLoginRequest = async (username: string, password: string) => {
    try {
      await AmkBankApi.logIn(username, password)
      return true
    } catch {
      showErrorDialog(Strings.login_request_error)
      return false
    }
  }

  const handleLoginButtonPress = async () => {
    Keyboard.dismiss()
    showLoading(true)
    const success = await callLoginRequest(phonePrefix + phoneNumber, password)
    showLoading(false)

    if (success) {
      await handleBiometricAuthenticationSetup()
    }
  }

  const handleBiometricAuthenticationSetup = async () => {
    const [isBiometricAuthAvailable, isBiometricAuthSetUp, doNotShowBiometricAuthSetupDialog] = await Promise.all([
      LocalAuthentication.isEnrolledAsync(),
      AsyncStorage.getItem(USER_PREFERENCES.biometricAuthSetUp),
      AsyncStorage.getItem(USER_PREFERENCES.doNotShowBiometricAuthSetupDialog),
    ])

    if (isBiometricAuthAvailable && isBiometricAuthSetUp !== 'true' && doNotShowBiometricAuthSetupDialog !== 'true') {
      setBioLoginDialogVisible(true)
    } else {
      navigateToDashboard()
    }
  }

  const navigateToDashboard = () => {
    setUserLoggedIn(true)
    navigation.replace(Routes.TabNavigator)
  }

  const showErrorDialog = (error?: string) => {
    if (error !== AUTH_RESULT_ERROR_CANCEL) {
      // TODO introduce better error presentation
      alert(`LOGIN FAILED! ${error}`)
    }
  }

  const startBiometricLogin = async () => {
    const result = await LocalAuthentication.authenticateAsync()
    if (result.success) {
      try {
        const [username, password] = await Promise.all([
          SecureStore.getItemAsync(USER_PREFERENCES.username),
          SecureStore.getItemAsync(USER_PREFERENCES.password),
        ])

        showLoading(true)
        const success = await callLoginRequest(username ?? '', password ?? '')
        showLoading(false)

        if (success) {
          navigateToDashboard()
        }
      } catch {
        showErrorDialog(Strings.login_biometric_auth_error)
      }
    } else {
      showErrorDialog(result.error)
    }
  }

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
        right={
          <TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />
        }
        label={Strings.onboarding_create_account_placeholder_pwd}
        placeholder={Strings.onboarding_create_account_placeholder_pwd}
      />

      {isBioAuthButtonVisible && (
        <Button
          style={[CommonStyles.mt16, styles.bioAuthButton]}
          mode='text'
          icon='fingerprint'
          onPress={startBiometricLogin}
        >
          {Strings.login_biometric_auth}
        </Button>
      )}

      <View style={CommonStyles.flex1} />

      <Button mode='contained' onPress={handleLoginButtonPress} disabled={!isLoginButtonEnabled}>
        {Strings.login}
      </Button>

      <BiometricAuthDialog
        isVisible={isBioLoginDialogVisible}
        username={phonePrefix + phonePrefix}
        password={password}
        dismissDialog={() => setBioLoginDialogVisible(false)}
        onSuccess={navigateToDashboard}
        onFailure={showErrorDialog}
      />
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

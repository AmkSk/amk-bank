import { AsyncStorage, Keyboard, StyleSheet, TextInput as RnTextInput, View } from 'react-native'
import { Button, MD3Theme, Text, TextInput, useTheme } from 'react-native-paper'
import { CommonStyles } from '../../themes/CommonStyles'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Strings } from '../../i18n/Strings'
import { ScreenTemplate } from './../ScreenTemplate'
import { AmkBankApi } from '../../network/AmkBankClient'
import * as LocalAuthentication from 'expo-local-authentication'
import { USER_PREFERENCES } from '../../Constants'
import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList } from '../../navigation/NavigationTypes'
import { Routes } from '../../navigation/Routes'
import { LoadingContext } from '../../hooks/useLoadingAction'
import * as SecureStore from 'expo-secure-store'
import { BiometricAuthDialog } from './BiometricAuthDialog'

const AUTH_RESULT_ERROR_CANCEL = 'user_cancel'

export default function LoginScreen({ navigation }: NativeStackScreenProps<RootStackParamList, Routes.LoginScreen>) {
  const theme = useTheme()
  const styles = useMemo(() => createStyleSheet(theme), [theme])

  const [phonePrefix, setPhonePrefix] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoginButtonEnabled, enableLoginButton] = useState(false)
  const [isBioAuthButtonVisible, showBioAuthButton] = useState(false)
  const [isBioLoginDialogVisible, setBioLoginDialogVisible] = useState(false)

  const { showLoading } = useContext(LoadingContext)

  const phoneInput = useRef<RnTextInput>(null)
  const pwdInput = useRef<RnTextInput>(null)

  useEffect(
    () => enableLoginButton(phonePrefix !== '' && phoneNumber !== '' && password !== ''),
    [phoneNumber, phonePrefix, password],
  )

  useEffect(() => {
    AsyncStorage.getItem(USER_PREFERENCES.biometricAuthSetUp).then((value) => showBioAuthButton(value === 'true'))
  }, [])

  const handleLoginButtonPress = () => {
    Keyboard.dismiss()
    showLoading(true)

    AmkBankApi.logIn(phonePrefix + phoneNumber, password)
      .then(() => handleBiometricAuthenticationSetup())
      .catch(() => handleFailedLogin())
  }

  const handleBiometricAuthenticationSetup = () => {
    Promise.all([
      LocalAuthentication.isEnrolledAsync(),
      AsyncStorage.getItem(USER_PREFERENCES.biometricAuthSetUp),
      AsyncStorage.getItem(USER_PREFERENCES.doNotShowBiometricAuthSetupDialog),
    ]).then(([isBiometricAuthAvailable, isBiometricAuthSetUp, doNotShowBiometricAuthSetupDialog]) => {
      if (isBiometricAuthAvailable && isBiometricAuthSetUp !== 'true' && doNotShowBiometricAuthSetupDialog !== 'true') {
        showLoading(false)
        setBioLoginDialogVisible(true)
      } else {
        handleSuccessfulLogin()
      }
    })
  }

  const startBiometricLogin = () => {
    LocalAuthentication.authenticateAsync().then((result) => {
      if (result.success) {
        showLoading(true)

        Promise.all([
          SecureStore.getItemAsync(USER_PREFERENCES.username),
          SecureStore.getItemAsync(USER_PREFERENCES.password),
        ])
          .then(([username, password]) =>
            AmkBankApi.logIn(username ?? '', password ?? '')
              .then(() => handleSuccessfulLogin())
              .catch(() => handleFailedLogin()),
          )
          .catch(() => handleFailedLogin(Strings.login_biometric_auth_error))
      } else {
        handleFailedLogin(result.error)
      }
    })
  }

  const handleSuccessfulLogin = () => {
    showLoading(false)
    navigation.replace(Routes.DashboardScreen)
  }
  const handleFailedLogin = (error?: string) => {
    showLoading(false)

    // TODO introduce better error handling
    if (error !== AUTH_RESULT_ERROR_CANCEL) {
      alert(`LOGIN FAILED! ${error}`)
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
        onSuccess={handleSuccessfulLogin}
        onFailure={handleFailedLogin}
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

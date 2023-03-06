import { Button, Dialog, Portal, Text } from 'react-native-paper'
import { Strings } from '../../i18n/strings'
import { AsyncStorage } from 'react-native'
import { USER_PREFERENCES } from '../../constants'
import * as LocalAuthentication from 'expo-local-authentication'
import * as SecureStore from 'expo-secure-store'

interface Props {
  isVisible: boolean
  username: string
  password: string
  dismissDialog: () => void
  onSuccess: () => void
  onFailure: (error: string) => void
}

export function BiometricAuthDialog({ isVisible, username, password, dismissDialog, onSuccess, onFailure }: Props) {
  const handlePositiveAction = () => {
    dismissDialog()
    LocalAuthentication.authenticateAsync().then((result) => {
      if (result.success) {
        Promise.all([
          SecureStore.setItemAsync(USER_PREFERENCES.username, username),
          SecureStore.setItemAsync(USER_PREFERENCES.password, password),
          AsyncStorage.setItem(USER_PREFERENCES.biometricAuthSetUp, 'true'),
        ]).then(() => onSuccess())
      } else {
        onFailure(result.error)
      }
    })
  }

  const handleNegativeAction = () => {
    AsyncStorage.setItem(USER_PREFERENCES.doNotShowBiometricAuthSetupDialog, 'true').then(() => {
      dismissDialog()
      onSuccess()
    })
  }

  return (
    <Portal>
      <Dialog visible={isVisible} dismissable={false}>
        <Dialog.Title>{Strings.login_biometric_auth_dialog_title}</Dialog.Title>
        <Dialog.Content>
          <Text variant='bodyMedium'>{Strings.login_biometric_auth_dialog_message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleNegativeAction}>{Strings.no}</Button>
          <Button onPress={handlePositiveAction}>{Strings.yes}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

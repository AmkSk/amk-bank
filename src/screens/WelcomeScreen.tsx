import { Image, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList } from '../navigation/NavigationTypes'
import { Routes } from '../navigation/Routes'
import { ScreenTemplate } from './ScreenTemplate'

export default function WelcomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, Routes.WelcomeScreen>) {
  return (
    <ScreenTemplate style={styles.container}>
      <Image style={styles.image} source={require('../../assets/images/onboarding_3.png')} />

      <Text variant='headlineMedium' style={styles.text}>
        Create your Coinpay account
      </Text>
      <Text variant='bodyMedium' style={styles.text}>
        Coinpay is a powerful tool that allows you to easily send, receive, and track all your transactions.
      </Text>

      <View style={styles.buttons}>
        <View>
          <Button mode='contained' style={styles.button} onPress={() => console.log('Open signup')}>
            Sign up
          </Button>
          <Button mode='outlined' style={styles.button} onPress={() => navigation.navigate(Routes.LoginScreen)}>
            Log in
          </Button>
        </View>
      </View>

      <Text variant='bodySmall' style={styles.text}>
        By continuing you accept our Terms of Service and Privacy Policy
      </Text>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    marginTop: 32,
    marginBottom: 16,
  },
  text: {
    marginTop: 16,
    textAlign: 'center',
  },
  buttons: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-around',
  },
  button: {
    marginTop: 16,
  },
})

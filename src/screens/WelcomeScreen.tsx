import { Image, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList } from '../navigation/NavigationTypes'
import { Routes } from '../navigation/Routes'
import { ScreenTemplate } from './ScreenTemplate'
import { Strings } from '../i18n/Strings'

export default function WelcomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, Routes.WelcomeScreen>) {
  return (
    <ScreenTemplate style={styles.container}>
      <Image style={styles.image} source={require('../../assets/images/onboarding_3.png')} />

      <Text variant='headlineMedium' style={styles.text}>
        {Strings.welcome_title}
      </Text>
      <Text variant='bodyMedium' style={styles.text}>
        {Strings.welcome_subtitle}
      </Text>

      <View style={styles.buttons}>
        <View>
          <Button mode='contained' style={styles.button} onPress={() => console.log('Open signup')}>
            {Strings.welcome_sign_up}
          </Button>
          <Button mode='outlined' style={styles.button} onPress={() => navigation.navigate(Routes.LoginScreen)}>
            {Strings.welcome_log_in}
          </Button>
        </View>
      </View>

      <Text variant='bodySmall' style={styles.text}>
        {Strings.welcome_toc}
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

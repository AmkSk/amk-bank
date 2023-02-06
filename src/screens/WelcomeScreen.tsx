import { Image, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList } from '../navigation/NavigationTypes'
import { Routes } from '../navigation/Routes'
import { ScreenTemplate } from './ScreenTemplate'
import { theme } from '../themes/Theme'
import { Strings } from '../i18n/Strings'
import { CommonStyles } from '../themes/CommonStyles'

export default function WelcomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, Routes.WelcomeScreen>) {
  const onSignupPress = () => navigation.navigate(Routes.OnboardingCreateAccountScreen)
  const onLoginPress = () => navigation.navigate(Routes.LoginScreen)
  const onTosPress = () => navigation.navigate(Routes.TosModal)
  const onPrivacyPolicyPress = () => navigation.navigate(Routes.PrivacyPolicyModal)

  return (
    <ScreenTemplate style={styles.container}>
      <Image style={styles.image} source={require('../../assets/images/onboarding_3.png')} />

      <Text variant='headlineMedium' style={styles.text}>
        {Strings.welcome_title}
      </Text>
      <Text variant='bodyMedium' style={styles.text}>
        {Strings.welcome_subtitle}
      </Text>

      <View style={[CommonStyles.flex1, styles.buttons]}>
        <View>
          <Button mode='contained' style={styles.button} onPress={onSignupPress}>
            {Strings.welcome_sign_up}
          </Button>
          <Button mode='outlined' style={styles.button} onPress={onLoginPress}>
            {Strings.welcome_log_in}
          </Button>
        </View>
      </View>

      <Text variant='bodySmall' style={styles.text}>
        {Strings.welcome_toc}
        {'\n'}
        <Text style={styles.clickableText} onPress={onTosPress}>
          {Strings.terms_of_service_title}{' '}
        </Text>
        {Strings.and}{' '}
        <Text style={styles.clickableText} onPress={onPrivacyPolicyPress}>
          {Strings.privacy_policy_title}
        </Text>
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
    justifyContent: 'space-around',
  },
  button: {
    marginTop: 16,
  },
  clickableText: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
})

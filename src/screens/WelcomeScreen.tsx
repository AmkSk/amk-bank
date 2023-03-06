import { Image, StyleSheet, View } from 'react-native'
import { Button, MD3Theme, Text, useTheme } from 'react-native-paper'
import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList, Routes } from '../navigation/navigationTypes'
import { ScreenTemplate } from './ScreenTemplate'
import { Strings } from '../i18n/strings'
import { CommonStyles } from '../themes/CommonStyles'
import { useMemo } from 'react'

export function WelcomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, Routes.WelcomeScreen>) {
  const theme = useTheme()
  const styles = useMemo(() => createStyleSheet(theme), [theme])

  const onSignupPress = () => navigation.navigate(Routes.OnboardingCreateAccountScreen)
  const onLoginPress = () => navigation.navigate(Routes.LoginScreen)
  const onTosPress = () => navigation.navigate(Routes.TosModal)
  const onPrivacyPolicyPress = () => navigation.navigate(Routes.PrivacyPolicyModal)

  return (
    <ScreenTemplate style={styles.container}>
      <Image style={[CommonStyles.mt32, CommonStyles.mb16]} source={require('../../assets/images/onboarding_3.png')} />

      <Text variant='headlineMedium' style={styles.text}>
        {Strings.welcome_title}
      </Text>
      <Text variant='bodyMedium' style={styles.text}>
        {Strings.welcome_subtitle}
      </Text>

      <View style={[CommonStyles.flex1, styles.buttons]}>
        <View>
          <Button mode='contained' style={CommonStyles.mt16} onPress={onSignupPress}>
            {Strings.welcome_sign_up}
          </Button>
          <Button mode='outlined' style={CommonStyles.mt16} onPress={onLoginPress}>
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

const createStyleSheet = (theme: MD3Theme) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    text: {
      marginTop: 16,
      textAlign: 'center',
    },
    buttons: {
      width: '100%',
      justifyContent: 'space-around',
    },
    clickableText: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
  })
}

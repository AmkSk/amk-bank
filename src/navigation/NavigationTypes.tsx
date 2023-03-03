import { Routes } from './Routes'

export type RootStackParamList = {
  [Routes.LoginScreen]: undefined
  [Routes.WelcomeScreen]: undefined
  [Routes.IntroScreen]: undefined
  [Routes.TosModal]: undefined
  [Routes.PrivacyPolicyModal]: undefined
  // Onboarding
  [Routes.OnboardingCreateAccountScreen]: undefined
  [Routes.OnboardingEmailScreen]: undefined
  [Routes.OnboardingPersonalInfoScreen]: undefined
  [Routes.OnboardingCountryScreen]: undefined
  // Authenticated Screens
  [Routes.DashboardScreen]: undefined
}

export enum Routes {
  IntroScreen = 'IntroScreen',
  WelcomeScreen = 'WelcomeScreen',
  LoginScreen = 'LoginScreen',
  TosModal = 'TosModal',
  PrivacyPolicyModal = 'PrivacyPolicyModal',
  // Onboarding
  OnboardingCreateAccountScreen = 'OnboardingCreateAccountScreen',
  OnboardingEmailScreen = 'OnboardingEmailScreen',
  OnboardingPersonalInfoScreen = 'OnboardingPersonalInfoScreen',
  OnboardingCountryScreen = 'OnboardingCountryScreen',
  // Authenticated Screens
  DashboardScreen = 'DashboardScreen',
}

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

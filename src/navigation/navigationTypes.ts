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
  TabNavigator = 'TabNavigator',
  DashboardScreen = 'DashboardScreen',
  AnalyticsScreen = 'AnalyticsScreen',
  SettingsScreen = 'SettingsScreen',
  SupportScreen = 'SupportScreen',
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
  // Authenticated Screens in BottomTab
  [Routes.TabNavigator]: undefined
}

export type TabParamList = {
  // Authenticated Screens
  [Routes.DashboardScreen]: undefined
  [Routes.AnalyticsScreen]: undefined
  [Routes.SettingsScreen]: undefined
  [Routes.SupportScreen]: undefined
}

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList, Routes } from './navigationTypes'
import { IntroScreen } from '../screens/IntroScreen'
import { WelcomeScreen } from '../screens/WelcomeScreen'
import { LoginScreen } from '../screens/login/LoginScreen'
import { OnboardingCreateAccountScreen } from '../screens/onboarding/OnboardingCreateAccountScreen'
import { OnboardingEmailScreen } from '../screens/onboarding/OnboardingEmailScreen'
import { OnboardingPersonalInfoScreen } from '../screens/onboarding/OnboardingPersonalInfoScreen'
import { OnboardingCountryScreen } from '../screens/onboarding/OnboardingCountryScreen'
import { TosModalScreen } from '../screens/TosModalScreen'
import { PrivacyPolicyModalScreen } from '../screens/PrivacyPolicyModalScreen'
import { useContext } from 'react'
import { UserContext } from '../hooks/userContext'
import { TabNavigator } from './TabNavigator'

interface Props {
  shouldHideIntroScreens: boolean
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

export function RootStackNavigator({ shouldHideIntroScreens }: Props) {
  const userContext = useContext(UserContext)

  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{ animation: 'slide_from_right', animationDuration: 100 }}>
        {shouldHideIntroScreens ? undefined : (
          <RootStack.Screen name={Routes.IntroScreen} component={IntroScreen} options={{ headerShown: false }} />
        )}
        <RootStack.Screen name={Routes.WelcomeScreen} component={WelcomeScreen} options={{ title: '' }} />
        <RootStack.Screen name={Routes.LoginScreen} component={LoginScreen} options={{ title: '' }} />
        <RootStack.Screen
          name={Routes.OnboardingCreateAccountScreen}
          component={OnboardingCreateAccountScreen}
          options={{ title: '' }}
        />
        <RootStack.Screen
          name={Routes.OnboardingEmailScreen}
          component={OnboardingEmailScreen}
          options={{ title: '' }}
        />
        <RootStack.Screen
          name={Routes.OnboardingPersonalInfoScreen}
          component={OnboardingPersonalInfoScreen}
          options={{ title: '' }}
        />
        <RootStack.Screen
          name={Routes.OnboardingCountryScreen}
          component={OnboardingCountryScreen}
          options={{ title: '' }}
        />
      </RootStack.Group>

      {userContext.userLoggedIn && (
        <RootStack.Screen name={Routes.TabNavigator} component={TabNavigator} options={{ headerShown: false }} />
      )}

      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name={Routes.TosModal} component={TosModalScreen} options={{ title: '' }} />
        <RootStack.Screen
          name={Routes.PrivacyPolicyModal}
          component={PrivacyPolicyModalScreen}
          options={{ title: '' }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider as PaperProvider } from 'react-native-paper'

import { RootStackParamList, Routes } from './src/navigation/navigationTypes'
import { IntroScreen } from './src/screens/IntroScreen'
import { LoginScreen } from './src/screens/login/LoginScreen'
import { theme } from './src/themes/Theme'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { WelcomeScreen } from './src/screens/WelcomeScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_PREFERENCES } from './src/constants'
import { TosModalScreen } from './src/screens/TosModalScreen'
import { PrivacyPolicyModalScreen } from './src/screens/PrivacyPolicyModalScreen'
import { OnboardingCreateAccountScreen } from './src/screens/onboarding/OnboardingCreateAccountScreen'
import { OnboardingEmailScreen } from './src/screens/onboarding/OnboardingEmailScreen'
import { OnboardingPersonalInfoScreen } from './src/screens/onboarding/OnboardingPersonalInfoScreen'
import { OnboardingCountryScreen } from './src/screens/onboarding/OnboardingCountryScreen'
import { LoadingContextProvider } from './src/hooks/loadingContext'
import { DashboardScreen } from './src/screens/DashboardScreen'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [shouldHideIntro, setShouldHideIntro] = useState<boolean | null>(null)
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  useEffect(() => {
    const fetchIntroHidingFlag = async () => {
      // Skip the intro when the user already went through the Intro Screen
      const value = await AsyncStorage.getItem(USER_PREFERENCES.userFinishedIntro)
      setShouldHideIntro(value === 'true')
    }
    fetchIntroHidingFlag()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && shouldHideIntro !== null) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, shouldHideIntro])

  if (!fontsLoaded || shouldHideIntro === null) {
    return null
  }

  const RootStack = createNativeStackNavigator<RootStackParamList>()

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <LoadingContextProvider>
              <RootStack.Navigator>
                <RootStack.Group screenOptions={{ animation: 'slide_from_right', animationDuration: 100 }}>
                  {shouldHideIntro ? undefined : (
                    <RootStack.Screen
                      name={Routes.IntroScreen}
                      component={IntroScreen}
                      options={{ headerShown: false }}
                    />
                  )}
                  <RootStack.Screen name={Routes.WelcomeScreen} component={WelcomeScreen} options={{ title: '' }} />
                  <RootStack.Screen name={Routes.LoginScreen} component={LoginScreen} options={{ title: '' }} />
                  <RootStack.Screen name={Routes.DashboardScreen} component={DashboardScreen} options={{ title: '' }} />
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
                <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                  <RootStack.Screen name={Routes.TosModal} component={TosModalScreen} options={{ title: '' }} />
                  <RootStack.Screen
                    name={Routes.PrivacyPolicyModal}
                    component={PrivacyPolicyModalScreen}
                    options={{ title: '' }}
                  />
                </RootStack.Group>
              </RootStack.Navigator>
            </LoadingContextProvider>
          </View>
        </PaperProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  )
}

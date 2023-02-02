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

import { Routes } from './src/navigation/Routes'
import IntroScreen from './src/screens/IntroScreen'
import LoginScreen from './src/screens/LoginScreen'
import { theme } from './src/themes/Theme'
import { RootStackParamList } from './src/navigation/NavigationTypes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useState } from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_PREFERENCES } from './src/Constants'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [shouldHideIntro, setShouldHideIntro] = useState<boolean | null>(null)
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  // Skip the intro when the user already went through the Intro Screen
  AsyncStorage.getItem(USER_PREFERENCES.userFinishedIntro).then((value) => {
    setShouldHideIntro(value === 'true')
  })

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
            <RootStack.Navigator>
              {shouldHideIntro ? undefined : (
                <RootStack.Screen name={Routes.IntroScreen} component={IntroScreen} options={{ headerShown: false }} />
              )}
              <RootStack.Screen name={Routes.LoginScreen} component={LoginScreen} />
            </RootStack.Navigator>
          </View>
        </PaperProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  )
}

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import { theme } from './src/themes/Theme'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_PREFERENCES } from './src/constants'
import { LoadingContextProvider } from './src/hooks/loadingContext'
import { RootStackNavigator } from './src/navigation/RootStackNavigator'
import { UserContextProvider } from './src/hooks/userContext'

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

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <LoadingContextProvider>
              <UserContextProvider>
                <RootStackNavigator shouldHideIntroScreens={shouldHideIntro} />
              </UserContextProvider>
            </LoadingContextProvider>
          </View>
        </PaperProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  )
}

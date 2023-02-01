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
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'
import { View } from 'react-native'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const fontsLoaded = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  const RootStack = createNativeStackNavigator<RootStackParamList>()

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <RootStack.Navigator>
            <RootStack.Screen name={Routes.IntroScreen} component={IntroScreen} />
            <RootStack.Screen name={Routes.LoginScreen} component={LoginScreen} />
          </RootStack.Navigator>
        </View>
      </PaperProvider>
    </NavigationContainer>
  )
}

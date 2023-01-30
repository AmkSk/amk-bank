import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { NativeStackScreenProps } from 'react-native-screens/native-stack'

import { RootStackParamList } from '../navigation/NavigationTypes'
import { Routes } from '../navigation/Routes'

export default function IntroScreen({ navigation }: NativeStackScreenProps<RootStackParamList, Routes.IntroScreen>) {
  const onNextClicked = () => navigation.navigate(Routes.LoginScreen)

  return (
    <View>
      <Text variant='headlineMedium'>Intro Screen</Text>
      <Button onPress={onNextClicked}>Next screen</Button>
    </View>
  )
}

import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList } from '../navigation/NavigationTypes'
import { Routes } from '../navigation/Routes'
import { ScreenTemplate } from './ScreenTemplate'
import { Text } from 'react-native-paper'

export function DashboardScreen({ navigation }: NativeStackScreenProps<RootStackParamList, Routes.DashboardScreen>) {
  return (
    <ScreenTemplate>
      <Text variant='headlineMedium'>Dashboard screen</Text>
    </ScreenTemplate>
  )
}

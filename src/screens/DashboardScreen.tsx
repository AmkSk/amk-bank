import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList, Routes } from '../navigation/navigationTypes'
import { ScreenTemplate } from './ScreenTemplate'
import { Text } from 'react-native-paper'

export function DashboardScreen({ navigation }: NativeStackScreenProps<RootStackParamList, Routes.DashboardScreen>) {
  return (
    <ScreenTemplate>
      <Text variant='headlineMedium'>Dashboard screen</Text>
    </ScreenTemplate>
  )
}

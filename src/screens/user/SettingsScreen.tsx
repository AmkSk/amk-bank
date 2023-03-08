import { Text } from 'react-native-paper'
import { ScreenTemplate } from '../ScreenTemplate'
import { ScrollView } from 'react-native'

export function SettingsScreen() {
  return (
    <ScreenTemplate>
      <ScrollView>
        <Text variant='headlineMedium'>Settings Screen</Text>
      </ScrollView>
    </ScreenTemplate>
  )
}

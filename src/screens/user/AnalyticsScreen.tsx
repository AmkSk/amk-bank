import { Text } from 'react-native-paper'
import { ScreenTemplate } from '../ScreenTemplate'
import { ScrollView } from 'react-native'

export function AnalyticsScreen() {
  return (
    <ScreenTemplate>
      <ScrollView>
        <Text variant='headlineMedium'>Analytics Screen</Text>
      </ScrollView>
    </ScreenTemplate>
  )
}

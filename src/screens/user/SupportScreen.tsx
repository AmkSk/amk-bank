import { Text } from 'react-native-paper'
import { ScreenTemplate } from '../ScreenTemplate'
import { ScrollView } from 'react-native'

export function SupportScreen() {
  return (
    <ScreenTemplate>
      <ScrollView>
        <Text variant='headlineMedium'>Support Screen</Text>
      </ScrollView>
    </ScreenTemplate>
  )
}

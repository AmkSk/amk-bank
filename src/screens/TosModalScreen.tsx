import { Text } from 'react-native-paper'
import { ScreenTemplate } from './ScreenTemplate'
import { ScrollView } from 'react-native'
import { Strings } from '../i18n/Strings'

export function TosModalScreen() {
  return (
    <ScreenTemplate>
      <ScrollView>
        <Text variant='headlineMedium'>{Strings.terms_of_service_title}</Text>
        <Text variant='bodyMedium' style={{ marginTop: 16, textAlign: 'justify' }}>
          {Strings.terms_of_service_content}
        </Text>
      </ScrollView>
    </ScreenTemplate>
  )
}

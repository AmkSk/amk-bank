import { Text } from 'react-native-paper'
import { ScreenTemplate } from './ScreenTemplate'
import { Strings } from '../i18n/Strings'
import { ScrollView } from 'react-native'

export default function PrivacyPolicyModalScreen() {
  return (
    <ScreenTemplate>
      <ScrollView>
        <Text variant='headlineMedium'>{Strings.privacy_policy_title}</Text>
        <Text variant='bodyMedium' style={{ marginTop: 16, textAlign: 'justify' }}>
          {Strings.privacy_policy_content}
        </Text>
      </ScrollView>
    </ScreenTemplate>
  )
}

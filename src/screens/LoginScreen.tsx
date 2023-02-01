import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text variant='displayLarge'>Display Large</Text>
      <Text variant='displayMedium'>Display Medium</Text>
      <Text variant='displaySmall'>Display small</Text>

      <Text variant='headlineLarge'>Headline Large</Text>
      <Text variant='headlineMedium'>Headline Medium</Text>
      <Text variant='headlineSmall'>Headline Small</Text>

      <Text variant='titleLarge'>Title Large</Text>
      <Text variant='titleMedium'>Title Medium</Text>
      <Text variant='titleSmall'>Title Small</Text>

      <Text variant='bodyLarge'>Body Large</Text>
      <Text variant='bodyMedium'>Body Medium</Text>
      <Text variant='bodySmall'>Body Small</Text>

      <Text variant='labelLarge'>Label Large</Text>
      <Text variant='labelMedium'>Label Medium</Text>
      <Text variant='labelSmall'>Label Small</Text>
      <StatusBar style='auto' />
      <Button onPress={() => {}}>Click me</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
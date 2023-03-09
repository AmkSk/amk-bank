import { MD3Theme, Portal, Snackbar, Text, useTheme } from 'react-native-paper'
import { StyleSheet } from 'react-native'

interface Props {
  visible: boolean
  setVisible: (visible: boolean) => void
  message: string
}

export function ErrorSnackbar({ visible, setVisible, message }: Props) {
  const theme = useTheme()
  const styles = createStyleSheet(theme)

  return (
    <Portal>
      <Snackbar visible={visible} onDismiss={() => setVisible(false)} style={styles.container}>
        <Text variant='bodyMedium' style={styles.text}>
          {message}
        </Text>
      </Snackbar>
    </Portal>
  )
}

const createStyleSheet = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.errorContainer,
    },
    text: {
      color: theme.colors.onErrorContainer,
    },
  })

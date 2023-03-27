import { MD3Theme, Portal, Snackbar, Text, useTheme } from 'react-native-paper'
import { StyleSheet } from 'react-native'

interface Props {
  errorMessage: string | null
  setErrorMessage: (errorMessage: string | null) => void
}

export function ErrorSnackbar({ errorMessage, setErrorMessage }: Props) {
  const theme = useTheme()
  const styles = createStyleSheet(theme)

  return (
    <Portal>
      <Snackbar visible={errorMessage !== null} onDismiss={() => setErrorMessage(null)} style={styles.container}>
        <Text variant='bodyMedium' style={styles.text}>
          {errorMessage}
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

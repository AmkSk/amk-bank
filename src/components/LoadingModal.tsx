import { ActivityIndicator, MD3Theme, Modal, Portal, useTheme } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { useMemo } from 'react'

interface Props {
  visible: boolean
}

export function LoadingModal({ visible }: Props) {
  const theme = useTheme()
  const styles = useMemo(() => createStyleSheet(theme), [theme])

  return (
    <Portal>
      <Modal visible={visible} style={styles.modal} dismissable={false}>
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      </Modal>
    </Portal>
  )
}

const createStyleSheet = (theme: MD3Theme) => {
  return StyleSheet.create({
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      paddingHorizontal: 64,
      paddingVertical: 32,
      backgroundColor: theme.colors.background,
      borderRadius: 32,
    },
  })
}

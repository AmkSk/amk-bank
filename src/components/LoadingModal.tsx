import { ActivityIndicator, Modal, Portal } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { theme } from '../themes/Theme'

interface Props {
  visible: boolean
}

export function LoadingModal({ visible }: Props) {
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

const styles = StyleSheet.create({
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

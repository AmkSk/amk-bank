import { Transaction, TransactionType } from '../data/types'
import { FlatList, StyleSheet, View } from 'react-native'
import { IconButton, MD3Theme, Text, TouchableRipple, useTheme } from 'react-native-paper'
import { colors } from '../themes/Colors'

interface Props {
  data: Transaction[]
  onItemPressed?: (transactionId: number) => void
}

export function TransactionList({ data, onItemPressed }: Props) {
  const theme = useTheme()
  const styles = createStyleSheet(theme)

  return (
    <FlatList
      data={data}
      renderItem={(listItem) => {
        const transactionTypeIconProps =
          listItem.item.type === TransactionType.Expense
            ? { icon: 'arrow-up', iconColor: colors.orange, containerColor: colors.orange100 }
            : { icon: 'arrow-down', iconColor: colors.green, containerColor: colors.green100 }

        return (
          <TouchableRipple onPress={() => (onItemPressed ? onItemPressed(listItem.item.id) : undefined)}>
            <View>
              <View style={styles.transaction}>
                <IconButton {...transactionTypeIconProps} />
                <Text variant='bodyMedium' style={styles.text} numberOfLines={1}>
                  {listItem.item.name}
                </Text>
                <IconButton icon='chevron-right' />
              </View>
            </View>
          </TouchableRipple>
        )
      }}
      ItemSeparatorComponent={() => <View style={styles.horizontalDivider} />}
    />
  )
}

const createStyleSheet = (theme: MD3Theme) => {
  return StyleSheet.create({
    transaction: {
      height: 64,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    text: {
      flex: 1,
      marginHorizontal: 8,
    },
    horizontalDivider: {
      borderBottomWidth: 1,
      marginHorizontal: 16,
      borderStyle: 'solid',
      borderColor: theme.colors.backdrop,
    },
  })
}

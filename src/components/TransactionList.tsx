import { Transaction, TransactionType } from '../data/types'
import { FlatList, StyleSheet, View } from 'react-native'
import { IconButton, MD3Theme, Text, TouchableRipple, useTheme } from 'react-native-paper'
import { colors } from '../themes/Colors'
import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder'

interface Props {
  data: Transaction[]
  isLoading: boolean
  onItemPressed?: (transactionId: number) => void
}

export function TransactionList({ data, isLoading, onItemPressed }: Props) {
  const theme = useTheme()
  const styles = createStyleSheet(theme)

  const loadingContent = (
    <View>
      <Placeholder style={styles.placeholder} Animation={Fade} Left={PlaceholderMedia}>
        <PlaceholderLine width={80} />
        <PlaceholderLine width={30} />
      </Placeholder>
      <Placeholder style={styles.placeholder} Animation={Fade} Left={PlaceholderMedia}>
        <PlaceholderLine width={50} />
        <PlaceholderLine width={10} />
      </Placeholder>
      <Placeholder style={styles.placeholder} Animation={Fade} Left={PlaceholderMedia}>
        <PlaceholderLine width={70} />
        <PlaceholderLine width={60} />
      </Placeholder>
    </View>
  )

  const flatList = (
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

  if (isLoading) {
    return loadingContent
  } else {
    return flatList
  }
}

const createStyleSheet = (theme: MD3Theme) => {
  return StyleSheet.create({
    placeholder: {
      margin: 16,
    },
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

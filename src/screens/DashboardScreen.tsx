import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList, Routes } from '../navigation/navigationTypes'
import { IconButton, MD3Theme, Text, TouchableRipple, useTheme } from 'react-native-paper'
import { StatusBar, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Strings } from '../i18n/strings'
import { colors } from '../themes/Colors'
import { TRANSACTIONS } from '../data/types'
import { TransactionList } from '../components/TransactionList'

export function DashboardScreen({ navigation }: NativeStackScreenProps<RootStackParamList, Routes.DashboardScreen>) {
  const theme = useTheme()
  const styles = createStyleSheet(theme)

  // TODO Fetch available balance
  const availableBalance = '$20 000.00'

  // TODO Fetch (only four latest transactions) from store
  const transactions = TRANSACTIONS.slice(0, 4)

  return (
    <View>
      {/* Status bar hack because of iOS */}
      <SafeAreaView style={{ backgroundColor: theme.colors.primary }}>
        <StatusBar backgroundColor={theme.colors.primary} />
      </SafeAreaView>

      <View style={styles.availableBalance}>
        <Text variant='bodyMedium' style={styles.availableBalanceText}>
          {Strings.dashboard_balance}
        </Text>
        <Text variant='headlineMedium' style={styles.availableBalanceText}>
          {availableBalance}
        </Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableRipple>
          <View style={styles.actionButton}>
            <IconButton icon='send' iconColor={colors.blue} />
            <Text variant='bodySmall'>{Strings.dashboard_send}</Text>
          </View>
        </TouchableRipple>

        <View style={styles.verticalDivider} />

        <TouchableRipple>
          <View style={styles.actionButton}>
            <IconButton icon='cash' iconColor={colors.orange} />
            <Text variant='bodySmall'>{Strings.dashboard_request}</Text>
          </View>
        </TouchableRipple>

        <View style={styles.verticalDivider} />

        <TouchableRipple>
          <View style={styles.actionButton}>
            <IconButton icon='bank' iconColor={colors.orange} />
            <Text variant='bodySmall'>{Strings.dashboard_bank}</Text>
          </View>
        </TouchableRipple>
      </View>

      <Text variant='bodyLarge' style={styles.transactionsTitle}>
        {Strings.dashboard_transactions}
      </Text>

      <View style={styles.transactions}>
        <TransactionList data={transactions} />
      </View>
    </View>
  )
}

const createStyleSheet = (theme: MD3Theme) =>
  StyleSheet.create({
    availableBalance: {
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      paddingTop: 32,
      paddingBottom: 64,
    },
    availableBalanceText: {
      color: theme.colors.onPrimary,
    },
    actionButtons: {
      flexDirection: 'row',
      marginHorizontal: 16,
      justifyContent: 'space-evenly',
      borderRadius: 12,
      marginTop: -38,
      backgroundColor: theme.colors.background,
    },
    actionButton: {
      width: 100,
      paddingBottom: 8,
      alignItems: 'center',
    },
    verticalDivider: {
      alignSelf: 'center',
      borderColor: theme.colors.backdrop,
      height: 16,
      borderRightWidth: 1,
    },
    transactionsTitle: {
      marginTop: 16,
      marginLeft: 16,
    },
    transactions: {
      borderRadius: 12,
      marginTop: 8,
      marginHorizontal: 16,
      backgroundColor: theme.colors.background,
    },
  })

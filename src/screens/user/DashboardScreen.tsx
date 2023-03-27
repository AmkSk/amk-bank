import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { ActivityIndicator, IconButton, MD3Theme, Text, TouchableRipple, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TransactionList } from '../../components/TransactionList'
import { Strings } from '../../i18n/strings'
import { Routes, TabParamList } from '../../navigation/navigationTypes'
import { useUserDataStore } from '../../stores/userDataStore'
import { colors } from '../../themes/Colors'
import { AmkBankApi } from '../../network/AmkBankClient'
import { CommonStyles } from '../../themes/CommonStyles'
import { useError } from '../../hooks/useError'

export function DashboardScreen({ navigation }: BottomTabScreenProps<TabParamList, Routes.DashboardScreen>) {
  const theme = useTheme()
  const styles = createStyleSheet(theme)
  const [isBalanceLoading, setBalanceLoading] = useState(false)
  const [isTransactionListLoading, setTransactionsLoading] = useState(false)

  const setAvailableBalance = useUserDataStore((state) => state.setAvailableBalance)
  const setTransactions = useUserDataStore((state) => state.setTransactions)
  const availableBalance = useUserDataStore((state) => state.availableBalance)
  const transactions = useUserDataStore((state) => state.transactions)

  const { showError } = useError()

  useEffect(() => {
    if (availableBalance === null) {
      const callGetAvailableBalance = async () => {
        try {
          setBalanceLoading(true)
          const balance = await AmkBankApi.getAvailableBalance()
          setAvailableBalance(balance)
        } catch {
          setAvailableBalance(0)
          showError(Strings.error_general_data)
        } finally {
          setBalanceLoading(false)
        }
      }
      callGetAvailableBalance()
    }
  }, [])

  useEffect(() => {
    const callGetTransactions = async () => {
      try {
        setTransactionsLoading(true)
        const transactions = await AmkBankApi.getTransactions()
        setTransactions(transactions)
      } catch (e) {
        setTransactions([])
        showError(Strings.error_general_data)
      } finally {
        setTransactionsLoading(false)
      }
    }
    callGetTransactions()
  }, [])

  const formattedBalance = availableBalance?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })

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

        {isBalanceLoading ? (
          <ActivityIndicator color={theme.colors.onPrimary} style={CommonStyles.mt8} />
        ) : (
          <Text variant='headlineMedium' style={styles.availableBalanceText}>
            {formattedBalance}
          </Text>
        )}
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
        <TransactionList isLoading={isTransactionListLoading} data={transactions.slice(0, 6)} />
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

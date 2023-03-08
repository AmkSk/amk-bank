import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Routes, TabParamList } from './navigationTypes'
import { DashboardScreen } from '../screens/user/DashboardScreen'
import { SettingsScreen } from '../screens/user/SettingsScreen'
import { SupportScreen } from '../screens/user/SupportScreen'
import { AnalyticsScreen } from '../screens/user/AnalyticsScreen'
import Icons from '@expo/vector-icons/Ionicons'
import { Platform, StyleSheet } from 'react-native'
import { MD3Theme, useTheme } from 'react-native-paper'

const BottomTab = createBottomTabNavigator<TabParamList>()

export function TabNavigator() {
  const theme = useTheme()
  const styles = createStyleSheet(theme)

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarBackground,
      }}
    >
      <BottomTab.Screen
        name={Routes.DashboardScreen}
        component={DashboardScreen}
        options={{
          headerShown: false,
          tabBarIcon: (params) => <TabBarIcon color={params.color} name={params.focused ? 'home' : 'home-outline'} />,
        }}
      />
      <BottomTab.Screen
        name={Routes.AnalyticsScreen}
        component={AnalyticsScreen}
        options={{
          tabBarIcon: (params) => (
            <TabBarIcon color={params.color} name={params.focused ? 'pie-chart' : 'pie-chart-outline'} />
          ),
        }}
      />
      <BottomTab.Screen
        name={Routes.SupportScreen}
        component={SupportScreen}
        options={{
          tabBarIcon: (params) => (
            <TabBarIcon color={params.color} name={params.focused ? 'chatbubble' : 'chatbubble-outline'} />
          ),
        }}
      />
      <BottomTab.Screen
        name={Routes.SettingsScreen}
        component={SettingsScreen}
        options={{
          tabBarIcon: (params) => (
            <TabBarIcon color={params.color} name={params.focused ? 'settings' : 'settings-outline'} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

interface TabBarIconProps {
  color: string
  name: any
}

function TabBarIcon({ color, name }: TabBarIconProps) {
  return <Icons size={16} name={name} color={color} />
}

const createStyleSheet = (theme: MD3Theme) =>
  StyleSheet.create({
    tabBarBackground: {
      borderRadius: 12,
      margin: Platform.OS === 'ios' ? 0 : 16,
      backgroundColor: theme.colors.background,
    },
  })

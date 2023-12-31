import { Image, ImageSourcePropType, SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, MD3Theme, Text, useTheme } from 'react-native-paper'
import { NativeStackScreenProps } from 'react-native-screens/native-stack'

import { RootStackParamList, Routes } from '../navigation/navigationTypes'
import PagerView from 'react-native-pager-view'
import { useMemo, useRef, useState } from 'react'
import { USER_PREFERENCES } from '../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Strings } from '../i18n/strings'
import { CommonStyles } from '../themes/CommonStyles'

type Page = {
  imageSource: ImageSourcePropType
  text: string
}

const IMAGES_URI = '../../assets/images'
const INTRO_PAGES: Page[] = [
  {
    imageSource: require(`${IMAGES_URI}/onboarding_1.png`),
    text: Strings.onboarding_page_1,
  },
  {
    imageSource: require(`${IMAGES_URI}/onboarding_2.png`),
    text: Strings.onboarding_page_2,
  },
  {
    imageSource: require(`${IMAGES_URI}/onboarding_3.png`),
    text: Strings.onboarding_page_3,
  },
]

export function IntroScreen({ navigation }: NativeStackScreenProps<RootStackParamList, Routes.IntroScreen>) {
  const [activePage, setActivePage] = useState(0)
  const pagerRef = useRef<PagerView>(null)
  const theme = useTheme()
  const styles = useMemo(() => createStyleSheet(theme), [theme])

  const handleNextButtonOnPress = () => {
    const nextPage = activePage + 1

    if (nextPage >= INTRO_PAGES.length) {
      AsyncStorage.setItem(USER_PREFERENCES.userFinishedIntro, Boolean(true).toString())
      navigation.replace(Routes.WelcomeScreen)
    } else {
      pagerRef.current?.setPage(nextPage)
    }
  }

  return (
    <SafeAreaView style={[CommonStyles.flex1, styles.container]}>
      <PagerView
        ref={pagerRef}
        style={CommonStyles.flex1}
        onPageSelected={(event) => setActivePage(event.nativeEvent.position)}
      >
        {INTRO_PAGES.map((page, index) => (
          <View key={index} style={styles.pagerContent}>
            <Image source={page.imageSource} />
            <Text style={[CommonStyles.ml16, CommonStyles.mr16, styles.text]} variant='headlineMedium'>
              {page.text}
            </Text>
          </View>
        ))}
      </PagerView>

      <IndicatorView activePage={activePage} pagesCount={INTRO_PAGES.length} />

      <Button
        style={[CommonStyles.ml16, CommonStyles.mr16, CommonStyles.mb16]}
        mode='contained'
        onPress={handleNextButtonOnPress}
      >
        {Strings.button_next}
      </Button>
    </SafeAreaView>
  )
}

interface IndicatorProps {
  activePage: number
  pagesCount: number
}

function IndicatorView({ activePage, pagesCount }: IndicatorProps): JSX.Element {
  const theme = useTheme()
  const styles = useMemo(() => createStyleSheet(theme), [theme])

  const indicators = Array.from({ length: pagesCount }).map((_, index) => (
    <View
      key={index}
      style={[CommonStyles.mr8, styles.indicator, index === activePage ? styles.selectedIndicator : undefined]}
    />
  ))

  return <View style={[CommonStyles.mb32, styles.indicatorContainer]}>{indicators}</View>
}

const createStyleSheet = (theme: MD3Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
    },
    pagerContent: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    text: {
      textAlign: 'center',
    },
    indicatorContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    indicator: {
      width: 16,
      height: 8,
      backgroundColor: theme.colors.surfaceDisabled,
      borderRadius: 19,
    },
    selectedIndicator: {
      backgroundColor: theme.colors.primary,
    },
  })
}

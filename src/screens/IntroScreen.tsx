import { Image, ImageSourcePropType, SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { NativeStackScreenProps } from 'react-native-screens/native-stack'

import { RootStackParamList } from '../navigation/NavigationTypes'
import { Routes } from '../navigation/Routes'
import PagerView from 'react-native-pager-view'
import { useRef, useState } from 'react'
import { theme } from '../themes/Theme'

type Page = {
  imageSource: ImageSourcePropType
  text: string
}

const IMAGES_URI = '../../assets/images'
const INTRO_PAGES: Page[] = [
  {
    imageSource: require(`${IMAGES_URI}/onboarding_1.png`),
    text: 'Trusted by millions of people, part of one part',
  },
  {
    imageSource: require(`${IMAGES_URI}/onboarding_2.png`),
    text: 'Spend money abroad, and track your expense',
  },
  {
    imageSource: require(`${IMAGES_URI}/onboarding_3.png`),
    text: 'Receive Money from anywhere in the world',
  },
]

export default function IntroScreen({ navigation }: NativeStackScreenProps<RootStackParamList, Routes.IntroScreen>) {
  const [activePage, setActivePage] = useState(0)
  const pagerRef = useRef<PagerView>(null)

  const handleNextButtonOnPress = () => {
    const nextPage = activePage + 1

    if (nextPage >= INTRO_PAGES.length) {
      navigation.navigate(Routes.LoginScreen)
    } else {
      pagerRef.current?.setPage(nextPage)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        onPageSelected={(event) => setActivePage(event.nativeEvent.position)}
      >
        {INTRO_PAGES.map((page, index) => (
          <View key={index} style={styles.pagerContent}>
            <Image source={page.imageSource} />
            <Text style={styles.text} variant='headlineMedium'>
              {page.text}
            </Text>
          </View>
        ))}
      </PagerView>

      <IndicatorView activePage={activePage} pagesCount={INTRO_PAGES.length} />

      <Button style={styles.nextButton} mode='contained' onPress={handleNextButtonOnPress}>
        Next
      </Button>
    </SafeAreaView>
  )
}

interface IndicatorProps {
  activePage: number
  pagesCount: number
}

function IndicatorView({ activePage, pagesCount }: IndicatorProps): JSX.Element {
  const indicators = Array.from({ length: pagesCount }).map((_, index) => (
    <View key={index} style={[styles.indicator, index === activePage ? styles.selectedIndicator : undefined]} />
  ))

  return <View style={styles.indicatorContainer}>{indicators}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  pagerContent: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    marginLeft: 16,
    marginRight: 16,
    textAlign: 'center',
  },
  indicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    flexDirection: 'row',
  },
  indicator: {
    width: 16,
    height: 8,
    marginRight: 8,
    backgroundColor: theme.colors.surfaceDisabled,
    borderRadius: 19,
  },
  selectedIndicator: {
    backgroundColor: theme.colors.primary,
  },
  nextButton: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
  },
})

import React from 'react'
import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList, Routes } from '../../../navigation/navigationTypes'
import { Provider as PaperProvider } from 'react-native-paper'
import { render } from '@testing-library/react-native'
import { OnboardingCountryScreen } from '../OnboardingCountryScreen'

const props = {} as NativeStackScreenProps<RootStackParamList, Routes.OnboardingCountryScreen>

// axios needs to be mocked, otherwise tests fail
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
  })),
}))

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

describe('OnboardingScreen', () => {
  it('renders correctly', () => {
    const tree = render(
      <PaperProvider>
        <OnboardingCountryScreen {...props} />
      </PaperProvider>,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

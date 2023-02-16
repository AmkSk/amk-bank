import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList } from '../../navigation/NavigationTypes'
import { Routes } from '../../navigation/Routes'
import { ScreenTemplate } from '../ScreenTemplate'
import { Button, Text } from 'react-native-paper'
import { Strings } from '../../i18n/Strings'
import { View } from 'react-native'
import { useEffect, useState } from 'react'
import { CommonStyles } from '../../themes/CommonStyles'
import { AmkBankApi } from '../../network/AmkBankClient'
import { Country } from '../../data/Country'
import { PaperSelect } from 'react-native-paper-select'
import { SelectedItem } from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface'
import { useLoadingAction } from '../../hooks/useLoadingAction'
import { useOnboardingStore } from '../../stores/onboardingStore'

export function OnboardingCountryScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, Routes.OnboardingCountryScreen>) {
  const [countries, setCountries] = useState<Country[]>([])
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const selectedCountry = useOnboardingStore((state) => state.countryOfResidence)
  const setSelectedCountry = useOnboardingStore((state) => state.setCountryOfResidence)
  const onNextPress = () => {}

  useEffect(() => {
    setIsButtonEnabled(selectedCountry !== null)
  }, [selectedCountry])

  const { loadingAction } = useLoadingAction(
    AmkBankApi.getCountries()
      .then((data) => setCountries(data))
      .catch((reason) => console.log(reason)),
  )
  useEffect(() => {
    loadingAction()
  }, [])

  return (
    <ScreenTemplate>
      <Text variant='headlineMedium'>{Strings.onboarding_country_title}</Text>
      <Text variant='bodyMedium'>{Strings.onboarding_country_subtitle}</Text>

      <View style={CommonStyles.mt16}>
        <PaperSelect
          value={selectedCountry ? formatCountry(selectedCountry) : Strings.onboarding_country_placeholder}
          arrayList={mapCountriesToDropdownList(countries)}
          label={Strings.onboarding_country_label}
          onSelection={(item) => setSelectedCountry(findCountry(item, countries))}
          errorText=''
          multiEnable={false}
          selectedArrayList={mapCountriesToDropdownList(selectedCountry ? [selectedCountry] : [])}
        />
      </View>

      <View style={CommonStyles.flex1} />

      <Button mode='contained' onPress={onNextPress} disabled={!isButtonEnabled}>
        {Strings.button_next}
      </Button>
    </ScreenTemplate>
  )
}

function findCountry(selectedItem: SelectedItem, countries: Country[]): Country | null {
  if (selectedItem?.selectedList[0] === undefined) {
    return null
  } else {
    return countries.find((it) => it.id === selectedItem.selectedList[0]._id)!
  }
}

function mapCountriesToDropdownList(countries: Country[]) {
  return countries.map((country) => {
    return {
      _id: country.id,
      value: formatCountry(country),
    }
  })
}

const formatCountry = (country: Country) => `${country?.flag} ${country?.name}`

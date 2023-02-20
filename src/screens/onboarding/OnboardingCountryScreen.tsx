import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList } from '../../navigation/NavigationTypes'
import { Routes } from '../../navigation/Routes'
import { ScreenTemplate } from '../ScreenTemplate'
import { Button, Dialog, Portal, Text } from 'react-native-paper'
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
import { CommonActions } from '@react-navigation/native'

export function OnboardingCountryScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, Routes.OnboardingCountryScreen>) {
  const [countries, setCountries] = useState<Country[]>([])
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [isSuccessDialogShown, showSuccessDialog] = useState(false)
  const phoneNumberPrefix = useOnboardingStore((state) => state.phonePrefix)
  const phoneNumber = useOnboardingStore((state) => state.phoneNumber)
  const email = useOnboardingStore((state) => state.email)
  const dateOfBirth = useOnboardingStore((state) => state.dateOfBirth)
  const selectedCountry = useOnboardingStore((state) => state.countryOfResidence)
  const setSelectedCountry = useOnboardingStore((state) => state.setCountryOfResidence)
  const clearStore = useOnboardingStore((state) => state.clear)

  useEffect(() => {
    setIsButtonEnabled(selectedCountry !== null)
  }, [selectedCountry])

  const { loadingAction: getCountriesLoadingAction } = useLoadingAction(
    AmkBankApi.getCountries()
      .then((data) => setCountries(data))
      .catch((reason) => console.log(reason)),
  )
  const { loadingAction: createUserLoadingAction } = useLoadingAction(
    AmkBankApi.createUser(
      phoneNumberPrefix,
      phoneNumber,
      email,
      dateOfBirth?.toDateString() ?? '',
      selectedCountry?.id ?? '',
    ),
  )

  useEffect(() => {
    getCountriesLoadingAction()
  }, [])

  const onNextPress = () => {
    createUserLoadingAction()
      .then(() => showSuccessDialog(true))
      .catch((reason) => console.log(reason))
  }

  const onSuccessDialogConfirmed = () => {
    clearStore()
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: Routes.LoginScreen,
        },
      ],
    })

    navigation.dispatch(resetAction)
  }

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

      <Portal>
        <Dialog visible={isSuccessDialogShown} dismissable={false}>
          <Dialog.Title>{Strings.onboarding_success_title}</Dialog.Title>
          <Dialog.Content>
            <Text variant='bodyMedium'>{Strings.onboarding_success_message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onSuccessDialogConfirmed}>{Strings.ok}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

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
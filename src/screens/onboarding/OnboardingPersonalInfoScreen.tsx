import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { RootStackParamList } from '../../navigation/NavigationTypes'
import { Routes } from '../../navigation/Routes'
import { ScreenTemplate } from '../ScreenTemplate'
import { Button, Text, TextInput } from 'react-native-paper'
import { Strings } from '../../i18n/Strings'
import { TextInput as RnTextInput, View } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { CommonStyles } from '../../themes/CommonStyles'
import { DatePickerModal, en, registerTranslation } from 'react-native-paper-dates'
import { getLocales } from 'expo-localization'
import { useOnboardingStore } from '../../stores/onboardingStore'

registerTranslation('en', en)

const MINIMUM_DATE = new Date('1950-01-01T00:00:00.000Z')
const MAXIMUM_DATE = calculateTodayMinus18Years()

export function OnboardingPersonalInfoScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, Routes.OnboardingPersonalInfoScreen>) {
  const locales = getLocales()
  const [isDatePickerVisible, showDatePicker] = useState(false)
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const name = useOnboardingStore((store) => store.name)
  const surname = useOnboardingStore((store) => store.surname)
  const dateOfBirth = useOnboardingStore((store) => store.dateOfBirth)
  const setName = useOnboardingStore((store) => store.setName)
  const setSurname = useOnboardingStore((store) => store.setSurname)
  const setDateOfBirth = useOnboardingStore((store) => store.setDateOfBirth)

  const surnameInput = useRef<RnTextInput>(null)
  const dateOfBirthInput = useRef<RnTextInput>(null)

  useEffect(() => {
    setIsButtonEnabled(name !== '' && surname !== '')
  }, [name, surname, dateOfBirth])

  const onNextPress = () => navigation.navigate(Routes.OnboardingCountryScreen)

  return (
    <ScreenTemplate>
      <Text variant='headlineMedium'>{Strings.onboarding_personal_info_title}</Text>
      <Text variant='bodyMedium'>{Strings.onboarding_personal_info_subtitle}</Text>
      <TextInput
        mode='outlined'
        returnKeyType='next'
        style={CommonStyles.mt8}
        label={Strings.onboarding_personal_info_name_placeholder}
        placeholder={Strings.onboarding_personal_info_name_placeholder}
        value={name}
        onSubmitEditing={() => surnameInput.current?.focus()}
        onChangeText={setName}
      />

      <TextInput
        ref={surnameInput}
        onSubmitEditing={() => dateOfBirthInput.current?.focus()}
        mode='outlined'
        returnKeyType='next'
        style={CommonStyles.mt8}
        label={Strings.onboarding_personal_info_surname_placeholder}
        placeholder={Strings.onboarding_personal_info_surname_placeholder}
        value={surname}
        onChangeText={setSurname}
      />

      <TextInput
        ref={dateOfBirthInput}
        mode='outlined'
        style={CommonStyles.mt8}
        label={Strings.onboarding_personal_info_birthday_placeholder}
        placeholder={Strings.onboarding_personal_info_birthday_placeholder}
        value={dateOfBirth?.toLocaleDateString(locales[0].languageCode)}
        onFocus={() => showDatePicker(true)}
        left={<TextInput.Icon icon='calendar' onPress={() => showDatePicker(true)} />}
      />

      {isDatePickerVisible && (
        <DatePickerModal
          mode='single'
          locale='en'
          visible={isDatePickerVisible}
          validRange={{ startDate: MINIMUM_DATE, endDate: MAXIMUM_DATE }}
          startDate={MINIMUM_DATE}
          endDate={MAXIMUM_DATE}
          onDismiss={() => showDatePicker(false)}
          date={dateOfBirth ?? undefined}
          onConfirm={(params) => {
            if (params.date != null) {
              showDatePicker(false)
              setDateOfBirth(params.date)
            }
          }}
        />
      )}

      <View style={CommonStyles.flex1} />

      <Button mode='contained' onPress={onNextPress} disabled={!isButtonEnabled}>
        {Strings.button_next}
      </Button>
    </ScreenTemplate>
  )
}

function calculateTodayMinus18Years(): Date {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 18)
  return date
}

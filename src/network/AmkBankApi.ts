import { Country } from '../data/Country'

export default interface AmkBankApi {
  /**
   * Downloads list of countries that can be used as a country of residence of the user during onboarding
   */
  getCountries(): Promise<Country[]>

  /**
   * Sends a request to create a new user, that has finished the onboarding process
   */
  createUser(
    phoneNumberPrefix: string,
    phoneNumber: string,
    email: string,
    dateOfBirth: string,
    countryId: string,
  ): Promise<void>
}

import { Country } from '../data/types'

export interface AmkBankApi {
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

  /**
   * Sends a request to log in
   * @param username email or phone number
   * @param passwordHash hash of a password
   */
  logIn(username: string, passwordHash: string): Promise<void>
}

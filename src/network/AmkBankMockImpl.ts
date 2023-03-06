import { AmkBankApi } from './AmkBankApi'
import { Country } from '../data/types'

const REQUEST_DELAY = 1500

export class AmkBankMockImpl implements AmkBankApi {
  async createUser(
    phoneNumberPrefix: string,
    phoneNumber: string,
    email: string,
    dateOfBirth: string,
    countryId: string,
  ): Promise<void> {
    await this.delay(REQUEST_DELAY)
    return Promise.resolve(undefined)
  }

  async getCountries(): Promise<Country[]> {
    await this.delay(REQUEST_DELAY)
    return Promise.resolve([
      { flag: '\ud83c\uddf8\ud83c\uddf0', id: 'sk', name: 'Slovakia' },
      { flag: '\ud83c\udde9\ud83c\uddea', id: 'de', name: 'Germany' },
      { flag: '\ud83c\udde8\ud83c\uddff', id: 'cs', name: 'Czechia' },
      { flag: '\ud83c\uddf5\ud83c\uddf1', id: 'pl', name: 'Poland' },
    ])
  }

  async logIn(username: string, passwordHash: string): Promise<void> {
    console.log(`Calling logIn request with username: ${username} and password hash: ${passwordHash}`)

    await this.delay(REQUEST_DELAY)
    return Promise.resolve(undefined)
  }

  delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
}

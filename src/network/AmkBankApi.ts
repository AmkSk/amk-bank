import { Country } from '../data/Country'

export default interface AmkBankApi {
  getCountries(): Promise<Country[]>
}

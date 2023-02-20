import AmkBankApi from './AmkBankApi'
import { AxiosInstance } from 'axios'
import { Country } from '../data/Country'

export class AmkBankApiImpl implements AmkBankApi {
  axiosClient: AxiosInstance

  constructor(axiosClient: AxiosInstance) {
    this.axiosClient = axiosClient
  }

  async getCountries(): Promise<Country[]> {
    const response = await this.axiosClient.get<Country[]>('/countries')
    return response.data
  }

  async createUser(
    phoneNumberPrefix: string,
    phoneNumber: string,
    email: string,
    dateOfBirth: string,
    countryId: string,
  ): Promise<void> {
    const response = await this.axiosClient.post<void>('/createuser', {
      phoneNumberPrefix,
      phoneNumber,
      email,
      dateOfBirth,
      countryId,
    })
    return response.data
  }
}
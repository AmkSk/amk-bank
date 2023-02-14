import AmkBankApi from './AmkBankApi'
import { AxiosInstance } from 'axios'
import { Country } from '../data/Country'

export class AmkBankApiImpl implements AmkBankApi {
  axiosClient: AxiosInstance

  constructor(axiosClient: AxiosInstance) {
    this.axiosClient = axiosClient
  }

  async getCountries(): Promise<Country[]> {
    //TODO add loading
    const response = await this.axiosClient.get<Country[]>('/countries')
    return response.data
  }
}

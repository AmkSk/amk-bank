import axios from 'axios'
import { AmkBankApiImpl } from './AmkBankApiImpl'
import { config } from '../data/config'
import { AmkBankMockImpl } from './AmkBankMockImpl'
import { AmkBankApi } from './AmkBankApi'

const axiosClient = axios.create({
  baseURL: 'http://84.19.91.168:5000/amkbank/',
  timeout: 5000,
})

export const api: AmkBankApi = config.useMockApi ? new AmkBankMockImpl() : new AmkBankApiImpl(axiosClient)

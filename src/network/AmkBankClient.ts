import axios from 'axios'
import { AmkBankApiImpl } from './AmkBankApiImpl'

const axiosClient = axios.create({
  baseURL: 'http://84.19.91.168:5000/amkbank/',
  timeout: 5000,
})

export const AmkBankApi = new AmkBankApiImpl(axiosClient)

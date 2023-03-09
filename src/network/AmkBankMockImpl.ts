import { AmkBankApi } from './AmkBankApi'
import { Country, Transaction, TransactionType } from '../data/types'

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

  async getTransactions(): Promise<Transaction[]> {
    await this.delay(REQUEST_DELAY)
    return Promise.resolve(TRANSACTIONS)
  }

  async getAvailableBalance(): Promise<number> {
    await this.delay(REQUEST_DELAY)
    return Promise.resolve(20000)
  }

  delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
}

export const TRANSACTIONS = [
  {
    id: 0,
    amount: 2000.0,
    type: TransactionType.Expense,
    name: 'Restaurant',
  },
  {
    id: 1,
    amount: 1420.35,
    type: TransactionType.Expense,
    name: 'Rent',
  },
  {
    id: 2,
    amount: 80.0,
    type: TransactionType.Income,
    name: 'Electricity',
  },
  {
    id: 3,
    amount: 99.9,
    type: TransactionType.Expense,
    name: 'Gas - this is a longer input that is multiple lines long',
  },
  {
    id: 4,
    amount: 100.0,
    type: TransactionType.Income,
    name: 'Bills',
  },
  {
    id: 5,
    amount: 8.0,
    type: TransactionType.Income,
    name: 'Sent from your mother',
  },
  {
    id: 6,
    amount: 32.5,
    type: TransactionType.Income,
    name: 'Debt, mortgage',
  },
  {
    id: 7,
    amount: 16.3,
    type: TransactionType.Expense,
    name: 'Restaurant',
  },
  {
    id: 8,
    amount: 0.95,
    type: TransactionType.Expense,
    name: 'Restaurant',
  },
  {
    id: 9,
    amount: 100.0,
    type: TransactionType.Expense,
    name: 'Restaurant',
  },
]

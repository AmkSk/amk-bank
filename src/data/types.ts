export type Country = {
  id: string
  name: string
  flag: string
}

export enum TransactionType {
  Income,
  Expense,
}

export type Transaction = {
  id: number
  amount: number
  type: TransactionType
  name: string
}

// TODO mock transactions via store
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

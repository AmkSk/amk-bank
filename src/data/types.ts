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

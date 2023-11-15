import CurrencyApi from "./CurrencyApi"

export default class Account {
  private balance: number
  private currencyApi: CurrencyApi

  constructor(currencyApi: CurrencyApi) {
    this.balance = 0
    this.currencyApi = currencyApi
  }

  credit(amount: number, currency?: string) {
    if(currency) {
      amount = this.currencyApi.convert(amount, currency)
    }
    this.balance += amount
  }

  debit(amount: number) {
    this.balance -= amount
  }

  getBalance () {
    return this.balance
  }
}
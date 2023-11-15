import CurrencyApi from "./CurrencyApi";

export default class CurrencyApiFake implements CurrencyApi {
  convert(amount: number, currency: string): number {
    return 5 * amount
  }
}
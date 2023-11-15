import sinon from "sinon"
import Account from "../src/Account"
import CurrencyApiFake from "../src/CurrencyApiFake"
import CurrencyApi from "../src/CurrencyApi"

let account: Account
let currencyApi: CurrencyApi

beforeEach(() => {
  currencyApi = new CurrencyApiFake()
  account = new Account(currencyApi)
})

test("Should create new account", () => {
  const balance = account.getBalance()
  expect(balance).toBe(0)
})

test("Should credit R$100", () => {
  account.credit(100)
  const balance = account.getBalance()
  expect(balance).toBe(100)
})

test("Should debit R$50", () => {
  account.credit(100)
  account.debit(50)
  const balance = account.getBalance()
  expect(balance).toBe(50)
})

test("Should credit R$100 with fake", () => {
  account.credit(100, "USD")
  const balance = account.getBalance()
  expect(balance).toBe(500)
})

test("Should credit R$100 with sinon stub", () => {
  sinon.stub(
    currencyApi,
    "convert"
  ).returns(600)
  account.credit(100, "USD")
  const balance = account.getBalance()
  expect(balance).toBe(600)
})

test("Should credit R$100 with sinon spy", () => {
  const spy = sinon.spy(account, "getBalance")
  account.getBalance()
  sinon.assert.calledOnce(spy)
})

test("Should credit R$100 with sinon mock", () => {
  const mock = sinon.mock(account)
  mock.expects("credit").once().withArgs(100, "USD")
  mock.expects("getBalance").once().returns(600)
  account.credit(100, "USD")
  const balance = account.getBalance()
  expect(balance).toBe(600)
  mock.verify()
})

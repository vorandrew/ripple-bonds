class RippleBonds

  this.codeCurrency =
    X: 'XRP'
    B: 'BTC'
    U: 'USD'
    E: 'EUR'
    G: 'GBP'
    Y: 'JPY'
    A: 'AUD'
    D: 'CAD'
    R: 'RUB'
    H: 'UAH'
    I: 'ILS'
    C: 'CNY'

  this.codeYear =
    A: 2014
    B: 2015
    C: 2016
    D: 2017
    E: 2018
    F: 2019
    G: 2020

  this.codeMonth =
    F: 0
    G: 1
    H: 2
    J: 3
    K: 4
    M: 5
    N: 6
    Q: 7
    U: 8
    V: 9
    X: 10
    Z: 11

  this.getNowUTC = ->
    now = new Date()
    new Date do now.getTime + do now.getTimezoneOffset * 60 * 1000

  this.isSymbol = (symbol) ->
    symbol[0] in (key for key, val of @codeCurrency) and
    symbol[1] in (key for key, val of @codeYear) and
    symbol[2] in (key for key, val of @codeMonth)

  this.isCurrency = (symbol) ->
    symbol in (val for key, val of @codeCurrency)

  this.getNumPeriods = (startDate, endDate) ->
    diff = do endDate.getTime - do startDate.getTime
    #    AVG days in month = 365 days / 12 month
    if diff <= 0 then 0 else diff / 1000 / 60 / 60 / 24 / 365 * 12

  this.getExpDate = (symbol) ->
    year = @codeYear[symbol[1]]
    month = @codeMonth[symbol[2]]

    month++

    if month == 12
      month = 0
      year++

    new Date Date.UTC year, month, 1

  this.YTM = (startDate, endDate, price, par) ->
    par ?= 1
    nPeriods = @getNumPeriods startDate, endDate

    if nPeriods <= 0
      (par - price) / price
    else
      Math.pow(par / price, 1 / nPeriods) - 1

  this.YTMNow = (endDate, price, par) ->
    rippleBonds.YTM @getNowUTC(), endDate, price, par

  this.YTMNowSymbol = (symbol, price, par) ->
    expDate = @getExpDate symbol
    @YTM @getNowUTC(), expDate, price, par

  this.YTMSymbol = (startDate, symbol, price, par) ->
    expDate = @getExpDate symbol
    @YTM startDate, expDate, price, par

  this.PV = (startDate, endDate, ytm, par) ->
    par ?= 1
    nPeriods = @getNumPeriods startDate, endDate

    if nPeriods <= 0
      par / (ytm + 1)
    else
      par / Math.pow 1 + ytm, nPeriods

  this.PVNow = (endDate, ytm, par) ->
    @PV @getNowUTC(), endDate, ytm, par

  this.PVNowSymbol = (symbol, ytm, par) ->
    expDate = @getExpDate symbol
    @PV @getNowUTC(), expDate, ytm, par

  this.PVSymbol = (startDate, symbol, ytm, par) ->
    expDate = @getExpDate symbol
    @PV startDate, expDate, ytm, par

module.exports = RippleBonds

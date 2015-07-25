rippleBonds = require('../src/ripple-bonds');

correctCurrencies = ['EUR', 'USD', 'JPY', 'AUD']
incorrectCurrencies = ['IND', 'BLA', 'TRI', 'FSA']
incorrectCodes = ['XWZ', 'EXU', 'USD', 'EUR']
correctCodes = ['XFF', 'IDF', 'BAM', 'BAZ']

describe 'Global', ->
  it 'Has month codes', ->
    expect(rippleBonds.codeMonth).toBeDefined

  it 'Has year codes', ->
    expect(rippleBonds.codeYear).toBeDefined

  it 'Has currency codes', ->
    expect(rippleBonds.codeCurrency).toBeDefined

describe 'Symbol definition', ->
  it 'Checking symbol - must be false', ->
    for symbol in incorrectCodes
      expect(rippleBonds.isSymbol symbol).toBe false

  it 'Checking symbol - must true', ->
    for symbol in correctCodes
      expect(rippleBonds.isSymbol symbol).toBe true

describe 'Currencies', ->
  it 'Checking currencies - must be false', ->
    for currency in incorrectCurrencies
      expect(rippleBonds.isCurrency currency).toBe false

  it 'Checking currencies - must true', ->
    for currency in correctCurrencies
      expect(rippleBonds.isCurrency currency).toBe true

describe 'Dates', ->
  it 'getNumPeriods', ->
    startDate = new Date 2014, 0, 1
    endDate = new Date 2014, 1, 1

    periods = rippleBonds.getNumPeriods startDate, endDate

    expect(periods).toBeCloseTo 1, 1

  it 'getExpDate', ->
    for code in correctCodes
      date = rippleBonds.getExpDate code
      expect(date.getUTCDate()).toEqual 1

describe 'YTM', ->
  it 'YTM', ->
    startDate = new Date 2014, 0, 1
    endDate = new Date 2015, 0, 1

    ytm = rippleBonds.YTM startDate, endDate, 0.7, 2
    expect(ytm).toBeCloseTo 0.091, 3

  it 'YTMSymbol', ->
    ytm = rippleBonds.YTMSymbol new Date(2014, 0, 1), 'XFF', 0.7
    expect(ytm).toBeCloseTo 0.006, 3

describe 'PV', ->
  it 'PV', ->
    startDate = new Date 2014, 0, 1
    endDate = new Date 2015, 0, 1

    pv = rippleBonds.PV startDate, endDate, 0.05, 2

    expect(pv).toBeCloseTo 1.11, 2

  it 'PVSymbol', ->
    startDate = new Date 2014, 1, 1
    pv = rippleBonds.PVSymbol startDate, 'XFF', 0.1
    expect(pv).toBeCloseTo 0.003, 3

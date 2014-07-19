; // jshint ignore:line
(function (root) {
  'use strict';

  function rippleBonds() {}

  // 1st = currency code
  // 2nd = year codes
  // 3rd = month code

  // TODO make it private

  rippleBonds.currencyCodes = {
    X: 'XRP',
    B: 'BTC',
    U: 'USD',
    E: 'EUR',
    G: 'GBP',
    Y: 'JPY',
    A: 'AUD',
    D: 'CAD',
    R: 'RUB',
    H: 'UAH',
    I: 'ILS',
    C: 'CNY',
  };

  rippleBonds.codeCurrency = {};

  Object.keys(rippleBonds.currencyCodes).map(function (k) {
    rippleBonds.codeCurrency[rippleBonds.currencyCodes[k]] = k;
  });

  rippleBonds.currencies = Object.keys(rippleBonds.currencyCodes).map(function (k) {
    return rippleBonds.currencyCodes[k];
  });

  rippleBonds.yearCodes = {
    A: 2014,
    B: 2015,
    C: 2016,
    D: 2017,
    E: 2018,
    F: 2019,
    G: 2020,
  };

  rippleBonds.monthCodes = {
    F: 0,
    G: 1,
    H: 2,
    J: 3,
    K: 4,
    M: 5,
    N: 6,
    Q: 7,
    U: 8,
    V: 9,
    X: 10,
    Z: 11
  };

  rippleBonds.monthLetters = Object.keys(rippleBonds.monthCodes).map(function (k) {
    return k;
  });

  rippleBonds.getNowUTC = function () {
    var now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000);
  };

  rippleBonds.isValidSymbol = function (symbol) {

    if (typeof symbol !== 'string') {
      return false;
    }

    if (symbol.length !== 3) {
      return false;
    }

    if (!rippleBonds.monthCodes.hasOwnProperty(symbol[2])) {
      return false;
    }

    if (!rippleBonds.yearCodes.hasOwnProperty(symbol[1])) {
      return false;
    }

    return true;
  };

  rippleBonds.getNumPeriods = function (startDate, endDate) {

    var diffMilliseconds = endDate.getTime() - startDate.getTime();

    if (diffMilliseconds <= 0) {
      return 0;
    }

    // seconds / minutes / hours / days / months (rough approximation)
    // TODO correct amount of days

    return diffMilliseconds / 1000 / 60 / 60 / 24 / 30.5;
  };

  rippleBonds.getExpDate = function (symbol) {
    var year = rippleBonds.yearCodes[symbol[1]];
    var month = rippleBonds.monthCodes[symbol[2]];

    month++;

    if (month === 12) {
      month = 0;
      year++;
    }

    return new Date(Date.UTC(year, month, 1));
  };

  rippleBonds.YTM = function (startDate, endDate, price, par) {

    par = par || 1;

    var nPeriods = rippleBonds.getNumPeriods(startDate, endDate);

    if (nPeriods === 0) {
      return (par - price) / price;
    }

    return Math.pow(par / price, 1 / nPeriods) - 1;
  };

  // Syntax sugar for YTM

  rippleBonds.YTMNow = function (endDate, price, par) {
    return rippleBonds.YTM(rippleBonds.getNowUTC(), endDate, price, par);
  };

  rippleBonds.YTMNowSymbol = function (symbol, price, par) {
    var expDate = rippleBonds.getExpDate(symbol);
    return rippleBonds.YTM(rippleBonds.getNowUTC(), expDate, price, par);
  };

  rippleBonds.YTMSymbol = function (startDate, symbol, price, par) {
    var expDate = rippleBonds.getExpDate(symbol);
    return rippleBonds.YTM(startDate, expDate, price, par);
  };

  // PV

  rippleBonds.PV = function (startDate, endDate, ytm, par) {

    par = par || 1;

    var nPeriods = rippleBonds.getNumPeriods(startDate, endDate);

    if (nPeriods === 0) {
      return par / (ytm + 1);
    }

    return par / Math.pow(1 + ytm, nPeriods);
  };

  // Syntax sugar for PV

  rippleBonds.PVNow = function (endDate, ytm, par) {
    return rippleBonds.PV(rippleBonds.getNowUTC(), endDate, ytm, par);
  };

  rippleBonds.PVNowSymbol = function (symbol, ytm, par) {
    var expDate = rippleBonds.getExpDate(symbol);
    return rippleBonds.PV(rippleBonds.getNowUTC(), expDate, ytm, par);
  };

  rippleBonds.PVSymbol = function (startDate, symbol, ytm, par) {
    var expDate = rippleBonds.getExpDate(symbol);
    return rippleBonds.PV(startDate, expDate, ytm, par);
  };

  /*
   * Export this object globally
   */

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = rippleBonds;
    }
    exports.rippleBonds = rippleBonds;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return rippleBonds;
    });
  } else {
    root.rippleBonds = rippleBonds;
  }

})(this);

; // jshint ignore:line
(function (root) {
  'use strict';

  if (typeof require !== 'undefined') {
    var _ = require('lodash');
  } else {
    if (typeof root._ !== 'undefined') {
      var _ = root._;
    } else {
      throw new Error('RippleBonds requires LoDash library');
    }
  }

  function RippleBonds() {}

  // 1st = currency code
  // 2nd = year codes
  // 3rd = month code

  // TODO make it private

  RippleBonds.currencyCodes = {
    X: 'XRP',
    B: 'BTC',
    U: 'USD',
    E: 'EUR',
    G: 'GBP',
    J: 'JPY',
    A: 'AUD',
    C: 'CAD',
    R: 'RUB',
    H: 'UAH',
    I: 'ILS',
  }

  RippleBonds.yearCodes = {
    A: 2014,
    B: 2015,
    C: 2016,
    D: 2017,
    E: 2018,
    F: 2019,
    G: 2020,
  };

  RippleBonds.monthCodes = {
    F: 1,
    G: 2,
    H: 3,
    J: 4,
    K: 5,
    M: 6,
    N: 7,
    Q: 8,
    U: 9,
    V: 10,
    X: 11,
    Z: 12
  };

  RippleBonds.getNowUTC = function () {
    var now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000);
  };

  RippleBonds.checkSymbol = function (symbol) {

    if (typeof symbol !== 'string') {
      throw new Error('Symbol type - ' + typeof symbol + ' - is wrong,' +
        'must be string');
    }

    if (symbol.length !== 3) {
      throw new Error('Symbol must be 3 letters only');
    }

    if (!_.has(RippleBonds.monthCodes, symbol[2])) {
      throw new Error('Month code - ' + symbol[2] + ' - is incorrect');
    }

    if (!_.has(RippleBonds.yearCodes, symbol[1])) {
      throw new Error('Year code - ' + symbol[1] + ' - is incorrect');
    }
  }

  RippleBonds.getNumPeriods = function (startDate, endDate) {

    var diffMilliseconds = endDate.getTime() - startDate.getTime();

    if (diffMilliseconds <= 0) {
      return 0;
    }

    // seconds / minutes / hours / days / months (rough approximation)
    // TODO correct amount of days

    return diffMilliseconds / 1000 / 60 / 60 / 24 / 30.5;
  };

  RippleBonds.getExpDate = function (symbol) {
    var year = RippleBonds.yearCodes[symbol[1]];
    var month = RippleBonds.monthCodes[symbol[2]];

    return new Date(Date.UTC(year, month, 1));
  };

  RippleBonds.YTM = function (startDate, endDate, price, par) {

    par = par || 1;

    var nPeriods = RippleBonds.getNumPeriods(startDate, endDate);

    if (nPeriods === 0) {
      return (par - price) / price;
    }

    return Math.pow(par / price, 1 / nPeriods) - 1;
  };

  // Syntax sugar for YTM

  RippleBonds.YTMNow = function (endDate, price, par) {
    return RippleBonds.YTM(RippleBonds.getNowUTC(), endDate, price, par);
  };

  RippleBonds.YTMNowSymbol = function (symbol, price, par) {
    var expDate = RippleBonds.getExpDate(symbol);
    return RippleBonds.YTM(RippleBonds.getNowUTC(), expDate, price, par);
  };

  RippleBonds.YTMSymbol = function (startDate, symbol, price, par) {
    var expDate = RippleBonds.getExpDate(symbol);
    return RippleBonds.YTM(startDate, expDate, price, par);
  };

  /*
   * Export this object globally
   */

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = RippleBonds;
    }
    exports.finance = RippleBonds;
  } else if (typeof define === 'function' && define.amd) {
    define(['lodash'], function () {
      return RippleBonds;
    });
  } else {
    root.RippleBonds = RippleBonds;
  }

})(this);

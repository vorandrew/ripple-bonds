; // jshint ignore:line
(function (root) {

  'use strict';

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

  RippleBonds.prototype.getNowUTC = function () {
    var now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000);
  };

  RippleBonds.getMaturityDate = function (symbol) {

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

  /*
   * Export this object globally
   */

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = RippleBonds;
    }
    exports.finance = RippleBonds;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return RippleBonds;
    });
  } else {
    root.RippleBonds = RippleBonds;
  }

})(this);

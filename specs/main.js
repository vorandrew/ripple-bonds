'use strict';

var _ = require('lodash');
var rippleBonds = require('../lib/ripple-bonds.js');

var incorrectCodes = ['XWZ', 'EXU'];

var correctCodes = ['XFF', 'IDF', 'BAM', 'BAZ'];


describe('Global', function () {

  it('Has month codes', function () {
    expect(rippleBonds.monthCodes).toBeDefined();
  });

  it('Has year codes', function () {
    expect(rippleBonds.yearCodes).toBeDefined();
  });

  it('Has currency codes', function () {
    expect(rippleBonds.currencyCodes).toBeDefined();
  });
});

describe('Symbol definition', function () {

  it('Checking month code - must throw', function () {

    _(incorrectCodes).forEach(function (elm) {

      var f = function () {
        rippleBonds.checkSymbol(elm);
      };

      expect(f).toThrow();
    });
  });

  it('Checking month code - must not throw', function () {

    _(correctCodes).forEach(function (elm) {

      var f = function () {
        rippleBonds.checkSymbol(elm);
      };

      expect(f).not.toThrow();
    });
  });
});

describe('Dates', function () {
  it('getNumPeriods', function () {

    var startDate = new Date(2014, 0, 1);
    var endDate = new Date(2014, 1, 1);

    var periods = rippleBonds.getNumPeriods(startDate, endDate);

    expect(periods).toBeCloseTo(1, 1);

  });

  it('getExpDate', function () {
    _(correctCodes).forEach(function (elm) {
      var date = rippleBonds.getExpDate(elm);
      expect(date.getUTCDate()).toEqual(1);
    });
  });

  describe('YTM', function () {
    it('YTM', function () {
      var startDate = new Date(2014, 0, 1);
      var endDate = new Date(2015, 0, 1);

      var ytm = rippleBonds.YTM(startDate, endDate, 0.7, 2);

      expect(ytm).toBeCloseTo(0.092, 3);
    });

    it('YTMSymbol', function () {
      var ytm = rippleBonds.YTMSymbol(new Date(2014, 0, 1), 'XFF', 0.7);
      expect(ytm).toBeCloseTo(0.006, 3);
    });

  });

  describe('PV', function () {
    it('PV', function () {
      var startDate = new Date(2014, 0, 1);
      var endDate = new Date(2015, 0, 1);

      var pv = rippleBonds.PV(startDate, endDate, 0.05, 2);

      expect(pv).toBeCloseTo(1.12, 2);
    });

    it('PVSymbol', function () {
      var startDate = new Date(2014, 1, 1);
      var pv = rippleBonds.PVSymbol(startDate, 'XFF', 0.1);
      expect(pv).toBeCloseTo(0.003, 3);
    });

  });

});

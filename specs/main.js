'use strict';

var _ = require('lodash');
var RippleBonds = require('../lib/ripple-bonds.js');

var incorrectCodes = ['XWZ', 'EXU'];

var correctCodes = ['XFF', 'IDF', 'BAM', 'BAZ'];


describe('Global', function () {

  it('Has month codes', function () {
    expect(RippleBonds.monthCodes).toBeDefined();
  });

  it('Has year codes', function () {
    expect(RippleBonds.yearCodes).toBeDefined();
  });

  it('Has currency codes', function () {
    expect(RippleBonds.currencyCodes).toBeDefined();
  });
});

describe('Symbol definition', function () {

  it('Checking month code - must throw', function () {

    _(incorrectCodes).forEach(function (elm) {

      var f = function () {
        RippleBonds.checkSymbol(elm);
      };

      expect(f).toThrow();
    });
  });

  it('Checking month code - must not throw', function () {

    _(correctCodes).forEach(function (elm) {

      var f = function () {
        RippleBonds.checkSymbol(elm);
      };

      expect(f).not.toThrow();
    });
  });
});

describe('Dates', function () {
  it('getNumPeriods', function () {

    var startDate = new Date(2014, 0, 1);
    var endDate = new Date(2014, 1, 1);

    var periods = RippleBonds.getNumPeriods(startDate, endDate);

    expect(periods).toBeCloseTo(1, 1);

  });

  it('getExpDate', function () {
    _(correctCodes).forEach(function (elm) {
      var date = RippleBonds.getExpDate(elm);
      expect(date.getUTCDate()).toEqual(1);
    });
  });

  describe('YTM', function () {
    it('YTM', function () {
      var startDate = new Date(2014, 0, 1);
      var endDate = new Date(2015, 0, 1);

      var ytm = RippleBonds.YTM(startDate, endDate, 0.7, 2);

      expect(ytm).toBeCloseTo(0.092, 3);
    });

    it('YTMSymbol', function () {
      var ytm = RippleBonds.YTMSymbol(new Date(2014, 0, 1), 'XFF', 0.7);
      expect(ytm).toBeCloseTo(0.006, 3);
    });

  });

  describe('PV', function () {
    it('PV', function () {
      var startDate = new Date(2014, 0, 1);
      var endDate = new Date(2015, 0, 1);

      var pv = RippleBonds.PV(startDate, endDate, 0.05, 2);

      expect(pv).toBeCloseTo(1.12, 2);
    });

    it('PVSymbol', function () {
      var startDate = new Date(2014, 1, 1);
      var pv = RippleBonds.PVSymbol(startDate, 'XFF', 0.1);
      expect(pv).toBeCloseTo(0.003, 3);
    });

  });

});

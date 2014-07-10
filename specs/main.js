'use strict';

var _ = require('lodash');
var RippleBonds = require('../lib/ripple-bonds.js');

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

  var incorrectCodes = ['XWZ', 'EXU'];

  var correctCodes = ['XFF', 'IDF'];

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

describe('Periods', function () {
  it('getNumPeriods', function () {

    var startDate = new Date(2014, 0, 1);
    var endDate = new Date(2014, 1, 1);

    var periods = RippleBonds.getNumPeriods(startDate, endDate);

    expect(periods).toBeCloseTo(1, 1);

  });
});

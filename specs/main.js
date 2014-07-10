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

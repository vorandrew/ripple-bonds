'use strict';

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

  it('Correct month code', function () {
    expect(RippleBonds.monthCodes).toBeDefined();
  });

  it('Has year codes', function () {
    expect(RippleBonds.yearCodes).toBeDefined();
  });

  it('Has currency codes', function () {
    expect(RippleBonds.currencyCodes).toBeDefined();
  });
});

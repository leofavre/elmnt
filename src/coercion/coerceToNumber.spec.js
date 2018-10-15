import coerceToNumber from './coerceToNumber.js';

describe('coerceToNumber', () => {
  it('Should return 0 if null is passed.', () => {
    expect(coerceToNumber(null)).to.equal(0);
  });

  it('Should return 0 if an empty string is passed.', () => {
    expect(coerceToNumber('')).to.equal(0);
  });

  it('Should return 0 if a non-numeric value.', () => {
    expect(coerceToNumber('120abc')).to.equal(0);
  });

  it('Should converted a numeric value.', () => {
    expect(coerceToNumber('120.5')).to.equal(120.5);
  });
});

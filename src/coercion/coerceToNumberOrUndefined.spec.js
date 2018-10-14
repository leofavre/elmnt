import coerceToNumberOrUndefined from './coerceToNumberOrUndefined.js';

describe('coerceToNumberOrUndefined', () => {
  it('Should return undefined if null is passed.', () => {
    expect(coerceToNumberOrUndefined(null)).to.be.undefined;
  });

  it('Should return undefined if an empty string is passed.', () => {
    expect(coerceToNumberOrUndefined('')).to.be.undefined;
  });

  it('Should return undefined if a non-numeric value.', () => {
    expect(coerceToNumberOrUndefined('120abc')).to.be.undefined;
  });

  it('Should converted a numeric value.', () => {
    expect(coerceToNumberOrUndefined('120.5')).to.equal(120.5);
  });
});

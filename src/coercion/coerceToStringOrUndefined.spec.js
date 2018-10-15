import coerceToStringOrUndefined from './coerceToStringOrUndefined.js';

describe('coerceToStringOrUndefined', () => {
  it('Should return undefined if null is passed.', () => {
    expect(coerceToStringOrUndefined(null)).to.be.undefined;
  });

  it('Should return an empty string if an empty string is passed.', () => {
    expect(coerceToStringOrUndefined('')).to.equal('');
  });

  it('Should return a string if a string is passed.', () => {
    expect(coerceToStringOrUndefined('value')).to.equal('value');
  });
});

import coerceToString from './coerceToString.js';

describe('coerceToString', () => {
  it('Should return an empty string if null is passed.', () => {
    expect(coerceToString(null)).to.equal('');
  });

  it('Should return an empty string if an empty string is passed.', () => {
    expect(coerceToString('')).to.equal('');
  });

  it('Should return a string if a string is passed.', () => {
    expect(coerceToString('value')).to.equal('value');
  });
});

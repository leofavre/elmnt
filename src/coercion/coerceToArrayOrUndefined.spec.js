import coerceToArrayOrUndefined from './coerceToArrayOrUndefined.js';

describe('coerceToArrayOrUndefined', () => {
  it('Should return undefined if null is passed.', () => {
    expect(coerceToArrayOrUndefined(null)).to.be.undefined;
  });

  it('Should return undefined if an empty string is passed.', () => {
    expect(coerceToArrayOrUndefined('')).to.be.undefined;
  });

  it('Should return an array with a string if a string is passed.', () => {
    expect(coerceToArrayOrUndefined('value')).to.deep.equal(['value']);
  });

  it('Should return an array with a string if ' +
    'a comma-separated string is passed.', () => {
    expect(coerceToArrayOrUndefined('value,other'))
      .to.deep.equal(['value', 'other']);
  });
});

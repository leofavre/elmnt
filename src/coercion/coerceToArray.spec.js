import coerceToArray from './coerceToArray.js';

describe('coerceToArray', () => {
  it('Should return an empty array if null is passed.', () => {
    expect(coerceToArray(null)).to.deep.equal([]);
  });

  it('Should return an empty array if an empty string is passed.', () => {
    expect(coerceToArray('')).to.deep.equal([]);
  });

  it('Should return an array with a string if a string is passed.', () => {
    expect(coerceToArray('value')).to.deep.equal(['value']);
  });

  it('Should return an array with a string if ' +
    'a comma-separated string is passed.', () => {
    expect(coerceToArray('value,other')).to.deep.equal(['value', 'other']);
  });
});

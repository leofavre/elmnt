import capitalize from './capitalize.js';

describe('capitalize', () => {
  it('Should capitalize the first letter of a string.', () => {
    expect(capitalize('leonardo')).to.equal('Leonardo');
  });

  it('Should return an empty strang if a parameter is not passed.', () => {
    expect(capitalize()).to.equal('');
  });

  it('Should work if passed only a letter.', () => {
    expect(capitalize('z')).to.equal('Z');
  });
});

import coerceToBoolean from './coerceToBoolean.js';

describe('coerceToBoolean', () => {
  it('Should return false if null is passed.', () => {
    expect(coerceToBoolean(null)).to.be.false;
  });

  it('Should return true if an empty string is passed.', () => {
    expect(coerceToBoolean('')).to.be.true;
  });

  it('Should return true if a "false" string is passed.', () => {
    expect(coerceToBoolean('false')).to.be.true;
  });

  it('Should return true if a "0" string is passed.', () => {
    expect(coerceToBoolean('0')).to.be.true;
  });

  it('Should return true if a string is passed.', () => {
    expect(coerceToBoolean('value')).to.be.true;
  });
});

import isNumeric from './isNumeric.js';

describe('isNumeric', () => {
  it('Should return false for undefined.', () => {
    expect(isNumeric()).to.be.false;
    expect(isNumeric(undefined)).to.be.false;
  });

  it('Should return false for null.', () => {
    expect(isNumeric(null)).to.be.false;
  });

  it('Should return false for NaN.', () => {
    expect(isNumeric(NaN)).to.be.false;
  });

  it('Should return false for an object.', () => {
    expect(isNumeric({})).to.be.false;
  });

  it('Should return false for an array.', () => {
    expect(isNumeric([])).to.be.false;
  });

  it('Should return false for a string with letters.', () => {
    expect(isNumeric('letters')).to.be.false;
  });

  it('Should return false for a string with numbers and letters.', () => {
    expect(isNumeric('12345letters')).to.be.false;
  });

  it('Should return true for a string representation of a number.', () => {
    expect(isNumeric('12345')).to.be.true;
  });

  it('Should return true for a string representation of a number ' +
    'with decimals.', () => {
    expect(isNumeric('123.45')).to.be.true;
  });

  it('Should return true for a string representation of a number ' +
    'in scientific notation.', () => {
    expect(isNumeric('3.125e7')).to.be.true;
  });

  it('Should return true for an actual number.', () => {
    expect(isNumeric(12345)).to.be.true;
  });

  it('Should return true for an actual number with decimals.', () => {
    expect(isNumeric(123.45)).to.be.true;
  });

  it('Should return true for an actual number in scientific notation.', () => {
    expect(isNumeric(3.125e7)).to.be.true;
  });
});

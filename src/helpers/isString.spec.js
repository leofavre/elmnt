import isString from './isString.js';

describe('isString', () => {
  it('Should return true for a string.', () => {
    expect(isString('a')).to.be.true;
  });

  it('Should return true for a string made with new String().', () => {
    const testStr = new String('a');
    expect(isString(testStr)).to.be.true;
  });

  it('Should return false for an object.', () => {
    expect(isString({})).to.be.false;
  });

  it('Should return false for an array.', () => {
    expect(isString([])).to.be.false;
  });

  it('Should return false for a number.', () => {
    expect(isString(2)).to.be.false;
  });

  it('Should return false for null.', () => {
    expect(isString(null)).to.be.false;
  });

  it('Should return false for undefined.', () => {
    expect(isString(undefined)).to.be.false;
  });

  it('Should return false for a function.', () => {
    expect(isString(() => 'a')).to.be.false;
  });

  it('Should return false for a Promise.', () => {
    const testPromise = Promise.resolve('a');
    expect(isString(testPromise)).to.be.false;
  });
});

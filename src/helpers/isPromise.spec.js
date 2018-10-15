import isPromise from './isPromise.js';

describe('isPromise', () => {
  it('Should return false for a string.', () => {
    expect(isPromise('a')).to.equal(false);
  });

  it('Should return false for an object.', () => {
    expect(isPromise({})).to.equal(false);
  });

  it('Should return false for an array.', () => {
    expect(isPromise([])).to.equal(false);
  });

  it('Should return false for a number.', () => {
    expect(isPromise(2)).to.equal(false);
  });

  it('Should return false for null.', () => {
    expect(isPromise(null)).to.equal(false);
  });

  it('Should return false for undefined.', () => {
    expect(isPromise(undefined)).to.equal(false);
  });

  it('Should return false for a function.', () => {
    expect(isPromise(() => 'a')).to.equal(false);
  });

  it('Should return true for a Promise.', () => {
    const testPromise = Promise.resolve('a');
    expect(isPromise(testPromise)).to.equal(true);
  });
});

import setAttr from './setAttr.js';

const dummy = {};

describe('setAttr', () => {
  beforeEach(() => {
    dummy.setAttribute = sinon.spy();
    dummy.removeAttribute = sinon.spy();
  });

  afterEach(() => {
    dummy.setAttribute = null;
    dummy.removeAttribute = null;
  });

  it('Should remove the attribute if a falsey value different from ' +
    '0 or false is passed.', () => {
    setAttr(dummy, 'height', undefined);
    setAttr(dummy, 'height', null);
    setAttr(dummy, 'height', NaN);
    setAttr(dummy, 'height', false);
    expect(dummy.removeAttribute).to.have.callCount(4);
  });

  it('Should set the attribute if a string is passed.', () => {
    setAttr(dummy, 'height', 'str');
    expect(dummy.setAttribute).to.have.been.calledOnceWith('height', 'str');
  });

  it('Should set the attribute if 0 is passed.', () => {
    setAttr(dummy, 'height', 0);
    expect(dummy.setAttribute).to.have.been.calledOnceWith('height', 0);
  });

  it('Should set the attribute if an empty string is passed.', () => {
    setAttr(dummy, 'height', '');
    expect(dummy.setAttribute).to.have.been.calledOnceWith('height', '');
  });

  it('Should set the attribute to an empty string if true is passed.', () => {
    setAttr(dummy, 'height', true);
    expect(dummy.setAttribute).to.have.been.calledOnceWith('height', '');
  });
});

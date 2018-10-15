import setAttr from './setAttr.js';

let spy;

let dummy = {
  setAttribute (attrName, value) {
    spy(attrName, value);
  },
  removeAttribute () {
    spy('removed');
  }
};

describe('setAttr', () => {
  beforeEach(() => {
    spy = sinon.spy();
  });

  afterEach(() => {
    spy = null;
  });

  it('Should remove the attribute if a falsey value different from ' +
    '0 or false is passed.', () => {
    setAttr(dummy, 'height', undefined);
    setAttr(dummy, 'height', null);
    setAttr(dummy, 'height', NaN);
    setAttr(dummy, 'height', false);

    expect(spy).to.have.callCount(4);
    expect(spy).to.always.have.been.calledWithExactly('removed');
  });

  it('Should set the attribute if a string is passed.', () => {
    setAttr(dummy, 'height', 'str');
    expect(spy).to.have.been.calledWith('height', 'str');
  });

  it('Should set the attribute if 0 is passed.', () => {
    setAttr(dummy, 'height', 0);
    expect(spy).to.have.been.calledWith('height', 0);
  });

  it('Should set the attribute if an empty string is passed.', () => {
    setAttr(dummy, 'height', '');
    expect(spy).to.have.been.calledWith('height', '');
  });

  it('Should set the attribute to an empty string if true is passed.', () => {
    setAttr(dummy, 'height', true);
    expect(spy).to.have.been.calledWith('height', '');
  });
});

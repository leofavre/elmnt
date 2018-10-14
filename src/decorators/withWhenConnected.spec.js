import {
  PUB_SUB,
  IS_CONNECTED,
  withWhenConnected
} from './withWhenConnected.js';

let spy;
const Enhanced = withWhenConnected();
const dummy = new Enhanced();

describe('withWhenConnected', () => {
  beforeEach(() => {
    spy = sinon.spy();
  });

  afterEach(() => {
    spy = undefined;
  });

  describe('#whenConnected', () => {
    it('Should execute a function if connected.', () => {
      dummy[IS_CONNECTED] = true;
      dummy.whenConnected(spy);
      expect(spy).to.have.been.calledOnce;
    });

    it('Should save a callback for later if not connected.', () => {
      dummy[IS_CONNECTED] = false;
      dummy.whenConnected(spy);
      expect(spy).not.to.have.been.called;
      expect(dummy[PUB_SUB].length).to.equal(1);
      expect(dummy[PUB_SUB][0]).to.equal(spy);
    });
  });

  describe('#connectedCallback', () => {
    it('Should execute super.connectedCallback if it exists.', () => {
      const Base = class {
        connectedCallback () {
          spy();
        }
      };

      const Child = withWhenConnected(Base);
      const child = new Child();
      child.connectedCallback();
      expect(spy).to.have.been.calledOnce;
    });

    it('Should execute a list of callbacks.', () => {
      dummy[PUB_SUB] = [spy, spy, spy];
      expect(spy).not.to.have.been.called;

      dummy.connectedCallback();
      expect(spy).to.have.been.calledThrice;
    });
  });
});

import withDomEventsRaw from './withDomEvents.js';

let spy;

class EventMaker {
  constructor (evtName, detail) {
    this.evtName = evtName;
    this.detail = detail;
  }
}

class Dummy extends withDomEventsRaw(EventMaker)() {}

describe('withDomEvents', () => {
  beforeEach(() => {
    spy = sinon.spy();
  });

  afterEach(() => {
    spy = undefined;
  });

  describe('#dispatchEventAndMethod()', () => {
    it('Should dispatch a DOM Event with name and detail.', () => {
      const dummy = new Dummy();

      dummy.dispatchEvent = spy;
      dummy.dispatchEventAndMethod('open', 'door');

      expect(spy).to.have.been.calledOnce;
      expect(spy.args[0][0].evtName).to.equal('open');

      expect(spy.args[0][0].detail).to.deep.equal({
        bubbles: true,
        detail: 'door'
      });
    });

    it('Should trigger a onevent() method.', () => {
      const dummy = new Dummy();

      dummy.dispatchEvent = function () {};
      dummy.onopen = spy;
      dummy.dispatchEventAndMethod('open', 'door');

      expect(spy).to.have.been.calledOnce;
      expect(spy.args[0][0].evtName).to.equal('open');

      expect(spy.args[0][0].detail).to.deep.equal({
        bubbles: true,
        detail: 'door'
      });
    });
  });
});

import withDomEventsRaw from './withDomEvents.js';

class EventMaker {
  constructor (evtName, detail) {
    this.evtName = evtName;
    this.detail = detail;
  }
}

class Dummy extends withDomEventsRaw(EventMaker)() {}

describe('withDomEvents', () => {
  describe('#dispatchEventAndMethod()', () => {
    it('Should dispatch a DOM Event with name and detail.', () => {
      const dummy = new Dummy();

      dummy.dispatchEvent = sinon.spy();
      dummy.dispatchEventAndMethod('open', 'door');

      expect(dummy.dispatchEvent).to.have.been.calledOnceWith({
        evtName: 'open',
        detail: {
          bubbles: true,
          detail: 'door'
        }
      });
    });

    it('Should trigger a onevent() method.', () => {
      const dummy = new Dummy();

      dummy.dispatchEvent = function () {};
      dummy.onopen = sinon.spy();
      dummy.dispatchEventAndMethod('open', 'door');

      expect(dummy.onopen).to.have.been.calledOnceWith({
        evtName: 'open',
        detail: {
          bubbles: true,
          detail: 'door'
        }
      });
    });
  });
});

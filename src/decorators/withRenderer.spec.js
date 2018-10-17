import withRendererRaw from './withRenderer.js';

let dummy;
const render = sinon.spy();
class TemplateResult {}
class Dummy extends withRendererRaw(render, TemplateResult)() {}

describe('withRenderer', () => {
  beforeEach(() => {
    Dummy.prototype.connectedCallback = sinon.spy();
    Dummy.prototype.attachShadow = sinon.spy();
    dummy = new Dummy();
  });

  afterEach(() => {
    dummy = null;
    Dummy.prototype.connectedCallback = null;
    Dummy.prototype.attachShadow = null;
  });

  describe('#constructor()', () => {
    it('Should attach the shadow DOM.', () => {
      expect(Dummy.prototype.attachShadow)
        .to.have.been.calledOnceWith({ mode: 'open' });

      expect(dummy.constructor).to.equal(Dummy);
    });
  });
});

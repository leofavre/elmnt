import withRendererRaw from './withRenderer.js';

let dummy;
const render = sinon.spy();
class TemplateResult {}
class Dummy extends withRendererRaw(render, TemplateResult)() {}

describe('withRenderer', () => {
  beforeEach(() => {
    Dummy.prototype.attachShadow = sinon.spy();
    dummy = new Dummy();
  });

  afterEach(() => {
    dummy = null;
    Dummy.prototype.attachShadow = null;
  });

  describe('#constructor()', () => {
    it('Should attach the shadow DOM.', () => {
      expect(Dummy.prototype.attachShadow)
        .to.have.been.calledOnceWith({ mode: 'open' });

      expect(dummy.constructor).to.equal(Dummy);
    });
  });

  describe('#connectedCallback()', () => {
    it('Should not discard super.connectedCallback.', () => {
      class Parent {}
      Parent.prototype.connectedCallback = sinon.spy();
      class Child extends withRendererRaw(render, TemplateResult)(Parent) {}
      const child = new Child();
      child.connectedCallback();
      expect(Parent.prototype.connectedCallback).to.have.been.calledOnce;
    });

    it('Should call this.updateLayout.', () => {
      dummy.updateLayout = sinon.spy();
      dummy.connectedCallback();
      expect(dummy.updateLayout).to.have.been.calledOnce;
    });
  });

  describe('#updateLayout()', () => {
    it('Should return undefined if this.render is not set.', () => {
      expect(dummy.updateLayout()).to.be.undefined;
    });

    it('Should use the external lit-html render method if this.render ' +
      'returns a TemplateResult instance.', () => {
      dummy.render = function () {
        return new TemplateResult();
      };

      dummy.shadowRoot = {};
      dummy.updateLayout();

      expect(render).to.have.been.calledOnce;
    });

    it('Should directly set innerHTML on the shadowRoot if this.render ' +
      'returns something else then a TemplateResult instance.', () => {
      dummy.render = function () {
        return 'string';
      };

      dummy.shadowRoot = {};
      dummy.updateLayout();

      expect(dummy.shadowRoot.innerHTML).to.equal('string');
    });
  });
});

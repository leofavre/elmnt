import isFunction from '../helpers/isFunction.js';

export default (render, TemplateResult) => (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback () {
      if (isFunction(super.connectedCallback)) {
        super.connectedCallback();
      }
      this.updateRender();
    }

    updateRender () {
      let renderResult;

      if (isFunction(this.render)) {
        renderResult = this.render(this);
      }

      if (renderResult == null) {
        return undefined;
      }

      if (renderResult.constructor === TemplateResult) {
        render(renderResult, this.shadowRoot);
      } else {
        this.shadowRoot.innerHTML = renderResult;
      }
    }
  };

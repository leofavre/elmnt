import isFunction from '../helpers/isFunction.js';

export default (render, TemplateResult) => (Base = class {}) =>
  class extends Base {
    constructor () {
      super();

      if (isFunction(this.attachShadow)) {
        this.attachShadow({ mode: 'open' });
      }
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

      if (this.shadowRoot && renderResult != null) {
        if (renderResult.constructor === TemplateResult) {
          render(renderResult, this.shadowRoot);
        } else {
          this.shadowRoot.innerHTML = renderResult;
        }
      }
    }
  };

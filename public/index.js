import { withElmnt, coerceToNumberOrUndefined } from '../src/index.js';

class Element extends withElmnt(HTMLElement) {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get parameters () {
    return [{
      attr: 'my-level',
      prop: 'myLevel',
      toProp: coerceToNumberOrUndefined
    }];
  }

  propertyChangedCallback (...args) {
    super.propertyChangedCallback(...args);
    this.render(this);
  }

  render ({ myLevel }) {
    this.shadowRoot.innerHTML = `
      <style>div { font-size: 48px };</style>
      <div>${(myLevel != null && myLevel !== false) ? myLevel : 'xxx'}</div>
    `;
  }
}

customElements.define('my-element', Element);

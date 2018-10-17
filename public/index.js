import { html, withElmnt, coerceToNumberOrUndefined } from '../src/index.js';

class Element extends withElmnt(HTMLElement) {
  static get parameters () {
    return [{
      attr: 'my-level',
      prop: 'myLevel',
      toProp: coerceToNumberOrUndefined,
      onPropChanged: 'updateLayout'
    }];
  }

  render ({ myLevel }) {
    return html`
      <style>div { font-size: 48px };</style>
      <div>${(myLevel != null && myLevel !== false) ? myLevel : 'xxx'}</div>
    `;
  }
}

customElements.define('my-element', Element);

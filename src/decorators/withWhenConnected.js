export const PUB_SUB = Symbol('PUB_SUB');
export const IS_CONNECTED = Symbol('IS_CONNECTED');

export const withWhenConnected = (Base = class {}) => class extends Base {
  constructor () {
    super();
    this[PUB_SUB] = [];
  }

  whenConnected (fn) {
    if (this[IS_CONNECTED]) {
      fn();
    } else {
      this[PUB_SUB].push(fn);
    }
  }

  connectedCallback () {
    super.connectedCallback && super.connectedCallback();
    this[IS_CONNECTED] = true;
    this[PUB_SUB].forEach(fn => fn());
  }
};

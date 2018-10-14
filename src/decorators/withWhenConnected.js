export const CALLBACKS = Symbol('CALLBACKS');
export const IS_CONNECTED = Symbol('IS_CONNECTED');

export default (Base = class {}) => class extends Base {
  constructor () {
    super();
    this[CALLBACKS] = [];
  }

  whenConnected (callback) {
    if (this[IS_CONNECTED]) {
      callback();
    } else {
      this[CALLBACKS].push(callback);
    }
  }

  connectedCallback () {
    super.connectedCallback && super.connectedCallback();
    this[IS_CONNECTED] = true;
    this[CALLBACKS].forEach(callback => callback());
  }
};

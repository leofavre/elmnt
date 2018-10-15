import isFunction from '../helpers/isFunction.js';

export default EventMaker => (Base = class {}) => class extends Base {
  dispatchEventAndMethod (evtName, detail) {
    const event = new EventMaker(evtName, {
      bubbles: true,
      detail
    });

    const method = this[`on${evtName}`];

    this.dispatchEvent(event);

    if (isFunction(method)) {
      method(event);
    }
  }
};

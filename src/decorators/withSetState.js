import isFunction from '../helpers/isFunction.js';

export default (Base = class {}) => class extends Base {
  setState (arg) {
    this.state = {
      ...(this.state || {}),
      ...(isFunction(arg) ? arg(this.state) : arg)
    };
  }
};

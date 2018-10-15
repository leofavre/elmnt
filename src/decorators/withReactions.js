import withWhenConnected from './withWhenConnected.js';
import selectParameter from '../common/selectParameter.js';
import capitalize from '../helpers/capitalize.js';
import isString from '../helpers/isString.js';
import isFunction from '../helpers/isFunction.js';

export default (Base = class {}) => class extends withWhenConnected(Base) {
  attributeChangedCallback (attrName, oldValue, newValue) {
    super.attributeChangedCallback &&
      super.attributeChangedCallback(attrName, oldValue, newValue);

    if (oldValue !== newValue) {
      this.handleReaction('attr', attrName, oldValue, newValue);
    }
  }

  propertyChangedCallback (propName, oldValue, newValue) {
    super.propertyChangedCallback &&
      super.propertyChangedCallback(propName, oldValue, newValue);

    if (oldValue !== newValue) {
      this.handleReaction('prop', propName, oldValue, newValue);
    }
  }

  handleReaction (type, paramName, oldValue, newValue) {
    const parameter = selectParameter(this.constructor, type, paramName);
    const oneOrManyCallbacks = parameter[`on${capitalize(type)}Changed`];

    if (oneOrManyCallbacks != null) {
      this.handleCallback(oneOrManyCallbacks, newValue, oldValue);
    }
  }

  handleCallback (oneOrManyCallbacks, ...args) {
    if (Array.isArray(oneOrManyCallbacks)) {
      oneOrManyCallbacks.map(callback =>
        this.handleCallback(callback, ...args));
    } else {
      let fn;
      const callback = oneOrManyCallbacks;

      if (isString(callback) && isFunction(this[callback])) {
        fn = this[callback].bind(this);
      } else if (isFunction(callback)) {
        fn = callback.bind(this);
      } else {
        return undefined;
      }

      this.whenConnected(() => {
        fn(...args);
      });
    }
  }
};

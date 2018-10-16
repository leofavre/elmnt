import withWhenConnected from './withWhenConnected.js';
import setAttr from '../common/setAttr.js';
import parseParameters from '../common/parseParameters.js';
import selectParameter from '../common/selectParameter.js';
import same from '../helpers/same.js';
import isFunction from '../helpers/isFunction.js';

export default (Base = class {}) => class extends withWhenConnected(Base) {
  static get observedAttributes () {
    const parameters = parseParameters(this);

    return [
      ...(super.observedAttributes || []),
      ...parameters.map(param => param.attr).filter(value => value != null)
    ];
  }

  static get observedProperties () {
    const parameters = parseParameters(this);

    return [
      ...(super.observedProperties || []),
      ...parameters.map(param => param.prop).filter(value => value != null)
    ];
  }

  attributeChangedCallback (paramName, oldValue, newValue) {
    if (isFunction(super.attributeChangedCallback)) {
      super.attributeChangedCallback(paramName, oldValue, newValue);
    }

    const parameter = selectParameter(this.constructor, 'attr', paramName);
    const name = parameter.prop;
    const coerce = parameter.toProp || same;

    if (name != null && oldValue !== newValue) {
      this.whenConnected(() => {
        this[name] = coerce(newValue);
      });
    }
  }

  propertyChangedCallback (paramName, oldValue, newValue) {
    if (isFunction(super.propertyChangedCallback)) {
      super.propertyChangedCallback(paramName, oldValue, newValue);
    }

    const parameter = selectParameter(this.constructor, 'prop', paramName);
    const name = parameter.attr;
    const coerce = parameter.toAttr || same;

    if (name != null && oldValue !== newValue) {
      this.whenConnected(() => {
        setAttr(this, name, coerce(newValue));
      });
    }
  }
};

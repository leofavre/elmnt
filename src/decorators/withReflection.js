import {
  isFunction,
  toCamelCase,
  toKebabCase,
  setAttr,
  merge
} from 'web-ecomm-helpers';

export const withReflection = (Base = class {}) => class extends Base {
  static get observedProperties () {
    const { reflections = {} } = this;
    const propNames = Object.keys(reflections).map(toCamelCase);
    return merge(super.observedProperties || [], propNames);
  }

  static get observedAttributes () {
    const { reflections = {} } = this;
    const attrNames = Object.keys(reflections).map(toKebabCase);
    return merge(super.observedAttributes || [], attrNames);
  }

  static shouldReflectProperty (propName) {
    const { reflections = {} } = this;
    return Object.keys(reflections).includes(propName);
  }

  attributeChangedCallback (attrName, oldValue, newValue) {
    if (isFunction(super.attributeChangedCallback)) {
      super.attributeChangedCallback(attrName, oldValue, newValue);
    }

    const propName = toCamelCase(attrName);
    const shouldReflectProperty = this.constructor
      .shouldReflectProperty(propName);

    if (shouldReflectProperty && oldValue !== newValue) {
      this.whenConnected(() => {
        const { reflections } = this.constructor;
        const coerce = reflections[propName];
        this[propName] = coerce(newValue);
      });
    }
  }

  propertyChangedCallback (propName, oldValue, newValue) {
    if (isFunction(super.propertyChangedCallback)) {
      super.propertyChangedCallback(propName, oldValue, newValue);
    }

    const attrName = toKebabCase(propName);
    const shouldReflectProperty = this.constructor
      .shouldReflectProperty(propName);

    if (shouldReflectProperty && oldValue !== newValue) {
      this.whenConnected(() => {
        setAttr(this, attrName, newValue);
      });
    }
  }
};

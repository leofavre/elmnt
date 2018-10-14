import withObservedProperties from 'observed-properties';
import withWhenConnected from './withWhenConnected.js';
import setAttr from '../helpers/setAttr.js';

const same = arg => arg;
const capitalize = str => `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;

const selectObserved = (parameters = [], type) => {
  return parameters
    .map(param => (param[type] != null) ? param[type] : param.attrProp)
    .filter(value => value != null);
};

const selectNameAndCoercion = (parameters = [], type, altType, paramName) => {
  const parameter = parameters.find(param =>
    [param[type], param.attrProp].includes(paramName)) || {};

  const name = parameter[altType] || parameter.attrProp;
  const coerce = parameter[`to${capitalize(altType)}`] || same;

  return { name, coerce };
};

export default (Base = class {}) =>
  class extends withObservedProperties(withWhenConnected(Base)) {
    static get observedAttributes () {
      const { parameters } = this;

      return [
        ...(super.observedAttributes || []),
        ...selectObserved(parameters, 'attr')
      ];
    }

    static get observedProperties () {
      const { parameters } = this;

      return [
        ...(super.observedProperties || []),
        ...selectObserved(parameters, 'prop')
      ];
    }

    attributeChangedCallback (paramName, oldValue, newValue) {
      super.attributeChangedCallback &&
        super.attributeChangedCallback(paramName, oldValue, newValue);

      const { parameters } = this.constructor;
      const { name, coerce } =
        selectNameAndCoercion(parameters, 'attr', 'prop', paramName);

      if (name != null && oldValue !== newValue) {
        this.whenConnected(() => {
          this[name] = coerce(newValue);
        });
      }
    }

    propertyChangedCallback (paramName, oldValue, newValue) {
      super.propertyChangedCallback &&
        super.propertyChangedCallback(paramName, oldValue, newValue);

      const { parameters } = this.constructor;
      const { name, coerce } =
        selectNameAndCoercion(parameters, 'prop', 'attr', paramName);

      if (name != null && oldValue !== newValue) {
        this.whenConnected(() => {
          setAttr(this, name, coerce(newValue));
        });
      }
    }
  };

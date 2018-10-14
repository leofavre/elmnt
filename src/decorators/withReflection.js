import withObservedProperties from 'observed-properties';

const OBSERVED = Symbol('OBSERVED');

export default (Base = class {}) => {
  const Enhanced = class extends withObservedProperties(Base) {
    static get observedAttributes () {
      return [...(super.observedAttributes || []), ...this[OBSERVED]('attr')];
    }

    static get observedProperties () {
      return [...(super.observedProperties || []), ...this[OBSERVED]('prop')];
    }
  };

  Enhanced[OBSERVED] = function (name) {
    const { parameters = [] } = this;

    return parameters
      .map(param => (param[name] != null) ? param[name] : param.attrProp)
      .filter(value => value != null);
  };

  return Enhanced;
};

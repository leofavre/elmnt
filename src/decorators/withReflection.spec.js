import withReflection from './withReflection.js';

const Dummy = class extends withReflection() {
  static get parameters () {
    return [{
      attr: 'attrOne',
      prop: 'propOne'
    }, {
      attr: 'attrTwo',
      attrProp: 'attrPropOne'
    }, {
      prop: 'propTwo',
      attrProp: 'attrPropTwo'
    }];
  }
};

describe('withReflection', () => {
  describe('.observedAttributes', () => {
    it('Should be an empty array if not set.', () => {
      expect(withReflection().observedAttributes).to.deep.equal([]);
    });

    it('Should set observedAttributes based on parameters.', () => {
      expect(Dummy.observedAttributes)
        .to.deep.equal(['attrOne', 'attrTwo', 'attrPropTwo']);
    });

    it('Should not discard super.observedAttributes.', () => {

    });
  });

  describe('.observedProperties', () => {
    it('Should be an empty array if not set.', () => {
      expect(withReflection().observedProperties).to.deep.equal([]);
    });

    it('Should set observedProperties based on parameters.', () => {
      expect(Dummy.observedProperties)
        .to.deep.equal(['propOne', 'attrPropOne', 'propTwo']);
    });

    it('Should not discard super.observedProperties.', () => {

    });
  });
});

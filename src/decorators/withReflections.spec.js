import withReflections from './withReflections.js';

let spy;

const Dummy = class extends withReflections() {
  static get parameters () {
    return [{
      attr: 'attrOne',
      prop: 'propOne',
      toAttr (value) {
        return spy('toAttr', value);
      },
      toProp (value) {
        return spy('toProp', value);
      }
    }, {
      attr: 'attrTwo',
      attrProp: 'attrPropOne'
    }, {
      prop: 'propTwo',
      attrProp: 'attrPropTwo'
    }, {
      attrProp: 'both'
    }];
  }

  setAttribute () {}

  removeAttribute () {}
};

class Parent {
  static get observedAttributes () {
    return ['parent'];
  }

  static get observedProperties () {
    return ['parent'];
  }

  attributeChangedCallback () {
    spy('parentAttrChanged');
  }

  propertyChangedCallback () {
    spy('parentPropChanged');
  }
}

class Child extends withReflections(Parent) {
  static get parameters () {
    return [{
      attr: 'attrOne',
      prop: 'propOne'
    }];
  }
}

describe('withReflections', () => {
  beforeEach(() => {
    spy = sinon.spy();
  });

  afterEach(() => {
    spy = undefined;
  });

  describe('.observedAttributes', () => {
    it('Should be an empty array if not set.', () => {
      expect(withReflections().observedAttributes).to.deep.equal([]);
    });

    it('Should set observedAttributes based on parameters.', () => {
      expect(Dummy.observedAttributes)
        .to.deep.equal(['attrOne', 'attrTwo', 'attrPropTwo', 'both']);
    });

    it('Should not discard super.observedAttributes.', () => {
      expect(Child.observedAttributes)
        .to.deep.equal(['parent', 'attrOne']);
    });
  });

  describe('.observedProperties', () => {
    it('Should be an empty array if not set.', () => {
      expect(withReflections().observedProperties).to.deep.equal([]);
    });

    it('Should set observedProperties based on parameters.', () => {
      expect(Dummy.observedProperties)
        .to.deep.equal(['propOne', 'attrPropOne', 'propTwo', 'both']);
    });

    it('Should not discard super.observedProperties.', () => {
      expect(Child.observedProperties)
        .to.deep.equal(['parent', 'propOne']);
    });
  });

  describe('#attributeChangedCallback()', () => {
    it('Should not reflect if attrName is not declared in parameters.', () => {
      const dummy = new Dummy();
      dummy.connectedCallback();
      dummy.attributeChangedCallback('notSet', '40', '72');
      expect(spy).not.to.have.been.called;
    });

    it('Should wait until connected before reflecting an attribute.', () => {
      const dummy = new Dummy();
      dummy.attributeChangedCallback('attrOne', '40', '72');
      expect(spy).not.to.have.been.called;

      dummy.connectedCallback();
      expect(spy).to.have.been.calledWith('toProp', '72');
    });

    it('Should not reflect if old and new values are the same.', () => {
      const dummy = new Dummy();
      dummy.connectedCallback();
      dummy.attributeChangedCallback('attrOne', '40', '40');
      expect(spy).not.to.have.been.called;
    });

    it('Should reflect without coercion when toProp is not set.', () => {
      const dummy = new Dummy();
      dummy.connectedCallback();
      dummy.attributeChangedCallback('attrTwo', '40', '72');
      expect(spy).not.to.have.been.called;
    });

    it('Should not break when parameters are not set.', () => {
      const Empty = withReflections();
      const empty = new Empty();
      empty.connectedCallback();
      empty.attributeChangedCallback('notSet', '40', '72');
      expect(Empty.parameters).to.be.undefined;
    });

    it('Should not discard super.attributeChangedCallback.', () => {
      const child = new Child();
      child.attributeChangedCallback();
      expect(spy).to.have.been.calledWith('parentAttrChanged');
    });
  });

  describe('#propertyChangedCallback()', () => {
    it('Should not reflect if propName is not declared in parameters.', () => {
      const dummy = new Dummy();
      dummy.connectedCallback();
      dummy.propertyChangedCallback('notSet', '40', '72');
      expect(spy).not.to.have.been.called;
    });

    it('Should wait until connected before reflecting a property.', () => {
      const dummy = new Dummy();
      dummy.propertyChangedCallback('propOne', '40', '72');
      expect(spy).not.to.have.been.called;

      dummy.connectedCallback();
      expect(spy).to.have.been.calledWith('toAttr', '72');
    });

    it('Should not reflect if old and new values are the same.', () => {
      const dummy = new Dummy();
      dummy.connectedCallback();
      dummy.propertyChangedCallback('propOne', '40', '40');
      expect(spy).not.to.have.been.called;
    });

    it('Should reflect without coercion when toAttr is not set.', () => {
      const dummy = new Dummy();
      dummy.connectedCallback();
      dummy.propertyChangedCallback('propTwo', '40', '72');
      expect(spy).not.to.have.been.called;
    });

    it('Should not break when parameters are not set.', () => {
      const Empty = withReflections();
      const empty = new Empty();
      empty.connectedCallback();
      empty.propertyChangedCallback('notSet', '40', '72');
      expect(Empty.parameters).to.be.undefined;
    });

    it('Should not discard super.propertyChangedCallback.', () => {
      const child = new Child();
      child.propertyChangedCallback();
      expect(spy).to.have.been.calledWith('parentPropChanged');
    });
  });
});
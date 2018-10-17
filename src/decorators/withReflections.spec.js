import withReflections from './withReflections.js';

let dummy;

const Dummy = class extends withReflections() {
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
    Dummy.parameters = [{
      attr: 'attrOne',
      prop: 'propOne',
      toAttr: sinon.spy(),
      toProp: sinon.spy()
    }, {
      attr: 'attrTwo'
    }, {
      prop: 'propTwo'
    }];

    Parent.prototype.attributeChangedCallback = sinon.spy();
    Parent.prototype.propertyChangedCallback = sinon.spy();

    dummy = new Dummy();
  });

  afterEach(() => {
    dummy = null;
    Dummy.parameters = null;
    Parent.prototype.attributeChangedCallback = null;
    Parent.prototype.propertyChangedCallback = null;
  });

  describe('.observedAttributes', () => {
    it('Should be an empty array if not set.', () => {
      expect(withReflections().observedAttributes).to.deep.equal([]);
    });

    it('Should set observedAttributes based on parameters.', () => {
      expect(Dummy.observedAttributes)
        .to.deep.equal(['attrOne', 'attrTwo']);
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
        .to.deep.equal(['propOne', 'propTwo']);
    });

    it('Should not discard super.observedProperties.', () => {
      expect(Child.observedProperties)
        .to.deep.equal(['parent', 'propOne']);
    });
  });

  describe('#attributeChangedCallback()', () => {
    it('Should not reflect if attrName is not declared in parameters.', () => {
      dummy.connectedCallback();
      dummy.attributeChangedCallback('notSet', '40', '72');
      expect(Dummy.parameters[0].toProp).not.to.have.been.called;
    });

    it('Should wait until connected before reflecting an attribute.', () => {
      dummy.attributeChangedCallback('attrOne', '40', '72');
      expect(Dummy.parameters[0].toProp).not.to.have.been.called;

      dummy.connectedCallback();
      expect(Dummy.parameters[0].toProp).to.have.been.calledOnceWith('72');
    });

    it('Should not reflect if old and new values are the same.', () => {
      dummy.connectedCallback();
      dummy.attributeChangedCallback('attrOne', '40', '40');
      expect(Dummy.parameters[0].toProp).not.to.have.been.called;
    });

    it('Should reflect without coercion when toProp is not set.', () => {
      dummy.connectedCallback();
      dummy.attributeChangedCallback('attrTwo', '40', '72');
      expect(Dummy.parameters[0].toProp).not.to.have.been.called;
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

      expect(Parent.prototype.attributeChangedCallback)
        .to.have.been.calledOnce;
    });
  });

  describe('#propertyChangedCallback()', () => {
    it('Should not reflect if propName is not declared in parameters.', () => {
      dummy.connectedCallback();
      dummy.propertyChangedCallback('notSet', '40', '72');
      expect(Dummy.parameters[0].toAttr).not.to.have.been.called;
    });

    it('Should wait until connected before reflecting a property.', () => {
      dummy.propertyChangedCallback('propOne', '40', '72');
      expect(Dummy.parameters[0].toAttr).not.to.have.been.called;

      dummy.connectedCallback();
      expect(Dummy.parameters[0].toAttr).to.have.been.calledOnceWith('72');
    });

    it('Should not reflect if old and new values are the same.', () => {
      dummy.connectedCallback();
      dummy.propertyChangedCallback('propOne', '40', '40');
      expect(Dummy.parameters[0].toAttr).not.to.have.been.called;
    });

    it('Should reflect without coercion when toAttr is not set.', () => {
      dummy.connectedCallback();
      dummy.propertyChangedCallback('propTwo', '40', '72');
      expect(Dummy.parameters[0].toAttr).not.to.have.been.called;
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
      expect(Parent.prototype.propertyChangedCallback)
        .to.have.been.calledOnce;
    });
  });
});

import withReactions from './withReactions.js';

let spy;

describe('withReactions', () => {
  beforeEach(() => {
    spy = sinon.spy();
  });

  afterEach(() => {
    spy = undefined;
  });

  class Dummy extends withReactions() {
    handleReaction (...args) {
      spy(...args);
    }
  }

  class Parent {
    attributeChangedCallback () {
      spy('parentAttrChanged');
    }

    propertyChangedCallback () {
      spy('parentPropChanged');
    }
  }

  class Child extends withReactions(Parent) {}

  describe('#attributeChangedCallback()', () => {
    it('Should react to attribute changes.', () => {
      const dummy = new Dummy();
      dummy.attributeChangedCallback('myAttr', '50', '72');
      expect(spy).to.have.been.calledWith('attr', 'myAttr', '50', '72');
    });

    it('Should not react if the attribute is still strictly the same ' +
      'after change.', () => {
      const dummy = new Dummy();
      dummy.attributeChangedCallback('myAttr', '50', '50');
      expect(spy).not.to.have.been.called;
    });

    it('Should not discard super.attributeChangedCallback.', () => {
      const child = new Child();
      child.attributeChangedCallback();
      expect(spy).to.have.been.calledWith('parentAttrChanged');
    });
  });

  describe('#propertyChangedCallback()', () => {
    it('Should react to property changes.', () => {
      const dummy = new Dummy();
      dummy.propertyChangedCallback('myAttr', '50', '72');
      expect(spy).to.have.been.calledWith('prop', 'myAttr', '50', '72');
    });

    it('Should not react if the property is still strictly the same ' +
      'after change.', () => {
      const dummy = new Dummy();
      dummy.propertyChangedCallback('myAttr', '50', '50');
      expect(spy).not.to.have.been.called;
    });

    it('Should not discard super.propertyChangedCallback.', () => {
      const child = new Child();
      child.propertyChangedCallback();
      expect(spy).to.have.been.calledWith('parentPropChanged');
    });
  });

  class Phaser extends withReactions() {
    static get parameters () {
      return [{
        attr: 'attrOne',
        onAttrChanged: 'render'
      }, {
        prop: 'propOne',
        onPropChanged: 'render'
      }];
    }

    handleCallback (...args) {
      return spy(...args);
    }
  }

  describe('#handleReaction()', () => {
    it('Should call handleCallback if an attribute changes.', () => {
      const phaser = new Phaser();
      phaser.handleReaction('attr', 'attrOne', '50', '72');
      expect(spy).to.have.been.calledWith('render', '72', '50');
    });

    it('Should call handleCallback if a property changes.', () => {
      const phaser = new Phaser();
      phaser.handleReaction('prop', 'propOne', '50', '72');
      expect(spy).to.have.been.calledWith('render', '72', '50');
    });

    it('Should ignore undefined reactions.', () => {
      const phaser = new Phaser();
      phaser.handleReaction('attr', 'notSet', '50', '72');
      phaser.handleReaction('prop', 'notSet', '50', '72');
      expect(spy).not.to.have.been.called;
    });
  });

  class Laser extends withReactions() {
    static get parameters () {
      return [{
        onAttrChanged (newValue, oldValue) {
          spy('function', newValue, oldValue, this);
        }
      }, {
        onPropChanged: 'react'
      }, {
        onPropChanged: ['render', 'render']
      }, {
        onAttrChanged: 'bogus'
      }];
    }

    react (newValue, oldValue) {
      spy('string', newValue, oldValue, this);
    }

    render (newValue, oldValue) {
      spy('array', newValue, oldValue, this);
    }
  }

  describe('#handleCallback()', () => {
    it('Should call a method if reaction is a function.', () => {
      const laser = new Laser();
      laser.connectedCallback();
      laser.handleCallback(Laser.parameters[0].onAttrChanged, '72', '50');
      expect(spy).to.have.been.calledWith('function', '72', '50');
    });

    it('Should call a method if reaction is a string.', () => {
      const laser = new Laser();
      laser.connectedCallback();
      laser.handleCallback(Laser.parameters[1].onPropChanged, '72', '50');
      expect(spy).to.have.been.calledWith('string', '72', '50');
    });

    it('Should call many methods, in order, if reaction is an array.', () => {
      const laser = new Laser();
      laser.connectedCallback();
      laser.handleCallback(Laser.parameters[2].onPropChanged, '72', '50');
      expect(spy).to.have.been.calledTwice;
      expect(spy).to.always.have.been.calledWith('array', '72', '50');
    });

    it('Should correctly bind this if reaction is a function.', () => {
      const laser = new Laser();
      laser.connectedCallback();
      laser.handleCallback(Laser.parameters[0].onAttrChanged, '72', '50');
      expect(spy).to.have.been.calledWith('function', '72', '50', laser);
    });

    it('Should correctly bind this if reaction is a string.', () => {
      const laser = new Laser();
      laser.connectedCallback();
      laser.handleCallback(Laser.parameters[1].onPropChanged, '72', '50');
      expect(spy).to.have.been.calledWith('string', '72', '50', laser);
    });

    it('Should correctly bind this if reaction is an array.', () => {
      const laser = new Laser();
      laser.connectedCallback();
      laser.handleCallback(Laser.parameters[2].onPropChanged, '72', '50');
      expect(spy).to.have.been.calledTwice;
      expect(spy).to.always.have.been.calledWith('array', '72', '50', laser);
    });

    it('Should ignore defined reactions that leads to ' +
      'undefined methods.', () => {
      const laser = new Laser();
      laser.connectedCallback();
      laser.handleCallback(Laser.parameters[3].onAttrChanged, '72', '50');
      expect(spy).not.to.have.been.called;
    });

    it('Should wait until connected before reacting to changes.', () => {
      const laser = new Laser();
      laser.handleCallback(Laser.parameters[0].onAttrChanged, '72', '50');
      expect(spy).not.to.have.been.called;

      laser.connectedCallback();
      expect(spy).to.have.been.calledWith('function', '72', '50', laser);
    });
  });
});

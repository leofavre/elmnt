import withReactions from './withReactions.js';

describe('withReactions', () => {
  class Dummy extends withReactions() {}
  class Parent {}
  class Child extends withReactions(Parent) {}

  let dummy;
  let child;

  beforeEach(() => {
    Dummy.prototype.handleReaction = sinon.spy();
    Parent.prototype.attributeChangedCallback = sinon.spy();
    Parent.prototype.propertyChangedCallback = sinon.spy();
    dummy = new Dummy();
    child = new Child();
  });

  afterEach(() => {
    dummy = null;
    child = null;
    Dummy.prototype.handleReaction = null;
    Parent.prototype.attributeChangedCallback = null;
    Parent.prototype.propertyChangedCallback = null;
  });

  describe('#attributeChangedCallback()', () => {
    it('Should react to attribute changes.', () => {
      dummy.attributeChangedCallback('myAttr', '50', '72');

      expect(Dummy.prototype.handleReaction)
        .to.have.been.calledWith('attr', 'myAttr', '50', '72');
    });

    it('Should not react if the attribute is still strictly the same ' +
      'after change.', () => {
      dummy.attributeChangedCallback('myAttr', '50', '50');

      expect(Dummy.prototype.handleReaction)
        .not.to.have.been.called;
    });

    it('Should not discard super.attributeChangedCallback.', () => {
      child.attributeChangedCallback();
      expect(Parent.prototype.attributeChangedCallback).to.have.been.calledOnce;
    });
  });

  describe('#propertyChangedCallback()', () => {
    it('Should react to property changes.', () => {
      dummy.propertyChangedCallback('myAttr', '50', '72');
      expect(Dummy.prototype.handleReaction)
        .to.have.been.calledWith('prop', 'myAttr', '50', '72');
    });

    it('Should not react if the property is still strictly the same ' +
      'after change.', () => {
      dummy.propertyChangedCallback('myAttr', '50', '50');
      expect(Dummy.prototype.handleReaction).not.to.have.been.called;
    });

    it('Should not discard super.propertyChangedCallback.', () => {
      child.propertyChangedCallback();
      expect(Parent.prototype.propertyChangedCallback).to.have.been.calledOnce;
    });
  });
});

describe('withReactions', () => {
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
  }

  let phaser;

  beforeEach(() => {
    Phaser.prototype.handleCallback = sinon.spy();
    phaser = new Phaser();
  });

  afterEach(() => {
    phaser = null;
    Phaser.prototype.handleCallback = null;
  });

  describe('#handleReaction()', () => {
    it('Should call handleCallback if an attribute changes.', () => {
      phaser.handleReaction('attr', 'attrOne', '50', '72');

      expect(Phaser.prototype.handleCallback)
        .to.have.been.calledWith('render', '72', '50');
    });

    it('Should call handleCallback if a property changes.', () => {
      phaser.handleReaction('prop', 'propOne', '50', '72');

      expect(Phaser.prototype.handleCallback)
        .to.have.been.calledWith('render', '72', '50');
    });

    it('Should ignore undefined reactions.', () => {
      phaser.handleReaction('attr', 'notSet', '50', '72');
      phaser.handleReaction('prop', 'notSet', '50', '72');

      expect(Phaser.prototype.handleCallback)
        .not.to.have.been.called;
    });
  });
});

describe('withReactions', () => {
  class Laser extends withReactions() {}

  let laser;

  beforeEach(() => {
    Laser.parameters = [{
      onAttrChanged: sinon.spy()
    }, {
      onPropChanged: 'react'
    }, {
      onPropChanged: ['render', 'render']
    }, {
      onAttrChanged: 'bogus'
    }];

    Laser.prototype.react = sinon.spy();
    Laser.prototype.render = sinon.spy();

    laser = new Laser();
  });

  afterEach(() => {
    Laser.pamareters = null;
    Laser.prototype.react = null;
    Laser.prototype.render = null;
    laser = null;
  });

  describe('#handleCallback()', () => {
    it('Should call a method if reaction is a function.', () => {
      laser.connectedCallback();
      laser.handleCallback(Laser.parameters[0].onAttrChanged, '72', '50');

      expect(Laser.parameters[0].onAttrChanged)
        .to.have.been.calledWith('72', '50');
    });

    it('Should call a method if reaction is a string.', () => {
      laser.connectedCallback();
      laser.handleCallback(Laser.parameters[1].onPropChanged, '72', '50');
      expect(Laser.prototype.react).to.have.been.calledWith('72', '50');
    });

    it('Should call many methods, in order, if reaction is an array.', () => {
      laser.connectedCallback();
      laser.handleCallback(Laser.parameters[2].onPropChanged, '72', '50');
      expect(Laser.prototype.render).to.have.been.calledTwice;
      expect(Laser.prototype.render).to.always.have.been.calledWith('72', '50');
    });

    it('Should ignore defined reactions that leads to ' +
      'undefined methods.', () => {
      laser.connectedCallback();
      laser.handleCallback(Laser.parameters[3].onAttrChanged, '72', '50');
      expect(Laser.parameters[0].onAttrChanged).not.to.have.been.called;
      expect(Laser.prototype.react).not.to.have.been.called;
      expect(Laser.prototype.render).not.to.have.been.called;
    });

    it('Should wait until connected before reacting to changes.', () => {
      laser.handleCallback(Laser.parameters[0].onAttrChanged, '72', '50');
      expect(Laser.parameters[0].onAttrChanged).not.to.have.been.called;

      laser.connectedCallback();
      expect(Laser.parameters[0].onAttrChanged)
        .to.have.been.calledWith('72', '50');
    });
  });
});

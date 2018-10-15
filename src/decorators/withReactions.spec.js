let spy;
let dummy;

describe('withReactions', () => {
  beforeEach(() => {
    spy = sinon.spy();
  });

  afterEach(() => {
    dummy = undefined;
    spy = undefined;
  });

  it('Should not break when extended without parameters.', () => {

  });

  it('Should call super methods.', () => {

  });

  it('Should react to property changes.', () => {

  });

  it('Should not react if the property is still strictly the same ' +
    'after change.', () => {

  });

  it('Should react to attribute changes.', () => {

  });

  it('Should not react if the attribute is still strictly the same ' +
    'after change.', () => {

  });

  it('Should be called with new value and old value.', () => {

  });

  it('Should wait for the component to be appended to the DOM ' +
    'before reacting to attribute changes.', () => {

  });

  it('Should wait for the component to be appended to the DOM ' +
    'before reacting to property changes.', () => {

  });

  it('Should ignore undefined reactions.', () => {

  });

  it('Should ignore defined reactions that leads to undefined methods.', () => {

  });

  it('Should call a method if reaction is a function.', () => {

  });

  it('Should call a method if reaction is a string.', () => {

  });

  it('Should call many methods, in order, if reaction is an array.', () => {

  });

  it('Should correctly bind this if reaction is a function.', () => {

  });

  it('Should correctly bind this if reaction is a string.', () => {

  });
});

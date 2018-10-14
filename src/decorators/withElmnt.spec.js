import withElmnt from './withElmnt.js';

const Dummy = class extends withElmnt() {};

describe('withElmnt', () => {
  it('Should import withWhenConnected.', () => {
    const dummy = new Dummy();
    expect(dummy.whenConnected).to.be.a('function');
  });

  it('Should import withReflections.', () => {
    expect(Dummy.observedAttributes).to.deep.equal([]);
    expect(Dummy.observedProperties).to.deep.equal([]);
  });
});

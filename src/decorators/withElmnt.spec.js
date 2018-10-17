import withElmnt from './withElmnt.js';

const Dummy = class extends withElmnt() {};
const dummy = new Dummy();

describe('withElmnt', () => {
  it('Should import withWhenConnected.', () => {
    expect(dummy.whenConnected).to.be.a('function');
  });

  it('Should import withReflections.', () => {
    expect(Dummy.observedAttributes).to.deep.equal([]);
    expect(Dummy.observedProperties).to.deep.equal([]);
  });

  it('Should import withReactions.', () => {
    expect(dummy.handleReaction).to.be.a('function');
    expect(dummy.handleCallback).to.be.a('function');
  });

  it('Should import withRenderer.', () => {
    expect(dummy.updateRender).to.be.a('function');
  });
});

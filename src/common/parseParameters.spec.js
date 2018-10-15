import parseParameters from './parseParameters.js';

const ctor = {
  parameters: [{
    attrProp: 'both'
  }, {
    attr: 'attrTwo',
    attrProp: 'both'
  }, {
    prop: 'propTwo',
    attrProp: 'both'
  }]
};

describe('parseParameters', () => {
  it('Should return an empty array if parameters are not set.', () => {
    expect(parseParameters({})).to.deep.equal([]);
  });

  it('Should break attrProp into attr and prop and remove it.', () => {
    expect(parseParameters(ctor)[0]).to.deep.equal({
      attr: 'both',
      prop: 'both'
    });
  });

  it('Should consider attr in favour of attrProp.', () => {
    expect(parseParameters(ctor)[1]).to.deep.equal({
      attr: 'attrTwo',
      prop: 'both'
    });
  });

  it('Should consider prop in favour of attrProp.', () => {
    expect(parseParameters(ctor)[2]).to.deep.equal({
      attr: 'both',
      prop: 'propTwo'
    });
  });
});

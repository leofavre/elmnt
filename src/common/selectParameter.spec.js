import selectParameter from './selectParameter.js';

const ctor = {
  parameters: [{
    attr: 'round'
  }, {
    prop: 'level'
  }]
};

describe('selectParameter', () => {
  it('Should select the first parameter matching attr and name.', () => {
    expect(selectParameter(ctor, 'attr', 'round'))
      .to.equal(ctor.parameters[0]);
  });

  it('Should select the first parameter matching prop and name.', () => {
    expect(selectParameter(ctor, 'prop', 'level'))
      .to.equal(ctor.parameters[1]);
  });

  it('Should return an empty object if there are no matches.', () => {
    expect(selectParameter(ctor, 'attr', 'laser'))
      .to.deep.equal({});
  });
});

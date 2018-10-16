import withRendererRaw from './withRenderer.js';

let spy;

class TemplateResult {}

const render = (arg) => {
  spy('render', arg);
};

class Dummy extends withRendererRaw(render, TemplateResult)() {
  attachShadow (arg) {
    spy('attachShadow', arg);
  }
}

describe('withRenderer', () => {
  beforeEach(() => {
    spy = sinon.spy();
  });

  afterEach(() => {
    spy = undefined;
  });
});

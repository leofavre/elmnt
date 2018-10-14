import withReflections from './withReflections.js';
import withWhenConnected from './withWhenConnected.js';

export default (Base = class {}) =>
  class extends withWhenConnected(withReflections(Base)) {};

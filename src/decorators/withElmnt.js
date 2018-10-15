import withObservedProperties from 'observed-properties';
import withReactions from './withReactions.js';
import withReflections from './withReflections.js';
import withWhenConnected from './withWhenConnected.js';

export default (Base = class {}) => class extends withObservedProperties(
  withWhenConnected(withReflections(withReactions(Base)))) {};

import { render, TemplateResult } from 'lit-html';
import withRendererRaw from './withRenderer.js';
import withObservedProperties from 'observed-properties';
import withReactions from './withReactions.js';
import withReflections from './withReflections.js';
import withWhenConnected from './withWhenConnected.js';

const withRenderer = withRendererRaw(render, TemplateResult);

export default (Base = class {}) => class extends withObservedProperties(
  withWhenConnected(withReflections(withReactions(withRenderer(Base))))) {};

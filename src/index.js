import { html } from 'lit-html';

import withElmnt from './decorators/withElmnt.js';
import withSetState from './decorators/withSetState.js';
import withDomEventsRaw from './decorators/withDomEvents.js';
import withReducer from './decorators/withReducer.js';

import coerceToArray from './coercion/coerceToArray.js';
import coerceToArrayOrUndefined from './coercion/coerceToArrayOrUndefined.js';
import coerceToBoolean from './coercion/coerceToBoolean.js';
import coerceToNumber from './coercion/coerceToNumber.js';
import coerceToNumberOrUndefined from './coercion/coerceToNumberOrUndefined.js';
import coerceToString from './coercion/coerceToString.js';
import coerceToStringOrUndefined from './coercion/coerceToStringOrUndefined.js';

const withDomEvents = withDomEventsRaw(window.CustomEvent);

export {
  html,
  withElmnt,
  withSetState,
  withDomEvents,
  withReducer,
  coerceToArray,
  coerceToArrayOrUndefined,
  coerceToBoolean,
  coerceToNumber,
  coerceToNumberOrUndefined,
  coerceToString,
  coerceToStringOrUndefined
};

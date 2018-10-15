import parseParameters from './parseParameters.js';

export default (ctor, type, paramName) => parseParameters(ctor)
  .find(param => param[type] === paramName) || {};

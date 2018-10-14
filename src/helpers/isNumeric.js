import isString from './isString.js';

export default arg => (Number.isFinite(arg) || isString(arg)) &&
  !isNaN(arg) && !isNaN(parseFloat(arg));

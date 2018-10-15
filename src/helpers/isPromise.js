import isFunction from './isFunction.js';

export default arg => arg != null && isFunction(arg.then);

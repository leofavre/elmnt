import withSetState from './withSetState.js';
import isFunction from '../helpers/isFunction.js';
import isPromise from '../helpers/isPromise.js';

export default reducer => (Base = class {}) =>
  class extends withSetState(Base) {
    constructor () {
      super();
      this.state = reducer();
    }

    dispatchAction (action) {
      let resolvedAction = action;
      const getState = () => this.state;

      if (isFunction(resolvedAction)) {
        resolvedAction = action(this.dispatchAction.bind(this), getState);
      }

      if (isPromise(resolvedAction)) {
        return resolvedAction.then(asyncAction => {
          this.setState(prevState => reducer(prevState, asyncAction));
          return this.state;
        });
      }

      this.setState(prevState => reducer(prevState, resolvedAction));
      return this.state;
    }
  };

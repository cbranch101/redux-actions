import handleAction from './handleAction';
import ownKeys from './ownKeys';
import handleAsyncAction from './handleAsyncAction';
import reduceReducers from 'reduce-reducers';

export default function handleActions(handlers, defaultState) {
  const reducers = ownKeys(handlers).map(type => {
    const reducer = handlers[type] 
    return reducer.begin || reducer.end ?
      handleAsyncAction(type, reducer) :
      handleAction(type, reducer);
  };
  const reducer = reduceReducers(...reducers);
  return typeof defaultState !== 'undefined'
    ? (state = defaultState, action) => reducer(state, action)
    : reducer;
}

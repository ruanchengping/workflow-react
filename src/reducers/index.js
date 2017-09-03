import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux';
import settings from './settings';
import uiReducer from './ui/uiReducer';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    routing: routerReducer,
    settings,
    ui:uiReducer,
    ...asyncReducers
  })
};

export const injectReducer = (store, {key, reducer}) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers))
};

export default makeRootReducer;

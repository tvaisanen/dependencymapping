import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './root.reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


export default function configureStore() {  
  return createStore(
      rootReducer,
      applyMiddleware(thunk),
      //applyMiddleware(thunk,logger),
  );
}
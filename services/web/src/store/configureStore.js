import { createStore, applyMiddleware } from 'redux';

import rootReducer from './root.reducer';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

const logger = createLogger({
    collapsed: true
});
export const store = createStore(
      rootReducer,
      //applyMiddleware(thunk),
      applyMiddleware(thunk,logger),
);


import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/root.reducer';
import thunk from 'redux-thunk';
import failureDetectionService from '../middleware/failure-detection.service';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {  
  return createStore(
      rootReducer,

      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(thunk),

  );
}
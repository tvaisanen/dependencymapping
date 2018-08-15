import {createStore, applyMiddleware} from 'redux';  
import rootReducer from '../reducers/root.reducer';
import thunk from 'redux-thunk';
import failureDetectionService from '../middleware/failure-detection.service';

export default function configureStore() {  
  return createStore(
    rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

      applyMiddleware(
          thunk,
          failureDetectionService
      ),
  );
}
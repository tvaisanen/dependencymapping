import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import * as actions from './actions/graphActions';


const store = configureStore();

// load resources and stored graphs
store.dispatch(actions.loadAllMappings());
store.dispatch(actions.loadAllResources());
store.dispatch(actions.loadAllCategories());



ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import * as actions from './actions/index';
import * as storeActions from './store';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

import apiClient from './api/gwClientApi';

const store = configureStore();


apiClient.resetModels();
// load resources and stored graphs
// const authStorage = localStorage.getItem('auth') || false;
// const auth = authStorage ? JSON.parse(authStorage) : false;

// store.dispatch(storeActions.loginSuccess(auth));
store.dispatch(actions.loadAllMappings());
store.dispatch(storeActions.loadAllAssets());
store.dispatch(storeActions.loadAllTags());
store.dispatch(storeActions.loadAllAssetGroups());



console.group("Environment");
console.info(process.env);
console.info(Object.keys(process.env));
console.info(process.env.MESSAGE)
console.groupEnd();


// configure application here based on the environment variables

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();

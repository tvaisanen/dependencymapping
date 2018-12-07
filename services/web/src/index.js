import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import * as actions from './actions/index';
import * as storeActions from './store';
import {ThemeProvider} from 'styled-components';
import theme from './theme';
import * as graphActions from './store/graph/graph.actions';
import * as graphEvents from './common/graph.events';
import apiClient from './api/gwClientApi';

const store = configureStore();

if (process.env.REACT_APP_ENV === "development"){
    apiClient.resetModels();
}
// load resources and stored graphs
// const authStorage = localStorage.getItem('auth') || false;
// const auth = authStorage ? JSON.parse(authStorage) : false;

// store.dispatch(storeActions.loginSuccess(auth));
setTimeout(() => {
    // wait a while for db to reset
    store.dispatch(storeActions.loadAllMappings());
    store.dispatch(storeActions.loadAllAssets());
    store.dispatch(storeActions.loadAllTags());
    store.dispatch(storeActions.loadAllConnections());
    store.dispatch(storeActions.loadAllAssetGroups());
}, 500);


console.group("Environment");
console.info(process.env);
console.info(Object.keys(process.env));
console.info(process.env.MESSAGE)
console.groupEnd();

const eventHandlers =  {
        tap: ['node', (event) => store.dispatch(graphEvents.onNodeClick(event))],
        //mouseover: ['node',  (event) => store.dispatch(graphEvents.onNodeMouseOver(event))],
        //mouseout: ['node', (event) => store.dispatch(graphEvents.onNodeMouseOut(event))],
        //cxttap: ['node', (event) => store.dispatch(graphEvents.onCtxClick(event))]
};


// configure application here based on the environment variables

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </Provider>
    , document.getElementById('root'));

store.dispatch(graphActions.initGraph({eventHandlers}));

registerServiceWorker();

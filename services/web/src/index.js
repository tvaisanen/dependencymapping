import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import { store } from './store/configureStore';
import {Provider} from 'react-redux';
import * as storeActions from './store';
import {ThemeProvider} from 'styled-components';
import theme from './theme';
import * as graphActions from './store/graph/graph.actions';
import * as graphEvents from './store/graph/graph.events';
import apiClient from './api/gwClientApi';
import * as socket from './server-web-socket';


if (
    process.env.REACT_APP_ENV === "development"
    && !process.env.REACT_APP_PERSIST_DATA
){
    apiClient.resetModels();
}

// store.dispatch(storeActions.loginSuccess(auth));
setTimeout(() => {
    // wait a while for db to reset
    store.dispatch(storeActions.loadAllMappings());
    store.dispatch(storeActions.loadAllAssets());
    store.dispatch(storeActions.loadAllTags());
    store.dispatch(storeActions.loadAllConnections());
}, 500);


console.groupCollapsed("Environment");
console.info(process.env);
console.info(Object.keys(process.env));
console.info(process.env.MESSAGE)
console.groupEnd();

// ! todo: refactor to graphstore
const eventHandlers = [
    {action:'tap', selector:'node', callback:(event) => store.dispatch(graphEvents.onNodeClick(event))},
    //{action:'tap', selector:'cy', callback:(event) => store.dispatch(graphEvents.onCanvasClick(event))}
    //mouseover: ['node',  (event) => store.dispatch(graphEvents.onNodeMouseOver(event))],
    //mouseout: ['node', (event) => store.dispatch(graphEvents.onNodeMouseOut(event))],
    //cxttap: ['node', (event) => store.dispatch(graphEvents.onCtxClick(event))]
];


ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </Provider>
    , document.getElementById('root'));

store.dispatch(graphActions.initGraph({eventHandlers}));

socket.initConnection();

registerServiceWorker();

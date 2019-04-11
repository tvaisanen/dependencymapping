import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import {store} from './store/configureStore';
import {Provider} from 'react-redux';
import * as storeActions from './store';
import {ThemeProvider} from 'styled-components';
import theme from './theme';
import * as graphActions from './store/graph/graph.actions';
import apiClient from './api/gwClientApi';


function getData() {
    store.dispatch(storeActions.loadAllMappings());
    store.dispatch(storeActions.loadAllAssets());
    store.dispatch(storeActions.loadAllTags());
    store.dispatch(storeActions.loadAllConnections());
}

const isInDev = process.env.REACT_APP_ENV === "development";
const allowReload = !process.env.REACT_APP_PERSIST_DATA;

if (isInDev && allowReload) {
    // for development setup
    apiClient.resetModels();
    setTimeout(getData, 500);
} else {
    getData();
}

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </Provider>
    , document.getElementById('root'));

store.dispatch(graphActions.initGraph());


registerServiceWorker();

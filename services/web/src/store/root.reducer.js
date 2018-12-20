import { combineReducers } from 'redux';
import mappings from './mapping/mapping.reducer';
import assets from './asset/asset.reducer';
import activeMapping from './active-mapping/active-mapping.reducer';
import tags from './tag/tag.reducer';
import activeDetail from './active-detail/active-detail.reducer'
import graph from './graph/graph.reducer';
import app from '../reducers/app.reducer'
import detailForm from './detail-form/detail-form.reducer';
import connections from './connection/connection.reducer';
import eventHook from './event-hook/';

const rootReducer = combineReducers({
    app,
    connections,
    mappings,
    assets,
    tags,
    activeMapping,
    activeDetail,
    graph,
    detailForm,
    eventHook
});

export default rootReducer;
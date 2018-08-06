import { combineReducers } from 'redux';
import mappings from './mapping.reducer';
import resources from './resource.reducer';
import activeMapping from './active-mapping.reducer';
import tags from './tag.reducer';
import activeDetail from './active-detail.reducer'
import graph from './graph.reducer';
import app from './app.reducer'

const rootReducer = combineReducers({
    app,
    mappings,
    resources,
    tags,
    activeMapping,
    activeDetail,
    graph
});

export default rootReducer;
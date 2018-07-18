import { combineReducers } from 'redux';
import graphs from './graph.reducer';
import resources from './resource.reducer';
import activeMapping from './active-mapping.reducer';
import tags from './tag.reducer';
import activeDetail from './active-detail.reducer'

const rootReducer = combineReducers({
    graphs,
    resources,
    tags,
    activeMapping,
    activeDetail
});

export default rootReducer;
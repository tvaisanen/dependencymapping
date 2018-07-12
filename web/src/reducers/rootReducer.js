import { combineReducers } from 'redux';
import graphs from './graphReducer';
import resources from './resourceReducer';
import dependencies from './dependencyReducer';
import activeMapping from './activeMapping';
import tags from './tag.reducer';

const rootReducer = combineReducers({
    graphs,
    resources,
    dependencies,
    tags,
    activeMapping,
})

export default rootReducer;
import { combineReducers } from 'redux';
import graphs from './graphReducer';
import resources from './resourceReducer';
import dependencies from './dependencyReducer';
import activeMapping from './activeMapping';
import categories from './category.reducer';

const rootReducer = combineReducers({
    graphs,
    resources,
    dependencies,
    categories,
    activeMapping,
})

export default rootReducer;
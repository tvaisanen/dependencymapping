import { combineReducers } from 'redux';
import mappings from './mapping/mapping.reducer';
import assets from './asset/asset.reducer';
import assetGroups from './asset-group/asset-group.reducer';
import activeMapping from './active-mapping/active-mapping.reducer';
import tags from './tag/tag.reducer';
import activeDetail from './active-detail/active-detail.reducer'
import graph from './graph/graph.reducer';
import app from '../reducers/app.reducer'
import auth from './auth/auth.reducer';
import detailForm from './detail-form/detail-form.reducer';
import connections from './connection/connection.reducer';

const rootReducer = combineReducers({
    app,
    connections,
    mappings,
    assets,
    assetGroups,
    tags,
    activeMapping,
    activeDetail,
    graph,
    detailForm
});

export default rootReducer;
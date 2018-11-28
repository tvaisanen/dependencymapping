import { LOAD_ASSET_GROUPS_SUCCESS } from './asset-group.action-types';
import initialState from '../../reducers/initialState';

export default function assetGroupReducer(state = initialState.assetGroups, action) {
    switch (action.type) {

        case LOAD_ASSET_GROUPS_SUCCESS:
            return action.groups;

        default:
            return state;
    }
}
import * as types from './asset.action-types';
import initialState from '../initialState';


export default function assetReducer(state = initialState.resources, action) {
    switch (action.type) {

        case types.LOAD_ASSETS_SUCCESS:
            return [...action.assets];

        case types.POST_ASSET_SUCCESS:
            return [action.asset, ...state];

        case types.UPDATE_ASSET_SUCCESS:
            const removeUpdated = state.filter(m => m.name !== action.asset.name);
            return [...removeUpdated, action.asset];

        case types.DELETE_ASSET_SUCCESS:
            return state.filter(m => m.name !== action.name);

        default:
            return state;
    }
}
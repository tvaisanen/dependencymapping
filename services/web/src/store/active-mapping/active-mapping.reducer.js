// @flow
import * as types from './active-mapping.action-types';
import initialState from '../initialState';
import _ from 'lodash';

import type {
    ActiveMappingState,
    ActiveMappingAction
} from "./active-mapping.types";

import type { Asset } from "../asset/asset.types";


export default function activeMappingReducer(
    state: ActiveMappingState = initialState.activeMapping,
    action: ActiveMappingAction
){
    const asset: Asset = action.asset;

    switch(action.type) {

        case types.SET_ACTIVE_MAPPING:
            // set the active mapping
            // and override last selection
            return action.mapping;


        case types.ADD_ACTIVE_MAPPING_ASSETS:
        
            // do not allow duplicates   
            let assetsToAdd = []

            action.assets.forEach(
                // for every asset that is going to be add
                // check that it is not already included in
                // the current active mapping
                newAsset => {
                    if (!_.find(state.assets, assetName => assetName === newAsset.name)){
                        // if asset can not be found from the current mapping
                        assetsToAdd.push(newAsset.name);
                    }
                }
            );
            
            return {...state, assets: [...state.assets, ...assetsToAdd]}

        case types.ADD_ACTIVE_MAPPING_ASSET:
            return { ...state, assets: [ ...state.assets, action.asset ]}

        case types.REMOVE_ACTIVE_MAPPING_ASSET:
            if (!asset){
                // requires action.asset
                return state;
            }
            // remove the given resource from active mapping resources
            const filteredAssets: Array<Asset> = state.assets
                .filter(assetName => assetName !== action.asset.name);

            return { ...state, assets: filteredAssets };

        case types.CLEAR_ACTIVE_MAPPING_SELECTION:
            return {name: "no selection", resources:[], tags: []};
        /*
        case types.GROUP_BY_TAG:
            return {
                ...state,
                grouped: [...state.grouped, action.tagName]
            };

        case types.UNGROUP_BY_TAG:
             return {
                 ...state,
                 grouped: [...state.grouped.filter(t => t !== action.tagName)]
             };
        */
        default:
            return state;
    }
}
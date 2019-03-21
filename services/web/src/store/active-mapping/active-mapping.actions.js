import * as types from './active-mapping.action-types';
import * as graphHelpers from '../../common/graph-helpers';
import * as _ from 'lodash';
import type {
    ActiveMappingState,
    ActiveMappingAction
} from "./active-mapping.types";

import * as mappingHelpers from './active-mapping.utils';
import {addAssetToGraph, removeAssetFromGraph, updateLayout} from "../graph/graph.actions";

export function setActiveMapping(mapping: ActiveMappingState)
    : ActiveMappingAction {
    return {type: types.SET_ACTIVE_MAPPING, mapping}
}

export function clearActiveMappingSelection() {
    return {type: types.CLEAR_ACTIVE_MAPPING_SELECTION}
}

export function addActiveMappingAssets(assets) {
    return {type: types.ADD_ACTIVE_MAPPING_ASSETS, assets}
}

export function addActiveMappingAssetsFromNameList(assetNameList) {
    return function (dispatch, getState) {
        const {assets} = getState();
        const filteredAssets = assets.filter(r => _.includes(assetNameList, r.name));
        dispatch(addActiveMappingAssets(filteredAssets));
    }
}


export function addResourceToActiveMapping(asset) {

    /**
     * Add @param asset to the current active mapping
     */

    return function (dispatch, getState) {

        const {activeMapping} = getState();

        if (activeMapping.name === "no selection") {
            alert("Create or select a mapping first, before adding assets.")

        } else {
            dispatch({type: types.ADD_ACTIVE_MAPPING_ASSET, asset: asset.name});
            dispatch(addAssetToGraph(asset));
            dispatch(updateLayout());
        }
    }
}

export function removeResourceFromActiveMapping(asset) {
    return function (dispatch) {
        dispatch(removeAssetFromActiveMapping(asset));
        dispatch(removeAssetFromGraph(asset));
    }
}

export function removeAssetFromActiveMapping(asset) {
    return {type: types.REMOVE_ACTIVE_MAPPING_ASSET, asset};
}

export function updateAssetState(asset: Asset) {
    /**
     If asset is included in active mapping,
     update the asset related elements in
     the graph
     */
    return function (dispatch, getState) {
        const {activeMapping} = getState();

        if (_.includes(activeMapping.assets, asset.name)) {
            dispatch(graphHelpers.activeMappingAssetUpdateActions(asset));
        }
    }
}

// todo: clean this
export function updateActiveMapping(mapping) {
    return function (dispatch: Dispatch, getState: State){
            // if edited mapping is active mapping
            if (mapping.name === getState().activeMapping.name) {
                mappingHelpers.loadDependencyMap(
                    mapping.name,
                    getState().graph,
                    getState().mappings,
                    getState().assets,
                    dispatch,
                    getState().app.graph.selectedLayout
                );
                dispatch(setActiveMapping(mapping));
            }
    }
}


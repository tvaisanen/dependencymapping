import * as types from './active-mapping.action-types';
import * as graphHelpers from '../../common/graph-helpers';
import * as _ from 'lodash';
import type {
    ActiveMappingState,
    ActiveMappingAction
} from "./active-mapping.types";

import * as mappingHelpers from './active-mapping.utils';
import {addAssetToGraph, updateLayout} from "../graph/graph.actions";

export function setActiveMapping(mapping: ActiveMappingState)
    : ActiveMappingAction {
    return {type: types.SET_ACTIVE_MAPPING, mapping}
}

export function clearActiveMappingSelection(graph) {
    graphHelpers.clearGraph(graph);
    return {type: types.CLEAR_ACTIVE_MAPPING_SELECTION}
}

export function setActiveMappingConnections(connections) {
    return {type: types.SET_ACTIVE_MAPPING_CONNECTIONS, connections}
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
    return function (dispatch, getState) {
        const {graph} = getState();

        const el = graph.getElementById(asset.name);

        // before deleting parent node, get the children
        if (el.isParent()) {
            const removeChildren = window.confirm("remove the sub-graph too?");
            if (removeChildren) {
                el.children().forEach(child => {
                    console.info("this needs to be removed");
                    const removeThis = {name: child.id()};
                    console.info(removeThis);
                    dispatch(removeAsset(removeThis));
                });
            } else {
                // move children
                el.children().move({parent: null})
            }
        }

        dispatch(removeAsset(asset))
        graphHelpers.removeElement(getState().graph, asset.name);
    }
}

function removeAsset(asset) {
    return {type: types.REMOVE_ACTIVE_MAPPING_ASSET, asset};
}


export function groupByTag(tagName) {
    return function (dispatch, getState) {
        const {activeMapping, assets, graph} = getState();
        console.group("lets do this");

        // filter the active mapping assets with the tag
        const assetObjects = assets.filter(
            asset => {
                const inMapping = _.includes(activeMapping.assets, asset.name)
                return inMapping ?
                    _.includes(asset.tags, tagName)
                    : false;
            }
        );

        // 1. create node for the tag
        const parent = graph.add({
            group: "nodes",
            data: {
                id: tagName,
            },
        });
        parent.addClass('group');

        console.info(assetObjects);

        // 2. add all the assets which has the tag
        /*
        const newEdges = assetObjects.map(asset => {

            const n = graph.getElementById(asset.name);
            // if asset is moved from other group
            // create edge from the tag node
            const parent = n.data('parent');
            console.info(parent)
            n.move({parent: tagName});

            if (parent) {
                const edge = graphHelpers.edgeElementFromResource(parent, asset.name);
                edge.classes = 'is-in-group';
                return edge;
            }
        });
        */

        dispatch({type: types.GROUP_BY_TAG, tagName})

        console.groupEnd();
    }
}

export function ungroupByTag(tagName) {
    return function (dispatch, getState) {
        const {activeMapping, assets, graph} = getState();
        try {
            graph.getElementById(tagName)
                .children().move({parent: null});
            graph.getElementById(tagName).remove();

        } catch (err) {
            console.warn(err);
        }

        dispatch({type: types.UNGROUP_BY_TAG, tagName});
    }
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


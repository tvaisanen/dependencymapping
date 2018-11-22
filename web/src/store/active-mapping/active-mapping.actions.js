import * as types from './active-mapping.action-types';
import * as graphHelpers from '../../common/graph-helpers';
import * as resourceHelpers from '../../common/resource-helpers';
import * as _ from 'lodash';

export function clearActiveMappingSelection() {
    return {type: types.CLEAR_ACTIVE_MAPPING_SELECTION}
}

export function setActiveMappingConnections(connections) {
    return {type: types.SET_ACTIVE_MAPPING_CONNECTIONS, connections}
}

export function addActiveMappingAssets(assets) {
    return {type: types.ADD_ACTIVE_MAPPING_ASSETS, assets}
}

export function addActiveMappingAssetsFromNameList(assetNameList){
    return function (dispatch, getState) {
        const { assets } = getState();
        const filteredAssets = assets.filter(r => _.includes(assetNameList, r.name));
        dispatch(addActiveMappingAssets(filteredAssets));
    }
}

export function addActiveMappingConnections(connections) {
    return {type: types.ADD_ACTIVE_MAPPING_CONNECTIONS, connections}
}

export function loadActiveMappingAssets(mapping) {
    console.info(mapping);
    return {type: types.LOAD_ACTIVE_MAPPING_RESOURCES, mapping}
}

export function setActiveMapping(mapping) {
    return {type: types.SET_ACTIVE_MAPPING, mapping}
}

export function addResourceToActiveMapping(asset) {
    return function (dispatch, getState) {
        console.info('add resource to active mapping action');
        console.info(getState().activeMapping);

        const activeMapping = getState().activeMapping;
        const edgeElements = asset.connected_to.map(
            r => graphHelpers.edgeElementFromResource(asset.name, r.name)
        );

        console.group("DeBUGGING");
        console.info(asset);
        console.info(activeMapping)
        console.groupEnd();

        const resourcesConnectingInto = activeMapping
                .assets.filter(
                    r => resourceHelpers.isResourceConnectedToId({
                        resource: r,
                        id: asset
                    })
            )
        ;

        const edgesTargetingResource = resourcesConnectingInto.map(
            r => graphHelpers.edgeElementFromResource(r.name, asset.name));

        const cy = getState().graph;
        const node = graphHelpers.nodeElementFromResource(asset);
        graphHelpers.addElement(cy, node);
        graphHelpers.addElements(cy, edgeElements);
        graphHelpers.addElements(cy, edgesTargetingResource);
        //dispatch(graphActions.addNodeToGraph(resource));
        //dispatch(graphActions.addElementsToGraph(edgeElements));
        //dispatch(graphActions.addElementsToGraph(edgesTargetingResource));
        dispatch({type: types.ADD_ACTIVE_MAPPING_ASSET, asset: asset.name});
        graphHelpers.updateLayout(cy, "cola");
    }
}

export function removeResourceFromActiveMapping(resource) {
    return function(dispatch, getState){
       dispatch(removeAsset(resource))
        graphHelpers.removeElement(getState().graph, resource.name);
    }
}

function removeAsset(resource){
    return {type: types.REMOVE_ACTIVE_MAPPING_RESOURCE, resource};

}


export function loadActiveMapping(mapping) {
    return function (dispatch) {
        console.group(`loadActiveMapping(${mapping.name})`)
        console.info(mapping);
        console.groupEnd();
        return dispatch(loadActiveMappingAssets(mapping))
    }
}

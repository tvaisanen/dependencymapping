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

export function addActiveMappingAssetsFromNameList(assetNameList) {
    return function (dispatch, getState) {
        const {assets} = getState();
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

    /**
     * Add @param asset to the current active mapping
     */

    return function (dispatch, getState) {

        const { activeMapping, assets } = getState();
        const newAssetName = asset.name;

        const edgeElements = asset.connected_to.map(
            target => graphHelpers
                .edgeElementFromResource(asset.name, target.name)
        );

        console.info(edgeElements)

        const activeMappingAssetsConnectingIntoNewAsset =
            activeMapping.assets.filter(
                activeMappingAsset => resourceHelpers.isResourceConnectedToId({
                        resource: asset,
                        id: activeMappingAsset
                    }
                )
            )
        ;

        const cy = getState().graph;
        const node = graphHelpers.nodeElementFromResource(asset);



        dispatch({type: types.ADD_ACTIVE_MAPPING_ASSET, asset: asset.name});

        // check if the assets in map have connections
        // to the new asset

        console.group("Check if premapped points to new");
        const preMappedAssetObjects = assets.filter(asset => {
          return _.includes(activeMapping.assets, asset.name);
        });

        // todo: refactor to reduce
        let preMappedToNewEdges = [];

        preMappedAssetObjects.forEach(preMappedAsset => {
            preMappedAsset.connected_to.forEach(target => {
                if (target === newAssetName){
                    preMappedToNewEdges.push(
                        graphHelpers.edgeElementFromResource(
                            preMappedAsset.name,
                            newAssetName
                        )
                    );
                }
            })
        });


        graphHelpers.addElement(cy, node);
        graphHelpers.addElements(cy, preMappedToNewEdges);
        graphHelpers.addElements(cy, edgeElements);
        console.groupEnd();

        graphHelpers.updateLayout(cy, "cola");
    }
}

export function removeResourceFromActiveMapping(resource) {
    return function (dispatch, getState) {
        dispatch(removeAsset(resource))
        graphHelpers.removeElement(getState().graph, resource.name);
    }
}

function removeAsset(resource) {
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

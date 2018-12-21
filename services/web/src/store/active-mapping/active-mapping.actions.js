import * as types from './active-mapping.action-types';
import * as graphHelpers from '../../common/graph-helpers';
import * as resourceHelpers from '../../common/resource-helpers';
import * as _ from 'lodash';
import type {
    ActiveMappingState,
    ActiveMappingAction
} from "./active-mapping.types";

export
function setActiveMapping(mapping: ActiveMappingState)
    : ActiveMappingAction {
    return {type: types.SET_ACTIVE_MAPPING, mapping}
}

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


export function addResourceToActiveMapping(asset) {

    /**
     * Add @param asset to the current active mapping
     */

    return function (dispatch, getState) {

        const {activeMapping, assets, graph} = getState();

        if (activeMapping.name === "no selection"){
            alert("Create or select a mapping first, before adding assets.")
            return;
        }

        const newAssetName = asset.name;

        const edgeElements = asset.connected_to.map(
            target => graphHelpers
                .edgeElementFromResource(asset.name, target.name)
        );


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
                if (target === newAssetName) {
                    preMappedToNewEdges.push(
                        graphHelpers.edgeElementFromResource(
                            preMappedAsset.name,
                            newAssetName
                        )
                    );
                }
            })
        });


        //graphHelpers.addElement(cy, node);
        const newElement = graph.add(node);
        graphHelpers.addElements(cy, preMappedToNewEdges);
        graphHelpers.addElements(cy, edgeElements);

        // move children under parent if exist

        const assetObjects = assets.filter(asset => {
            return _.includes(activeMapping.assets, asset.name)
        });

        assetObjects.forEach(a => {
            const el = graph.getElementById(a.name);
            console.info(a)
            if (a.group === asset.name) {
                el.move({parent: asset.name})
            }
            console.info(`${el.parent().id()} -> ${el.id()} `);
        });
        graph.elements('node').forEach(el => {
            console.info(`${el.parent().id()} -> ${el.id()} `);
        });

        console.groupEnd();

        graphHelpers.updateLayout(cy, "cola");
    }
}

export function removeResourceFromActiveMapping(asset) {
    return function (dispatch, getState) {
        const {graph} = getState();

        console.info(asset);

        // todo: refactor.. set type
        const assetName = asset.name ? asset.name : asset;

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


function createGroupNode(name) {
    return {
        group: "nodes",
        data: {
            id: name,
        }
    }
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

        // console.info(newEdges)
        // graph.add(newEdges);

        // newEdges.forEach(e => graph.getElementById(e).addClass("is-in-group"))


        // newEdges.forEach(e => console.info(
        //     graph.getElementById(e).hasClass("is-in-group"))
        // )

        //    as children
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


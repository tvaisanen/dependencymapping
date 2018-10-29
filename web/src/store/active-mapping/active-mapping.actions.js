import * as types from './active-mapping.action-types';
import * as graphActions from '../graph/graph.actions';
import * as graphHelpers from '../../common/graph-helpers';
import * as resourceHelpers from '../../common/resource-helpers';

export function clearActiveMappingSelection() {
    return {type: types.CLEAR_ACTIVE_MAPPING_SELECTION}
}

export function setActiveMappingConnections(connections) {
    return {type: types.SET_ACTIVE_MAPPING_CONNECTIONS, connections}
}

export function addActiveMappingResources(resources) {
    return {type: types.ADD_ACTIVE_MAPPING_RESOURCES, resources}
}

export function addActiveMappingConnections(connections) {
    return {type: types.ADD_ACTIVE_MAPPING_CONNECTIONS, connections}
}

export function loadActiveMappingResources(mapping) {
    console.info(mapping);
    return {type: types.LOAD_ACTIVE_MAPPING_RESOURCES, mapping}
}

export function addResourceToActiveMapping(resource) {
    return function (dispatch, getState) {
        console.info('add resource to active mapping action');
        console.info(getState().activeMapping);

        const activeMapping = getState().activeMapping;
        const edgeElements = resource.connected_to.map(
            r => graphHelpers.edgeElementFromResource(resource.name, r.name)
        );

        const resourcesConnectingInto = activeMapping
                .resources.filter(
                    r => resourceHelpers.isResourceConnectedToId({
                        resource: r,
                        id: resource.name
                    })
            )
        ;

        const edgesTargetingResource = resourcesConnectingInto.map(
            r => graphHelpers.edgeElementFromResource(r.name, resource.name));

        const cy = getState().graph;
        const node = graphHelpers.nodeElementFromResource(resource);
        graphHelpers.addElement(cy, node);
        graphHelpers.addElements(cy, edgeElements);
        graphHelpers.addElements(cy, edgesTargetingResource);
        //dispatch(graphActions.addNodeToGraph(resource));
        //dispatch(graphActions.addElementsToGraph(edgeElements));
        //dispatch(graphActions.addElementsToGraph(edgesTargetingResource));
        dispatch({type: types.ADD_ACTIVE_MAPPING_RESOURCE, resource});
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
        return dispatch(loadActiveMappingResources(mapping))
    }
}

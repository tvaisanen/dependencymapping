import * as types from './actionTypes';
import * as graphActions from './graph.actions';
import * as graphHelpers from '../common/graph-helpers';
import * as resourceHelpers from '../common/resource-helpers';

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
    return {type: types.LOAD_ACTIVE_MAPPING_RESOURCES, mapping}
}

export function addResourceToActiveMapping(resource, activeMapping) {
    return function (dispatch, getState) {
        console.info('add resource to active mapping action');
        console.info(getState().activeMapping);
        // todo: refactor
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


        dispatch(graphActions.addNodeToGraph(resource));
        dispatch(graphActions.addElementsToGraph(edgeElements));
        dispatch(graphActions.addElementsToGraph(edgesTargetingResource));
        dispatch({type: types.ADD_ACTIVE_MAPPING_RESOURCE, resource});
    }
}

export function removeResourceFromActiveMapping(resource) {
    return {type: types.REMOVE_ACTIVE_MAPPING_RESOURCE, resource};

}


export function loadActiveMapping(mapping) {
    return function (dispatch) {
        return dispatch(loadActiveMappingResources(mapping))
    }
}

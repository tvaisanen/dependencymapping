import * as types from './actionTypes';

export function clearActiveMappingSelection(data) {
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

export function addResourceToActiveMapping(resource) {
    console.info('add resource to active mapping action');
    return {type: types.ADD_ACTIVE_MAPPING_RESOURCE, resource};
}

export function removeResourceFromActiveMapping(resource) {
    console.info('remove resource from active mapping');
    return {type: types.REMOVE_ACTIVE_MAPPING_RESOURCE, resource};
}


export function loadActiveMapping(mapping) {
    return function (dispatch) {
        return dispatch(loadActiveMappingResources(mapping))
    }
}

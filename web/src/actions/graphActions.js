import GwClientApi from '../api/gwClientApi';
import * as types from './actionTypes';

export function loadAllMappings() {
    return function (dispatch) {
        return GwClientApi.getGraphs().then(graphs => {
            dispatch(loadMappingsSuccess(graphs));
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadAllResources() {
    return function (dispatch) {
        return GwClientApi.getResources().then(resources => {
            dispatch(loadResourcesSuccess(resources));
        }).catch(error => {
            throw(error);
        });
    }
}


export function loadResource() {
    /**
     * Load resource node
     */
    return function (dispatch) {
        return GwClientApi.getResources().then(resource => {
            dispatch(loadResourceSuccess(resource));
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadAllDependencies() {
    return function (dispatch) {
        return GwClientApi.getDependencies().then(dependencies => {
            dispatch(loadDependenciesSuccess(dependencies));
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadActiveMapping(mapping) {
    return function (dispatch) {
        return dispatch(loadActiveMappingResources(mapping))
    }
}


/*************** MAPPING *************/

export function postMapping({name, description, resources, tags}) {

    return function (dispatch) {

        return GwClientApi.postMapping({name, description, resources, tags})
            .then(response => {
                dispatch(postMappingSuccess(response));
                dispatch(addMapping({name, description, resources, tags}));
                // return the response to caller
                return response;
            }).catch(error => {
                return error.response;
            });
    }
}

/*************** UPDATE **************/

export function updateMapping(mapping) {
    console.info("updateMapping(mapping);");
    console.info(mapping);
    return function (dispatch) {
        return GwClientApi.putMapping(mapping)
            .then(response => {
                console.info("updateMapping.then()");
                console.info(response);
                dispatch(updateMappingSuccess({mapping: response.data}));
                return response;
            }).catch(error => {
                return error.response;
            })
    }
}

function updateMappingSuccess({mapping}) {
    console.info("updateMappingSuccess");
    return {type: types.UPDATE_MAPPING_SUCCESS, mapping};
}




/*************** DELETE **************/

export function deleteMapping({name}) {
    console.info("deletemapping(" + name + ")");
    return function (dispatch) {
        return GwClientApi.deleteMapping({name})
            .then(response => {
                dispatch(deleteMappingSuccess({removed: name}));
                return response;
            }).catch(error => {
                return error;
            })
    }
}

export function deleteMappingSuccess({removed}) {
    console.info('Delete mapping success.');
    return {type: types.DELETE_MAPPING_SUCCESS, removed};
}

/*********************************************** */



/************* RESOURCE       ************* */

export function postResource(name) {
    return function (dispatch) {
        return GwClientApi.postResource(name).then(response => {
            if (response.error) {
                // handle error
                console.debug('error posting resourcee');
            } else {
                // if no errors add the resource to store
                //

                dispatch(postResourceSuccess(response.data));
            }
            return response;
        }).catch(error => {
            throw(error);
        });
    }
}
/****************  RESOURCE UPDATE   ****************/
export function updateResource(resource) {
    console.info("updateResource(resource);");
    console.info(resource);
    return function (dispatch) {
        return GwClientApi.putResource(resource)
            .then(response => {
                console.info("updateResource.then()");
                console.info(response);
                dispatch(updateResourceSuccess({resource: response.data}));
                return response;
            }).catch(error => {
                return error.response;
            })
    }
}

function updateResourceSuccess({resource}) {
    console.info("updateResourceSuccess");
    return {type: types.UPDATE_RESOURCE_SUCCESS, resource};
}
/*************** DELETE **************/

export function deleteResource({name}) {
    console.info("deleteResource(" + name + ")");
    return function (dispatch) {
        return GwClientApi.deleteResource({name})
            .then(response => {
                dispatch(deleteResourceSuccess({removed: name}));
                return response;
            }).catch(error => {
                return error.response;
            })
    }
}

export function deleteResourceSuccess({removed}) {
    console.info('Delete mapping success.');
    return {type: types.DELETE_RESOURCE_SUCCESS, removed};
}

/*********************************************** */



export function addResourceToMapping({nameMapping, nameResource}) {
    // if no resource -> create resource
    console.debug('add ' + nameResource + " to " + nameMapping);
    // add to the resources
    // add the resource
    return function (dispatch) {
        postResource(nameResource);
        //putResourceToMapping(nameMapping, nameResource);
    }

}

export function loadAllTags() {
    return function (dispatch) {
        return GwClientApi.getCategories().then(tags => {
            dispatch(loadTagsSuccess(tags));
        }).catch(error => {
            throw(error);
        });
    }
}

export function saveMapping(mapping) {
    // not async
    // todo: when backend
    // -> follow the pattern showed by 
    // async actions before
    return {type: types.SAVE_MAPPING, mapping};
}

export function addResourceToActiveMapping(resource) {
    console.info('add resource to active mapping action');
    return {type: types.ADD_ACTIVE_MAPPING_RESOURCE, resource};
}

export function removeResourceFromActiveMapping(resource) {
    console.info('remove resource from active mapping');
    return {type: types.REMOVE_ACTIVE_MAPPING_RESOURCE, resource};
}

export function addMapping(mapping) {
    return {type: types.ADD_MAPPING, mapping};
}

export function addTag(tag) {
    return {type: types.ADD_TAG, tag}
}

export function addResource(resource) {
    return {type: types.ADD_RESOURCE, resource}
}

export function postMappingSuccess(response) {
    console.info('Post mapping success.');
    return {type: types.POST_MAPPING_SUCCESS, response}
}


export function postResourceSuccess(resource) {
    console.info("Post resource success:");
    ;
    return {type: types.POST_RESOURCE_SUCCESS, resource}
}
/********* TAG POST *******************/

export function postTag({name, description}) {

    return function (dispatch) {
        // if mapping already exist actionUpdate mapping
        dispatch(addTag({name, description}));

        return GwClientApi.postTag({name, description}).then(response => {
            dispatch(postTagSuccess(response));
            return response;
        }).catch(error => {
            console.info("postTag error");
            return error.response;
        });
    }
}

export function postTagSuccess(response) {
    return {type: types.ADD_TAG_SUCCESS, response}
}
/** *******************************************/
/*************** TAG UPDATE **************/

export function updateTag(tag) {
    console.info("updatetag")
    return function (dispatch) {
        return GwClientApi.putTag(tag)
            .then(response => {
                dispatch(updateTagSuccess({tag: response.data}));
                return response;
            }).catch(error => {
                return error.response;
            })
    }
}

function updateTagSuccess({tag}) {
    console.info("updateTagSuccess");
    return {type: types.UPDATE_TAG_SUCCESS, tag};
}

/*************** DELETE **************/

export function deleteTag({name}) {
    console.info("deleteTag(" + name + ")");
    return function (dispatch) {
        return GwClientApi.deleteTag({name})
            .then(response => {
                dispatch(deleteTagSuccess({removed: name}));
                return response;
            }).catch(error => {
                return error.response;
            })
    }
}

export function deleteTagSuccess({removed}) {
    console.info('Delete tagg success.');
    return {type: types.DELETE_TAG_SUCCESS, removed};
}
export function loadTagsSuccess(tags) {
    return {type: types.LOAD_CATEGORIES_SUCCESS, tags}
}

export function loadMappingsSuccess(mappings) {
    return {type: types.LOAD_MAPPINGS_SUCCESS, mappings}
}

export function loadResourcesSuccess(resources) {
    return {type: types.LOAD_RESOURCES_SUCCESS, resources}
}

export function loadDependenciesSuccess(dependencies) {
    return {type: types.LOAD_DEPENDENCIES_SUCCESS, dependencies}
}

export function loadResourceSuccess(resource) {
    return {type: types.LOAD_RESOURCE_SUCCESS, resource}
}

export function loadActiveMappingResources(mapping) {
    return {type: types.LOAD_ACTIVE_MAPPING_RESOURCES, mapping}
}

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


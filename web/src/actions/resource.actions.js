import GwClientApi from '../api/gwClientApi';
import * as types from './actionTypes';


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

export function postResourceSuccess(resource) {
    console.info("Post resource success:");
    ;
    return {type: types.POST_RESOURCE_SUCCESS, resource}
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

export function loadResourcesSuccess(resources) {
    return {type: types.LOAD_RESOURCES_SUCCESS, resources}
}


export function loadResourceSuccess(resource) {
    return {type: types.LOAD_RESOURCE_SUCCESS, resource}
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

export function addResource(resource) {
    return {type: types.ADD_RESOURCE, resource}
}

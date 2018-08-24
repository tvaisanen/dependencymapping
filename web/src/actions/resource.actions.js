import GwClientApi from '../api/gwClientApi';
import * as types from './actionTypes';
import * as graphHelpers from '../common/graph-helpers';
import * as _ from 'lodash';

/************* ASSET       ************* */

export function postResource(asset) {
    return function (dispatch) {
        console.groupCollapsed("PostResource");
        console.info(asset);
        console.groupEnd();
        return GwClientApi.postResource(asset).then(response => {
            if (!response.error) {
                console.info('set info panel to resource success');
                dispatch(postResourceSuccess(response.data));
            }

            // return response to UI
            return response;
        }).catch((error, data) => {
            console.warn(error);
            console.warn(data)
            return error;
        });

    }
}

export function postResourceSuccess(resource) {
    console.info("Post resource success:");
    return {type: types.POST_RESOURCE_SUCCESS, resource}
}

/****************  ASSET UPDATE   ****************/
export function updateResource(resource) {

    // updates asset/resource to the database
    // and refreshes the nodes edges in the graph
    return function (dispatch, getState) {

        // send the request
        return GwClientApi.putResource(resource)
            .then(response => {

                // replace the updated version of the asset/resource
                dispatch(updateResourceSuccess({resource: response.data}));

                // redraw the edges in the graph if asset in map
                const activeMapAssets = getState().activeMapping.resources;
                const inActiveMap = -1 !== _.findIndex(activeMapAssets, (item) => item.name === resource.name);
                if (inActiveMap) {
                    graphHelpers.removeResourceEdges(getState().graph, response.data);
                    graphHelpers.drawResourceEdges(getState().graph, response.data);
                }


                return response;
            }).catch(error => {
                console.log(error)
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

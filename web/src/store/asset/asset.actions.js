import GwClientApi from '../../api/gwClientApi';
import * as types from './asset.action-types';
import * as graphHelpers from '../../common/graph-helpers';
import * as _ from 'lodash';
import * as apiHelpers from '../../common/api.helpers';
/************* ASSET       ************* */

export function postResource(asset) {
    return function (dispatch) {
        const promise = GwClientApi.postResource(asset);

        // resolving a request is done in form container
        const resolveCallback = (resource) => dispatch(postResourceSuccess(resource))
        return {promise, resolveCallback};
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
        const resolveCallback = (resource) => {
                dispatch(updateResourceSuccess({resource: resource}));
                // todo: refactor the graph update
                // redraw the edges in the graph if asset in map
                const activeMapAssets = getState().activeMapping.resources;
                const inActiveMap = -1 !== _.findIndex(activeMapAssets, (item) => item.name === resource.name);
                if (inActiveMap) {
                    graphHelpers.removeResourceEdges(getState().graph, resource);
                    graphHelpers.drawResourceEdges(getState().graph, resource);
                }
        };
        // send the request
        const promise = GwClientApi.putResource(resource);
        return {promise, resolveCallback};
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
        const promise = GwClientApi.deleteResource({name})
        // resolving a request is done in form container
        const resolveCallback = () => {
            // todo: deal with mapped assets
            dispatch(deleteResourceSuccess({removed: name}));
        };
        return {promise, resolveCallback};
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

        // get all assets from the api
        const promise = GwClientApi.getAssets();

        promise.then(response => {
            // dispatch success message with the data
            // returned assets
            dispatch(loadResourcesSuccess(response.data));

        }).catch(error => {
             if (error.message && error.message === "Network Error"){
                dispatch(apiHelpers.handleNetworkError(error));
            } else {
            console.group("loadAllResources() -> <Error>");
            console.warn(error);
            console.groupEnd();
            }

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
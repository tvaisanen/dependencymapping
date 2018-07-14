import GwClientApi from '../api/gwClientApi';
import * as types from './actionTypes';

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

export function postMappingSuccess(response) {
    console.info('Post mapping success.');
    return {type: types.POST_MAPPING_SUCCESS, response}
}

export function addMapping(mapping) {
    return {type: types.ADD_MAPPING, mapping};
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

export function loadMappingsSuccess(mappings) {
    return {type: types.LOAD_MAPPINGS_SUCCESS, mappings}
}
export function loadAllMappings() {
    return function (dispatch) {
        return GwClientApi.getGraphs().then(graphs => {
            dispatch(loadMappingsSuccess(graphs));
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


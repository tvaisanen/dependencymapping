import GwClientApi from '../api/gwClientApi';
import * as types from './actionTypes';
import * as graphHelpers from '../common/graph-helpers';
import * as activeMappingActions from '../store/active-mapping/active-mapping.actions';

/*************** MAPPING *************/

export function postMapping({name, description, resources, tags}) {

    return function (dispatch) {
        const resolveCallback = mapping => dispatch(postMappingSuccess(mapping));
        const promise = GwClientApi.postMapping({name, description, resources, tags})
        return {promise, resolveCallback};
    }
}

export function postMappingSuccess(mapping) {
    console.info('Post mapping success.');
    return {type: types.POST_MAPPING_SUCCESS, mapping}
}

export function addMapping(mapping) {
    return {type: types.ADD_MAPPING, mapping};
}


/*************** UPDATE **************/

export function updateMapping(mapping) {
    return function (dispatch) {
        const resolveCallback = (mapping) => {

            dispatch(updateMappingSuccess({mapping}));
        };
        const promise = GwClientApi.putMapping(mapping);
        return {promise, resolveCallback};

    }
}

function updateMappingSuccess({mapping}) {
    console.info("updateMappingSuccess");
    return {type: types.UPDATE_MAPPING_SUCCESS, mapping};
}


/*************** DELETE **************/

export function deleteMapping({name}) {
    return function (dispatch, getState) {

        const promise = GwClientApi.deleteMapping({name});

        const resolveCallback = () => {
            // no need to return responsa data
            dispatch(deleteMappingSuccess({removed: name}));
            dispatch(activeMappingActions.clearActiveMappingSelection());
            graphHelpers.clearGraph(getState().graph);
        };

        return {promise, resolveCallback};
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

export function loadAllMappings(auth) {
    return function (dispatch) {
        const promise = GwClientApi.getGraphs({auth});

        promise.then(response => {
            dispatch(loadMappingsSuccess(response.data))
        }).catch(error => {
            console.error(error);
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


import GwClientApi from '../api/gwClientApi';
import * as types from './actionTypes';
import * as graphHelpers from '../common/graph-helpers';
import * as activeMappingActions from '../store/active-mapping/active-mapping.actions';
import * as appActions from '../actions/app.actions';
import * as apiHelpers from '../common/api.helpers';
import * as mappingHelpers from '../common/dependency-map.helpers';

type Mapping = {
    name: string,
    description: string,
    assets: [string] | [],
    tags: [string] | []
}

/*************** MAPPING *************/

export function postMapping({name, description, resources, tags}) {

    return function (dispatch) {
        const resolveCallback = mapping => {
            dispatch(appActions.setInfoMessage(`Created mapping: ${name}`));
            dispatch(postMappingSuccess(mapping));
        };

        console.info({name, description, assets:resources, tags});
        const promise = GwClientApi.postMapping({name, description, assets:resources, tags});
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
    return function (dispatch, getState) {
        const resolveCallback = (mapping) => {

            dispatch(appActions.setInfoMessage(`Updated mapping: ${mapping.name}`));
            dispatch(updateMappingSuccess({mapping}));

            // if edited mapping is active mapping
            if (mapping.name === getState().activeMapping.name) {
                mappingHelpers.loadDependencyMap(
                    mapping.name,
                    getState().graph,
                    getState().mappings,
                    getState().assets,
                    dispatch,
                    getState().app.graph.selectedLayout
                );
                dispatch(activeMappingActions.setActiveMapping(mapping));
            }

        };
        const promise = GwClientApi.putMapping({
            name: mapping.name,
            description: mapping.description,
            assets: mapping.resources,
            tags: mapping.tags
        });
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
            dispatch(appActions.setInfoMessage(`Deleted mapping: ${name}`));
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
            console.info("loadAllMappings.then")
            dispatch(appActions.setInfoMessage("Loaded all mappings successfully"));
            dispatch(loadMappingsSuccess(response.data))
        }).catch(error => {
            console.warn(error)
            if (apiHelpers.isNetworkError(error)){
                console.log(error.response)
                dispatch(apiHelpers.handleNetworkError(error));
            } else {
                console.groupCollapsed("loadAllMappings()");
                console.info(error);
                console.groupEnd();
            }
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


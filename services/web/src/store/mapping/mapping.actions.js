import GwClientApi from '../../api/gwClientApi';
import * as types from './mapping.action-types';
import * as graphHelpers from '../../common/graph-helpers';
import * as activeMappingActions from '../active-mapping/active-mapping.actions';
import * as appActions from '../../actions/app.actions';
import * as apiHelpers from '../../common/api.helpers';
import * as mappingHelpers from '../../common/dependency-map.helpers';
import {routeApiActionError} from "../error-handling";

import type {Mapping} from "./mapping.types";

/*************** MAPPING *************/

export function postMapping(mapping: Mapping, callback: (any) => void): Dispatch {

    return async function (dispatch) {
        try {
            const response = await GwClientApi.postMapping((mapping: Mapping));
            const storedMapping: Mapping = response.data

            dispatch(
                appActions.setInfoMessage(
                    `Created mapping: ${storedMapping.name}`));
            dispatch(postMappingSuccess(storedMapping));

            // run callers callback
            // with response data
            callback(storedMapping)
        } catch (err) {
           routeApiActionError(err)
        }

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

export function updateMapping(mapping: Mapping, callback: (any) => void) {

    return async function (dispatch: Dispatch, getState: State): void {

        try {

            const response = await GwClientApi.putMapping((mapping: Mapping));
            const updatedMapping: Mapping = response.data;


            dispatch(
                appActions.setInfoMessage(
                    `Updated mapping: ${updatedMapping.name}`));
            dispatch(updateMappingSuccess({mapping: updatedMapping}));

            // if edited mapping is active mapping
            if (updatedMapping.name === getState().activeMapping.name) {
                mappingHelpers.loadDependencyMap(
                    mapping.name,
                    getState().graph,
                    getState().mappings,
                    getState().assets,
                    dispatch,
                    getState().app.graph.selectedLayout
                );
                dispatch(
                    activeMappingActions
                        .setActiveMapping(updatedMapping));
            }

            // run callers callback function with response data
            callback(updatedMapping);

        } catch (err) {
            routeApiActionError(err);
        }

    }
}

function updateMappingSuccess({mapping}) {
    console.info("updateMappingSuccess");
    return {type: types.UPDATE_MAPPING_SUCCESS, mapping};
}


/*************** DELETE **************/

export function deleteMapping(name: string, callback: (any) => void) {

    return async function (dispatch, getState) {

        try {
            await GwClientApi.deleteMapping((name: string));

            /**
             Do after delete actions here
             */
            dispatch(deleteMappingSuccess(name));
            dispatch(appActions.setInfoMessage(`Deleted mapping: ${name}`));
            dispatch(activeMappingActions.clearActiveMappingSelection());
            graphHelpers.clearGraph(getState().graph);

            // run caller callback
            callback();
        } catch (err) {
            routeApiActionError(err)
        }
    }
}

export function deleteMappingSuccess(name) {
    return {type: types.DELETE_MAPPING_SUCCESS, name};
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
            if (apiHelpers.isNetworkError(error)) {
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

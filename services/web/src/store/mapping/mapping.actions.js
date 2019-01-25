import GwClientApi from '../../api/gwClientApi';
import * as types from './mapping.action-types';
import * as graphHelpers from '../../common/graph-helpers';
import * as activeMappingActions from '../active-mapping/active-mapping.actions';
import * as appActions from '../../actions/app.actions';
import * as apiHelpers from '../../common/api.helpers';
import * as mappingHelpers from '../../common/dependency-map.helpers';
import {routeApiActionError} from "../error-handling";

import type {FormAndOptionalCallback} from "../store-action.arg-types";
import type {Dispatch, State, Mapping} from "../types";


export function addMapping(mapping) {
    return {type: types.ADD_MAPPING, mapping};
}

const api = GwClientApi;
/*************** POST *************/

export function postMapping(props: FormAndOptionalCallback): Dispatch {

    return async function (dispatch) {
        try {

            const {form, callback} = props;

            const mapping = form;

            const response = await GwClientApi.postMapping((mapping: Mapping));
            const storedMapping: Mapping = response.data

            dispatch(
                appActions.setInfoMessage(
                    `Created mapping: ${storedMapping.name}`));
            dispatch(postMappingSuccess(storedMapping));

            // run callers callback
            // with response data
            callback ? callback(storedMapping) : null;
        } catch (err) {
            routeApiActionError(err)
        }

    }
}

export function postMappingSuccess(mapping) {
    console.info('Post mapping success.');
    return {type: types.POST_MAPPING_SUCCESS, mapping}
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
            callback ? callback(updatedMapping) : null;

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
            callback ? callback() : null;
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
    return async function (dispatch) {
        //const promise = GwClientApi.getGraphs({auth});

        const mappings = await
            api
                .mapping
                .getAll()
                .parseResponseContent()

            dispatch(appActions.setInfoMessage("Loaded all mappings successfully"));
            dispatch(loadMappingsSuccess(mappings))

    }
}

/************************************************/

export function removeDeletedAssetFromMappings(assetName: string) {

    /**

     Remove pointers to deleted mapping

     */

    return function (dispatch: Dispatch, getState: State): void {

        const {mappings} = getState();

        /*
            For each mapping, check
            if deleted mapping listed
            as an asset.

            If found, remove reference.
         */
        mappings.forEach(mapping => {

            let update = false;

            const filteredAssets = mapping.assets.filter(asset => {

                // deleted listed as an asset
                const deletedFound = asset === assetName;

                if (!update && deletedFound) {

                    // set update mapping flag
                    update = deletedFound;
                }

                return !deletedFound;
            });

            if (update) {
                dispatch(updateMapping({
                    ...mapping,
                    assets: filteredAssets
                }));
            }

        });

    }
}



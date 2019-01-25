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

export function postMapping(props: FormAndOptionalCallback): void {

    return async function (dispatch) {
        try {

            const {form, callback} = props;

            //const response = await GwClientApi.postMapping((mapping: Mapping));
            //const storedMapping: Mapping = response.data

            const storedMapping = await
                api
                    .mapping
                    .post(form)
                    .parseResponseData();

            dispatch(appActions.setInfoMessage(`Created mapping: ${storedMapping.name}`));
            dispatch(postMappingSuccess(storedMapping));

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

export function updateMapping(props: FormAndOptionalCallback) {

    return async function (dispatch: Dispatch): void {

        try {

            const {form, callback} = props;

            const updatedMapping = await
                api
                    .mapping
                    .put(form)
                    .parseResponseContent();

            dispatch(appActions.setInfoMessage(`Updated mapping: ${updatedMapping.name}`));
            dispatch(updateMappingSuccess({mapping: updatedMapping}));
            dispatch(activeMappingActions.updateMapping(updatedMapping));

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
            //await GwClientApi.deleteMapping((name: string));

            await api.mapping.delete()

            dispatch(deleteMappingSuccess(name));
            dispatch(appActions.setInfoMessage(`Deleted mapping: ${name}`));
            dispatch(activeMappingActions.clearActiveMappingSelection(getState().graph));

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

export function loadAllMappings() {

    return async function (dispatch) {

        const mappings = await
            api
                .mapping
                .getAll()
                .parseResponseContent()

        // todo: refactor messages to consts
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



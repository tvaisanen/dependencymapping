import api from '../../api/gwClientApi';

import * as types from './mapping.action-types';
import {clearActiveMappingSelection, updateActiveMapping} from '../active-mapping/active-mapping.actions';
import { setInfoMessage } from '../../actions/app.actions';

import {routeApiActionError} from "../error-handling";

import type {FormAndOptionalCallback} from "../store-action.arg-types";
import type {Dispatch, State} from "../types";


export function addMapping(mapping) {
    return {type: types.ADD_MAPPING, mapping};
}


/*************** POST *************/

export function postMapping(props: FormAndOptionalCallback): void {


    return async function (dispatch) {
        try {

            const {form, callback} = props;

            const storedMapping = await
                api
                    .mapping
                    .post(form)
                    .parseResponseContent();

            dispatch(setInfoMessage(`Created mapping: ${storedMapping.name}`));
            dispatch(postMappingSuccess(storedMapping));

            if (callback) { callback(storedMapping) };

        } catch (err) {
            console.error(err)
        }

    }
}

export function postMappingSuccess(mapping) {
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

            dispatch(setInfoMessage(`Updated mapping: ${updatedMapping.name}`));
            dispatch(updateMappingSuccess({mapping: updatedMapping}));
            dispatch(updateActiveMapping(updatedMapping));

            if (callback) { callback(updatedMapping) };

        } catch (err) {
            routeApiActionError(err);
        }

    }
}

function updateMappingSuccess({mapping}) {
    return {type: types.UPDATE_MAPPING_SUCCESS, mapping};
}

/*************** DELETE **************/

export function deleteMapping(props: FormAndOptionalCallback) {

    return async function (dispatch, getState) {

        try {

            await api.mapping.delete();
            dispatch(deleteMappingSuccess(props.name));
            dispatch(setInfoMessage(`Deleted mapping: ${props.name}`));
            dispatch(clearActiveMappingSelection(getState().graph));

            // run caller callback
            props.callback ? props.callback() : null;

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
        dispatch(setInfoMessage("Loaded all mappings successfully"));
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
                    form: {
                        ...mapping,
                        assets: filteredAssets
                    },
                }));
            }

        });

    }
}



//@flow
import GwClientApi from '../../api/gwClientApi';
import * as types from './asset.action-types';
import * as apiHelpers from '../../api/api.utils';
import { setInfoMessage } from '../../store/ui/ui.actions';
import * as mappingActions from '../mapping/mapping.actions';
import * as activeMappingActions from '../active-mapping/active-mapping.actions';
import * as detailFormActions from '../detail-form/detail-form.actions';
import * as connectionActions from '../connection/connection.actions';
import type {Asset, Connection, Dispatch, State} from "../types";
import type {FormAndOptionalCallback} from "../store-action.arg-types";

// ! refactor to use api
// ? can be deleted already?
const api = GwClientApi;

/************** POST ******************/

export function postAsset(props: FormAndOptionalCallback): Dispatch {

    return async function (dispatch: Dispatch): Asset {

        try {
            const { form, callback } = props;

            //const response = await api.asset.post(asset);
            //const storedAsset = response.parseResponseContent();

            const storedAsset = await
                api
                    .asset
                    .post(form)
                    .parseResponseContent();

            // resolving a request is done in form container
            dispatch(postAssetSuccess(storedAsset));
            dispatch(setInfoMessage(`Created asset: ${storedAsset.name}`));
            dispatch(connectionActions.updateAssetConnections(storedAsset));

            // execute callback from caller if there's one
            if (callback) { callback(storedAsset) };

        } catch (err) {

            console.info(err);

            if (err.response ? err.response.status === 409 : false) {
                // conflict -> error with name field

                // name field error
                const errors = {
                    name: err.response.data.error
                };

                // set errors to be displayed in the form
                dispatch(detailFormActions.setErrors(errors));

            }

            throw new Error(`asset.actions.postTag() :: ${err} `)
        }
    }
}

export function postAssetSuccess(asset: Asset) {
    return {type: types.POST_ASSET_SUCCESS, asset}
}

/************** UPDATE ******************/


export function updateAsset(props: FormAndOptionalCallback): Dispatch {
    // updates asset/resource to the database
    // and refreshes the nodes edges in the graph
    return async function (dispatch: Dispatch): void {

        try {
            const {form, callback} = props;

            const updatedAsset = await
                api
                    .asset
                    .put(form)
                    .parseResponseContent();

            dispatch(updateAssetSuccess({asset: updatedAsset}));
            dispatch(setInfoMessage(`Updated asset: ${updatedAsset.name}`));
            dispatch(connectionActions.updateAssetConnections(updatedAsset));
            dispatch(activeMappingActions.updateAssetState(updatedAsset));

            if (callback) { callback(updatedAsset) }

        } catch (err) {
            console.error(err)
        }
    }
}

function updateAssetSuccess({asset}) {
    return {type: types.UPDATE_ASSET_SUCCESS, asset};
}

/*************** DELETE **************/

export function deleteAsset(props: {name: string, callback:(any)=>void}) {

    return async function (dispatch: Dispatch, getState: State) {

        const {form:{name}, callback} = props;

        await api.asset.delete(name);

        dispatch(deleteAssetSuccess(name));
        dispatch(removeReferencesToDeletedAsset(name));
        dispatch(mappingActions.removeDeletedAssetFromMappings(name));
        dispatch(activeMappingActions.removeResourceFromActiveMapping({name}));
        dispatch(setInfoMessage(`Deleted asset: ${name}`));

        // caller callback
        callback ? callback() : null;
    }
}

export function deleteAssetSuccess(name: string) {
    return {type: types.DELETE_ASSET_SUCCESS, name};
}

/*********************************************** */

function removeReferencesToDeletedAsset(assetName: string) {

    /**
     * When asset is deleted, all the pointers
     * need to be cleaned. This function takes
     * an asset name as a parameter and iterates
     * through assets that have the deleted asset
     * as target in asset.connected_to and clears
     * the occurences.
     */
    return function (dispatch: Dispatch, getState: State): void {

        const {assets} = getState();

        assets.forEach(asset => {

            let update = false;

            const filteredAssets = asset.connected_to.filter(a => {

                // console.debug(`${a} === ${assetName}`);

                const deletedFound = a === assetName;

                if (!update && deletedFound) {
                    update = deletedFound;
                    // console.debug(`asset: ${a} needs to be udpated`)
                }

                return !deletedFound;
            });
            if (update) {
                try {

                    const updatedAsset = {
                        ...asset,
                        connected_to: filteredAssets
                    };

                    dispatch(updateAsset({form: updatedAsset}));

                } catch (err) {
                    console.warn(err)
                }
            }
            //console.groupEnd();

        });
    }
}

export function loadAssetsSuccess(assets: Array<Asset>) {
    return {type: types.LOAD_ASSETS_SUCCESS, assets}
}

export function loadAssetSuccess(asset: Asset) {
    return {type: types.LOAD_ASSET_SUCCESS, asset}
}

export function loadAllAssets() {
    return async function (dispatch: Dispatch) {


        try {
            const parsedAssets = await api
                .asset
                .getAll()
                .parseResponseContent();

            dispatch(setInfoMessage("Loaded all resources successfully"));
            dispatch(loadAssetsSuccess(parsedAssets));

        } catch (error) {
            if (error.message && error.message === "Network Error") {
                dispatch(apiHelpers.handleNetworkError(error));
            } else {
                console.group("loadAllResources() -> <Error>");
                console.warn(error);
                console.groupEnd();
            }

        }
    }
}


export function addAsset(asset: Asset) {
    return {type: types.ADD_ASSET, asset}
}

export function syncConnectionSourceAsset(connection: Connection) {
    /**
     Add a target asset.name to connected_to list
     */

    return function (dispatch: Dispatch, getState: State): void {
        // assets keep track of the target connections
        // so if the connection is created separately
        // from the asset form. The source assets
        // connected_to list need to be updated
        const assetToUpdate = getState().assets.filter(
            asset => asset.name === connection.source
        )[0];

        // create updated version from the asset
        // with the new connection target pointer
        const updatedAsset = {
            ...assetToUpdate,
            connected_to: [
                ...assetToUpdate.connected_to,
                connection.target
            ]
        };

        dispatch(updateAsset({form:updatedAsset}));
    }
}

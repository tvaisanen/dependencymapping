//@flow

import GwClientApi from '../../api/gwClientApi';
import * as types from './asset.action-types';
import * as graphHelpers from '../../common/graph-helpers';
import * as _ from 'lodash';
import * as apiHelpers from '../../common/api.helpers';
import * as appActions from '../../actions/app.actions';
import * as mappingActions from '../mapping/mapping.actions';
import * as activeMappingActions from '../active-mapping/active-mapping.actions';
import * as detailFormActions from '../detail-form/detail-form.actions';
import {connectionActions} from '../actions';

import type {Asset, Dispatch, GetState} from "../types";

type AssetAction = { promise: Promise<any>, resolveCallback: (asset: Asset) => void }

/************** POST ******************/

export function postAsset(asset: Asset, callback: (any) => void): Dispatch {

    return async function (dispatch: Dispatch): Asset {

        try {

            const response = await GwClientApi.postAsset(asset);
            const storedAsset: Asset = response.data;

            // resolving a request is done in form container
            dispatch(postAssetSuccess(storedAsset));
            dispatch(appActions.setInfoMessage(`Created asset: ${storedAsset.name}`));
            dispatch(connectionActions.updateAssetConnections(storedAsset));

            // execute callback from caller if there's one
            callback ? callback(storedAsset) : null;

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

export function updateAsset(asset: Asset, callback: (any) => void): Dispatch {

    // updates asset/resource to the database
    // and refreshes the nodes edges in the graph
    return async function (dispatch: Dispatch): AssetAction {

        try {
            const response = await GwClientApi.putAsset(asset);
            const updatedAsset = response.data;

            dispatch(updateAssetSuccess({asset: asset}));
            dispatch(appActions.setInfoMessage(`Updated asset: ${asset.name}`));
            dispatch(connectionActions.updateAssetConnections(updatedAsset));
            dispatch(activeMappingActions.updateAssetState(updatedAsset));

            callback ? callback(updatedAsset) : null;

        } catch (err) {
            throw new Error(`asset.actions.updateTag() :: ${err} `)
        }
    }
}

function updateAssetSuccess({asset}) {
    return {type: types.UPDATE_ASSET_SUCCESS, asset};
}

/*************** DELETE **************/

export function deleteAsset(name: string, callback: (any) => void) {

    return async function (dispatch: Dispatch, getState: GetState) {

        await GwClientApi.deleteAsset(name);

        dispatch(deleteAssetSuccess(name));
        dispatch(removeReferencesToDeletedAsset(name));
        dispatch(mappingActions.removeDeletedAssetFromMappings(name));
        dispatch(appActions.setInfoMessage(`Deleted asset: ${name}`));

        // caller callback
        callback ? callback() : null;
    }
}

export function deleteAssetSuccess(name: string) {
    console.info('Delete mapping success.');
    return {type: types.DELETE_ASSET_SUCCESS, name};
}

/*********************************************** */

function removeReferencesToDeletedAsset(assetName: string){

    return function (dispatch: Dispatch, getState: State): void {
       const { assets } = getState();

       assets.forEach(asset => {
            console.group(`check if ${asset.name} needs to be deleted`)
            let update = false;
            const filteredAssets = asset.connected_to.filter(a => {
                console.info(`${a} === ${assetName}`);
                const deletedFound = a === assetName;
                if (!update && deletedFound) {
                    update = deletedFound;
                    console.info(`asset: ${a} needs to be udpated`)
                }
                return !deletedFound;
            });
            if (update) {
                try {
                    const {
                        promise,
                        resolveCallback
                    } = dispatch(updateAsset({
                        ...asset,
                        connected_to: filteredAssets
                    }));
                    promise.then(response => {
                        resolveCallback(response.data);
                    });
                }
                catch (err) {
                    console.warn(err)
                }
            }
            console.groupEnd();

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
    return function (dispatch: Dispatch) {

        // get all assets from the api
        const promise = GwClientApi.getAssets();

        promise.then(response => {
            // dispatch success message with the data
            // returned assets
            dispatch(appActions.setInfoMessage("Loaded all resources successfully"));
            dispatch(loadAssetsSuccess(response.data));

        }).catch(error => {
            if (error.message && error.message === "Network Error") {
                dispatch(apiHelpers.handleNetworkError(error));
            } else {
                console.group("loadAllResources() -> <Error>");
                console.warn(error);
                console.groupEnd();
            }

        });
    }
}


export function addAsset(asset: Asset) {
    return {type: types.ADD_ASSET, asset}
}

export function syncConnectionSourceAsset(connection: Connection){
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

            dispatch(updateAsset(updatedAsset));
    }
}
//@flow

import GwClientApi from '../../api/gwClientApi';
import * as types from './asset.action-types';
import * as graphHelpers from '../../common/graph-helpers';
import * as _ from 'lodash';
import * as apiHelpers from '../../common/api.helpers';
import * as appActions from '../../actions/app.actions';
import * as mappingActions from '../mapping/mapping.actions';
import * as detailFormActions from '../detail-form/detail-form.actions';

import type {Asset, Dispatch, GetState} from "../types";

type AssetAction = { promise: Promise<any>, resolveCallback: (asset: Asset) => void }

export function postAsset(asset: Asset, callback: (any) => void): Dispatch {

    return async function (dispatch: Dispatch): Asset {

        try {

            const response = await
                GwClientApi.postAsset(asset);

            const storedAsset: Asset = response.data;

            // resolving a request is done in form container
            dispatch(
                appActions
                    .setInfoMessage(
                        `Created asset: ${storedAsset.name}`
                    )
            );

            dispatch(postAssetSuccess(storedAsset));

            // execute callback from caller
            callback(storedAsset);

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

export function updateAsset(asset: Asset, callback: (any) => void): Dispatch {

    // updates asset/resource to the database
    // and refreshes the nodes edges in the graph
    return async function (dispatch: Dispatch, getState: GetState): AssetAction {

        try {
            const {graph} = getState();
            const response = await GwClientApi.putAsset(asset);
            const updatedAsset = response.data;

            // set the redux store state
            dispatch(
                updateAssetSuccess({asset: asset}));

            // add info message to the top bar
            dispatch(
                appActions
                    .setInfoMessage(
                        `Updated asset: ${asset.name}`));

            // check if updated asset is in the active mapping
            const activeMapAssets = getState().activeMapping.assets;
            const inActiveMap = _.includes(activeMapAssets, asset.name);

            if (inActiveMap) {
                // if the status of asset group has been changed
                // the node need to be moved to the appropriate parent group
                graphHelpers
                    .activeMappingAssetUpdateActions(
                        graph, (asset: Asset)
                    );
            }

            callback(updatedAsset)

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

        const {assets, mappings} = getState();

        const response = await GwClientApi.deleteAsset(name);
        // resolving a request is done in form container


        mappings.forEach(mapping => {

            let update = false;

            const filteredAssets = mapping.assets.filter(asset => {
                console.info(`${asset} === ${name}`);
                const deletedFound = asset === name;
                if (!update && deletedFound) {
                    update = deletedFound;
                }
                return !deletedFound;
            });

            if (update) {
                try {
                    const {
                        promise,
                        resolveCallback
                    } = dispatch(mappingActions.updateMapping({
                        ...mapping,
                        assets: filteredAssets
                    }));
                    promise.then(response => {
                        resolveCallback(response.data);
                    });
                }
                catch (err) {
                    console.warn(err)
                }
            }

        });


        assets.forEach(asset => {
            console.group(`check if ${asset.name} needs to be deleted`)
            let update = false;
            const filteredAssets = asset.connected_to.filter(a => {
                console.info(`${a} === ${name}`);
                const deletedFound = a === name;
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

        dispatch(appActions.setInfoMessage(`Deleted asset: ${name}`));
        dispatch(deleteAssetSuccess(name));

        // caller callback
        callback();
    }
}

export function deleteAssetSuccess(name: string) {
    console.info('Delete mapping success.');
    return {type: types.DELETE_ASSET_SUCCESS, name};
}

/*********************************************** */


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
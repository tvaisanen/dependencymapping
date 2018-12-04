//@flow

import GwClientApi from '../../api/gwClientApi';
import * as types from './asset.action-types';
import * as graphHelpers from '../../common/graph-helpers';
import * as _ from 'lodash';
import * as apiHelpers from '../../common/api.helpers';
import * as appActions from '../../actions/app.actions';
import * as mappingActions from '../mapping/mapping.actions';


import type { Asset } from "./asset.types";
import type {Dispatch, GetState} from "../types";

type AssetAction = {promise: Promise<any>, resolveCallback: (asset: Asset)=>void}

export function postAsset(asset: Asset): Dispatch {
    return function (dispatch: Dispatch): AssetAction {

        const promise = GwClientApi.postAsset(asset);

        // resolving a request is done in form container
        const resolveCallback = (asset) => {
            dispatch(appActions.setInfoMessage(`Created asset: ${asset.name}`));
            dispatch(postAssetSuccess(asset));
        };

        return {promise, resolveCallback};
    }
}

export function postAssetSuccess(asset: Asset) {
    return {type: types.POST_ASSET_SUCCESS, asset}
}

export function updateAsset(asset: Asset): Dispatch {

    // updates asset/resource to the database
    // and refreshes the nodes edges in the graph
    return function (dispatch: Dispatch, getState: GetState): AssetAction {


        const resolveCallback = () => {

                // set the redux store state
                dispatch(updateAssetSuccess({asset: asset}));

                // add info message to the top bar
                dispatch(appActions.setInfoMessage(`Updated asset: ${asset.name}`));

                // check if updated asset is in the active mapping
                const activeMapAssets = getState().activeMapping.assets;
                const inActiveMap = _.includes(activeMapAssets, asset.name);

                if (inActiveMap) {
                    // if the status of asset group has been changed
                    // the node need to be moved to the appropriate parent group
                    graphHelpers.activeMappingAssetUpdateActions(getState().graph,(asset:Asset));
                }

                console.groupEnd();
        };
        // send the request
        const promise = GwClientApi.putAsset(asset);
        return {promise, resolveCallback};
    }
}

function updateAssetSuccess({asset}) {
    console.info("updateResourceSuccess");
    return {type: types.UPDATE_ASSET_SUCCESS, asset};
}

/*************** DELETE **************/

export function deleteAsset(name: string) {
    console.info("deleteResource(" + name + ")");
    return function (dispatch: Dispatch, getState: GetState) {

        const { assets, mappings } = getState();

        const promise = GwClientApi.deleteAsset(name);
        // resolving a request is done in form container
        const resolveCallback = () => {
            // todo: deal with mapped assets
            console.info('delete asset from all the mappings')

            mappings.forEach(mapping => {

                let update = false;

                const filteredAssets = mapping.assets.filter(asset => {
                  console.info(`${asset} === ${name}`);
                  const deletedFound = asset === name;
                  if (!update && deletedFound){
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
                            resolveCallback(response.data);});
                    }
                    catch (err) {console.warn(err)}
                }

            });


            assets.forEach(asset => {
                console.group(`check if ${asset.name} needs to be deleted`)
                let update = false;
                const filteredAssets = asset.connected_to.filter(a => {
                  console.info(`${a} === ${name}`);
                  const deletedFound = a === name;
                  if (!update && deletedFound){
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
                            resolveCallback(response.data);});
                    }
                    catch (err) {console.warn(err)}
                }
                console.groupEnd();

            });

            dispatch(appActions.setInfoMessage(`Deleted asset: ${name}`));
            dispatch(deleteAssetSuccess(name));
        };
        return {promise, resolveCallback};
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
             if (error.message && error.message === "Network Error"){
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
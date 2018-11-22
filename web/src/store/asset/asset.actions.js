import GwClientApi from '../../api/gwClientApi';
import * as types from './asset.action-types';
import * as graphHelpers from '../../common/graph-helpers';
import * as _ from 'lodash';
import * as apiHelpers from '../../common/api.helpers';
import * as appActions from '../../actions/app.actions';
import * as mappingActions from '../../actions/mapping.actions';


export function postAsset(asset) {
    return function (dispatch) {
        const promise = GwClientApi.postAsset(asset);

        // resolving a request is done in form container
        const resolveCallback = (asset) => {
            dispatch(appActions.setInfoMessage(`Created asset: ${asset.name}`));
            dispatch(postAssetSuccess(asset));
        };

        return {promise, resolveCallback};
    }
}

export function postAssetSuccess(asset) {
    console.info("Post resource success:");
    return {type: types.POST_ASSET_SUCCESS, asset}
}

/****************  ASSET UPDATE   ****************/
export function updateAsset(asset) {

    // updates asset/resource to the database
    // and refreshes the nodes edges in the graph
    return function (dispatch, getState) {
        const resolveCallback = () => {
                dispatch(updateAssetSuccess({asset: asset}));
                dispatch(appActions.setInfoMessage(`Updated asset: ${asset.name}`));
                // todo: refactor the graph update
                // redraw the edges in the graph if asset in map
                const activeMapAssets = getState().activeMapping.assets;
                const inActiveMap = -1 !== _.findIndex(activeMapAssets, (item) => item.name === asset.name);
                if (inActiveMap) {
                    graphHelpers.removeResourceEdges(getState().graph, asset);
                    graphHelpers.drawResourceEdges(getState().graph, asset);
                }
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

export function deleteAsset({name}) {
    console.info("deleteResource(" + name + ")");
    return function (dispatch, getState) {

        const { assets, mappings } = getState();

        const promise = GwClientApi.deleteAsset({name});
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
                            resources: filteredAssets
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
            dispatch(deleteAssetSuccess({removed: name}));
        };
        return {promise, resolveCallback};
    }
}

export function deleteAssetSuccess({removed}) {
    console.info('Delete mapping success.');
    return {type: types.DELETE_ASSET_SUCCESS, removed};
}

/*********************************************** */

export function addResourceToMapping({nameMapping, nameResource}) {
    // if no resource -> create resource
    console.debug('add ' + nameResource + " to " + nameMapping);
    // add to the resources
    // add the resource
    return function (dispatch) {
        postAsset(nameResource);
        //putResourceToMapping(nameMapping, nameResource);
    }
}

export function loadAssetsSuccess(assets) {
    return {type: types.LOAD_ASSETS_SUCCESS, assets}
}

export function loadAssetSuccess(asset) {
    return {type: types.LOAD_ASSET_SUCCESS, asset}
}

export function loadAllAssets() {
    return function (dispatch) {

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


export function loadResource() {
    /**
     * Load resource node
     */
    return function (dispatch) {
        return GwClientApi.getResources().then(resource => {
            dispatch(loadAssetSuccess(resource));
        }).catch(error => {
            throw(error);
        });
    }
}

export function addAsset(asset) {
    return {type: types.ADD_ASSET, asset}
}
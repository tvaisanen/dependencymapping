import {ASSET} from "../../constants";
import * as _ from 'lodash';
import * as helpers from '../../common/graph-helpers';
import * as resourceHelpers from "../../common/resource-helpers";
import * as activeMappingActions from '../active-mapping/active-mapping.actions';
import * as activeDetailActions from '../active-detail/active-detail.actions';
import * as eventHookActions from '../event-hook/event-hook.reducer';
import {addAssetsToGraph, syncAssetConnectionsInGraph} from "./graph.actions";

export function onNodeMouseOver(event) {
    return function (dispatch, getState) {
        helpers.hoverIndicationOn(event.target.cy(), event.target.id());
    }
}

export function onEdgeHover(event) {
    return function (dispatch, getState) {
        console.info("edgehover")
    }
}

export function onNodeMouseOut(event) {
    return function (dispatch, getState) {
        helpers.hoverIndicationOff(event.target.cy(), event.target.id());
    }
}

export function onCanvasClick(event) {
    return function (dispatch: Dispatch, getState: State) {
        console.info(event.target)
        if (event.target === getState().graph){
            dispatch(eventHookActions.clearEventHook())
        }

    }
}


export function onNodeClick(event) {

    return function (dispatch: Dispatch, getState: State) {

        const {assets, connections, eventHook} = getState();

        if (eventHook.hook === "onNodeClick") {
            // if there's an event hook, ignore
            // default click event
            eventHook.callback(event.target.id());

        } else {

            const cy = event.target.cy();

            // name of the clicked asset
            // todo: refactor to clickedAssetName
            const resourceName = event.target.id();
            const clickedAssetName = resourceName;

            // set store active detail
            // todo: get rid of this
            const clickedAsset = resourceHelpers
                .getObjectByName({
                    name: resourceName,
                    objectList: assets
                });

            dispatch(
                activeDetailActions
                    .setAsActiveDetail({
                        type: ASSET,
                        data: clickedAsset
                    })
            );


            const clickedAssetIsConnectedTo = clickedAsset.connected_to;

            // get assets that needs to be added to active mapping
            const connectedAssets = assets.filter(asset => _.includes(clickedAssetIsConnectedTo, asset.name));

            dispatch(addAssetsToGraph(connectedAssets))

            // get connections that other active assets might have
            // with the added assets
            // the active mapping state needs to be updated by
            // adding the resources of the expanded node.

            dispatch(activeMappingActions
                .addActiveMappingAssetsFromNameList(
                    clickedAssetIsConnectedTo
                )
            );

            // required parameters for handling the graph update are
            // to have the reference of cy, target and the resource name
            // list to the target is connected to

            // get all connections that the clicked
            // asset is associated with
            dispatch(syncAssetConnectionsInGraph(clickedAsset));

        }
    };
};

export function onEdgeClick(event) {
    console.info("")
}

export function onCtxClick(event) {
    return function (dispatch, getState) {
        console.info("right button click");
        console.info(event);
    }

}
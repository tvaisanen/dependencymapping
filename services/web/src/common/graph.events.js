import { ASSET } from "../constants";
import * as _ from 'lodash';
import * as helpers from './graph-helpers';
import * as resourceHelpers from "./resource-helpers";
import * as activeMappingActions from '../store/active-mapping/active-mapping.actions';
import * as activeDetailActions from '../store/active-detail/active-detail.actions';


export function onNodeMouseOver(event) {
    return function(dispatch, getState){
        helpers.hoverIndicationOn(event.target.cy(), event.target.id());
    }
}

export function onEdgeHover(event) {
    return function(dispatch, getState) {
        console.info("edgehover")
    }
}

export function onNodeMouseOut(event) {
    return function(dispatch, getState){
        helpers.hoverIndicationOff(event.target.cy(), event.target.id());
    }
}


export function onNodeClick(event) {
    return function (dispatch: Dispatch, getState: State) {

        // alert('if setWaitSelection === true');
        // alert('take the next step');

        const { assets, eventHook } = getState();

        if (eventHook.hook === "onNodeClick"){
            eventHook.callback(event.target.id());
        } else {


            const cy = event.target.cy();

            // name of the clicked asset
            const resourceName = event.target.id();

            // set store active detail
            const clickedAsset = resourceHelpers
                .getObjectByName({
                    name: resourceName,
                    objectList: assets
                });

            dispatch(activeDetailActions.setActiveDetailWithResourceCollecting({
                type: ASSET,
                data: clickedAsset
            }));

            const clickedAssetIsConnectedTo = clickedAsset.connected_to;

            const connectedAssets = assets.filter(asset => _.includes(clickedAssetIsConnectedTo, asset.name));

            // the active mapping state needs to be updated by
            // adding the resources of the expanded node.
            /*
            dispatch(activeMappingActions
                .addActiveMappingAssetsFromNameList(
                    clickedAssetIsConnectedTo
                )
            );*/
            dispatch(activeMappingActions
                .addActiveMappingAssetsFromNameList(
                    clickedAssetIsConnectedTo
                )
            );

            // required parameters for handling the graph update are
            // to have the reference of cy, target and the resource name
            // list to the target is connected to


            const layout = getState().app.graph.selectedLayout;

            /*const nodesToCreate = helpers.createNodeElements({
                ids: clickedAssetIsConnectedTo
            });*/


            const nodesToCreate = helpers.assetsToNodes((connectedAssets: Array<Asset>));

            const edgesToCreate = helpers.createEdgeElementsBetween({
                source: resourceName,
                targets: clickedAssetIsConnectedTo
            });

            helpers.addElements(cy, nodesToCreate);
            helpers.addElements(cy, edgesToCreate);

            if (nodesToCreate.length > 0) {
                // nodes are created, update the layout
                helpers.updateLayout(cy, layout);
            }
        }
    };
};

export function onEdgeClick(event) {
    console.info("")
}

export function onCtxClick(event) {
    return function(dispatch, getState) {
        console.info("right button click");
        console.info(event);
    }

}
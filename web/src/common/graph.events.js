import * as helpers from './graph-helpers';
import {getResourceById} from "./resource-helpers";
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
    console.group("onNodeClick({cy, target, targetNames, layout})");

    console.groupEnd();
    return function (dispatch, getState) {
        const cy = event.target.cy();
        const resourceName = event.target.id();

        // set store active detail
        const clickedResource = getResourceById({
            id: resourceName,
            resources: getState().resources
        });

        dispatch(activeDetailActions.setActiveDetail({
            type: 'ASSET',
            data: clickedResource
        }));
        // the active mapping state needs to be updated by
        // adding the resources of the expanded node.
        dispatch(activeMappingActions
            .addActiveMappingResources(clickedResource.connected_to));

        // required parameters for handling the graph update are
        // to have the reference of cy, target and the resource name
        // list to the target is connected to

        const targetNames = clickedResource.connected_to.map(r => r.name);

        const layout = getState().app.graph.selectedLayout;

        const nodesToCreate = helpers.createNodeElements({
            ids: targetNames
        });

        const edgesToCreate = helpers.createEdgeElementsBetween({
            source: resourceName,
            targets: targetNames
        });

        helpers.addElements(cy, nodesToCreate);
        helpers.addElements(cy, edgesToCreate);

        if (nodesToCreate.length > 0) {
            // nodes are created, update the layout
            helpers.updateLayout(cy, layout);
        }

    };


}

export function onEdgeClick(event) {
    console.info("")
}

export function onCtxClick(event) {
    return function(dispatch, getState) {
        console.info("right button click");
        console.info(event);
    }

}
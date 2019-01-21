import * as types from './graph.action-types';

import {ASSET, CONNECTION} from "../../constants";
import {setEventHook, clearEventHook} from "../event-hook";

import * as activeDetailActions from '../active-detail/active-detail.actions';
import * as activeMappingActions from '../active-mapping/active-mapping.actions';
import * as appActions from '../../actions/app.actions';
import * as assetActions from '../asset/asset.actions';
import * as detailFormActions from '../detail-form/detail-form.actions';
import * as connectionActions from '../connection/connection.actions';

import cytoscape from 'cytoscape';
import style, {graphStyle} from '../../configs/configs.cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import cola from 'cytoscape-cola';

cytoscape.use(cola);
cytoscape.use(cxtmenu);

export function initGraph({eventHandlers}) {

    return function (dispatch, getState) {
        const cy = newGraphInstance(
            eventHandlers,
            dispatch,
            getState
        );

        dispatch(enhancedInit(cy))
    }
}

function enhancedInit(cy) {
    return {type: types.INIT_GRAPH, cy};
}

const newGraphInstance = (eventHandlers, dispatch, getState) => {

    const cy = cytoscape({
        container: document.getElementById('cy'),
        elements: [],
        style: style,
        directed: true,
        boxSelectionEnabled: true,
        layout: {
            name: 'cola',
        }
    });

    function getAssetByName(assetName: string) {
        return getState().assets.filter(asset => asset.name === assetName)[0];
    }

    function getConnectionByName(name) {

        const [sourceName, targetName] = name.split("_to_")

        return getState().connections.filter(
            connection => (
                sourceName === connection.source
                && targetName === connection.target
            )
        )[0];
    }


    /**
     Graph context menu actions

     */

    cy.cxtmenu({
        selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
        commands: [
            {
                content: 'edit',
                contentStyle: {},
                select: function (ele) {
                    const assetToGroup = getAssetByName((ele.id(): string));

                    // set active for editing
                    dispatch(
                        activeDetailActions
                            .setAsActiveDetail({
                                data: assetToGroup,
                                type: ASSET
                            })
                    );

                    dispatch(appActions.editDetail());
                    dispatch(detailFormActions.setFormEditTrue());
                },
                enabled: true
            },
            {
                content: 'move to group',
                contentStyle: {},
                select: function (ele) {
                    const assetToGroup = getAssetByName((ele.id(): string));
                    // set event hook to call
                    // callback on event
                    dispatch(appActions.setInfoMessage("Select node to group under."));
                    dispatch(setEventHook({
                        hook: "onNodeClick",
                        callback: (assetName: string) => {
                            const updatedAsset = {
                                ...assetToGroup,
                                group: assetName
                            };

                            dispatch(assetActions.updateAsset(updatedAsset));
                            dispatch(clearEventHook())
                            dispatch(appActions.setInfoMessage("grouping should be done."));
                        }
                    }))
                },
                enabled: true
            },
            { // example command
                content: 'connect to', // html/text content to be displayed in the menu
                contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                select: function (ele) {
                    const assetToGroup = getAssetByName((ele.id(): string));
                    // set event hook to call
                    // callback on event
                    dispatch(appActions.setInfoMessage("Select node to connect to."));
                    dispatch(setEventHook({
                        hook: "onNodeClick",
                        callback: (assetName: string) => {
                            //alert(`${assetToGroup.name} to ${JSON.stringify(assetName)}`);
                            const newConnection = {
                                source: ele.id(),
                                target: assetName
                            };

                            dispatch(connectionActions.postConnection(newConnection));
                            dispatch(clearEventHook())
                            dispatch(appActions.setInfoMessage("connection should be made."));

                        }
                    }))
                },
                enabled: true // whether the command is selectable
            },
            { // example command
                content: 'remove\nfrom map', // html/text content to be displayed in the menu
                contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                select: function (ele) {
                    const assetToRemove = getAssetByName((ele.id(): string));
                    dispatch(activeMappingActions.removeResourceFromActiveMapping(assetToRemove))

                },
                enabled: true // whether the command is selectable
            },
        ]
    });

    cy.cxtmenu({
        selector: 'edge', // elements matching this Cytoscape.js selector will trigger cxtmenus
        commands: [
            {
                content: 'delete',
                contentStyle: {},
                select: function (ele) {
                    const connectionToRemove = getConnectionByName(ele.id())
                    dispatch(connectionActions.deleteConnection(connectionToRemove));

                },
                enabled: true
            },

            {
                content: 'edit',
                contentStyle: {},
                select: function (ele) {
                    const connectionToEdit = getConnectionByName(ele.id())

                    // set active for editing
                    dispatch(
                        activeDetailActions
                            .setAsActiveDetail({
                                data: connectionToEdit,
                                type: CONNECTION
                            })
                    );

                    dispatch(appActions.editDetail());
                    dispatch(detailFormActions.setFormEditTrue());

                },
                enabled: true
            },
        ]
    });

    Object.keys(eventHandlers).forEach(key => {
        const selector = eventHandlers[key][0];
        const handler = eventHandlers[key][1];
        cy.on(key, selector, handler);
    });

    return cy;
}
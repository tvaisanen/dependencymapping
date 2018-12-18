import * as types from './graph.action-types';

import { setEventHook, clearEventHook } from "../event-hook";

import * as appActions from '../../actions/app.actions';
import * as assetActions from '../asset/asset.actions';
import * as connectionActions from '../connection/connection.actions';
import cytoscape from 'cytoscape';
import style, {graphStyle} from '../../configs/configs.cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import cola from 'cytoscape-cola';

cytoscape.use(cola);
cytoscape.use(cxtmenu);

export function initGraph({eventHandlers}){

    return function(dispatch, getState){
        const cy = newGraphInstance(
            eventHandlers,
            dispatch,
            getState
        );

        dispatch(enhancedInit(cy))
    }
}

function enhancedInit(cy){
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

    function getAssetByName(assetName: string){
        return getState().assets.filter(asset => asset.name === assetName)[0];
    }

    function getConnectionByName(name){

    }

    cy.cxtmenu({
        selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
        commands: [
            {
                content: 'edit',
                contentStyle: {},
                select: function (ele) {
                    const assetToGroup = getAssetByName((ele.id(): string));
                    // set event hook to call
                    // callback on event
                    dispatch(appActions.setInfoMessage("Select node to group under."));
                    dispatch(setEventHook({
                        hook: "onNodeClick",
                        callback: (assetName: string) => {
                            alert(`${assetToGroup.name} to ${JSON.stringify(assetName)}`);
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
            {
                content: 'add to group',
                contentStyle: {},
                select: function (ele) {
                    const assetToGroup = getAssetByName((ele.id(): string));
                    // set event hook to call
                    // callback on event
                    dispatch(appActions.setInfoMessage("Select node to group under."));
                    dispatch(setEventHook({
                        hook: "onNodeClick",
                        callback: (assetName: string) => {
                            alert(`${assetToGroup.name} to ${JSON.stringify(assetName)}`);
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
                content: 'Connect', // html/text content to be displayed in the menu
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
                    const assetToGroup = getAssetByName((ele.id(): string));
                    // set event hook to call
                    // callback on event
                    dispatch(appActions.setInfoMessage("Select node to connect to."));
                    dispatch(setEventHook({
                        hook: "onNodeClick",
                        callback: (assetName: string) => {
                            alert(`${assetToGroup.name} to ${JSON.stringify(assetName)}`);
                            const newConnection = {
                                source: ele.id(),
                                target: assetName
                            };

                            connectionActions.postConnection(newConnection);
                            dispatch(clearEventHook())
                            dispatch(appActions.setInfoMessage("connection should be made."));

                        }
                    }))
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
                    getAssetByName(ele.id())

                },
                enabled: true
            },

            {
                content: 'edit',
                contentStyle: {},
                select: function (ele) {
                    getAssetByName(ele.id())

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
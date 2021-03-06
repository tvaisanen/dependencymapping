import * as types from './graph.action-types';
import * as _ from 'lodash';

import * as graphEvents from './graph.events';
import * as activeDetailActions from '../active-detail/active-detail.actions';
import * as activeMappingActions from '../active-mapping/active-mapping.actions';
import * as detailFormActions from '../detail-form/detail-form.actions';
import * as connectionActions from '../connection/connection.actions';

import {ASSET, CONNECTION} from "../../constants";
import {setEventHook, clearEventHook} from "../event-hook";
import {editDetail, setInfoMessage} from '../../store/ui/ui.actions';
import {updateAssetByName} from '../asset/asset.actions';
import {layoutOptions} from "./graph.styles";

import cytoscape from 'cytoscape';
import style from './graph.styles';
import cxtmenu from 'cytoscape-cxtmenu';
import cola from 'cytoscape-cola';

// todo: refactor to utils
import {getEdgeFromConnection} from "../../common/graph-helpers";
import {removeResourceFromActiveMapping} from "../active-mapping/active-mapping.actions";

export function assetToNode(asset: Asset) {
    return {
        group: 'nodes',
        data: {
            id: asset.name,
            parent: asset.group || null
        },
        classes: `${asset.nodeShape} ${asset.nodeColor}`
    };
}

cytoscape.use(cola);
cytoscape.use(cxtmenu);

//const eHandlers = [
//    {action: 'tap', selector: 'node', callback: (event) => store.dispatch(graphEvents.onNodeClick(event))},
//];

export function initGraph() {

    return function (dispatch, getState) {

        const eventHandlers = [
            {
                action: 'tap',
                selector: 'node',
                callback: (event) => dispatch(graphEvents.onNodeClick(event))
            },
        ];

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
        console.log(sourceName)
        console.log(targetName)

        return getState().connections.filter(
            connection => (
                sourceName === connection.source
                && targetName === connection.target
            )
        )[0];
    }

    function getConnectionByEdge(edgeElement) {

        console.log(getState())

        const filtered = getState().connections.filter(connection => {
                console.log(connection)
                console.log(`${connection.source} === ${edgeElement.data('source')} = ${connection.source === edgeElement.data('source')}`)
                console.log(`${connection.target} === ${edgeElement.data('target')} = ${connection.target === edgeElement.data('target')}`)
                return (
                    connection.source === edgeElement.data('source') &&
                    connection.target === edgeElement.data('target')
                )
            }
        );
        console.log(filtered);
        return filtered[0]
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

                    dispatch(editDetail());
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
                    dispatch(setInfoMessage("Select node to group under."));
                    dispatch(setEventHook({
                        hook: "onNodeClick",
                        notification: `Select asset to group ${ele.id()} or `,
                        optionalAction: {
                            callback: () => {
                                dispatch(updateAssetByName({form: {name: ele.id(), group: "none"}}));
                                dispatch(clearEventHook());
                            },
                            name: "ungroup"
                        },
                        callback: (assetName: string) => {
                            const updatedAsset = {
                                ...assetToGroup,
                                group: assetName
                            };

                            dispatch(updateAssetByName({form: updatedAsset}));
                            dispatch(clearEventHook());
                            dispatch(setInfoMessage("grouping should be done."));
                        }
                    }))
                },
                enabled: true
            },
            { // example command
                content: 'connect to', // html/text content to be displayed in the menu
                contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                select: function (ele) {
                    // set event hook to call
                    // callback on event
                    const message = `Select an asset node to connect ${ele.id()} with.`;
                    dispatch(setEventHook({
                        hook: "onNodeClick",
                        notification: message,
                        callback: (assetName: string) => {
                            //alert(`${assetToGroup.name} to ${JSON.stringify(assetName)}`);
                            const newConnection = {
                                source: ele.id(),
                                target: assetName
                            };


                            dispatch(connectionActions.postConnection({form: newConnection}));
                            dispatch(clearEventHook())
                            dispatch(setInfoMessage("connection should be made."));

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
                    dispatch(connectionActions.deleteConnection({form: connectionToRemove}));
                },
                enabled: true
            },

            {
                content: 'edit',
                contentStyle: {},
                select: function (ele) {

                    const connectionToEdit = getConnectionByEdge(ele);

                    // set active for editing
                    dispatch(
                        activeDetailActions
                            .setAsActiveDetail({
                                data: connectionToEdit,
                                type: CONNECTION
                            })
                    );

                    dispatch(editDetail());
                    dispatch(detailFormActions.setFormEditTrue());

                },
                enabled: true
            },
        ]
    });

    // ! canvas click not working
    eventHandlers.forEach(event => {
        const {action, selector, callback} = event;
        cy.on(action, selector, callback);
    });


    window.cy = cy;


    return cy;
}


export function addAssetsToGraph(assetsToAdd: Array<Asset>) {
    return function (dispatch: Dispatch, getState: State): void {

        const {activeMapping} = getState();

        let needToRedrawLayout = false;

        assetsToAdd.forEach(asset => {

            // if asset is already in active mapping skip it
            if (!_.includes(activeMapping.assets, asset.name)) {

                // update layout only if there's new assets
                needToRedrawLayout = true;
                dispatch(addAssetToGraph(asset))
            }
        });

        if (needToRedrawLayout) {
            dispatch(updateLayout());
        }
    }
}

export function removeAssetFromGraph(asset: Asset) {
    return function (dispatch, getState) {
        const {graph} = getState();

        const el = graph.getElementById(asset.name);

        // before deleting parent node, get the children
        if (el.isParent()) {
            const removeChildren = window.confirm("remove the sub-graph too?");
            if (removeChildren) {
                el.children().forEach(child => {
                    const removeThis = {name: child.id()};
                    dispatch(removeResourceFromActiveMapping(removeThis));
                });
            } else {
                // move children
                el.children().move({parent: null})
            }
        }

        graph.remove(el);
    }
}

export function updateLayout() {
    return function (dispatch: Dispatch, getState: State): void {

        const {graph, app} = getState();
        const {selectedLayout} = app.graph;

        try {
            // if selected layout has additional options
            const options = layoutOptions[selectedLayout] || [];
            const layout = selectedLayout || "preset";

            const layoutToRun = graph.layout({
                name: layout
                , ...options
            });
            layoutToRun.run();

        } catch (e) {
            console.error(e);
        }


    }
}

export function addAssetToGraph(asset: Asset) {
    return function (dispatch: Dispatch, getState: State): void {

        const {graph} = getState();

        // add asset to the graph as node
        graph.add(assetToNode(asset));
        // add the associated connections to the graph
        dispatch(syncAssetConnectionsInGraph(asset));
    }
}

export function syncAssetConnectionsInGraph(asset: Asset) {

    return function (dispatch: Dispatch, getState: State): void {

        const {connections, graph} = getState();

        // get all connections where the asset is
        // either source or target and create an
        // array of graph compatible edge elements
        // and then filter out the edges that do
        // not have the other endpoint drawn in the
        // graph.
        const edgesToDraw = connections
            .filter(c => (c.source === asset.name || c.target === asset.name))
            .map(c => getEdgeFromConnection(c))
            .filter(edge => {
                const sourceEle = graph.getElementById(edge.data.source);
                const targetEle = graph.getElementById(edge.data.target);
                return sourceEle.isNode() && targetEle.isNode();
            });

        graph.add(edgesToDraw);
    }
}
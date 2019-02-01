import _ from 'lodash';
import {edgeStyles, nodeStyles} from "../configs/graph.styles";
import {layoutOptions} from "../store/graph/graph.styles";
import type {Asset, Connection} from "../store/types";


const LAYOUT = 'cola';

const required = () => {
    throw new Error('Missing parameter')
};

export function nodeElementsFromResources(resources = required()) {

}

export function getEdgeId(source = required(), target = required()) {
    // always construct edge id for cy edge with this function
    return `${source}_to_${target}`;
}

export function nodeElementFromResource(asset: Asset = required()) {
    const node = {
        group: 'nodes',
        data: {
            id: asset.name,
            parent: asset.group || null
        },
        classes: `${asset.nodeShape} ${asset.nodeColor}`
    };
    return node;
}

export function getEdgeFromConnection(connection: Connection) {
    const {source, target} = connection;

    let classes = "";

    if (connection.targetArrow) {
        classes = "targetArrow ";
    }

    if (connection.sourceArrow) {
        classes = `${classes} sourceArrow`;
    }

    return {
        group: "edges",
        data: {
            id: getEdgeId(source, target),
            label: connection.edgeLabel,
            source: source,
            target: target
        },
        classes: classes
    }
};

export function edgeElementFromResource(sourceId = required(), targetId = required()) {
    return {'group': 'edges', data: {id: getEdgeId(sourceId, targetId), source: sourceId, target: targetId}};
}


export function addElement(cy = required(), element = required()) {
    try {
        cy.add(element);
    } catch (e) {
        console.error(e);
    }
}

export function removeElement(cy = required(), id = required()) {
    try {
        const element = cy.getElementById(id);
        cy.remove(element);
    } catch (e) {
        console.error(e);
    }
}

export function drawResourceEdges(cy = required(), asset = required()) {
    try {
        const edges = asset.connected_to.map(nameConnectedTo => (
            edgeElementFromResource(asset.name, nameConnectedTo))
        );
        cy.add(edges)
    } catch (e) {
        console.warn(e)
    }
}


export function removeResourceEdges(cy = required(), asset = required()) {
    /**
     *  Update graph after resource/asset update. It is required that
     *  the graph shows current situation of the connections of a node.
     *  So, if node has updated the connected_to list. It needs to be
     *  mapped again.
     */
    try {
        // remove edges that are not listed in connections
        const removeTheEdgesFromThese = cy.getElementById(asset.name).neighborhood('edge');
        const thatHasTheAssetAsSource = removeTheEdgesFromThese.filter(el => {
            return el.source().id() === asset.name;
        });
        cy.remove(thatHasTheAssetAsSource);
    } catch (e) {
        console.error(e);
    }
}

export function addElements(cy = required(), elements = required()) {
    try {
        cy.add(elements);
    } catch (e) {
        console.error(e);
    }
}

export function updateLayout(cy = required(), layout = required()) {
    cy.elements().forEach(el => {
        const w = el.children().length;
        el.data('weight', w)
        // console.debug(`${el.id()} : childCount: ${w}, weight: ${el.data('weight')}`)
    })
    try {
        // if selected layout has additional options
        const options = layoutOptions[layout] || [];
        const selectedLayout = layout || LAYOUT;

        const layoutToRun = cy.layout({
            name: selectedLayout
            , ...options
        });
        layoutToRun.run();
    } catch (e) {
        console.error(e);
    }
}


export function clearGraph(cy = required()) {
    try {
        cy.elements().remove()
    } catch (e) {
        console.warn(e);
    }
}

export function createEdgeElementsBetween({source, targets}) {
    const edges = targets.map(target => (
        {group: 'edges', data: {id: getEdgeId(source, target), source: source, target: target}}
    ));
    return _.flatten(edges);
}

export function createNodeElements({ids}) {
    return ids.map(id => ({group: 'nodes', data: {id: id}}));
}

export function assetsToNodes(assets: Array<Asset>) {
    return assets.map(asset => nodeElementFromResource(asset))
}


export function hoverIndicationOn(cy = required(), id) {
    const el = cy.getElementById(id);
    if (el.isNode) {
        el.toggleClass('flash-shadow');
    }
    ;
}

export function hoverIndicationOff(cy = required(), id) {
    const el = cy.getElementById(id);
    if (el.isNode) {
        el.toggleClass('flash-shadow');
    }

}

export function downloadPng(cy = required()) {
    // todo: cross-browser
    let downloadLink = document.createElement('a')
    downloadLink.href = cy.png({bg: 'white'});
    downloadLink.download = "mapping.png";
    downloadLink.click();
}

export function updateNodeParent(cy, asset: Asset): void {
    const el = cy.getElementById(asset.name);

    el.move({parent: asset.group === "none" ? null : asset.group});
}

export function activeMappingAssetUpdateActions(asset: Asset) {
    return function (dispatch, getState) {
        try {
            const {connections, graph} = getState();

            // filter the edges so that there's no edges created
            // to nonexistent nodes
            const updatedEdgesFromThese = connections
                .filter(c => {
                    // console.info(`${c.source}_to_${c.target}`)
                    // console.info(`${c.source} === ${asset.name}`);
                    return (
                        c.source === asset.name &&
                        graph.getElementById(c.target).isNode()
                    );
                });

            const edges = updatedEdgesFromThese.map(c => getEdgeFromConnection(c));

            updateNodeParent(graph, (asset: Asset));
            updateShapeAndColor(graph, (asset: Asset));
            removeResourceEdges(graph, (asset: Asset));
            graph.add(edges);
            //drawResourceEdges(cy, (asset: Asset));
        } catch (err) {
            console.error(err)
            alert('activeMappingAsset')
        }
    }
}

export function updateConnectionEdge(connection) {
    return function (dispatch, getState) {
        const {graph} = getState();
        const updatedEdge = getEdgeFromConnection(connection);
        const id = getEdgeId(connection.source, connection.target);
        const el = graph.getElementById(id);
        try {
            graph.remove(el);
            graph.add(updatedEdge);
        } catch (err) {
            console.warn(err)
        }
    }
}

export function updateShapeAndColor(cy, asset: Asset) {
    // replace old nodeShape and nodeColor
    cy.getElementById(asset.name).classes(`${asset.nodeShape} ${asset.nodeColor}`)
}

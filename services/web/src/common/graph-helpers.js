import _ from 'lodash';
import {edgeStyles, nodeStyles} from "../configs/graph.styles";
import {layoutOptions} from "../configs/configs.cytoscape";
import type {Asset} from "../store/asset/asset.types";


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
    const node =  {
        group: 'nodes',
        data: {
            id: asset.name,
            parent: asset.group || null
        },
        classes: `${asset.nodeShape} ${asset.nodeColor}`
    };
    console.info(node);
    return node;
}

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


export function hoverIndicationOn(cy = required(), id) {
    const el = cy.getElementById(id);
    if (!el.hasClass("group")) {

        el.animate({
            style: nodeStyles.expanded
        }, {
            duration: 300
        });
        el.neighborhood().clearQueue()
            .forEach(e => {
                    if (e.id() === id) {
                        return null;
                    } else if (e.isNode()) {
                        e.delay(50).animate({
                                style: nodeStyles.expandedNeighbor,
                            },
                            {
                                duration: 300
                            }
                        )
                    } else if (e.isEdge() && !e.hasClass('is-in-group')) {
                        e.delay(40).animate({
                            style: edgeStyles.expanded
                        });
                    }
                }
            )
        ;

    }
    ;
}

export function hoverIndicationOff(cy = required(), id) {
    const el = cy.getElementById(id);

    if (!el.hasClass("group")) {
        el.animate({
            style: nodeStyles.passive
        }, {
            duration: 250
        });
        el.neighborhood().clearQueue()
            .forEach(e => {
                if (e.id() === id) {
                    return null;
                } else if (e.isNode()) {
                    e.delay(130).animate(
                        {style: nodeStyles.passive},
                        {duration: 300}
                    )
                } else if (e.isEdge() && !e.hasClass('is-in-group')) {
                    e.delay(40).animate(
                        {style: edgeStyles.passive},
                        {duration: 250});


                }

            });
    }
    ;
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

export function activeMappingAssetUpdateActions(cy, asset: Asset) {
    updateNodeParent(cy, (asset: Asset));
    updateShapeAndColor(cy, (asset: Asset));
    removeResourceEdges(cy, (asset: Asset));
    drawResourceEdges(cy, (asset: Asset));
}

export function updateShapeAndColor(cy, asset: Asset){
    // replace old nodeShape and nodeColor
    cy.getElementById(asset.name).classes(`${asset.nodeShape} ${asset.nodeColor}`)
}

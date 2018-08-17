import _ from 'lodash';
import {edgeStyles, nodeStyles} from "../configs/graph.styles";
import {layoutOptions} from "../configs/configs.cytoscape";

const required = () => {
    throw new Error('Missing parameter')
};

export function nodeElementsFromResources(resources = required()) {

}

function getEdgeId(source = required(), target = required()) {
    return `${source}_to_${target}`;
}

export function nodeElementFromResource(resource = required()) {
    return {'group': 'nodes', data: {id: resource.name}};
}

export function edgeElementFromResource(sourceId = required(), targetId = required()) {
    return {'group': 'edges', data: {id: getEdgeId(sourceId, targetId), source: sourceId, target: targetId}};
}


export function addElement(cy = required(), element = required()) {
    try {
        cy.add(element);
        console.info("Added element to the graph:");
        console.info(element);
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

export function updateResourceEdges(cy = required(), resource = required()){
    /**
     *  Update graph after resource/asset update. It is required that
     *  the graph shows current situation of the connections of a node.
     *  So, if node has updated the connected_to list. It needs to be
     *  mapped again.
     */
    try {
        const edgesThaShouldExist = resource.connected_to.forEach((r) => {
            return edgeElementFromResource(resource.name, r.name);
        });

        // remove edges that are not listed in connections
        const removeTheseEdges = cy.getElementById(resource.name).neighborhood('edge')
        cy.remove(removeTheseEdges);

        // add edges that should be listed
        edgesThaShouldExist.forEach(edge => cy.add(edge));
        console.group("Edge drawing debug");
        console.info('remove');
        console.info(removeTheseEdges);
        console.info('add');
        console.info(edgesThaShouldExist);
        console.groupEnd();
    } catch (e){
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

export function updateLayout(cy = required()) {
    try {
        const options = layoutOptions.cola;
        const layout = cy.layout({name: 'cola', ...options});
        layout.run();
    } catch (e) {
        console.error(e);
    }
}

export function toggleElementVisibility(cy = required(), elementId = required()) {
    try {

    } catch (e) {

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
        {group: 'edges', data: {id: `${source}-${target}`, source: source, target: target}}
    ));
    return _.flatten(edges);
}

export function createNodeElements({ids}) {
    return ids.map(id => ({group: 'nodes', data: {id: id}}));
}


export function hoverIndicationOn(cy = required(), id) {
    const el = cy.getElementById(id);
    console.info(el);
    el.animate({
        style: nodeStyles.expanded
    }, {
        duration: 300
    });
    el.neighborhood().clearQueue()
        .forEach(e => {
                if (e.id() === id) {
                    return null;
                }
                else if (e.isNode()) {
                    e.delay(50).animate({
                            style: nodeStyles.expandedNeighbor,
                        },
                        {
                            duration: 300
                        }
                    )
                } else if (e.isEdge()) {
                    e.delay(40).animate({
                        style: edgeStyles.expanded
                    });
                }
            }
        )
    ;
}

export function hoverIndicationOff(cy = required(), id) {
    const el = cy.getElementById(id);
    console.info(el);
    el.animate({
        style: nodeStyles.passive
    }, {
        duration: 250
    });
    console.info(el.neighborhood().nodes());
    el.neighborhood().clearQueue()
        .forEach(e => {
            if (e.id() === id) {
                return null;
            }
            else if (e.isNode()) {
                e.delay(130).animate(
                    {style: nodeStyles.passive},
                    {duration: 300}
                )
            } else if (e.isEdge()) {
                e.delay(40).animate(
                    {style: edgeStyles.passive},
                    {duration: 250});


            }

        });
}

export function downloadPng(cy = required()) {
    alert('download')
    // todo: cross-browser
    let downloadLink = document.createElement('a')
    downloadLink.href = cy.png({bg: 'white'});
    downloadLink.download = "mapping.png";
    downloadLink.click();
}

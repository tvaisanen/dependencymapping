import {nodeStyles} from './graph.styles';

export const graphStyle = [ // the stylesheet for the graph
    {
        selector: 'node',
        style: nodeStyles.passive
    },

    {
        selector: 'edge',
        style: {
            'curve-style': 'auto',
            'width': 3,
            'line-color': '#eee',
            'target-arrow-color': '#85cc57',
            'target-arrow-shape': 'triangle'
        }
    },

    {
        selector: 'node.highlight',
        style: {
            'background-color': 'rgb(96, 80, 96)',
            'label': 'data(id)'
        }
    },
    {
        selector: 'edge.highlight',
        style: {
            'width': 10,
            'line-color': '#ccb8b8',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
        }
    },
    {
        selector: 'node.flash-shadow',
        style: {
            'background-color': 'rgb(244,0,0)',
        }
    }
];

export const layoutOptions = {
    cola: {
        nodeDimensionsIncludeLabels: true,
    }
}
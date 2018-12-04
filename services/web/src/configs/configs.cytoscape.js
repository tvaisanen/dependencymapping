import {nodeStyles} from './graph.styles';

export const graphStyle = [
    {
        selector: 'node',
        style: nodeStyles.passive
    },
    {
        selector: 'edge',
        style: {
            'width': 3,
            'curve-style': 'bezier',
            'line-color': '#eee',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': null,
        }
    },
    {
        selector: 'edge.is-in-group',
        style: {
            'width': 5,
            'line-style': 'dashed',
            'curve-style': 'bezier',
            'line-color': '#0f0f0f',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
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
    },
    {
        selector: 'node.group',
        style: {
            'background-opacity': '0.2',
        }
    },
    {
        selector: '$node > node',
        style: {
            'padding-top': '10px',
            'padding-left': '10px',
            'padding-bottom': '10px',
            'padding-right': '10px',
            'text-valign': 'top',
            'text-halign': 'center',
            'background-color': "transparent"
        }
    },
];

export const layoutOptions = {
    cola: {
        nodeDimensionsIncludeLabels: true,
    }
};

export const nodeColorClasses = () => colorOptions.map(color => ({
        selector: `node.${color}`,
        style: {
            'background-color': color,
        }
    })
);

export const nodeShapeClasses =  () => nodeShapes.map(shape => ({
        selector: `node.${shape}`,
        style: {
            'shape': shape,
        }
    })
);

export const nodeShapes = [
    "ellipse",
    "triangle",
    "rectangle",
    "roundrectangle",
    "bottomroundrectangle",
    "cutrectangle",
    "barrel",
    "rhomboid",
    "diamond",
    "pentagon",
    "hexagon",
    "concavehexagon",
    "heptagon",
    "octagon",
    "star",
    "tag",
    "vee"];

export const colorOptions = [
    "black", "navy", "darkblue", "darkgreen", "green"
];

export default [...graphStyle, ...nodeColorClasses(), ...nodeShapeClasses()]

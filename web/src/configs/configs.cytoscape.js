
export const graphStyle = [ // the stylesheet for the graph
    {
        selector: 'node',
        style: {
            'content': 'data(id)',
            'text-valign': 'center',
            'color': 'white',
            'text-outline-width': 1,
            'line-color': '#4d4c4c',
            'background-color': 'rgb(54, 48, 54)',
        }
    },

    {
        selector: 'edge',
        style: {
            'curve-style': 'unbundled-bezier(multiple)',
            'width': 3,
            'line-color': '#eee',
            'target-arrow-color': '#ccc',
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
            'width': 4,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
        }
    },
    {
        selector: 'node.flash-shadow',
        style: {
            'box-shadow': '30px 30px 30px green',
            'background-color': 'rgb(244,0,0)',
            'transition': 'all .1s ease-in-out'
        }
    }
];
const sizes = {
    expanded: 42,
    neighbor: 41,
    passive: 40,
};

const color = {
    passive: 'rgba(200,190,200)',
    expanded: 'rgba(174,200,174)',
    expandedNeighbor: 'rgb(168, 174, 168)',
};

const edgeStylePassive = {
            'width': 4,
            'line-color': '#eee',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'none'
        };

const edgeStyleExpanded = {
    'width': 10,
    'line-color': '#ccb8b8',
    'target-arrow-color': '#ccc',
    'target-arrow-shape': 'triangle'
};


const nodesStylePassive = {
    'content': 'data(id)',
    shape: 'roundrectangle',
    'color': '#818181',
    fontSize: '1em',
    'text-border-width': 1,
    'text-border-color': '#b3b3b3',
    'text-border-opacity': 0,
    'text-wrap': 'wrap',
    'text-max-width': '13em',
    padding: "20%",
    width: sizes.passive,
    height: sizes.passive,
    backgroundColor: color.passive,

    'ghost': 'yes',
};

const nodeStyleExpanded = {
    height: sizes.expanded,
    width: sizes.expanded,
    backgroundColor: color.expanded,

};

const nodeStyleNeighbor = {
    width: sizes.neighbor,
    height: sizes.neighbor,
  backgroundColor: color.expandedNeighbor
};

export const nodeStyles = {
    passive: nodesStylePassive,
    expanded: nodeStyleExpanded,
    expandedNeighbor: nodeStyleNeighbor
};

export const edgeStyles = {
    passive: edgeStylePassive,
    expanded: edgeStyleExpanded
};
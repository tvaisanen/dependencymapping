const sizes = {
    expanded: 70,
    neighbor: 40,
    passive: 40,
};

const color = {
    passive: 'rgba(54,48,54)',
    expanded: 'rgba(174,168,174)',
    expandedNeighbor: 'rgb(168, 174, 168)',
};

const nodesStylePassive = {
    'content': 'data(id)',
    'text-valign': 'center',
    'color': 'white',
    'text-outline-width': 1,
    'line-color': '#4d4c4c',
    width: sizes.passive,
    height: sizes.passive,
    backgroundColor: color.passive,

};

const nodeStyleExpanded = {
    fontSize: 100,
    height: sizes.expanded,
    width: sizes.expanded,
    backgroundColor: color.dark
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


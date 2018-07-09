const graphStyle = [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'content': 'data(id)',
        'text-valign': 'center',
        'color': 'white',
        'text-outline-width': 1,
        'line-color': '#4d4c4c',
        'background-color': 'rgb(54, 48, 54)',
        'font-family': "'Roboto', sans-serif",
        
      }
    },
  
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    },
  
    {
        selector: 'node.highlight',
        style: {
            'background-color': 'red',
            'label': 'data(id)'
          }
    }
  ];
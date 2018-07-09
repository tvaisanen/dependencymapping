import _ from 'lodash';

export function parseEdgeElementsFromResource(resource){ 
    const source = resource.name;
    const edges = resource.connected_to.map(r=>(
        {group: 'edges', data: {id: `${source}-${r.name}`, source: source, target: r.name}}
    ))
    return _.flatten(edges);
}

export function parseEdgeElementsFromResources(resources){
    const edges = resources.map(r=> parseEdgeElementsFromResource(r));
    return _.flattenDeep(edges);
}

export function getConnectionsFromResources(resources){
    const connections = resources.map(resource=>{
        let source = resource;
        
        const c =  resource.connected_to.map(target=>(
            {source: source, target: target}
        ));
       
        return c;
    })

    return _.flatten(connections);
}


export function parseNodeElementsFromResources(resourceArray){
    /**
     * 
     */
    return resourceArray.map(r=>({group:'nodes', data: {id: r.name } }));
}

export function filterResourcesByIds({ids, resources}){
   let filtered = [];
   filtered = resources.filter(r => {
       if (_.indexOf(ids, r.name) !== -1){
           return r;
       }
   })
   return filtered; 
}

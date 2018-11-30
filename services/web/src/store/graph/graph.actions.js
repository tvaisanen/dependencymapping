import * as types from './graph.action-types';

export function initGraph({eventHandlers}){
    return {type: types.INIT_GRAPH, eventHandlers};
}


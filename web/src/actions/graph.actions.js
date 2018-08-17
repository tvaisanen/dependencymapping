import * as graphHelpers from '../common/graph-helpers';
import * as types from './actionTypes';

export function initGraph({eventHandlers}){
    return {type: types.INIT_GRAPH, eventHandlers};
}

export function addElementsToGraph(elements){
    return {
        type: types.ADD_ELEMENTS_TO_GRAPH,
        elements: elements
    }
}

export function addNodeToGraph(resource){
    return function (dispatch) {
        dispatch(addElementsToGraph(
            graphHelpers.nodeElementFromResource(resource)
        ))
    }
}

export function addEdge(resource){
    return function (dispatch) {
        dispatch(addElementsToGraph(
            graphHelpers.edgeElementFromResource(resource)
        ))
    }
}

export function removeElementFromGraph(id){
    alert(`graphActions.removeElementFromGraph(${JSON.stringify(id)})`);
}
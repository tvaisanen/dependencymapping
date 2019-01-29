import * as types from './graph.action-types';
import initialState from '../initialState';

export default function graphReducer(cy = initialState.graph, action){

    switch(action.type){
        case types.INIT_GRAPH:
            return action.cy;

        default:
            return cy;
    }
}

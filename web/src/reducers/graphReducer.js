import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function graphReducer(state = initialState.graphs, action){
    switch(action.type) {
        case types.LOAD_MAPPINGS_SUCCESS:
            console.debug('LOAD_GRAPHS_SUCCESS');
            console.debug(action);
            return action.mappings;

        case types.ADD_MAPPING:
            return [...state, action.mapping];

        case types.SAVE_MAPPING:
            const updatedMapping = action.mapping;
            return state.map( (mapping, index) => {
                if (mapping.name !== updatedMapping.name){
                    return mapping;
                } 
                return {
                    ...updatedMapping
                }
            })
        default:
            return state;
    }
}
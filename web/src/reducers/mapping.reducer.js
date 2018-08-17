import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function mappingReducer(state = initialState.mappings, action){
    switch(action.type) {
        case types.LOAD_MAPPINGS_SUCCESS:
            return action.mappings;

        case types.ADD_MAPPING:
            return [...state, action.mapping];

        case types.SAVE_MAPPING:
            const updatedMapping = action.mapping;
            return state.map(mapping => {
                if (mapping.name !== updatedMapping.name){
                    return mapping;
                } 
                return {
                    ...updatedMapping
                }
            });

        case types.UPDATE_MAPPING_SUCCESS:
            console.info("reducer actionUpdate mapping success");
            console.info(action);
            const removeUpdated = state.filter(m => m.name !== action.mapping.name);

            return [...removeUpdated, action.mapping];

        case types.DELETE_MAPPING_SUCCESS:
            console.info(action);
            const filtered = state.filter(m => m.name !== action.removed);
            return filtered;
        default:
            return state;
    }
}
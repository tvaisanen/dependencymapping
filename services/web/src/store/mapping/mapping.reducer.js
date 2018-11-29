//@flow

import {
   LOAD_MAPPINGS_SUCCESS,
    POST_MAPPING_SUCCESS,
    SAVE_MAPPING,
    UPDATE_MAPPING_SUCCESS,
    DELETE_MAPPING_SUCCESS
} from './mapping.action-types';
import initialState from '../initialState';

import type { MappingAction, MappingState } from "./mapping.types";

export default function mappingReducer(
    state: MappingState = initialState.mappings,
    action: MappingAction
): MappingState {

    switch(action.type) {

        case LOAD_MAPPINGS_SUCCESS:
            // return empty array if the server response
            // didn't return any items
            return action.mappings ? action.mappings : [];

        case POST_MAPPING_SUCCESS:
            console.info(action);
            return [...state, action.mapping];

        case SAVE_MAPPING:
            const updatedMapping = action.mapping;
            return state.map(mapping => {
                if (mapping.name !== updatedMapping.name){
                    return mapping;
                } 
                return {
                    ...updatedMapping
                }
            });

        case UPDATE_MAPPING_SUCCESS:
            const removeUpdated = state.filter(m => m.name !== action.mapping.name);
            console.info(action.mapping);
            return [...removeUpdated, action.mapping];

        case DELETE_MAPPING_SUCCESS:
            return state.filter(m => {
                console.info(`${m.name} !== ${action.name}`)
                return m.name !== action.name
            });

        default:
            return state;
    }
}
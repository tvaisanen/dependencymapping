//@flow

import {
    LOAD_MAPPINGS_SUCCESS,
    POST_MAPPING_SUCCESS,
    SAVE_MAPPING,
    UPDATE_MAPPING_SUCCESS,
    DELETE_MAPPING_SUCCESS
} from './mapping.action-types';
import initialState from '../initialState';

import type {Mapping, MappingAction, MappingState} from "./mapping.types";
import {emptyArray} from "../types";

export default function mappingReducer(
    state: MappingState = initialState.mappings,
    action: MappingAction
): MappingState {

    const mapping: Mapping = action.mapping;
    const name: string = action.name;

    switch (action.type) {

        case LOAD_MAPPINGS_SUCCESS:
            // return empty array if the server response
            // didn't return any items
            return action.mappings ? action.mappings : emptyArray;

        case POST_MAPPING_SUCCESS:
            return action.mapping ?
                // add the mapping only if type Mapping
                ([...state, (action.mapping: Mapping)]: MappingState)
                // else return state
                : state;

        case SAVE_MAPPING:
            if (!mapping){
                // action.mapping is a must
                return state;
            }

            return state.map(m => {
                if (m.name !== mapping.name) {
                    return m;
                }
                return {
                    ...mapping
                }
            });

        case UPDATE_MAPPING_SUCCESS:
            if (!mapping){
                // action.mapping is a must
                return state;
            } else {
                const removeUpdated: Array<Mapping> = state
                    .filter(m => m.name !== mapping.name);

                return [...removeUpdated, mapping];
            }


        case DELETE_MAPPING_SUCCESS:
            if (!name){
                // action.name is a must
                return state;
            }
            return state.filter(m => {
                console.info(`${m.name} !== ${name}`)
                return m.name !== name
            });

        default:
            return state;
    }
}
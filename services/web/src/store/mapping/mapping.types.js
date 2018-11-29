//@flow

import {
    ADD_MAPPING,
    LOAD_MAPPINGS_SUCCESS,
    POST_MAPPING_SUCCESS,
    DELETE_MAPPING_SUCCESS,
    UPDATE_MAPPING_SUCCESS
} from "./mapping.action-types";

import type { EmptyArray } from '../types';

export type Mapping = {
    name: string,
    description: string,
    assets: { type: Array<string>, default: [] },
    tags: { type: Array<string>, default: [] }
}

export type MappingAction = {
    type:
        ADD_MAPPING |
        LOAD_MAPPINGS_SUCCESS |
        POST_MAPPING_SUCCESS |
        DELETE_MAPPING_SUCCESS |
        UPDATE_MAPPING_SUCCESS
        ,
    mapping: Mapping,
    mappings: ?Array<Mapping>,
    name: string
}

export type MappingState = Array<Mapping>;


//@flow

import {
    SET_ACTIVE_MAPPING,
    ADD_ACTIVE_MAPPING_ASSET,
    ADD_ACTIVE_MAPPING_ASSETS,
    CLEAR_ACTIVE_MAPPING_SELECTION,
    REMOVE_ACTIVE_MAPPING_ASSET,
} from "./active-mapping.action-types";

import type { Asset } from '../asset/asset.types';
import type { Mapping } from '../mapping/mapping.types';

export type ActiveMappingState = {
    +assets: { type: Array<string>, default: []},
}

export type ActiveMappingAction = {
    type:
        SET_ACTIVE_MAPPING |
        ADD_ACTIVE_MAPPING_ASSETS |
        ADD_ACTIVE_MAPPING_ASSET |
        CLEAR_ACTIVE_MAPPING_SELECTION |
        REMOVE_ACTIVE_MAPPING_ASSET,
    asset: ?Asset,
    assets: ?Array<Asset>,
    mapping: ?Mapping

}

// move me to asset.types.js



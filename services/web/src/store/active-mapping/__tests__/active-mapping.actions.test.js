//@flow
import type {ActiveMappingState} from "../active-mapping.types";

import {
    setActiveMapping,
    clearActiveMappingSelection,
    addActiveMappingAssets,
    removeAssetFromActiveMapping
} from '../active-mapping.actions';

import {
    ADD_ACTIVE_MAPPING_ASSETS,
    CLEAR_ACTIVE_MAPPING_SELECTION, REMOVE_ACTIVE_MAPPING_ASSET,
    SET_ACTIVE_MAPPING
} from "../active-mapping.action-types";


describe('Active mapping action creator tests: active-mapping.actions.test.js', () => {

    it("setActiveMapping should return: {type: SET_ACTIVE_MAPPING, (mapping: Mapping)}", () => {

        const mapping = {
            name: "Tag one",
            description: "describing one",
            assets: [{name: "Tag three", description: "describing three"}],
            tags: [{name: "tag one", description: "describing"}],
        };

        const action = setActiveMapping(mapping);

        expect(action.type).toEqual(SET_ACTIVE_MAPPING);
        expect(action.mapping).toEqual(mapping)
    });

    it("clearActiveMappingSelection action creator returns correctly", () => {
        const action = clearActiveMappingSelection();
        expect(action.type).toEqual(CLEAR_ACTIVE_MAPPING_SELECTION);
    });

    it('addActiveMappingAssets should return: {type: ADD_ACTIVE_MAPPING_ASSETS, (assets: Array<Asset>)', () => {
        const assets = [
            {name: "Tag three", description: "describing three"},
            {name: "Tag three", description: "describing three"}
            ];
        const action = addActiveMappingAssets(assets);
        expect(action.type).toEqual(ADD_ACTIVE_MAPPING_ASSETS);
        expect(action.assets).toEqual(assets);
    });


    it('removeAssetFromActiveMapping should return: {type: REMOVE_ACTIVE_MAPPING_ASSET, (assets: Asset))', () => {
        const asset = {name: "Tag three", description: "describing three"};
        const action = removeAssetFromActiveMapping(asset);
        expect(action.type).toEqual(REMOVE_ACTIVE_MAPPING_ASSET);
        expect(action.asset).toEqual(asset);
    });

});
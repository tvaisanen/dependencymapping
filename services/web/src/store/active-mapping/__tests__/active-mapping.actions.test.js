//@flow
import type {ActiveMappingState} from "../active-mapping.types";

import {
    setActiveMapping,
    clearActiveMappingSelection,
    setActiveMappingConnections,
    addActiveMappingAssets,
} from '../active-mapping.actions';

import {
    CLEAR_ACTIVE_MAPPING_SELECTION
} from "../active-mapping.action-types";


it("clearActiveMappingSelection action creator returns correctly", () => {

    const mappingState: ActiveMappingState = {
        name: "Tag one",
        description: "describing one",
        assets: [
            {name: "Tag three", description: "describing three"}
        ],
        tags: [{name: "tag one", description: "describing"}],
        grouped: ["RemoveMe"]
    };
    const action = setActiveMapping(mappingState);
    const expected = {
        type: CLEAR_ACTIVE_MAPPING_SELECTION

    }
    expect(action).toEqual(expected);
});

it("clearActiveMappingSelection action creator returns correctly", () => {
    const action = clearActiveMappingSelection();
    const expected = {type: CLEAR_ACTIVE_MAPPING_SELECTION}
    expect(action).toEqual(expected);
});

it("clearActiveMappingSelection action creator returns correctly", () => {
    const action = clearActiveMappingSelection();
    const expected = {type: CLEAR_ACTIVE_MAPPING_SELECTION}
    expect(action).toEqual(expected);
});
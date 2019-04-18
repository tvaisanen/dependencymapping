import assetReducer from '../asset.reducer';
import * as actions from "../asset.actions";

const initialState = [
    {name: "one", description: "description one", connected_to: [], tags: [], group: "none"},
    {name: "two", description: "description two", connected_to: ["two", "three"], tags: ["tagOne", "tagTwo"], group: "none"},
    {name: "three", description: "description three", connected_to: [], tags: [], group: "none"},
    {name: "four", description: "description four", connected_to: ["four"], tags: ["tagOne"], group: "none"},
];




test('Asset reducer should load asset list to state', () => {

    const assets = initialState;
    const initForTest = [];

    const state = assetReducer(
        initForTest,
        actions.loadAssetsSuccess(assets)
    );

    expect(state).toEqual(initialState)
});


test('Asset reducer should add the new asset to the state on postAssetSuccess', () => {

    const newAsset = {
        name: "five",
        description: "description five",
        connected_to: ["one"],
        tags: ["tagOne"],
        group: "two"
    };

    const state = assetReducer(
        initialState,
        actions.postAssetSuccess(newAsset)
    );

    expect(state).toEqual([newAsset, ...initialState])
});



test('Asset reducer should update asset', () => {

    const updatedAsset = {
        name: "two",
        description: "description two updated",
        connected_to: ["one", "two"],
        tags: ["tagOne", "tagTwo"],
        group: "four"
    };

    const state = assetReducer(
        initialState,
        actions.updateAssetSuccess(updatedAsset)
    );

    const updatedAssetFromState = state.filter(asset => asset.name === updatedAsset.name)[0];

    expect(updatedAssetFromState).toEqual(updatedAsset);
});

test('Asset reducer should remove asset from the state on DELETE_ASSET_SUCCESS', () => {

    // initial state has asset named "one"

    const state = assetReducer(
        initialState,
        actions.deleteAssetSuccess("one")
    );

    const expectedState = state.filter(asset => asset.name !== "one");

    expect(state).toEqual(expectedState);
});

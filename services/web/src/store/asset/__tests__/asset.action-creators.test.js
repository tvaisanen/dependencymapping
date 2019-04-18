import * as actions from '../asset.actions';
import {
    POST_ASSET_SUCCESS,
    DELETE_ASSET_SUCCESS,
    UPDATE_ASSET_SUCCESS,
    LOAD_ASSETS_SUCCESS
} from "../asset.action-types";

import {
    postAssetSuccess,
    deleteAssetSuccess,
    updateAssetSuccess,
    loadAssetsSuccess
} from "../asset.actions";


describe('Test asset action creators from the file: asset.actions.js', () => {

    test('postAssetSuccess should return: {type: POST_ASSET_SUCCESS, (asset: Asset)}', () => {

        const asset = {
            name: "Foobar",
            descriptbion: "describe foo",
            connected_to: ["asd", "fo"]
        };

        const action = postAssetSuccess(asset);

        expect(action.type).toEqual(POST_ASSET_SUCCESS);
        expect(action.asset).toEqual(asset);

    });

    test('updateAssetSuccess should return: {type: UPDATE_ASSET_SUCCESS, (asset: Asset)}', () => {

        const asset = {
            name: "Foobar",
            descriptbion: "describe foo",
            connected_to: ["asd", "fo"]
        };

        const action = updateAssetSuccess(asset);

        expect(action.type).toEqual(UPDATE_ASSET_SUCCESS);
        expect(action.asset).toEqual(asset);

    });

    test('deleteAssetSuccess should return: {type: UPDATE_ASSET_SUCCESS, (asset: Asset)}', () => {

        const asset = {
            name: "Foobar",
            descriptbion: "describe foo",
            connected_to: ["asd", "fo"]
        };

        const action = deleteAssetSuccess(asset.name);

        expect(action.type).toEqual(DELETE_ASSET_SUCCESS);
        expect(action.name).toEqual(asset.name);
    });

    test('loadAssetSuccess should return: {type: UPDATE_ASSET_SUCCESS, (asset: Asset)}', () => {

        const assets = [
            {name: "Barfoo", descriptbion: "describe bar", connected_to: ["asd", "fo"]},
            {name: "Foobar", descriptbion: "describe foo", connected_to: ["asd", "fo"]}
        ];

        const action = loadAssetsSuccess(assets);

        expect(action.type).toEqual(LOAD_ASSETS_SUCCESS);
        expect(action.assets).toEqual(assets);
    });
});

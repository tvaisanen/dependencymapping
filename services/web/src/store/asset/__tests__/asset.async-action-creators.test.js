import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import api from '../../../api/gwClientApi';

import {
    postAsset
} from "../asset.actions";

import {
    POST_ASSET_SUCCESS
} from "../asset.action-types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('async actions', () => {

    afterEach(() => {
    })

    it('creates LOAD_ASSETS_SUCCESS when loading assets is done', () => {
        api.getAssets()
    })

});
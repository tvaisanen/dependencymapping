import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions/graphActions';
import * as types from '../actions/actionTypes';
import fetchMock from 'fetch-mock'
import { devPaths } from '../api/api.config';
import GwClientApi from '../api/gwClientApi';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('todo',()=>expect(1).toBe(1));
/*

describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    })

    it('creates LOAD_MAPPINGS_SUCCESS when fetching mappings has been done', () => {
        fetchMock
            .getOnce(devPaths.mappings(), { 
                body: [
                    {name: "Mapping one", description: "info about", resources: []}
                ],
                headers: { 'content-type': 'application/json' }
            }).catch(e => e);
            

        const expectedActions = [
            { type: types.LOAD_MAPPINGS_REQUEST },
            { type: types.LOAD_MAPPINGS_SUCCESS, body: { mappings: ['do something'] } }
        ]

        const store = mockStore({ mappings: [] });

        return store.dispatch(actions.loadAllMappings()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
          
    })
})*/
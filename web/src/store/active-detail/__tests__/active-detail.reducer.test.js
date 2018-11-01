import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import activeDetailReducer from '../active-detail.reducer';
import * as actions from '../active-detail.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
    name: "Tag one",
    description: "describing one",
    resources: [
        {name: "Tag three", description: "describing three"}
    ],
    tags: [{name:"tag one", description:"describing"}]
};

test('Active detail reducer returns initialState as default', () => {
    const state = activeDetailReducer(initialState, {});
    expect(state).toEqual(initialState);
});

test('Set active detail should update the selected detail', () => {
    const newDetail = {name: "new detail"};
   const state = activeDetailReducer(
       initialState,
       actions.setActiveDetail(newDetail)
   );
   expect(state).toEqual(newDetail);
});

test('Set active detail should raise exception if called without a type', () => {
    const state = activeDetailReducer(null,
        actions.setActiveDetail({
            type: null,
        })
    )
});


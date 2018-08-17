import activeDetailReducer from '../active-detail.reducer';
import * as actions from '../../actions/active-detail.actions';

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

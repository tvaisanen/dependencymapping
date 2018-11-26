import activeMappingReducer from '../active-mapping.reducer';
import * as _ from 'lodash';
import * as actions from '../active-mapping.actions';

const initialState = {
    name: "Tag one",
    description: "describing one",
    resources: [
        {name: "Tag three", description: "describing three"}
    ],
    tags: [{name:"tag one", description:"describing"}],
    grouped: ["RemoveMe"]
};

it('Active mapping groupByTag adds tagName to grouped', () => {
    const action = actions.groupByTag("FindMeInGrouped")
    const result = activeMappingReducer(
        initialState,
        action
    );

    console.log(result)

    expect(_.includes(result.grouped, action.tagName))
        .toEqual(true);
});


it('Active mapping ungroupByTag removes tagName from grouped', () => {
    const action = actions.ungroupByTag("RemoveMe")
    const result = activeMappingReducer(
        initialState,
        action
    );

    expect(_.includes(result.grouped, action.tagName))
        .toEqual(false);
});

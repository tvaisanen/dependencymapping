import activeMappingReducer from '../active-mapping.reducer';
import * as actions from '../active-mapping.actions';

const initialState = {
    name: "Tag one",
    description: "describing one",
    resources: [
        {name: "Tag three", description: "describing three"}
    ],
    tags: [{name:"tag one", description:"describing"}]
};

it('Active detail reducer returns initialState as default', () => {
});


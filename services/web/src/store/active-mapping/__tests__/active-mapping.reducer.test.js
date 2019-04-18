import activeMappingReducer from '../active-mapping.reducer';
import * as _ from 'lodash';
import * as actions from '../active-mapping.actions';

const initialState = {
    name: "Tag one",
    description: "describing one",
    assets: [
        {name: "Tag three", description: "describing three"}
    ],
    tags: [{name: "tag one", description: "describing"}],
    grouped: ["RemoveMe"]
};


describe('Active mapping reducer tests: active-mapping.reducer.test.js', () => {

    it('Returns default if type is not defined', () => {
        const result = activeMappingReducer(
            initialState,
            {type: "not defined"}
        );
        expect(initialState).toEqual(result);
    });


    it('SET_ACTIVE_MAPPING sets the state correctly', () => {

        const newState = {
            name: "Tag one",
            description: "describing one",
            assets: [
                {name: "Tag three", description: "describing three"}
            ],
            tags: [{name: "tag one", description: "describing"}],
            grouped: ["RemoveMe"]
        };

        const action = actions.setActiveMapping(newState);

        const result = activeMappingReducer(
            initialState,
            action
        );

        expect(result).toEqual(newState);
    });
});

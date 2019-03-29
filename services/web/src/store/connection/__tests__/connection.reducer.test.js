import connectionReducer from '../connection.reducer';
import * as actions from '../connection.actions'

const connection = {
    description: "",
    edgeLabel: "aspiafsddas",
    source: "TestPageThree",
    sourceArrow: true,
    tags: [],
    target: "TestPageOne",
    targetArrow: true,
    _id: "5c9dc668c376600063bf8db1",
    type: "UPDATE_CONNECTION"
};

const initialState = [
    {
        description: "",
        edgeLabel: "aspiafsddas",
        source: "TestPageThree",
        sourceArrow: false,
        tags: [],
        target: "TestPageOne",
        targetArrow: true,
        _id: "5c9dc668c376600063bf8db1"
    },
    {
        description: "",
        edgeLabel: "",
        source: "TestPageThree",
        sourceArrow: false,
        tags: [],
        target: "TestPageFour",
        targetArrow: true,
        _id: "5c9dc668c376600063bf8db2",
    },
    {
        description: "",
        edgeLabel: "jjkkj",
        source: "TestPageOne",
        sourceArrow: false,
        tags: [],
        target: "TestPageFour",
        targetArrow: true,
        _id: "5c9dc668c376600063bf8db3"
    },
    {
        description: "",
        edgeLabel: "kl",
        source: "TestPageTwo",
        sourceArrow: true,
        tags: [],
        target: "TestPageThree",
        targetArrow: true,
        _id: "5c9dc668c376600063bf8db4",}
        ]

describe('Connection reducer tests: connection.reducer.test.js', () => {

    const connection = {
        description: "",
        edgeLabel: "aspiafsddas",
        source: "TestPageThree",
        sourceArrow: true,
        tags: [],
        target: "TestPageOne",
        targetArrow: true,
        _id: "5c9dc668c376600063bf8db1",
        type: "UPDATE_CONNECTION"
    };

    const expected = initialState.map(c => {
        if (connection.source === c.source &&
            connection.target === c.target
        )  {
            return connection;
        }
        return c
    });

    it('Returns default if type is not defined', () => {

        const result = connectionReducer(
            initialState,
            actions.updateConnectionSuccess(connection)
        );

        expect(result.length).toEqual(expected.length)
        expect(result).toEqual(expected);
    });
});
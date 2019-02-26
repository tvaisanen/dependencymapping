//@flow
import * as _ from 'lodash';
import type {ConnectionAction, ConnectionState} from "./connection.types";
import {
    ADD_CONNECTION,
    ADD_CONNECTIONS,
    DELETE_CONNECTION,
    DELETE_CONNECTIONS,
    SET_CONNECTIONS,
    UPDATE_CONNECTION,
    DELETE_CONNECTIONS_TO_ASSET
} from "./connection.action-types";

const initialState = [{source: "TestPageOne", target: "TestPageTwo", tags: [], description: "no description"}];

export default function (state: ConnectionState = initialState, action: ConnectionAction): ConnectionState {

    switch (action.type) {

        case SET_CONNECTIONS:
            // initial set, overrides previous state
            return action.connections;

        case ADD_CONNECTION:
            return [action.connection, ...state];

        case ADD_CONNECTIONS:
            return [...action.connections, ...state];

        case DELETE_CONNECTION:
            return state.filter(
                connection => connection._id !== action.connection._id
            );

        case DELETE_CONNECTIONS:
            state.forEach(c => {
                const r = !_.includes(action.connections, c)
                console.log(`remove: ${c.source}:${c.target} = ${r}`)
            })
            return state.filter(connection => !_.includes(action.connections, connection));

        case DELETE_CONNECTIONS_TO_ASSET:
            alert(JSON.stringify(action))
            state.forEach(c => console.log(`${c.target} === ${action.assetName} || ${c.source} === ${action.assetName} : ${!(c.target === action.assetName || c.source === action.assetName)}`));
            return state.filter(c => !(c.target === action.assetName || c.source === action.assetName));

        case UPDATE_CONNECTION:
            return [...state.filter(connection =>
                connection.source !== action.connection.source
                && connection.target !== action.connection.target
            ), action.connection];

        default:
            return state;
    }

}
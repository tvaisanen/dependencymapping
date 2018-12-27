//@flow

import type { Connection, ConnectionAction, ConnectionState } from "./connection.types";
import {
    ADD_CONNECTION,
    DELETE_CONNECTION,
    SET_CONNECTIONS,
    UPDATE_CONNECTION
} from "./connection.action-types";

const initialState = [{source: "TestPageOne", target: "TestPageTwo", tags: [], description: "no description"}];

export default function (state: ConnectionState = initialState, action: ConnectionAction): ConnectionState {

    switch (action.type){

        case SET_CONNECTIONS:
            // initial set, overrides previous state
            return action.connections;

        case ADD_CONNECTION:
            return [action.connection, ...state];

        case DELETE_CONNECTION:
            return state.filter(
                connection => connection !== action.connection
            )

        case UPDATE_CONNECTION:
            return [...state.filter(connection =>
                connection.source !== action.connection.source
                && connection.target !== action.connection.target
            ), action.connection];

        default:
            return state;
    }

}
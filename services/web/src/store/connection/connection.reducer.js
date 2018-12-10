//@flow

import type { Connection, ConnectionAction, ConnectionState } from "./connection.types";
import {
    SET_CONNECTIONS
} from "./connection.action-types";

const initialState = [{source: "TestPageOne", target: "TestPageTwo", tags: [], description: "no description"}];

export default function (state: ConnectionState = initialState, action: ConnectionAction): ConnectionState {

    switch (action.type){

        case SET_CONNECTIONS:
            // initial set, overrides previous state
            return action.connections;

        default:
            return state;
    }

}
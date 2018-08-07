import * as types from '../actions/actionTypes';
import initialState from './initialState';
import _ from 'lodash';

export default function activeMappingReducer(state = initialState.activeMapping, action){
    switch(action.type) {
        case types.LOAD_ACTIVE_MAPPING_RESOURCES:
            const mapping = action.mapping
            return {...mapping}

        case types.SET_ACTIVE_MAPPING_CONNECTIONS:
            return {...state, connections: action.connections}

        case types.ADD_ACTIVE_MAPPING_RESOURCES:
        
            // do not allow duplicates   
            let resourcesToAdd = []
            action.resources.forEach(
                // for every resource that is going to be add
                // check that it is not already included in
                // the current active mapping
                newResource => {
                    if (!_.find(state.resources, (r) => r.name === newResource.name)){
                        resourcesToAdd.push(newResource);
                    }
                }
            );
            
            return {...state, resources: [...state.resources, ...resourcesToAdd]}

        case types.ADD_ACTIVE_MAPPING_RESOURCE:
            // return the current active mapping with a new resource in the list
            return { ...state, resources: [...state.resources, action.resource]};

        case types.REMOVE_ACTIVE_MAPPING_RESOURCE:
            // remove the given resource from active mapping resources
            const filteredResources = state.resources.filter(r => r.name !== action.resource.name);
            return { ...state, resources: filteredResources };

        case types.ADD_ACTIVE_MAPPING_CONNECTIONS:
            return {...state, connections: [...action.connections, ...state.connections]}

        case types.CLEAR_ACTIVE_MAPPING_SELECTION:
            return {name: "no selection", resources:[], connections: []};

        default:
            return state;
    }
}
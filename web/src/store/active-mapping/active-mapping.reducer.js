import * as types from './active-mapping.action-types';
import initialState from '../../reducers/initialState';
import _ from 'lodash';

export default function activeMappingReducer(state = initialState.activeMapping, action){
    switch(action.type) {
        case types.SET_ACTIVE_MAPPING:
            return action.mapping;

        case types.LOAD_ACTIVE_MAPPING_RESOURCES:
            return {...action.mapping}

        case types.SET_ACTIVE_MAPPING_CONNECTIONS:
            return {...state, connections: action.connections}

        case types.ADD_ACTIVE_MAPPING_ASSETS:
        
            // do not allow duplicates   
            let assetsToAdd = []

            action.assets.forEach(
                // for every asset that is going to be add
                // check that it is not already included in
                // the current active mapping
                newAsset => {
                    if (!_.find(state.assets, assetName => assetName === newAsset.name)){
                        // if asset can not be found from the current mapping
                        assetsToAdd.push(newAsset.name);
                    }
                }
            );
            
            return {...state, assets: [...state.assets, ...assetsToAdd]}

        case types.ADD_ACTIVE_MAPPING_ASSET:
            return { ...state, assets: [ ...state.assets, action.asset ]}

        case types.ADD_ACTIVE_MAPPING_RESOURCE:
            // return the current active mapping with a new resource in the list
            return { ...state, resources: [...state.resources, action.resource]};

        case types.REMOVE_ACTIVE_MAPPING_RESOURCE:
            // remove the given resource from active mapping resources
            const filteredResources = state.assets.filter(asset => asset !== action.resource.name);
            return { ...state, assets: filteredResources };

        case types.ADD_ACTIVE_MAPPING_CONNECTIONS:
            return {...state, connections: [...action.connections, ...state.connections]}

        case types.CLEAR_ACTIVE_MAPPING_SELECTION:
            return {name: "no selection", resources:[], tags: []};

        default:
            return state;
    }
}
import GwClientApi from '../api/gwClientApi';
import * as types from './actionTypes';
import { mappingExists } from '../common/resource-helpers';

export function loadAllMappings() {
    return function(dispatch) {
        return GwClientApi.getGraphs().then(graphs=>{
            dispatch(loadMappingsSuccess(graphs));
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadAllResources() {
    return function(dispatch) {
        return GwClientApi.getResources().then(resources=>{
            dispatch(loadResourcesSuccess(resources));
        }).catch(error => {
            throw(error);
        });
    }
}


export function loadResource(){
    /**
     * Load resource node
     */
    return function(dispatch){
        return GwClientApi.getResources().then(resource=>{
            dispatch(loadResourceSuccess(resource));
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadAllDependencies() {
    return function(dispatch) {
        return GwClientApi.getDependencies().then(dependencies=>{
            dispatch(loadDependenciesSuccess(dependencies));
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadActiveMapping(mapping){
    return function(dispatch){
        return dispatch(loadActiveMappingResources(mapping))
    }
}

export function postMapping({name, description, resources, categories}){

    return function(dispatch) {
        // if mapping already exist update mapping
        dispatch(addMapping({name, description, resources, categories}))
        return GwClientApi.postMapping({name, description, resources, categories}).then(response =>{
            dispatch(postMappingSuccess(response));
        }).catch(error => {
            throw(error);
        });
    }
}

export function postResource(name){
    return function(dispatch) {
        return GwClientApi.postResource(name).then(response =>{
            if (response.error){
                // handle error
                console.debug('error posting resourcee');
            } else {
                // if success response is the resource object!
                console.debug('success posting resourcee');
                console.debug(response);
                dispatch(postResourceSuccess(response));
                dispatch(addResource(response))
            }
            return response;
        }).catch(error => {
            throw(error);
        });
    }
}

export function postTag({name, description}){

    return function(dispatch) {
        // if mapping already exist update mapping
        dispatch(addTag({name, description}));

        return GwClientApi.postTag({name, description}).then(response =>{
            dispatch(postTagSuccess(response));
        }).catch(error => {
            throw(error);
        });
    }
}
export function addResourceToMapping({nameMapping, nameResource}){
    // if no resource -> create resource
    console.debug('add ' + nameResource + " to " + nameMapping);
    // add to the resources
    // add the resource
    return function(dispatch){
        postResource(nameResource);
        //putResourceToMapping(nameMapping, nameResource);
    }

}

export function loadAllCategories() {
    return function(dispatch) {
        return GwClientApi.getCategories().then(categories=>{
            dispatch(loadCategoriesSuccess(categories));
        }).catch(error => {
            throw(error);
        });
    }
}

export function saveMapping(mapping) {
    // not async
    // todo: when backend
    // -> follow the pattern showed by 
    // async actions before
    return {type: types.SAVE_MAPPING, mapping};
}

export function addResourceToActiveMapping(resource){
    return {type: types.ADD_ACTIVE_MAPPING_RESOURCE, resource};
}

export function addMapping(mapping){
    return {type: types.ADD_MAPPING, mapping};
}

export function addTag(tag){
    return {type: types.ADD_TAG, tag}
}

export function addResource(resource){
    return {type: types.ADD_RESOURCE, resource}
}

export function postMappingSuccess(response) {
    return {type: types.POST_MAPPING_SUCCESS, response}
}

export function postResourceSuccess(response) {
    return {type: types.POST_MAPPING_SUCCESS, response}
}

export function postTagSuccess(response){
    return {type: types.ADD_TAG_SUCCESS, response}
}

export function loadCategoriesSuccess(categories) {
    return {type: types.LOAD_CATEGORIES_SUCCESS, categories}
}

export function loadMappingsSuccess(mappings){
    return {type: types.LOAD_MAPPINGS_SUCCESS, mappings}
}

export function loadResourcesSuccess(resources){
    return {type: types.LOAD_RESOURCES_SUCCESS, resources}
}

export function loadDependenciesSuccess(dependencies){
    return {type: types.LOAD_DEPENDENCIES_SUCCESS, dependencies}
}

export function loadResourceSuccess(resource){
    return {type: types.LOAD_RESOURCE_SUCCESS, resource}
}

export function loadActiveMappingResources(mapping){
    return {type: types.LOAD_ACTIVE_MAPPING_RESOURCES, mapping}
}

export function clearActiveMappingSelection(data){
    return {type: types.CLEAR_ACTIVE_MAPPING_SELECTION}
}

export function setActiveMappingConnections(connections){
    return {type: types.SET_ACTIVE_MAPPING_CONNECTIONS, connections}
}

export function addActiveMappingResources(resources){
    return {type: types.ADD_ACTIVE_MAPPING_RESOURCES, resources}
}

export function addActiveMappingConnections(connections){
    return {type: types.ADD_ACTIVE_MAPPING_CONNECTIONS, connections}
}

export function saveActiveMappingLocally(){
    return {type: types.SAVE_ACTIVE_MAPPING_CHANGES_LOCALLY}
}
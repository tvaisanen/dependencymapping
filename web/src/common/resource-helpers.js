import _ from 'lodash';


const required = () => {throw new Error('Missing parameter')};

export function isResourceInMapping({ 
                                        resourceId = required(), 
                                        mapping = required()
                                    }){
    /**
     *  @return bool true if resource with given id in mapping
     */
    const i = _.find(mapping.resources, {name:resourceId});
    // if resource by id is found return true.
    return i ? true : false;
}

export function mappingExists({id, mappings}){
    const i = _.findIndex(mappings, {id: id})
    return i !== -1 ? true : false;
}

export function resourceExists({id, resources}){
    const i = _.findIndex(resources, {id: id});
    return i !== -1 ? true : false;
}

export function tagExists({id, tags}){
    const i = _.findIndex(tags, {id: id});
    return i !== -1 ? true : false;
}

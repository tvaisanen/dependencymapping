import _ from 'lodash';


export function isResourceInMapping({resourceId, mapping}) {
    /**
     *  @return bool true if resource with given id in mapping
     */

    return _.includes(mapping.assets, resourceId);
}

export function mappingExists({id, mappings}) {
    const i = _.findIndex(mappings, {id: id})
    return i !== -1;
}

export function resourceExists({id, resources}) {
    const i = _.findIndex(resources, {id: id});
    return i !== -1;
}

export function tagExists({id, tags}) {
    const i = _.findIndex(tags, {id: id});
    return i !== -1;
}

// refactor to the getObjectByName
export function getResourceById({id, resources}) {
    return resources.filter(r => r.name === id)[0]
}

export function getObjectByName({name, objectList}){
    return objectList.filter(obj => obj.name === name)[0]
}

export function getAllResourcesWithTag({tagName, resources}) {
    return resources.filter(resource => {
        const index = _.findIndex(resource.tags, (tag) => tag === tagName);
        return index > -1;
    })
}

export function isResourceConnectedToId({resource, id}) {
    console.group(`isResourceConnectedToId(${resource.name},${id});`);
    console.info("resource");
    console.info(resource);
    console.info("id"); 
    console.info(id);
    const bools = resource.connected_to.map(r => r.name === id);

    const i = _.includes(bools, true);
    console.info(bools);
    console.info(i);
    console.groupEnd();
    return i;
}
// refactor to filterByName
export const filterResources = ({resources, filterValue}) => {
    return resources.filter(r => r.name.toLowerCase().includes(filterValue));
}

export const filterByName = ({objectList, filterValue}) => {
    if (objectList.length > 0){
        return objectList.filter(obj => obj.name.toLowerCase().includes(filterValue));
    } else {
        return [];
    }
};

// refactor usages from this to the sortAssets
export const sortResources = ({resources}) => {
    return resources.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
}

export const sortObjectsByName = (objectList) => {
    if (objectList){
        return objectList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    } else {
        return [];
    }
}
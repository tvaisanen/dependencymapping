
import {
    isResourceInMapping,
    mappingExists
} from '../common/resource-helpers';


const resourceIn = 'resource one';
const resourceNotIn = 'not gonna find me';
// mapping is an object, which has an
// array of resources
const mapping = {
    resources: [
        {name:'resource one'},
        {name:'resource two'},
        {name:'resource three'}
    ]       
}

test('should return true if mapping has a resource by the provided id', () => {
    const result = isResourceInMapping({
       mapping,
       resourceId: resourceIn
    })
    expect(result).toEqual(true);
});

test('should return false if mapping does not have a resource by the provided id', () => {
    const result = isResourceInMapping({
       mapping,
       resourceId: resourceNotIn 
    })
    expect(result).toEqual(false);
});

test('should return true if mapping by given id exists', () => {
    const mappings = [
        {id: 'one'},
        {id: 'two'}
    ]
    const id = 'one';
    const result = mappingExists({id, mappings});    
    expect(result).toEqual(true);
});

test('should return false if mapping by given id do not exist', () => {
    const mappings = [
        {name: 'one'},
        {name: 'two'}
    ]
    const id = 'not exist';
    const result = mappingExists({name, mappings});    
    expect(result).toEqual(false);
});
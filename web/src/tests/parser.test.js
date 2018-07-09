import {
    filterResourcesByIds
} from '../common/parser';

const ids = ['resource one', 'resource two'];
const resources = [
    {name:'resource one'},
    {name:'resource two'},
    {name:'resource three'}
]
const expected = [
   {name:'resource one'},
   {name:'resource two'},
]

test('filters resource objects correctly when given array of resource ids', () => {
    const result = filterResourcesByIds({ids, resources});
    expect(result).toEqual(expected);
});
const tags =[
    {name: 'tag one', description: 'describing'},
    {name: 'tag one', description: 'describing'},
];

const maps = [
    {name: "map one"},
    {name: "map two"},
];

export default {
    callMock: () => "MOCK",
    post: function(){
        console.log("mock axios");
    }
}

function mappingPost(url, mapping){
    console.log(url);
    console.log(mapping);
}

export const mapping = {
    get: () => null,
    post: (url, mapping) => mappingPost(url, mapping),
    put: () => null,
    delete: () => null,
}
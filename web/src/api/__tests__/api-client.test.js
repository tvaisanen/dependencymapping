import mockData from '../__mocks__/data';

const gwClientApi = require.requireMock('gwClientApi').default;

/**
 * Assertions are made based on test data, which can
 * be found from '../__mocks__/data.js'.
 */

const alreadyExistsError = {
    name: ["tag with this name already exists."]
}

it('getGraphs should return the data with status: 200 "OK"', () => {
    expect.assertions(3);
    return gwClientApi.getGraphs().then(response => {
        console.log(typeof response);
        const {data, status, statusText} = response;
        expect(status).toEqual(200);
        expect(statusText).toEqual('OK');
        expect(data[0].description).toEqual(mockData.mappings[0].description)
    });
});

it('getGraph should return mappin with id/name', () => {

});

it('getResources should return the data with status: 200 "OK"', () => {
    expect.assertions(4);
    return gwClientApi.getResources().then(response => {
        console.log(typeof response);
        const {data, status, statusText} = response;
        expect(status).toEqual(200);
        expect(statusText).toEqual('OK');
        expect(data[0].description).toEqual(mockData.assets[0].description);
        expect(data[1].description).toEqual(mockData.assets[1].description);
    });
});

it('getTags should return the data with status: 200 "OK"', () => {
    expect.assertions(6);
    return gwClientApi.getTags().then(response => {
        const {data, status, statusText} = response;
        expect(status).toEqual(200);
        expect(statusText).toEqual('OK');
        expect(data[0].name).toEqual(mockData.tags[0].name);
        expect(data[0].description).toEqual(mockData.tags[0].description);
        expect(data[1].name).toEqual(mockData.tags[1].name);
        expect(data[1].description).toEqual(mockData.tags[1].description);
    });
});

it('deleteTag should return 204 with OK when tag exists in db', () => {
    expect.assertions(2);
    return gwClientApi.deleteTag({
        name: mockData.tags[0].name
    }).then(response => {
        console.log(JSON.stringify(response));
        const {status, statusText} = response;
        expect(status).toEqual(204);
        expect(statusText).toEqual('OK');
    });
});

it('postTag should return 201 with OK when post successful', () => {
    const newTag = {name: "new tag", description: "describing new tag"};
    expect.assertions(3);
    return gwClientApi.postTag({
        ...newTag
    }).then(response => {
        const {data, status, statusText} = response;
        expect(status).toEqual(201);
        expect(data).toEqual(newTag);
        expect(statusText).toEqual('CREATED');
    });
});

it('postTag should return ? with ? when post not', () => {
    const newTag = {
        name: mockData.tags[0].name,
        description: mockData.tags[0].description
    };
    expect.assertions(1);
    return gwClientApi.postTag(newTag).catch(e =>
        expect(e).toEqual({error: alreadyExistsError}),
    );
});

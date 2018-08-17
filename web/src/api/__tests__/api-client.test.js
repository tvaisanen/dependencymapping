import mockData from '../__mocks__/data';
const gwClientApi = require.requireMock('gwClientApi').default;

/**
 * Assertions are made based on test data, which can
 * be found from '../__mocks__/data.js'.
 */



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
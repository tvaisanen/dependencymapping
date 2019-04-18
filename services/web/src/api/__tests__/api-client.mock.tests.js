import mockAxios from 'jest-mock-axios';
import api from '../gwClientApi';


describe('Api client tests with mock axios', () => {

    afterEach(() => {
        mockAxios.reset();
    })

    it('Get assets should return array', () => {
       let catchFn = jest.fn(),
            thenFn = jest.fn();

       api.getAssets()
           .then(response => response.data);

       expect(mockAxios.get)
           .toHaveBeenCalledWith('/asset/');

       let responseObj = {
           data: 'server says hello'
       }

       mockAxios.mockResponse(responseObj)


    })

});
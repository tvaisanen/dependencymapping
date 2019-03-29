import data from './data';
import _ from 'lodash';

/*
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}

 */

function getResponse({data, status = 200, statusText = 'OK', headers}) {
    return {
        data,
        status,
        statusText,
        headers
    }
}

class GwClientApi {
    static getGraphs() {
        return new Promise((resolve, reject) => {
            process.nextTick(
                () =>
                    data.mappings
                        ? resolve(getResponse({data: data.mappings}))
                        : reject({
                            error: 'User with ' + userID + ' not found.',
                        }),
            );
        });
    }


    static getResources() {
        return new Promise((resolve, reject) => {
            process.nextTick(
                () =>
                    data.assets
                        ? resolve(getResponse({data: data.assets}))
                        : reject({
                            status: 400,
                            statusText: "Bad request",
                            error: 'User with ' + userID + ' not found.',
                        }),
            );
        });
    }


    static getAssets() {
        console.log("get assets mocked here")
        return new Promise((resolve, reject) => {
            process.nextTick(
                () =>
                    data.assets
                        ? resolve(getResponse({data: data.assets}))
                        : reject({
                            status: 200,
                            statusText: "OK",
                            error: '',
                        }),
            );
        });
    }

    static getResource(id) {

    }


    /********************** MAPPING METHODS **********************/

    static postMapping({name, description, resources, tags}) {
    }

    static putMapping({name, description, resources, tags}) {
    }

    static deleteMapping({name}) {
    }


    /** ***********************************************************/

    static deleteResource({name}) {
    }

    static postResource({name, description, connected_to, tags}) {
    }

    static putResource({name, description, connected_to, tags}) {

    }

    static getTags() {
        return new Promise((resolve, reject) => {
            process.nextTick(
                () =>
                    data.tags
                        ? resolve(getResponse({data: data.tags}))
                        : reject({
                            error: 'User with ' + userID + ' not found.',
                        }),
            );
        });
    }

    static postTag({name, description}) {
        const responseData = {name, description}

        const tagIndex = _.findIndex(data.tags, (t) => {
            return t.name === name;
        });
        const tagDoNotExist = tagIndex === -1;


        const alreadyExistsError = {
            name: ["tag with this name already exists."]
        };


        return new Promise((resolve, reject) => {
            process.nextTick(
                () =>
                    tagDoNotExist
                        ? resolve(
                        getResponse({
                            data: responseData,
                            status: 201,
                            statusText: 'CREATED'
                        }))
                        : reject({
                            error: alreadyExistsError,
                        }),
            );
        });
    }

    static putTag({name, description}) {

        const tagIndex = _.findIndex(data.tags, (t) => {
            return t.name === name;
        });
        const tagExists = tagIndex !== -1;
        return new Promise((resolve, reject) => {
            process.nextTick(
                () =>
                    tagExists
                        ? resolve(
                        getResponse({
                            data: {name, description},
                            status: 200,
                            statusText: 'OK'
                        }))
                        : reject({
                            error: "helo",
                        }),
            );
        });
    }

    static deleteTag({name, description}) {
        return new Promise((resolve, reject) => {
            process.nextTick(
                () =>
                    data.tags
                        ? resolve(getResponse({status: 204}))
                        : reject({
                            error: 'User with ' + userID + ' not found.',
                        }),
            );
        });
    }
}

export default GwClientApi;
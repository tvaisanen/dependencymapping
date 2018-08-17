import data from './data';
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

function getResponse({data, status=200, statusText='OK', headers}){
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
                            error: 'User with ' + userID + ' not found.',
                        }),
            );
        });
    }

    static getResource(id) {

    }


    static getCategories() {

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

    static postTag({name, description}) {
    }

    static putTag({name, description}) {
    }

    static deleteTag({name, description}) {
    }
}

export default GwClientApi;
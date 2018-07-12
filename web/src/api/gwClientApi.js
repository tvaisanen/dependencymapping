import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';
const MAPPINGS_URL = `${API_URL}mappings/`;

function mappingsDetailUrl({name}) {
    return `${MAPPINGS_URL}${encodeURI(name)}/`;
}

class GwClientApi {
    static getGraphs() {
        return axios.get('http://127.0.0.1:8000/mappings/')
            .then(response => {
                return response.data;
            }).catch(error => {

            })
    }

    static getResources() {
        return fetch('http://127.0.0.1:8000/resources/')
            .then(response => {
                return response.json();
            }).catch(error => {
                return fetch('http://192.168.1.127:8000/resources/')
                    .then(response => {
                        return response.json();

                    }).catch(error => {
                        return error;
                    });
            });
    }

    static getResource(id) {
        return fetch(`http://127.0.0.1:8000/resources/${id}`)
            .then(response => {
                return response.json();
            }).catch(error => {
                return error;
            });
    }

    static getDependencies() {
        return fetch('http://127.0.0.1:8000/dependencies/')
            .then(response => {
                return response.json();
            }).catch(error => {
                return error;
            });
    }

    static getCategories() {
        return fetch('http://127.0.0.1:8000/tags/')
            .then(response => {
                return response.json();
            }).catch(error => {
                return fetch('http://192.168.1.127:8000/semantic-categories/')
                    .then(response => {
                        return response.json();

                    }).catch(error => {
                        return error;
                    });
            });
    }

    /********************** MAPPING METHODS **********************/

    static postMapping({name, description, resources, tags}) {

        return axios.post('http://127.0.0.1:8000/mappings/',
            {
                name: name,
                description: description,
                resources: JSON.stringify(resources),
                tags: JSON.stringify(tags)

            }
        )
    }

    static putMapping({name, description, resources, tags}) {
        console.info("GWClientPutMapping");
        return axios.put(
            mappingsDetailUrl({name}),
            {
                name: name,
                description: description,
                resources: JSON.stringify(resources),
                tags: JSON.stringify(tags)
            }
        );
    }

    static deleteMapping({name}) {
        return axios.delete(`http://127.0.0.1:8000/mappings/${encodeURI(name)}`)
    }


    /** ***********************************************************/
    static postResource({name, description, connected_to, tags}) {
        return axios.post('http://127.0.0.1:8000/resources/',
            {
                name: name,
                description: description,
                connected_to: JSON.stringify(connected_to),
                tags: JSON.stringify(tags)
            })
    }

    static postTag({name, description}) {
        return axios.post('http://127.0.0.1:8000/tags/', {name, description})
    }
}

export default GwClientApi;
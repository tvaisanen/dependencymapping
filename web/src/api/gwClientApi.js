import axios from 'axios';

// this is defined in proxy configs
const API_URL = 'http://localhost:8000/';
//const API_URL = 'http://localhost:8000/';
const MAPPINGS_URL = `${API_URL}mappings/`;
const TAGS_URL = `${API_URL}tags/`;
const RESOURCES_URL = `${API_URL}resources/`;

function tagDetailUrl({name}) {
    return `${TAGS_URL}${encodeURI(name)}/`;
}

function mappingsDetailUrl({name}) {
    return `${MAPPINGS_URL}${encodeURI(name)}/`;
}

function resourceDetailUrl({name}) {
    return `${RESOURCES_URL}${encodeURI(name)}/`;
}

class GwClientApi {
    // todo: refactor to getMappings
    static getGraphs() {
        return axios.get(MAPPINGS_URL)
            .then(response => {
                return response.data;
            }).catch(error => {

            })
    }

    static getResources() {
        return fetch(RESOURCES_URL)
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
        return fetch(resourceDetailUrl({name:id}))
            .then(response => {
                return response.json();
            }).catch(error => {
                return error;
            });
    }



    static getTags() {
        return fetch(TAGS_URL)
            .then(response => {
                return response.json();
            }).catch(error => {
                return fetch('http://192.168.1.127:8000/api/semantic-categories/')
                    .then(response => {
                        return response.json();

                    }).catch(error => {
                        return error;
                    });
            });
    }

    /********************** MAPPING METHODS **********************/

    static postMapping({name, description=" ", resources, tags}) {
        console.groupCollapsed("postMapping(form)");
        console.info({name, description, resources, tags});
        console.groupEnd();
        return axios.post(
            MAPPINGS_URL,
            {
                name: name,
                description: description,
                resources: JSON.stringify(resources),
                tags: JSON.stringify(tags)

            }
        )
    }

    static putMapping({name, description, resources, tags}) {
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
        return axios.delete(mappingsDetailUrl({name}));
    }


    /** ***********************************************************/

    static deleteResource({name}) {
        return axios.delete(resourceDetailUrl({name}));
    }

    static postResource({name, description="", connected_to=[], tags=[]}) {
        console.groupCollapsed("postMapping(form)");
        console.info({name, description, connected_to, tags});
        console.info({
                name: name,
                description: description,
                connected_to: JSON.stringify(connected_to),
                tags: JSON.stringify(tags)
            });
        console.groupEnd();
        return axios.post(RESOURCES_URL,
            {
                name: name,
                description: description,
                connected_to: JSON.stringify(connected_to),
                tags: JSON.stringify(tags)
            })
    }
    static putResource({name, description, connected_to, tags}) {
        return axios.put(
            resourceDetailUrl({name}),
            {
                name: name,
                description: description,
                connected_to: JSON.stringify(connected_to),
                tags: JSON.stringify(tags)
            }
        );
    }

    static postTag({name, description}) {
        return axios.post(TAGS_URL, {name, description})
    }

    static putTag({name, description}) {
        return axios.put(
            tagDetailUrl({name}),
            {name, description})
    }

    static deleteTag({name, description}) {
        return axios.delete(tagDetailUrl({name}));
    }
}

export default GwClientApi;
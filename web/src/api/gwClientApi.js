import axios from 'axios';
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


    static postMapping({name, description, resources, categories}) {
        console.info('postmapping')
        console.info(name);
        console.info(description);
        console.info(resources);
        console.info(categories);

        return axios.post('http://127.0.0.1:8000/mappings/',
                    {
                        name: name,
                        description: description,
                        resources: JSON.stringify(resources),
                        categories: JSON.stringify(categories)

                    })

    }

    static postResource({name, description, connected_to, categories}) {
        return axios.post('http://127.0.0.1:8000/resources/',
            {
                name: name,
                description: description,
                connected_to: connected_to,
                categories: categories
            })
    }

    static postTag({name, description}){
        return axios.post('http://127.0.0.1:8000/tags/', {name, description})
    }
}
export default GwClientApi;
import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST;
//const API_URL = `https://${API_HOST}/`;
const API_URL = `http://${API_HOST}/`;

// const MAPPINGS_URL = `${API_URL}mappings/`;
// const TAGS_URL = `${API_URL}tags/`;
// const RESOURCES_URL = `${API_URL}assets/`;

const MAPPINGS_URL = `${API_URL}mapping/`;
const TAGS_URL = `${API_URL}tag/`;
const RESOURCES_URL = `${API_URL}asset/`;
const ASSET_GROUPS_URL = `${API_URL}asset-group/`;

const LOGIN_URL = `${API_URL}rest-auth/login/`;

function tagDetailUrl({name}) {
    return `${TAGS_URL}${encodeURI(name)}/`;
}

function mappingsDetailUrl({name}) {
    return `${MAPPINGS_URL}${encodeURI(name)}/`;
}

function resourceDetailUrl({name}) {
    return `${RESOURCES_URL}${encodeURI(name)}/`;
}

//;
//axios.get('https://something.com/foo', { httpsAgent: agent });

//console.group("Process ENVIRONMENT");
/*
let agent;
if (process.env.NODE_ENV === "development") {
    console.info("set TLS :: rejectUnauthorized = false");
    agent = new https.Agent({
        rejectUnauthorized: false
    });
} else {
    agent = new https.Agent();
}
*/
// console.info(process.env);
// console.groupEnd();

function setAuthHeader() {
    /*
    const token = JSON.parse(localStorage.getItem('auth')).key;

    axios.defaults.headers.common['Authorization'] =  `Token ${token}`;
    */
}

class GwClientApi {

    static login({email, username, password}) {
        return axios.post(LOGIN_URL, {
            username: username,
            email: email,
            password: password,
        });
    }

    static resetModels () {
        axios.get("http://localhost:3000/reset-models");
    }

    // todo: refactor to getMappings
    static getGraphs() {
        console.log(MAPPINGS_URL);
        return axios.get(MAPPINGS_URL, {
            Authorization: setAuthHeader()
        });
    }

    static getAssets() {
        return axios.get(RESOURCES_URL);
    }

    static getAssetGroups() {
        return axios.get(ASSET_GROUPS_URL, {
            Authorization: setAuthHeader()
        });
    }

    static getResource(id) {
        return axios.get(resourceDetailUrl({name: id}));
    }


    static getTags() {
        return axios.get(TAGS_URL, {
            Authorization: setAuthHeader()
        });
    }

    /********************** MAPPING METHODS **********************/

    static postMapping({name, description = " ", assets, tags}) {
        console.groupCollapsed("postMapping(form)");
        console.info({name, description, assets, tags});
        console.groupEnd();

        setAuthHeader();
        return axios.post(
            MAPPINGS_URL,

            {
                name: name,
                description: description,
                assets: JSON.stringify(assets),
                tags: JSON.stringify(tags)

            }
        )
    }

    static putMapping({name, description, assets, tags}) {
        return axios.put(
            mappingsDetailUrl({name}),
            {
                Authorization: setAuthHeader(),
                name: name,
                description: description,
                assets: assets,
                tags: tags
            }
        );
    }

    static deleteMapping({name}) {
        return axios.delete(mappingsDetailUrl({name}));
    }

    /** ***********************************************************/

    static deleteAsset({name}) {
        return axios.delete(resourceDetailUrl({name}));
    }

    static postAsset({name, description = "", connected_to = [], tags = [], shape, color, group}) {
        console.groupCollapsed("postMapping(form)");
        const data = {
            name: name,
            description: description,
            connected_to: connected_to,
            tags: tags,
            group: group,
            shape: shape,
            color: color
        };
        console.info(data)
        console.groupEnd();
        return axios.post(RESOURCES_URL, data);
    }

    static putAsset({name, description, connected_to, tags,shape,color,group}) {
         console.groupCollapsed("putMapping(form)");
        const data = {
            name: name,
            description: description,
            connected_to: connected_to,
            tags: tags,
            group: group,
            shape: shape,
            color: color
        };
        console.info(data)
        console.groupEnd();
        return axios.put(
            resourceDetailUrl({name}),
            data
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
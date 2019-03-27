const axios = require('axios');
const fs = require('fs');

const backupPath = `${process.argv[3]}/`;
// todo: if not path use latest backup?

const API_ROOT = "http://localhost:3000"
const ASSET_ROOT = `${API_ROOT}/asset`
const CONNECTION_ROOT = `${API_ROOT}/connection`
const MAPPING_ROOT = `${API_ROOT}/mapping`
const TAG_ROOT = `${API_ROOT}/tag`

const fileNames = [
    { type: 'asset', filename: 'asset.json', url: ASSET_ROOT },
    { type: 'connection', filename: 'connection.json', url: CONNECTION_ROOT },
    { type: 'mapping', filename: 'mapping.json', url: MAPPING_ROOT },
    { type: 'tag', filename: 'tag.json', url: TAG_ROOT }
];

function loadBackupData() {
    try {
        return fileNames.map(({ type, filename, url }) => {
            return {
                data: require(`../backups/${backupPath}${filename}`),
                url
            };
        });
    } catch (err) {
        return err;
    }
}

const auth = {
    username: "",
    password: ""
}

function postResource(data, url) {
    console.log(data)
    return axios({
        method: 'post',
        url: url,
        data: data
    });
};

function run(args) {
    const data = loadBackupData();
    data.forEach(resource => {
        resource.data
            .forEach(item => {
                postResource(item, resource.url)
                    .then(response => {
                        console.log(response.status)
                    })
            })
    })

}

module.exports = {
    run
}
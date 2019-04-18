const axios = require('axios');
const fs = require('fs');
const {configs: {apiURL, backupsPath}} = require('./config');

const backupPath = `${process.argv[3]}/`;
// todo: if not path use latest backup?

const API_ROOT = "http://localhost:3000"
const ASSET_ROOT = `${API_ROOT}/asset`
const CONNECTION_ROOT = `${API_ROOT}/connection`
const MAPPING_ROOT = `${API_ROOT}/mapping`
const TAG_ROOT = `${API_ROOT}/tag`

const fileNames = [
    {type: 'asset', filename: 'asset.json', url: ASSET_ROOT},
    {type: 'connection', filename: 'connection.json', url: CONNECTION_ROOT},
    {type: 'mapping', filename: 'mapping.json', url: MAPPING_ROOT},
    {type: 'tag', filename: 'tag.json', url: TAG_ROOT}
];

function loadBackupData(backupFolder) {
    console.log(`${backupsPath}/${backupFolder}`);
    try {
        return fileNames.map(({type, filename, url}) => (
            {
                data: require(`${backupsPath}/${backupFolder}/${filename}`),
                url
            }
        ));

    } catch (err) {
        return err;
    }
}

const auth = {
    username: "",
    password: ""
};

function postResource(data, url) {
    return axios({
        method: 'post',
        url: url,
        data: data
    });
}

function backupExists(backupFolder) {
    return fs.existsSync(`${backupsPath}/${backupFolder}`)

}

function run(args) {

    if (args.length != 1) {
        return {msg: 'Backup version not specified', error: true};
    }

    const [backupFolder] = args;

    if (!backupExists(backupFolder)) {
        return {msg: 'Backup version do not exist', error: true};
    }

    const data = loadBackupData(backupFolder);
    console.log(data)

    data.forEach(resource => {
        resource.data
            .forEach(item => {
                postResource(item, resource.url)
                    .then(response => {
                        console.log(response.status)
                    })
                    .catch(err => console.log(err.response.status))
            })
    })

}

module.exports = {
    run
}
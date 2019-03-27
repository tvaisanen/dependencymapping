const axios = require('axios');
const fs = require('fs');

const {configs: {apiURL, backupsPath}} = require('./config');

const auth = {
    USERNAME: "",
    PASSWORD: ""
}

const ASSET_ROOT = `${apiURL}/asset`;
const CONNECTION_ROOT = `${apiURL}/connection`;
const MAPPING_ROOT = `${apiURL}/mapping`;
const TAG_ROOT = `${apiURL}/tag`;

const d = new Date();
const datePath = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}_${d.getHours()}:${d.getMinutes()}`;
const datedBackupPath = `${backupsPath}/${datePath}`;

function writeDataToFile(data, type) {
    console.log(`write data: ${data.length} ${type}s`)

    if (!fs.existsSync(datePath)) {
        fs.mkdirSync(datePath);
    }
    fs.writeFileSync(`${datedBackupPath}/${type}.json`, JSON.stringify(data))
}


function execute() {

    if (!fs.existsSync(datedBackupPath)) {
        fs.mkdirSync(datedBackupPath);
    }

    axios({method: 'get', url: ASSET_ROOT})
        .then(({data}) => writeDataToFile(data, "asset"))
        .catch(err => {console.warn(err)})

    axios({method: 'get', url: CONNECTION_ROOT})
        .then(({data}) => writeDataToFile(data, "connection"))
        .catch(err => console.warn(err))

    axios({method: 'get', url: MAPPING_ROOT})
        .then(({data}) => writeDataToFile(data, "mapping"))
        .catch(err => console.warn(err))

    axios({method: 'get', url: TAG_ROOT})
        .then(({data}) => writeDataToFile(data, "tag"))
        .catch(err => console.warn(err))
}


function run(args) {
    console.log("Save mapping backups.");
    execute();
}

module.exports = {
    run
};

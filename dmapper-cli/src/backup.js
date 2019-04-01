const axios = require('axios');
const fs = require('fs');

const {configs: {apiURL, backupsPath}} = require('./config');


const ASSET_ROOT = `${apiURL}/asset`;
const CONNECTION_ROOT = `${apiURL}/connection`;
const MAPPING_ROOT = `${apiURL}/mapping`;
const TAG_ROOT = `${apiURL}/tag`;

const d = new Date();
const datePath = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}_${d.getHours()}:${d.getMinutes()}`;
const datedBackupPath = `${backupsPath}/${datePath}`;

function writeDataToFile(data, type) {
    fs.writeFileSync(`${datedBackupPath}/${type}.json`, JSON.stringify(data));
    console.log(`${datedBackupPath}/${type}.json`);
}


function execute(auth) {

    if (!fs.existsSync(datedBackupPath)) {
        fs.mkdirSync(datedBackupPath);
    }

    axios({method: 'get', auth, url: ASSET_ROOT})
        .then(({data}) => writeDataToFile(data, "asset"))
        .catch(err => {console.warn(err)})

    axios({method: 'get', auth, url: CONNECTION_ROOT})
        .then(({data}) => writeDataToFile(data, "connection"))
        .catch(err => console.warn(err))

    axios({method: 'get', auth, url: MAPPING_ROOT})
        .then(({data}) => writeDataToFile(data, "mapping"))
        .catch(err => console.warn(err))

    axios({method: 'get', auth, url: TAG_ROOT})
        .then(({data}) => writeDataToFile(data, "tag"))
        .catch(err => console.warn(err))
}


function run(auth, args) {
    console.log("Save mapping backups.");
    execute(auth);
}

module.exports = {
    run
};

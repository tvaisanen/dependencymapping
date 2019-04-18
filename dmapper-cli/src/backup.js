const axios = require('axios');
const fs = require('fs');

const {configs: {apiURL, backupsPath, configsPath}} = require('./config');


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
        .catch(err => {
            console.warn(err)
        })

    axios({method: 'get', auth, url: CONNECTION_ROOT})
        .then(({data}) => writeDataToFile(data, "connection"))
        .catch(err => console.warn(err))

    axios({method: 'get', auth, url: MAPPING_ROOT})
        .then(({data}) => writeDataToFile(data, "mapping"))
        .catch(err => console.warn(err))

    axios({method: 'get', auth, url: TAG_ROOT})
        .then(({data}) => writeDataToFile(data, "tag"))
        .catch(err => console.warn(err))

    return {status: 'OK', exit:0}
}


function run(auth, args) {
    if (!apiURL) {
        console.log("\x1b[31m")
        console.log("API url not defined!");
        console.log(`Add "apiURL" parameter to the configs: ${configsPath}`)
        console.log("\x1b[0m");
        return {status: 'OK', message: 'Invalid config', exit:0}
    } else {
        console.log("Save mapping backups.");
        return execute(auth);
    }

}

module.exports = {
    run
};

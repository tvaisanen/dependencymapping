const axios = require('axios');
const fs = require('fs');

const auth = {
    USERNAME: "",
    PASSWORD: ""
}

const API_ROOT = "http://localhost:3000"
const ASSET_ROOT = `${API_ROOT}/asset`
const CONNECTION_ROOT = `${API_ROOT}/connection`
const MAPPING_ROOT = `${API_ROOT}/mapping`
const TAG_ROOT = `${API_ROOT}/tag`

const d = new Date();
const datePath = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
/*
function writeDataToFile(data, type) {
    console.log(`write data: ${data.length} ${type}s`)

    if (!fs.existsSync(datePath)) {
        fs.mkdirSync(datePath);
    }
    fs.writeFileSync(`${datePath}/${type}.json`, JSON.stringify(data))
}

function execute() {
    axios({ method: 'get', url: ASSET_ROOT })
        .then(({ data }) => writeDataToFile(data, "asset"))
        .catch(err => console.warn(err))

    axios({ method: 'get', url: CONNECTION_ROOT })
        .then(({ data }) => writeDataToFile(data, "connection"))
        .catch(err => console.warn(err))

    axios({ method: 'get', url: MAPPING_ROOT })
        .then(({ data }) => writeDataToFile(data, "mapping"))
        .catch(err => console.warn(err))

    axios({ method: 'get', url: TAG_ROOT })
        .then(({ data }) => writeDataToFile(data, "tag"))
        .catch(err => console.warn(err))
}

*/

module.exports = {
    run: () => console.log('run backup'),
}

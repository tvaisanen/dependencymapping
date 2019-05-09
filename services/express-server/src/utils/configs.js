
const fs = require('fs');

// this is handled via docker secrets
// and meant not to be included in the repo
const PUBLIC_URL_FILE = '/run/secrets/public-api-path';

// default
let API_PATH = `https://localhost:8443/api`;

try {
    API_PATH = fs.readFileSync(PUBLIC_URL_FILE)
        .toString()
        .replace('\n', '');
    console.log(API_PATH)
} catch (err) {
    console.log('public url secret not found use default')
    console.log('add one: repository-root/secrets/public-api-path.txt')


}

module.exports = {
    API_PATH: API_PATH
};
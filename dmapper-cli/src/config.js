const os = require('os');
const fs = require('fs');

const homedir = os.homedir();
const dmapperPath = `${os.homedir()}/.dmapper`;
const backupsPath = `${dmapperPath}/backups`;
const configsPath = `${dmapperPath}/config.json`;

const defaultConfig = {
    homedir,
    dmapperPath,
    backupsPath,
    configsPath,
    username: "",
    password: "",
    apiURL: "http://localhost:3000"
};

let configs;

try {

    // Load configs

    console.log(`\nLoading configs from ${configsPath} ...`);
    console.log("using following configuration:");

    configs = require(configsPath);
    console.log(configs)
    console.log('\n');

} catch (err) {

    // If configs not found create with defaults.

    console.log(`File: ${configsPath} not found.`)
    console.log(`Create file with defaults`);
    console.log(defaultConfig);
    fs.writeFileSync(configsPath, JSON.stringify(defaultConfig));
}

if (!fs.existsSync(dmapperPath)) {
    fs.mkdirSync(dmapperPath);
}

if (!fs.existsSync(backupsPath)) {
    fs.mkdirSync(backupsPath);
}

function printConfigs (){
    console.log(configs)
}

function run(args) {
    console.log("config")
    console.log(configs)
    return {status: 'OK', exit: 0};
}

module.exports = {
    run,
    info: printConfigs,
    configs,
};
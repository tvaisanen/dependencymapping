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
    apiURL: ""
};

let configs;

if (!fs.existsSync(dmapperPath)) {
    fs.mkdirSync(dmapperPath);
}

if (!fs.existsSync(backupsPath)) {
    fs.mkdirSync(backupsPath);
}

if (!fs.existsSync(configsPath)) {
    console.log("\x1b[31m","No configuration found...")
    fs.writeFileSync(configsPath, JSON.stringify(defaultConfig));
    console.log("Created a config with defaults.")
    console.log(`Add "apiURL" parameter to the file: ${configsPath}`)
}

// Load configs
console.log("\x1b[0m",`\nLoading configs from ${configsPath} ...`);
console.log("using following configuration:");

configs = require(configsPath);
console.log(configs)
console.log('\n');


function printConfigs() {
    console.log(configs)
}

function run(args) {
    return {status: 'OK', exit: 0};
}

module.exports = {
    run,
    info: printConfigs,
    configs,
};
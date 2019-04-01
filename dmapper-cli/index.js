#!/usr/bin/env node

if (process.env.NODE_ENV === 'development'){
    // for development on localhost
    // run: NODE_ENV=development node index.js args
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

console.log(process.argv)
const [exec, path, authFlag, credentials, command] = process.argv;

console.log(authFlag);
console.log(credentials)

const [username, password] = credentials.split(':');
const auth = { username, password };


const commands = {
    backup: require('./src/backup.js'),
    recover: require('./src/recover.js'),
    config: require('./src/config.js')
};

const allowedCommand = Object.keys(commands).indexOf(command) !== -1;

if (!allowedCommand) {
    console.log("### Dependency Mapper - Load backups ###");
    console.log('usage: dmapper command args');

    console.log('commands:');
    Object.keys(commands)
        .forEach(command => console.log(`\t${command}`));

    console.log('example: node upload-backups 2019-3-23');
    process.exit(1)

} else {
    executeDMapperCLI();
}


function executeDMapperCLI() {
    try {
        const args = process.argv.slice(5);
        const result = commands[command].run(auth, args);
        console.log(result);
    } catch (err) {
        console.warn(err);
        //process.exit(1);
    }
}


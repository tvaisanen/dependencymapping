#!/usr/bin/env node

const command = process.argv[2]

const commands = {
    backup: require('./src/backup.js'),
    recover: require('./src/recover.js'),
    info: require('./src/info.js') 
}

const allowedCommand = Object.keys(commands).indexOf(command) !== -1;

console.log(Object.keys(commands))
console.log(allowedCommand);

if (!allowedCommand) {
    console.log("### Dependency Mapper - Load backups ###");
    console.log('usage: node upload-backup path-to-files');
    console.log('example: node upload-backups 2019-3-23')
    process.exit(1)

} else {
    executeDMapperCLI();
}


function executeDMapperCLI() {



    try {
        const args = process.argv.slice(2);
        const result = commands[command].run(args);
        console.log(result);
        process.exit(0);
    } catch (err) {
        console.warn(err);
        process.exit(1);
    }
}


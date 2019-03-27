#!/usr/bin/env node

const command = process.argv[2]

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
        const args = process.argv.slice(3);
        const result = commands[command].run(args);
        console.log(result);
    } catch (err) {
        console.warn(err);
        process.exit(1);
    }
}


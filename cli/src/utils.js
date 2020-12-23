const https = require('https');
const fs = require('fs');
const chalk = require('chalk');
const { exit } = require('process');

const download = (url, dest, cb) => {
    var file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close(cb);     
        });
    });
}

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const error = (error) => {
    console.log(chalk.redBright(error));
    exit();
}

module.exports = { download, sleep, error };
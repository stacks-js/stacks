const https = require('https');
const fs = require('fs');
const chalk = require('chalk');
const { exit } = require('process');

const insertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

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

const error = (error, hint) => {
    console.log(chalk.redBright(error));
    if(hint)
        console.log(`Hint: ${chalk.italic(hint)}`);
    exit();
}

module.exports = { download, sleep, error, insertAt };
const Bundler = require('parcel-bundler');
const fs = require("fs");
const path = require('path');
const chalk = require("chalk");
const { error } = require('./utils');

const bundle = async (dir, tmp, out) => {
    const entryPoint = `${tmp}**/*.html`;
    // const outDir = path.join(dir, out);

    const bundler = new Bundler(entryPoint, { outDir: out, watch: false });
    await bundler.bundle();
    
    fs.rmdir(tmp, { recursive: true }, (err) => {
        if(err)
            error(`Error: Failed to delete ${chalk.bold(tmp)} directory! ${err}`);
        console.log("Deleted!")
    });
}

module.exports = { bundle };
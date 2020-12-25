const Bundler = require('parcel-bundler');
const fs = require("fs");
const path = require('path');
const chalk = require("chalk");
const { error } = require('./utils');

const bundle = async (tmp, out, single, prod, cb) => {
    const entryPoint = `${tmp}**/*.html`;
    // const outDir = path.join(dir, out)
    let outDir = out;

    // if(single)
    //     outDir = path.join(out, single);
    
    console.log(outDir)
    
    fs.rm(out, { recursive: true, force:true }, async (err) => {
        if(err)
            error(`Error: Failed to delete ${chalk.bold(tmp)} directory! ${err}`);
        
        const bundler = new Bundler(entryPoint, { outDir: outDir, watch: false, cache: !prod, minify: prod, target: "browser" });
        await bundler.bundle();
    
        fs.rmdir(tmp, { recursive: true }, (err) => {
            if(err)
                error(`Error: Failed to delete ${chalk.bold(tmp)} directory! ${err}`);
            
            if(single)
                fs.mkdir(path.join(out, `${single}`), (err) => {
                    if(err)
                        error("Error: An error occured in the folder-process of compiling");
                    
                    fs.rename(path.join(out, `${single}.html`), path.join(out, `${single}/${single}.html`), (err) => {
                        if(err)
                            error(`Error: An error occured when compiling the page: ${chalk.bold(single)}`);
                        cb();
                    });
                });
        });
    });;
}

module.exports = { bundle };
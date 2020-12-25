const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const { error, insertAt } = require("./utils");
const { bundle } = require("./bundle");
const { startCase, add } = require("lodash");
const ncp = require("ncp").ncp;
const { serve } = require("./serve");
const chokidar = require("chokidar");
const { cyanBright } = require("chalk");
ncp.limit = 16;

const templates = {};
let firstPage;
let single;

const compile = async (dir, shouldServe, shouldWatch, prod) => {
    const packagejson = path.join(dir, "package.json");
    const stacksconfig = path.join(dir, "stacks-config.json");

    if(!fs.existsSync(packagejson))
        error(`Error: No ${chalk.bold("package.json")} file found`)

    if(!fs.existsSync(stacksconfig))
        error(`Error: No ${chalk.bold("stacks-config.json")} file found`)
    
    const package = JSON.parse(fs.readFileSync(packagejson));
    const config = JSON.parse(fs.readFileSync(stacksconfig));

    const watch = (shouldWatch != undefined) ? shouldWatch : config.watch;
    const src = path.join(dir, config.src);
    const out = path.join(dir, "sjs_tmp/");
    const final = path.join(dir, config.out);

    const ext = config.lang ? "js" : "ts";

    const templateDir = path.join(__dirname, "../template/");
    const templateHTML = fs.readFileSync(path.join(templateDir, "template.html")).toString();
    const templateScript = fs.readFileSync(path.join(templateDir, "script.txt")).toString();
    const templateImport = fs.readFileSync(path.join(templateDir, "import.txt")).toString();

    templates.dir = templateDir;
    templates.html = templateHTML;
    templates.script = templateScript;
    templates.import = templateImport;

    fs.mkdirSync(out, {recursive: true});
    
    compileFiles(src, ext, out, final, shouldServe, prod);

    if(watch) {
        const watcher = chokidar.watch(src, {persistent: true});
        watcher
            .on('change', _ => {
                compileFiles(src, ext, out, final, false, prod);
                console.log(chalk.green("Reloaded!"))
            });

        console.log(chalk.green("Watching for changes..."));
    }
}

const compileFiles = (src, ext, out, final, shouldServe, prod) => {
    single = undefined;
    fs.readdir(src, async (err, files) => {
        if(err)
            error(`Error: Couldn't read project files`);

        if(files.length === 1)
            single = files[0].slice(0, -3);

        console.log(single)
        
        for(let file of files) {
            const filePath = path.join(src, file);
            const isFile = fs.lstatSync(filePath).isFile();

            if(isFile) {
                // check if it is a stacks file
                if(file.slice(-2) == (ext)) {
                    createPage([file], src, out);
                }
            }else {
                // check in local directory for it's main file
                fs.readdir(filePath, (err, fes) => {
                    if(err)
                        error(`Error: Couldn't read project files in ${chalk.bold(file)}`);
                    
                    let main;
                    const thisOne = `${file}.${ext}`;
                    const others = [];

                    fes.forEach(f => {                        
                        if(f === thisOne) {
                            main = thisOne;
                        }else if(f.slice(-2) == ext) {
                            others.push(f);
                        }
                    });

                    if(!main)
                        error(`Error: Couldn't find view file: ${chalk.bold(thisOne)}`);
                    
                    // console.log(`Loaded other view with ${thisOne} and others ${others}`);
                    const theseFiles = [main];
                    others.forEach(other => {
                        theseFiles.push(other);
                    });

                    createPage(theseFiles, filePath, out);
                });
            }
        };

        setTimeout(() => {
            bundle(out, final, single, prod === "true", () => {
                if(shouldServe)
                    serve(final, 6969, firstPage);
                });
            }
        , 250);
        // });
    });
}

const createPage = async (files, src, out) => {
    return new Promise((resolve, reject) => {
        const main = files[0];
        const name = main.slice(0, -3);
        let htmlstr = templates.html.replace("{{ name }}", startCase(name)).replace("{{ view }}", main);

        // importAssets(path.join(out, "../assets/"), htmlstr, src).then((html) => {
        //     htmlstr = html;
            
        if(files.length > 1) {
            // //there are more, so we need to reference the new scripts
            // const dom = new JSDOM(htmlstr);
            const prepend = "</script>\n";
    
            let count = 0;
            files.forEach((f) => {
                if(count > 0){
                    const scriptTag = prepend + "\t" + templates.script.replace("{{ file }}", f) + "\n";
                    htmlstr = htmlstr.replace(prepend, scriptTag);
                }
                count++;
            });
        }
    
        const dir = path.join(out, `${name}/`);
        console.log(chalk.bgGreen(dir));
        fs.mkdirSync(dir, { recursive: true });
    
        const pagePath = path.join(dir, `${name}.html`);
        fs.writeFileSync(pagePath, htmlstr);
    
        if(!firstPage)
            firstPage = `${name}/${name}.html`;
    
        //copy other main file and others
        const iterator = new Promise((res, rej) => {
            for(let file of files){
                ncp(path.join(src, file.toString()), path.join(dir, file.toString()), (err) => {
                    if(err)
                        error(`Error: Failed to copy file ${chalk.bold(file)}`);
                });
            }

            res();
        });

        iterator.then(resolve());
        // });
    });
}

const importAssets = (assets, html, dir, cb) => {

    return new Promise((resolve, reject) => {
        let finalHTML = html;
        fs.readdir(assets, (err, files) => {
            if(err)
                error("An error occurred!");
            
            const iterator = new Promise((resolve, reject) => {
                files.forEach((file, index, array) => {
                    const assetTypePath = path.join(assets, file);

                    if(fs.statSync(assetTypePath).isDirectory()) {
                        fs.readdir(assetTypePath, (err, files) => {
                            if(err)
                                error("An error occurred in copying!");
                            
                            const iterator2 = new Promise((rs, rj) => {
                                files.forEach((file, idx, arr) => {
                                    const fileAbsolute = path.join(assetTypePath, file);
                                    const relative = path.relative(dir, fileAbsolute);
                                    const importTxt = templates.import.replace("{{ path }}", relative);
                                    finalHTML = finalHTML.replace("//{{ imports }}", `\n${importTxt}`).replace("{{ name }}", Math.random().toString(36).substring(7) + "s");

                                    if (idx === arr.length -1) rs();
                                });
                            });

                            iterator2.then(() => {
                                resolve();
                            });
                        });
                    }

                    // if (index === array.length -1) resolve();
                });
            });

            iterator.then(() => {
                // console.log(chalk.red(finalHTML))
                resolve(finalHTML);
            });
            
        });
    });
}

// addStylesheets = (file, html, css) => {
//     let count = 0;
//     fs.readdir(css, (f) => {
//         if(count == 0)
//             html.replace("{{ style }}", `${f}`);

//         count++;
//     });
// }

module.exports = { compile }
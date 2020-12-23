const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const { error, insertAt } = require("./utils");
const { startCase } = require("lodash");
const ncp = require("ncp").ncp;
ncp.limit = 16;

const templates = {};

const compile = (dir) => {
    const packagejson = path.join(dir, "package.json");
    const stacksconfig = path.join(dir, "stacks-config.json");

    if(!fs.existsSync(packagejson))
        error(`Error: No ${chalk.bold("package.json")} file found`)

    if(!fs.existsSync(stacksconfig))
        error(`Error: No ${chalk.bold("stacks-config.json")} file found`)
    
    const package = JSON.parse(fs.readFileSync(packagejson));
    const config = JSON.parse(fs.readFileSync(stacksconfig));

    const src = path.join(dir, config.src);
    const out = path.join(dir, config.out);

    const ext = config.lang ? "js" : "ts";

    const templateDir = path.join(__dirname, "../template/");
    const templateHTML = fs.readFileSync(path.join(templateDir, "template.html")).toString();
    const templateScript = fs.readFileSync(path.join(templateDir, "script.txt")).toString();

    templates.dir = templateDir;
    templates.html = templateHTML;
    templates.script = templateScript;

    fs.mkdirSync(out, {recursive: true});
    
    fs.readdir(src, (err, files) => {
        if(err)
            error(`Error: Couldn't read project files`);
        
        files.forEach(file => {
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
                })
            }
        });
    });
}

const createPage = (files, src, out) => {
    console.log(chalk.yellow(files))
    const main = files[0];
    const name = main.slice(0, -3);
    let htmlstr = templates.html.replace("{{ name }}", startCase(name)).replace("{{ view }}", main);


    if(files.length > 1) {
        // //there are more, so we need to reference the new scripts
        // const dom = new JSDOM(htmlstr);
        const prepend = "</script>\n";

        let count = 0;
        files.forEach((f) => {
            if(count > 0){
                // // const scriptTag = templates.script.replace("{{ file }}", f);
                // const scriptTag = dom.window.document.createElement("script");
                // scriptTag.src = f;
                // dom.window.document.body.appendChild(scriptTag);
                // count++;
                const scriptTag = prepend + "\t" + templates.script.replace("{{ file }}", f) + "\n";
                htmlstr = htmlstr.replace(prepend, scriptTag);
            }
            count++;
        });

        // htmlstr = dom.serialize();
    }

    const dir = path.join(out, `${name}/`);
    fs.mkdirSync(dir, { recursive: true });

    const pagePath = path.join(dir, `${name}.html`);
    fs.writeFileSync(pagePath, htmlstr);

    //copy other main file and others
    files.forEach(file => {
        ncp(path.join(src, file.toString()), path.join(dir, file.toString()), (err) => {
            if(err)
                error(`Error: Failed to copy file ${chalk.bold(file)}`);
        });
    });
}

module.exports = { compile }
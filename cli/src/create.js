const ncp = require('ncp').ncp;
const exec = require('await-exec');
const Spinner = require('cli-spinner').Spinner;
const chalk = require("chalk");
const path = require("path");
const { exit } = require("process");
const fs = require("fs");
const figlet = require("figlet");
const addingPackagesText = "Adding necessary packages...";
const downloadingComponentsText = "Downloading separate components...";
const packages = {/*"stacks-js": false, "parcel-bundler": true*/};
const components = {"boostrap-css" : "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"}

const { download, sleep } = require("./utils");

const createProject = (dname, proc, appName) => {


    // const lang = program.lang ? !(program.lang.toLowerCase() == "typescript" || program.lang.toLowerCase() == "ts"): true;

    // console.log(`Creating project ${chalk.green(appName)} with language ${chalk.red(lang ? "Javascript" : "Typescript")}`)
    console.log(chalk.yellowBright(`This could take a few seconds...`));


    const sampleFolder = path.join(dname, "../samples/");

    const readline = require('readline').createInterface({
        input: proc.stdin,
        output: proc.stdout
    });

    const projectPath = path.join(proc.cwd(), appName);

    // fs.access(projectPath, async (error) => {
    //     if(!error) {
    //         readline.question(`${chalk.redBright("Project already exists!")} Overwrite it? (y/n) `, async (overAnswer) => {
    //             readline.close();
    //             const over = overAnswer ? overAnswer.toLowerCase() == "y" : false;
                
    //             if(!over) {
    //                 console.log(chalk.blue("Aborted"))
    //                 exit();
    //             }
    //         });
    //     }
    // });

    // create project directory
    fs.mkdir(projectPath, (error) => {
        if(error){
            console.log(chalk.redBright("Project creation failed! Make sure the folder doesn't already exist!"));
            exit();
        }
        
        // go to the new folder
        proc.chdir(projectPath);
        
        // Create node project
        exec("npm init -y")

        console.log("\n");

        // ask for yarn
        readline.question(`Use ${chalk.green("Yarn")} as package manager? (y/n) `, async (yarnAnswer) => {
            const yarn = yarnAnswer ? yarnAnswer.toLowerCase() == "y" : false;
            readline.close();

            // console.log(chalk.yellow(`Creating ${yarn ? "yarn" : "npm"} project`));

            const load = Spinner(chalk.yellow(`Creating ${yarn ? "yarn" : "npm"} project`));
            load.start();

            // setup for yarn
            if(yarn)
                await exec("yarn")
            else
                await sleep(100);

            // add stacks.js package to project
            load.setSpinnerTitle(chalk.yellow(addingPackagesText) + chalk.red(" (stacks-js)"));
            await exec(`${yarn ? "npm link " : "npm link "} stacks-js`);

            // add packages to project
            Object.keys(packages).forEach(async (package) => {
                const dev = packages[package];

                load.setSpinnerTitle(chalk.yellow(addingPackagesText) + chalk.red(` (${package})`));
                await exec(`${yarn ? "yarn add" : "npm install "} ${package} ${dev ? (yarn ? "-D" : "--save-dev") : ""}`);
            });

            await sleep(100);
            console.log(chalk.blue("\nPackages successfully added!"));
            load.stop();
            
            const load2 = Spinner(chalk.yellow(downloadingComponentsText));
            load2.start();

            const src = path.join(projectPath, "src");
            const assets = path.join(projectPath, "assets");
            const css = path.join(assets, "css");
            const images = path.join(assets, "images");

            fs.mkdir(assets, (err) => {
                if(err) {
                    console.log(chalk.redBright("An error occurred!") + err + chalk.green(css));
                    exit();
                }

                fs.mkdirSync(images);

                fs.mkdir(css, async (err) => {
                    if(err) {
                        console.log(chalk.redBright("An error occurred!") + err + chalk.green(css));
                        exit(); 
                    }

                    Object.keys(components).forEach((component) => {
                        const link = components[component];
                        
                        const downloadPath = path.join(css, "bootstrap.min.css");
                        
                        load2.setSpinnerTitle(chalk.yellow(downloadingComponentsText) + chalk.red(` (${component})`));
                        
                        download(link, downloadPath, (err) => {
                            if(err) {
                                console.log(chalk.redBright("An error occurred!") + err + chalk.green(css));
                                exit();
                            }
                        })
                    });

                    await sleep(100);

                    console.log(chalk.blue("\nComponents downloaded!"));
                    await load2.stop();

                    console.log(chalk.yellow("Generating project files..."));

                    const copyFolder = path.join(dname, "../copy");
                    fs.readdir(copyFolder, (err, files) => {
                        if(err) {
                            console.log(chalk.redBright("An error occurred."));
                            exit();
                        }

                        files.forEach(file => {
                            const newPath = path.join(proc.cwd(), file);
                            ncp(path.join(copyFolder, file), newPath, (err) => {
                                if(err) {
                                    console.log(chalk.redBright("File copy failed."));
                                    exit();
                                }
                            });
                        });
                    });

                    fs.mkdir(src, async (err) => {
                        if(err) {
                            console.log(chalk.redBright("An error occurred."));
                            exit();
                        }
                        
                        proc.chdir("src");

                        fs.readdir(sampleFolder, (err, files) => {
                            if(err) {
                                console.log(chalk.redBright("Couldn't setup project files!"))
                                exit();
                            }

                            files.forEach(file => {
                                ncp(path.join(sampleFolder, file), path.join(proc.cwd(), file), (err) => {
                                    if(err) {
                                        console.log(chalk.redBright("Failed to create file!"));
                                        exit();
                                    }
                                });
                            });

                            console.log(chalk.blue("Project files written!"));

                            console.log(chalk.yellow("Setting up configuration..."));

                            proc.chdir("../");
                            
                            const stacksconfigPath = path.join(proc.cwd(), "stacks-config.json");
                            
                            const stacks_config = {
                                project:appName, 
                                "src": "./src/",
                                "out": "./dist/",
                                "lang": true,
                                "pkg": yarn ? "yarn" : "npm",
                                "watch": false
                            }

                            fs.writeFileSync(stacksconfigPath, JSON.stringify(stacks_config, null, 2));

                            console.log(chalk.blue("Stacks configuration set!"));
                            console.log(chalk.yellow("Setting up scripts..."));

                            const package_raw = fs.readFileSync('package.json');
                            const package_json = JSON.parse(package_raw);

                            package_json.scripts = {
                                "build" : "node /Users/sanjithudupa/Documents/Code/Experiments/StacksFramework/cli/src/stacks-cli.js compile --watch false",
                                "dev" : "node /Users/sanjithudupa/Documents/Code/Experiments/StacksFramework/cli/src/stacks-cli.js compile --serve",
                                "prod" : "node /Users/sanjithudupa/Documents/Code/Experiments/StacksFramework/cli/src/stacks-cli.js compile --watch false --prod"
                            };

                            fs.writeFileSync('package.json', JSON.stringify(package_json, null, 2));
                            console.log(chalk.blue("Scripts set!"));

                            console.log(chalk.green("Project Created!"));
                            console.log("stacks.js | © Sanjith Udupa 2020");
                        });
                    });
                })
            });
        });
    })
}

module.exports = { createProject };
const ncp = require('ncp').ncp;
const exec = require('await-exec');
const Spinner = require('cli-spinner').Spinner;
const chalk = require("chalk");
const path = require("path");
const { exit } = require("process");
const fs = require("fs");

const addingPackagesText = "Adding necessary packages...";
const downloadingComponentsText = "Downloading separate components...";
const packages = {/*"stacks-js": false, */"parcel-bundler": true};
const components = {"boostrap-css" : "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"}

const { download, sleep } = require("./utils");

const createProject = (__dirname, process, appName) => {


    const lang = program.lang ? !(program.lang.toLowerCase() == "typescript" || program.lang.toLowerCase() == "ts"): true;
    const appName = process.argv[2];

    console.log(`Creating app ${chalk.green(appName)} with language ${chalk.red(lang ? "Javascript" : "Typescript")}`)
    console.log(chalk.yellowBright(`This could take a few seconds...`));


    const libFolder = path.join(__dirname, "../lib/");

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const projectPath = path.join(process.cwd(), appName);

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
        process.chdir(projectPath);
        
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
            const lib = path.join(projectPath, "lib");
            const css = path.join(lib, "css");

            fs.mkdir(lib, (err) => {
                if(err) {
                    console.log(chalk.redBright("An error occurred!") + err + chalk.green(css));
                    exit();
                }

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

                    fs.mkdir(src, async (err) => {
                        if(err) {
                            console.log(chalk.redBright("An error occurred."));
                            exit();
                        }
                        
                        process.chdir("src");

                        fs.readdir(libFolder, (err, files) => {
                            if(err) {
                                console.log(chalk.redBright("Couldn't setup project files!"))
                                exit();
                            }

                            files.forEach(file => {
                                ncp(path.join(libFolder, file), path.join(process.cwd(), file), (err) => {
                                    if(err) {
                                        console.log(chalk.redBright("Failed to create file!"));
                                        exit();
                                    }
                                })
                            });

                            console.log(chalk.blue("Project files written!"));

                            console.log(chalk.yellow("Creating run scripts..."));
                            
                            process.chdir("../")
                            let package_raw = fs.readFileSync('package.json');
                            let package_json = JSON.parse(package_raw);
                        });
                    });
                })
            });
        });
    })
}
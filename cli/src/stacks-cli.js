#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
const program = require("commander");
const { exit } = require("process");
const fs = require("fs");
const { exec } = require("child_process");
const Spinner = require('cli-spinner').Spinner;
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

program
    .version("0.0.1")
    .description("A CLI to generate stacks.js projects to jumpstart your apps!")
    .usage(`<app-name> --lang ${chalk.blue("language")}(optional)`)
    .option("--lang <language>", "set app language")
    .parse(process.argv);

if (!process.argv[2] || process.argv[2] == "--lang"){
    clear();
    console.log(chalk.greenBright("Please include an app name before language declaration!\n"))
    program.outputHelp();
    return;
}

const lang = program.lang ? !(program.lang.toLowerCase() == "typescript" || program.lang.toLowerCase() == "ts"): true;
const appName = process.argv[2];

console.log(`Creating app ${chalk.green(appName)} with language ${chalk.red(lang ? "Javascript" : "Typescript")}`)
console.log(chalk.yellowBright(`This could take a few seconds...`));

const createProject = () => {
    const projectPath = path.join(process.cwd(), appName);

    // create project directory
    fs.mkdir(projectPath, (error) => {
        if(error)
            return console.log(chalk.redBright("Project creation failed! Make sure the folder doesn't already exist!"));
        
        // go to the new folder
        process.chdir(projectPath);
        
        // Create node project
        exec("npm init -y")

        console.log("\n");

        // ask for yarn
        readline.question(`Use ${chalk.green("Yarn")} as package manager? (y/n)`, yarnAnswer => {
            const yarn = yarnAnswer ? yarnAnswer.toLowerCase() == "y" : false;
            readline.close();

            // console.log(chalk.yellow(`Creating ${yarn ? "yarn" : "npm"} project`));

            const load = Spinner(chalk.yellow(`Creating ${yarn ? "yarn" : "npm"} project`));
            load.start();

            // setup for yarn
            if(yarn)
                exec("yarn")

            // add stacks.js package to project
            exec(`${yarn ? "yarn link " : "npm link "} stacks-js`);

            // load.text = " Adding necessary packages..."
            // load.stop();
        });
    })
}

createProject();
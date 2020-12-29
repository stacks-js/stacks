#!/usr/bin/env node

const { error } = require("./utils");
const { compile } = require("./compiler");

const { createProject }  = require("./create")

const arguments = process.argv.slice(2, process.argv.length);
switch(arguments[0]) {

    case "-h": {
        
    }
    case "--help": {
        // console.log("")
        console.log("stacks.js | © Sanjith Udupa 2020");
        break;
    }

    case "create": {
        const projectName = arguments[1];
        
        if(!projectName)
            error("Error: No project name specified!", "stacks-js create <project_name>");

        console.log(`creating project ${projectName}`);
        createProject(__dirname, process, projectName);

        break;
    }

    case "compile": {
        const serve = arguments.includes("--serve");
        const shouldWatch = arguments.includes("--watch");
        const prod = arguments.includes("--prod");

        let watch;
        if(shouldWatch)
            watch = arguments[arguments.indexOf("--watch") + 1] === "true";

        console.log(watch);
        compile(process.cwd(), serve, watch, prod);
        break;
    }
}

// program
//     .version("0.0.1")
//     .description("A CLI to generate stacks.js projects to jumpstart your apps!")
//     // .usage(` create ${chalk.blue(`<project_name>`)}`)
//     // .option("--lang <language>", "set app language")
//     .command('create <project_name>')
//     .description("Create a new Stacks.js Project")
//     .action((project_name) => {
//         console.log("wanting to create project")
//     })
//     .command('compile <project_name>')
//     .description("Create a new Stacks.js Project")
//     .action((project_name) => {
//         console.log("wanting to create project")
//     })
//     .parse(process.argv);

// if (!process.argv[2] || process.argv[2] == "--lang"){
//     clear();
//     console.log(chalk.greenBright("Please include an app name before language declaration!\n"))
//     program.outputHelp();
//     exit();
// }


// createProject();
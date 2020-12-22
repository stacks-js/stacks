#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import path from "path";
import program from "commander";

// clear();

program
    .version("0.0.1")
    .description("A CLI to generate stacks.js projects to jumpstart your apps!")
    // .usage("stacks-cli <app-name>")
    .option("-l, --lang", "set app language (typescript or javascript)")
    .parse(process.argv);

if (!process.argv.slice(2).length)
    program.outputHelp();

const language = program.lang ? program.lang : "js";
console.log(language);
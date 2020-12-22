#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
const program = require("commander");

// clear();

program
    .version("0.0.1")
    .description("A CLI to generate stacks.js projects to jumpstart your apps!")
    .usage("<app-name>")
    .option("-l, --lang", "set app language (typescript or javascript)")
    .parse(process.argv);

if (!process.argv.slice(2).length)
    program.outputHelp();

const language = program.lang ? program.lang : "js";

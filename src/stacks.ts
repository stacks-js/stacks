import * as Stacks from "./stacks_import.js";
Object.entries(Stacks).forEach(([name, exported]) => (window || global)[name] = exported);
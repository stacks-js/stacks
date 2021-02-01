import * as Stacks from "./stacks.js";
Object.entries(Stacks).forEach(([name, exported]) => (window || global)[name] = exported);
/**
 * Global version of Stacks, adds it to the respective window(browser) or global(node) object.
 * It is advised to not use this, but the option is still available
 */
import * as Stacks from "./stacks.js";
Object.entries(Stacks).forEach(([name, exported]) => (window || global)[name] = exported);
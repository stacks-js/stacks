import {Block} from "./block.js";

export function render(block : Block){
    block.get();
    document.querySelector("body").innerHTML += block.get();
}
import {Block} from "./block.js";

export function render(block){
    let body = block.b;
    body.get();
    document.querySelector("body").innerHTML += body.get();
}
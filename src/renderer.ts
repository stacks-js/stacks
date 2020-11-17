import {Block} from "./block.js";

export function render(block : Block){
    let body = block.body();
    document.querySelector("body").innerHTML += body.get();
    console.log(body.get())
}
import { Block } from "../testout/block.js"

export function render(block : Block){
    let body = block.body;
    console.log(block)
    // document.querySelector("body").innerHTML += body.html;
}
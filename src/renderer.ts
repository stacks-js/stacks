import {Block} from "./block.js";

export function render(block : Block){
    let body = block.body();
    document.body.appendChild(body.get())
}
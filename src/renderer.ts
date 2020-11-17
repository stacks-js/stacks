import {Block} from "./block.js";

export function render(block : Block){
    let body = block.body().get();
    
    document.body.appendChild(body);
}
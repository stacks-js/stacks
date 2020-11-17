import {Block} from "./block.js";

let viewBlock;

export function render(block : Block){
    let body:HTMLElement = block.body().get();
    viewBlock = block;

    let already = document.getElementById("stacks_js_view");
    if(already) {
        already.remove()
    }

    document.body.appendChild(body);
    
    window.onresize = (e) => {
        body.style.height = window.innerHeight.toString() + "px";
    }
}
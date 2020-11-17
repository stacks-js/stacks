import {Block} from "./block.js";

export function render(block : Block){
    let body:HTMLElement = block.body().get();

    document.body.appendChild(body);
    
    window.onresize = () => {
        body.style.height = window.innerHeight.toString() + "px";
    }
}
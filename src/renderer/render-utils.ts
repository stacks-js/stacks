import Block from "../blocks/block.js";
import StacksRenderer from "./renderer.js";

export function center(block:HTMLElement) {
    block.style.justifyContent = "center";
    block.style.height = window.innerHeight + "px";
    // StacksRenderer.getInstance().centered.push(block);
}

export const centerBlocks = (blocks:string[]) => {
    for(let block in blocks) {
        const body:HTMLElement = document.getElementById(blocks[block]);
        const parent:HTMLElement = body.parentElement;
        const grandParent:HTMLElement = parent.parentElement;
        
        let newHeight:string;

        if(grandParent.nodeName === "BODY")
            newHeight = window.innerHeight + "px";
        else
            newHeight = grandParent.clientHeight + "px";
        
        parent.style.height = newHeight;
    }
}

export const getParentBlockElement = (id: string, cb:Function) => {
    const old =  document.getElementById(id);
    const parent = old ? old.parentElement : document.body;
    const children = parent.childNodes;

    children.forEach(child => {
        if(child === old){
            cb(child);
        }
    });
}
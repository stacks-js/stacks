import { Block } from "./block.js"

export class Stack extends Block{
    blocks:Block[];
    type:StackType = "y";

    constructor(...blocks: Block[]) {
        super();
        this.blocks = blocks;
        this.params["stack"] = false;

        let stackObject = document.createElement("div");

        for(let block in blocks) {
            let body:HTMLElement = blocks[block].get();
            stackObject.appendChild(body);
        }

        this.object = stackObject;
    }
}

export type StackType = "x" | "y" | "z";
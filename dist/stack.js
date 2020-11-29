import { Block } from "./block.js";
export class Stack extends Block {
    constructor(...blocks) {
        super();
        this.type = "y";
        this.blocks = blocks;
        this.params["stack"] = false;
        let stackObject = document.createElement("div");
        for (let block in blocks) {
            let body = blocks[block].get();
            stackObject.appendChild(body);
        }
        this.object = stackObject;
    }
}

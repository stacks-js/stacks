import { Block } from "./block.js"
import { Margin } from './margin.js'

export class Stack extends Block{
    blocks:Block[];
    type:StackType = "y";
    _margin:string = Margin.default;

    constructor(type:StackType, ...blocks: Block[]) {
        super();
        this.blocks = blocks;
        this.params["stack"] = false;
        this.type = type;

        let stackObject = document.createElement("div");

        if(this.type == "z")
            this.blocks = blocks.reverse();

        for(let block in blocks) {
            let body:HTMLElement = blocks[block].get();
            // body.classList.add("child");
            // body.style.setProperty("--margin", this._margin);
            body.style.margin = this._margin;
            stackObject.appendChild(body);
        }

        stackObject.className = type + "stack";

        this.object = stackObject;
    }

    margin(margin:string) {
        this._margin = margin;

        for(let block in this.blocks) {
            let child = this.blocks[block];
            child.object.style.margin = this._margin;
        }

        return this;
    }
}

export type StackType = "x" | "y" | "z";
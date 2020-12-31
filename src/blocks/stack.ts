import Block from "./block.js"
import Margin from '../utils/margin.js'

export default class Stack extends Block{
    blocks:Block[];
    children:HTMLElement[] = [];
    type:StackType = "y";
    _margin:string = Margin.default;

    constructor(type:StackType, ...blocks: Block[]) {
        super();
        this.blocks = blocks;
        this.params.stack = true;
        this.type = type;

        let stackObject = document.createElement("div");

        if(this.type == "z")
            this.blocks = blocks.reverse();

        for(let block in blocks) {
            blocks[block].params.selfAlign = "center";

            let body:HTMLElement = blocks[block].get();
            // body.classList.add("child");
            // body.style.setProperty("--margin", this._margin);
            body.style.margin = this._margin;
            this.children.push(body);
            stackObject.appendChild(body);
        }

        stackObject.className = type + "stack";

        this.object = stackObject;
    }

    align(alignment:AlignType) {
        let align:string;

        if(alignment == "left" || alignment == "bottom")
            align = "flex-start";
        else if(alignment == "right" || alignment == "top")
            align = "flex-end";
        else
            align = alignment;
        
        console.log(`Aligning to ${align}`);
        
        for(let child in this.children){
            this.children[child].style.alignSelf = align;
        }
        
        return this;
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

export type AlignType = "center" | "left" | "right" | "top" | "bottom";
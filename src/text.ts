import { Block } from "./block.js";

export class Text extends Block {
    text:string;
    style:string = "p";

    constructor(text:string, style?:string){
        super();
        this.text = text;
        if(style)
            this.style = style
        
        this.html = "<" + this.style + ">" + this.text + "</" + this.style + ">";
    }
}
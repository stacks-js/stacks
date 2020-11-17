import { Block } from "./block.js";

export class Text extends Block {
    text:string;
    style:string = "p";

    constructor(text:string, style?:string){
        super();
        this.text = text;
        this.params["text"] = true;
        if(style)
            this.style = style
        
        let textElement = document.createElement(style ? style : "p");
        textElement.innerText = text;
        this.object = textElement;
    }
}
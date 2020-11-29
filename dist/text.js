import { Block } from "./block.js";
export class Text extends Block {
    constructor(text, style) {
        super();
        this.style = "p";
        this.text = text;
        this.params["text"] = true;
        if (style)
            this.style = style;
        let textElement = document.createElement(style ? style : "p");
        textElement.innerText = text;
        this.object = textElement;
    }
}

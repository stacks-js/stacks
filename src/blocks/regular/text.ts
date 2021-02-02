import Block from "../block.js";

/**
 * Creates a text element 
 * ```javascript
 *  new Text("Hello, world!");
 * ```
 */
export default class Text extends Block {
    /**
     * The text to display
     */
    text:string;

    /**
     * The type of text node to display (ex: h1)
     */
    style:string = "p";

    /**
     * 
     * @param text The text to display
     * @param style The type of text node to display (ex: h1)
     */
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
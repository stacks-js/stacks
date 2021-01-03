import Block from "../block.js";

/**
 * Note that this class, while in the input directory, does not extend the type of @see input
 */
export default class Button extends Block {
    action:Function;
    content:Block;
    child:HTMLElement;

    constructor(action:Function, content:Block) {
        super();
        this.action = action;
        this.content = content;

        let buttonObject = document.createElement("button");
        let body:HTMLElement = this.content.get();
        buttonObject.appendChild(body);

        this.onClick(action);

        this.object = buttonObject;
    }
}
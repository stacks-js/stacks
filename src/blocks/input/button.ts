import Block from "../block.js";

/**
 * Creates a button object and sets up actions for click interactions.
 * The button is created with a body/content and an actual action:
 * 
 * ```javascript
 * new Button(() => {
 *   // action for when button is clicked goes here
 * }, // button contents itself go here
 *   new Text("Click me!")
 * );
 * 
 * Note that, although included with the rest of the inputs, the Button class itself does not inherit from the [[Input]] generic class.
 */
export default class Button extends Block {
    /**
     * The callback function to be run on button press
     */
    action:Function;

    /**
     * The content that is stored inside the button block
     */
    content:Block;

    /**
     * @internal Rendered HTML of content object
     */
    child:HTMLElement;

    /**
     * Creates a new Button block
     * @param action The callback function to be run on button press
     * @param content The content that is stored inside the button block
     */
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

    // enabled(enabled:boolean) {
    //     this.object.setAttribute("disabled", (!enabled).toString());

    //     return this;
    // }
}
import Block from "../block.js";

/**
 * A blank Block that makes a spacer for moving around other information.
 * ```javascript
 *  new Spacer(25, 50);
 * ```
 */
export default class Spacer extends Block {
    /**
     * Width of spacer in pixels
     */
    width:number;

    /**
     * Height of spacer in pixels
     */
    height:number;

    /**
     * Creates a new spacer
     * @param width Width of spacer in pixels
     * @param height Height of spacer in pixels
     */
    constructor(width:number, height:number){
        super();
        this.width = width;
        this.height = height;

        let spacerObject = document.createElement("div")
        spacerObject.style.width = width.toString();
        spacerObject.style.height = height.toString();

        this.object = spacerObject;
    }
}
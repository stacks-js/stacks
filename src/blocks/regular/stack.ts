import Block from "../block.js"
import Margin from '../../utils/margin.js'

/**
 * A very important block. This allows you to combine multiple other blocks together and arrange them in an easy way.
 * ```javascript
 *  new Stack("y",
 *      new Image("https://www.google.com/favicon.ico"),
 *      new Text("Google Logo")
 *  );
 * ```
 */
export default class Stack extends Block{
    /**
     * The blocks that are contained within the Stack
     */
    blocks:Block[];
    
    /**
     * @internal The children of the block as HTML Elements
     */
    children:HTMLElement[] = [];

    /**
     * The direction the stack should be aligned with
     */
    type:StackType = "y";

    _margin:string = Margin.default;

    alignment:string = "flex-start";

    /**
     * Creates a Stack with the given blocks
     * @param type The way the blocks should be stacked, vertically(along the **y** axis), horizontally(along the **x** axis), or on top of one another(along the **z** axis)
     * @param blocks A list of blocks to put inside the stack. New blocks are accepted as new parameters, there is no need to pass it as an array. See the example above for more details. 
     */
    constructor(type:StackType, ...blocks: Block[]) {
        super();
        this.blocks = blocks;
        this.params.stack = true;
        this.type = type;

        let stackObject = document.createElement("div");

        if(this.type == "z")
            this.blocks = blocks.reverse();

        for(let block in blocks) {
            blocks[block].params.selfAlign = this.alignment;

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

    /**
     * Aligns the contents of the stack in along a certain axis. See [[AlignType]].
     * @param alignment The place it should be aligned, either center, left, or right for X Stacks or top, center, bottom for Y Stacks. 
     */
    align(alignment:AlignType) {
        let align:string;

        if(alignment == "left" || alignment == "bottom")
            align = "flex-start";
        else if(alignment == "right" || alignment == "top")
            align = "flex-end";
        else
            align = alignment;

        this.alignment = align;
        
        this.applyAlignment();

        return this;
    }

    /**
     * @internal
     */
    applyAlignment() {
        for(let child in this.children){
            this.children[child].style.alignSelf = this.alignment;
        }
    }

    /**
     * Add a margin around a stack as a whole to adjust the spacing within the stack.
     * @param margin The spacing between individual blocks in the stack. 
     */
    margin(margin:string) {
        this._margin = margin;

        for(let block in this.blocks) {
            let child = this.blocks[block];
            child.object.style.margin = this._margin;
        }

        return this;
    }
}

/**
 * This determines how a stack will be laid out. 
 * 
 * XStack = Horizontal
 * YStack = Vertical
 * ZStack = On top of another
 * 
 * If you would like to combine multiple axes together, that is done by simply using a Stack within a Stack. After all, Stacks are still blocks and can therefore be included in another Stack like below:
 * ```javascript
 * new Stack("y",
 *  new Text("Below me is my X Stack!"),
 *  new Stack("x",
 *      new Text("I am on the left!"),
 *      new Text("And I am on the righ!")
 *  ).margin("10px")
 * )
 * ```
 */
export type StackType = "x" | "y" | "z";

/**
 * The way contents of the Stack should be aligned together. Works for both X and Y stacks.
 */
export type AlignType = "center" | "left" | "right" | "top" | "bottom";
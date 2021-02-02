import Input from "./input.js";

/**
 * This is a number field input, similar to the text field but only accepts numbers.
 * ```javascript
 * new NumberField("num".bind(this))
 *  .onInput((value) => {
 *      console.log(`New value is ${value}`);
 *  });
 * 
 * //value can also be accessed through this.states.num because that is what it was bound to in the first line.
 * ```
 */
export default class NumberField extends Input<number> {
    constructor(key:Array<any>,  placeholder?:string) {
        super(key, "number", (input: string):number => {
            return +input;
        });
        
        if(placeholder)
            this.params.attributes["placeholder"] = placeholder;
    }
}
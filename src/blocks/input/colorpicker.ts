import Input from "./input.js";
/**
 * This is a color picker input.
 * ```javascript
 * new ColorPicker("color".bind(this))
 *  .onChange((value) => {
 *      console.log(`New value is ${value}`);
 *  });
 * 
 * //value can also be accessed through this.states.color because that is what it was bound to in the first line.
 * ```
 * 
 * This will return the hex string of the selected color.
 */
export default class ColorPicker extends Input<string> {
    constructor(key:Array<any>) {
        super(key, "color", (input: string):string => {
            return input;
        });
    }
}

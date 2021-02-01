import Input from "./input.js";

export default class ColorPicker extends Input<string> {
    constructor(key:Array<any>) {
        super(key, "color", (input: string):string => {
            return input;
        });
    }
}

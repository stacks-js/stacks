import Input from "./input.js";

export default class NumberField extends Input<number> {
    constructor(key:Array<any>,  placeholder?:string) {
        super(key, "number", (input: string):number => {
            return +input;
        });
        
        if(placeholder)
            this.params.attributes["placeholder"] = placeholder;
    }
}
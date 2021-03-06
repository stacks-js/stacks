import Input from "./input.js";

/**
 * This is a text field input.
 * ```javascript
 * new TextField("text".bind(this))
 *  .onInput((value) => {
 *      console.log(`New value is ${value}`);
 *  });
 * 
 * //value can also be accessed through this.states.text because that is what it was bound to in the first line.
 * ```
 */
export default class TextField extends Input<string> {
    constructor(key:Array<any>, type?:TextFieldType, placeholder?:string) {
        super(key, type ? type : "text", (input: string):string => {
            return input;
        });
        
        if(placeholder)
            this.params.attributes["placeholder"] = placeholder;
    }

    /**
     * Sets the type of text field to one of the other [[TextFieldType]]
     * @param type The type of text field to set
     */
    textFieldType(type:TextFieldType) {
        this.setType(type);
        return this;
    }
}

/**
 * These are the types of text fields you can have.
 */
export type TextFieldType = "text" | "password" | "phone" | "email";
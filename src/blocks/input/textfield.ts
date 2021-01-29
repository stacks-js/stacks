import Bind from "../../lib/internal/bind.js";
import Input from "./input.js";

export default class TextField extends Input<string> {
    value:string;

    constructor(key:Array<any>, type?:TextFieldType, placeholder?:string) {
        super(key, type ? type : "text", (input: string) => {
            return input;
        });
        
        if(placeholder)
            this.params.attributes["placeholder"] = placeholder;
    }

    textFieldType(type:TextFieldType) {
        this.setType(type);
        return this;
    }
}

export type TextFieldType = "text" | "password" | "phone" | "email";
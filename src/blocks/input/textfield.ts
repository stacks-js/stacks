import Bind from "../../lib/internal/bind.js";
import Input from "./input.js";

export default class TextField extends Input<string> {
    value:string;

    constructor(key:Array<string>, type?:TextFieldType) {
        super(type ? type : "text");
        Bind(key, this);
    }

    textFieldType(type:TextFieldType) {
        this.setType(type);
        return this;
    }
}

export type TextFieldType = "text" | "password" | "phone" | "email";
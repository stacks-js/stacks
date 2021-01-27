import Bind from "../../lib/internal/bind.js";
import Input from "./input.js";

export default class TextField extends Input<string> {
    constructor(val?:Bind, type?:TextFieldType) {
        super(type ? type : "text", () => { if(val) {val.states[val.val] = this.value} });
    }

    textFieldType(type:TextFieldType) {
        this.setType(type);
        return this;
    }
}

export type TextFieldType = "text" | "password" | "phone" | "email";
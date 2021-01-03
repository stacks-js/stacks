import Input from "./input.js";

export default class TextField extends Input<string> {
    constructor(type:TextFieldType) {
        super(type);
    }
}

export type TextFieldType = "text" | "password" | "phone" | "email";
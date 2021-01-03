import Block from "../block.js";

export default class Input<T> extends Block {
    value:T;
    type:string;
    tag:string = "input";
    place:string;

    onChange(change:Function) {
        this.params.events["change"] = change;
        return this;
    }

    on(event:string, action:Function) {
        this.params.events[event] = action;
        return this;
    }

    placeholder(placeholder:string) {
        this.place = placeholder;
        return this;
    }

    constructor(type:string){
        super();
        this.type = type;
        this.params["input"] = true;
        
        let inputElement = document.createElement(this.tag);
        this.object = inputElement;
    }
}
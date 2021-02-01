import Bind from "../../lib/internal/bind.js";
import Block from "../block.js";

export default class Input<T> extends Block {
    value:T;
    valueKey:string;
    type:string;
    tag:string = "input";
    place:string;
    inputElement:HTMLElement;

    onInput(input:Function) {
        const oninput = (e:Event) => {
            input(this.value, e)
        }

        this.params.events["input"] = oninput;
        return this;
    }

    onChange(change:Function) {
        const onchange = (e:Event) => {
            change(this.value, e)
        }

        this.params.events["change"] = onchange;
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

    setType(type:string) {
        this.type = type;
        this.inputElement.setAttribute("type", type);
    }

    default(value:T) {
        this.value = value;
    }

    constructor(key: Array<any>, type:string, convertType:Function){
        super();
        this.type = type;
        this.params["input"] = true;
        
        this.inputElement = document.createElement(this.tag);
        this.inputElement.setAttribute("type", type);

        // if(!this.states[key[1]])
        //     this.states[key[1]] = key[0].states[key[1]];

        this.inputElement.addEventListener("input", (e) => {
            this.value = convertType((<HTMLTextAreaElement>e.target).value);
            key[0].states[key[1]] = this.value;
        });

        this.object = this.inputElement;
        Bind(key, this);
    }
}
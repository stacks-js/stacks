import Block from "../block.js";

export default class Input<T> extends Block {
    value:string;
    type:string;
    tag:string = "input";
    place:string;

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

    constructor(type:string){
        super();
        this.type = type;
        this.params["input"] = true;
        
        let inputElement = document.createElement(this.tag);
        inputElement.setAttribute("type", type);

        inputElement.addEventListener("input", (e) => {
            this.value = (<HTMLTextAreaElement>e.target).value;
        });

        this.object = inputElement;
    }
}
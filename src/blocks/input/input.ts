import Bind from "../../lib/internal/bind.js";
import Block from "../block.js";
import { camelCase } from "../../utils/string-utils.js";
// import { getParentBlockElement } from "../../renderer/render-utils.js";

/**
 * Input block base class. This will never be used on its own, but rather other input blocks will inherit from it.
 * @typeParam T The type of the value of the input.
 * 
 * Stacks makes using inputs as easy as possible for the user. Each input is crafted with a type conversion setting such that the [[TextField]] returns a string whereas something like the [[DatePicker]] will return a js Date object.
 */
export default class Input<T> extends Block {
    value:T;
    valueKey:string;
    type:string;
    tag:string = "input";
    place:string;
    inputElement:HTMLElement;
    labelElement:HTMLElement;

    /**
     * When the input is changed, someone typing in a text field for instance, this callback is called.
     * @param input Callback function to be called when event is called. Note that the parameters for the callback are (the value, the event)
     */
    onInput(input:Function) {
        const oninput = (e:Event) => {
            input(this.value, e)
        }

        this.params.events["input"] = oninput;
        return this;
    }

    /**
     * When the value is accepted, someone clicking out of a text field for instance, this callback is called.
     * @param change /** Callback function to be called when event is called. Note that the parameters for the callback are (the value, the event)
     */
    onChange(change:Function) {
        const onchange = (e:Event) => {
            change(this.value, e)
        }

        this.params.events["change"] = onchange;
        return this;
    }

    /**
     * Use this function to apply any input callback, as some inputs have specific events that can be called. 
     * @param change /** Callback function to be called when event is called. Note that the parameters for the callback are (the event)
     */
    on(event:string, action:Function) {
        this.params.events[event] = action;
        return this;
    }

    /**
     * Sets the input's placeholder attribute
     * @param placeholder String as placeholder
     */
    placeholder(placeholder:string) {
        this.place = placeholder;
        return this;
    }

    /**
     * @internal
     * Sets the type of the input
     * @param type the type of the input
     */
    setType(type:string) {
        this.type = type;
        this.inputElement.setAttribute("type", type);
    }

    /**
     * Set's the default value of an input.
     * @param value The value to set.
     */
    default(value:T) {
        this.value = value;
        return this;
    }

    /**
     * Adds a label to an input field.
     * @param label The string label
     */
    label(label:string) {
        const id = camelCase(label);
        
        this.inputElement.id = id;

        this.labelElement.innerText = label;
        this.labelElement.setAttribute("for", id);

        return this;
    }

    /**
     * @internal
     * @param key Bound variable [[Bind]]
     * @param type Type of key
     * @param convertType 
     */
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

        this.labelElement = document.createElement("label");
        
        const inputFull = document.createElement("div");
        inputFull.appendChild(this.labelElement)
        inputFull.appendChild(this.inputElement)

        this.object = inputFull;
        Bind(key, this);
    }
}
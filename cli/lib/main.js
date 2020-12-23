import { Block, Text, StacksRenderer } from "stacks-js"

class View extends Block {
    constructor() {
        super();
        this.states.count = 0;
    }

    body = () => {
        return new Text(this.states.count == 0 ? "Click me!" : "I have been clicked " + this.states.count + " times!")
        .onclick(() =>{ 
            this.states.count++;
        })
    }
}

StacksRenderer.getInstance().render(new View());
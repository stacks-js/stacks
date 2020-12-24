/**
 * This is the "main" view of the app, although the names of the files do not matter.
 * 
 * The *link* attribute leads to the next page.
 * @see another.js
 */
import { Block, Text, Stack, StacksRenderer } from "stacks-js";

class View extends Block {
    constructor() {
        super();
        this.states.count = 0;
    }

    body = () => {
        return new Stack("y", 
            new Text(this.states.count == 0 ? "Click me!" : "I have been clicked " + this.states.count + " times!")
                .onclick(() =>{ 
                    this.states.count++;
                }),

            new Text("Go to another page!")
                .link("another")
        )
    }
}

StacksRenderer.getInstance().render(new View());
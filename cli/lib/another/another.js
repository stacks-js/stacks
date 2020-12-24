/**
 * This is another page for the application. Once again, the names of files and
 * blocks do not matter.
 * 
 * The link returns back to the main view.
 * 
 * The *SubView* is a custom block.
 * @see subview.js
 * 
 * Note that this AND the @see subview.js file are in the SAME
 * directory, titled "another" as well. This tells the Stacks compiler to ensure 
 * they are put on the same page.
 */
import { Block, Text, Stack, StacksRenderer } from "stacks-js";
import { SubView } from "./subview";

class Another extends Block {
    body = () => {
        return new Stack("y", 
            new SubView(),
            new Text("Go back")
                .link("main")
        );
    }
}

StacksRenderer.getInstance().render(new Another());
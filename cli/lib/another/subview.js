/**
 * This is a subview. Note that this AND the @see another.js file are in the SAME
 * directory, titled "another" as well. This tells the Stacks compiler to ensure 
 * they are put on the same page. This class is imported in the @see another.js
 * file.
 */
import { Block, Text } from "stacks-js";

export class SubView extends Block {
    body = () => {
        return new Text("This is text from a subview, on another page!")
    }
}
import { Block } from './block.js';
import { Text } from './text.js';
import { render } from './renderer.js'

let newBlock:Block = new Block(() => {
    return new Text("hello there what is up homie", "a");
});

render(newBlock);
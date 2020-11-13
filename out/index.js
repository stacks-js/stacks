import { Block, Text } from './block.js';
import { render } from './renderer.js';
let newBlock = new Block(() => {
    return new Text("hello there what is up");
});
render(newBlock);

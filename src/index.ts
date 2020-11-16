import { Block } from './block.js';
import { render } from './renderer.js'

let newBlock:Block = new Block(() => {
    console.log("ye2")
    let text = Block.Text("hello there what is up homie")
    return text;
});

render(newBlock);
console.log("hi " + newBlock.get());
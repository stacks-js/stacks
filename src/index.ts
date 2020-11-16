import { Block } from './block.js';
import { render } from './renderer.js'

class View extends Block {
    b = () => {
        return new Text("hello");
    }
}

render(View);
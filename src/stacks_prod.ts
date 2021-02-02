/**
 * Production version of Stacks. This is used when bundling with [Webpack](https://webpack.js.org) to include css styles. 
 */

import Block from "./blocks/block.js";
import Text from "./blocks/regular/text.js";
import Image from "./blocks/regular/image.js";
import Stack from "./blocks/regular/stack.js";
import StacksRenderer from "./renderer/renderer.js";
import Margin from "./utils/margin.js";
import './css/stacks.css';
// const Utils = {
//     Margin
// }

// const TText = function(txt, style) {
//     return new text(txt, style);
// }

// const Text = text;

// const Image = function(path) {
//     return new image(path);
// }

// const Stack = function(type, ...blocks) {
//     return new stack(type, ...blocks);
// }

export {
    Block,
    Text,
    // TText,
    Image,
    Stack,
    StacksRenderer,
    // Utils
}
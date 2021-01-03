import Block from "./blocks/block.js";
import Text from "./blocks/regular/text.js";
import Image from "./blocks/regular/image.js";
import Stack from "./blocks/regular/stack.js";
import StacksRenderer from "./renderer/renderer.js";
import TextField from "./blocks/input/textfield.js";
import Margin from "./utils/margin.js";
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
    TextField
    // Utils
}
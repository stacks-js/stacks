/**
 * Stacks Entrypoint
 */

import Block from "./blocks/block.js";
import Text from "./blocks/regular/text.js";
import Image from "./blocks/regular/image.js";
import Stack from "./blocks/regular/stack.js";
import StacksRenderer from "./renderer/renderer.js";
import TextField from "./blocks/input/textfield.js";
import Button from "./blocks/input/button.js";
import Spacer from "./blocks/util/spacer.js";
import NumberField from "./blocks/input/numberfield.js";
import ColorPicker from "./blocks/input/colorpicker.js";
import DatePicker from "./blocks/input/datepicker.js";
import FileUpload from "./blocks/input/fileupload.js";
import Bind from "./lib/internal/bind.js";
import "./utils/binding.js";
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
/**
 * Library stuff
 */
export {
    Block,
    Text,
    // TText,
    Image,
    Stack,
    StacksRenderer,
    TextField,
    Button,
    Spacer,
    NumberField,
    ColorPicker,
    DatePicker,
    Bind,
    FileUpload
    // Utils
}
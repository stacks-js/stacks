import Block from "../blocks/block.js";
import StacksRenderer from "./renderer.js";

export function center(block:HTMLElement) {
    block.style.justifyContent = "center";
    block.style.height = window.innerHeight + "px";
    StacksRenderer.getInstance().centered.push(block);
}
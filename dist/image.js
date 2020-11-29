import { Block } from "./block.js";
export class Image extends Block {
    constructor(path) {
        super();
        this.path = path;
        let imageObject = document.createElement("img");
        imageObject.setAttribute("src", path);
        this.object = imageObject;
    }
}

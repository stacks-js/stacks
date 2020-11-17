import { Block } from "./block.js";

export class Image extends Block {
    path:string;

    constructor(path:string){
        super();
        this.path = path;

        let imageObject = document.createElement("img")
        imageObject.setAttribute("src", path);
        
        this.object = imageObject;
    }
}
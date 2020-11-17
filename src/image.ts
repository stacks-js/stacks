import { Block } from "./block.js";

export class Image extends Block {
    path:string;

    constructor(path:string){
        super();
        this.path = path;
        this.html = "<img src='" + path + "'>";
    }
}
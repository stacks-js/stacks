import { Block } from './block.js';

export class Text extends Block{
    constructor(text : string, style?:string){
        super(null);
        let tag = style ? style : "p";
        this.html = "<" + tag + ">" + text + "<" + tag + "/>";
    }
}
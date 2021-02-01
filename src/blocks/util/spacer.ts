import Block from "../block.js";

export default class Spacer extends Block {
    width:number;
    height:number;

    constructor(width:number, height:number){
        super();
        this.width = width;
        this.height = height;

        let spacerObject = document.createElement("div")
        spacerObject.style.width = width.toString();
        spacerObject.style.height = height.toString();

        this.object = spacerObject;
    }
}
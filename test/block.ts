export class Block {
    body: Block = null;
    html: string;

    constructor(text?:string){
        this.html = "<p>" + text + "</p>";
    }
}
export class Block{
    body: Function;
    html: string;

    constructor(body: Function){
        this.body = body;
    }
}

export class Text extends Block{
    constructor(text : string){
        super(null);
        this.html = "<h1>" + text + "</h1>"
    }
}
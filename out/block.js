export class Block {
    constructor(body) {
        this.body = body;
    }
}
export class Text extends Block {
    constructor(text) {
        super(null);
        this.html = "<h1>" + text + "</h1>";
    }
}

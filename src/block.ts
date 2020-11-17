export class Block {
    body: Function = null;
    html: string;
    isLink: boolean = false;

    params = {};

    link(href:string){
        this.isLink = true;
        this.params["href"] = href;
        return this;
    }

    get() {
        let mainTag = this.isLink ? "a" : "div";
        let front = "<" + mainTag + (this.isLink ? " href='" + this.params["href"] + "'>" : ">");
        let back = "</" + mainTag + ">";

        let fullhtml = front + this.html + back;
        return fullhtml;
    }
}
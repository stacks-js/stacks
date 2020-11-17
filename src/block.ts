export class Block {
    body: Function = null;
    html: string;
    isLink: boolean = false;

    params = {
        tag: "div",
        isLink: false
    };

    link(href:string){
        this.isLink = true;
        this.params["href"] = href;
        this.params["tag"] = "a";
        return this;
    }

    get() {
        // let mainTag = this.isLink ? "a" : "div";
        // let front = "<" + mainTag + (this.isLink ? " href='" + this.params["href"] + "'>" : ">");
        // let back = "</" + mainTag + ">";

        let element = document.createElement(this.params["tag"])
        element.id = this.constructor.name;
        element.innerHTML = this.html;

        if(this.isLink) {
            element.setAttribute("href", this.params["href"]);
        }

        return element;
    }
}
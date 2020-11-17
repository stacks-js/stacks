export class Block {
    body: Function = null;
    object: Node;
    isLink: boolean = false;

    params = {
        tag: "div",
        isLink: false,
        text: false,
        style: {}
    };

    link(href:string){
        this.isLink = true;
        this.params["href"] = href;
        this.params["tag"] = "a";
        return this;
    }

    setStyleAttribute(name:string,value:string){
        this.params.style[name] = value;
        return this;
    }

    get() {
        let element = document.createElement(this.params["tag"]);
        element.id = this.constructor.name;
        element.appendChild(this.object)

        if(this.isLink) {
            element.setAttribute("href", this.params["href"]);
        }

        for(let style in this.params.style) {
            element.style[style] = this.params.style[style];
        }

        return element;
    }
}
export class Block {
    body: Function = null;
    object: HTMLElement;
    isLink: boolean = false;

    params = {
        tag: "div",
        isLink: false,
        text: false,
        style: {},
        childStyle: {}
    };

    link(href:string) {
        this.isLink = true;
        this.params["href"] = href;
        this.params["tag"] = "a";
        return this;
    }

    border(width:number, color?:string, radius?:number, style?:string){
        this.setChildStyle("border", width.toString() + "px " + (style ? style  + " ": "solid ") + (color ? color: "black"));
        if(radius) {
            this.setChildStyle("border-radius", radius.toString() + "px");
        }
        return this;
    }

    padding(size:number){
        this.setChildStyle("padding", size.toString() + "px");
        return this;
    }

    setStyleAttribute(name:string,value:string) {
        this.params.style[name] = value;
        return this;
    }

    setChildStyle(name:string,value:string) {
        this.params.childStyle[name] = value;
        return this;
    }

    get():HTMLElement{
        let main = document.createElement(this.params["tag"]);
        main.id = this.constructor.name;

        let child = this.object;
        for(let style in this.params.childStyle) {
            child.style[style] = this.params.childStyle[style];
        }
        
        main.appendChild(this.object)

        if(this.isLink) {
            main.setAttribute("href", this.params["href"]);
        }

        for(let style in this.params.style) {
            main.style[style] = this.params.style[style];
        }

        let centered:HTMLElement = document.createElement("div");
        centered.style.display = "flex";
        centered.style.justifyContent = "center";
        centered.style.alignItems = "center";
        centered.style.height = window.innerHeight + "px";

        centered.appendChild(main);

        centered.id = "stacks_js_view";

        return centered;
    }
}
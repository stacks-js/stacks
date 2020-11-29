export class Block {
    constructor() {
        this.body = null;
        this.isLink = false;
        this.params = {
            tag: "div",
            isLink: false,
            text: false,
            stack: false,
            style: {},
            childStyle: {}
        };
    }
    link(href) {
        this.isLink = true;
        this.params["href"] = href;
        this.params["tag"] = "a";
        return this;
    }
    border(width, color, radius, style) {
        this.setChildStyle("border", width.toString() + "px " + (style ? style + " " : "solid ") + (color ? color : "black"));
        if (radius) {
            this.setChildStyle("border-radius", radius.toString() + "px");
        }
        return this;
    }
    padding(size) {
        this.setChildStyle("padding", size.toString() + "px");
        return this;
    }
    setStyleAttribute(name, value) {
        this.params.style[name] = value;
        return this;
    }
    setChildStyle(name, value) {
        this.params.childStyle[name] = value;
        return this;
    }
    get() {
        let main = document.createElement(this.params["tag"]);
        main.id = this.constructor.name;
        let child = this.object;
        for (let style in this.params.childStyle) {
            child.style[style] = this.params.childStyle[style];
        }
        main.appendChild(this.object);
        if (this.isLink) {
            main.setAttribute("href", this.params["href"]);
        }
        for (let style in this.params.style) {
            main.style[style] = this.params.style[style];
        }
        let centered = document.createElement("div");
        centered.style.display = "flex";
        centered.style.justifyContent = "center";
        centered.style.alignItems = "center";
        centered.style.height = window.innerHeight + "px";
        centered.appendChild(main);
        centered.id = "stacks_js_view";
        return centered;
    }
}

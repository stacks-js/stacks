import onChange from "../lib/onchange.js"
import StacksRenderer from "../renderer/renderer.js"

export default class Block {
    body: Function = null;
    object: HTMLElement;
    isLink: boolean = false;

    id:string;

    params = {
        tag: "div",
        isLink: false,
        text: false,
        input: false,
        stack: false,
        style: {},
        mainStyle: {},
        attributes: {},
        childStyle: {},
        events: {},
        id: "",
        stateful: false,
        wasView: false,
        selfAlign: "",
        centered: false
    };

    updates = 0;

    states:ProxyConstructor = onChange({}, (t:Object, p:string) => {
        // console.warn(this.id)
        // console.log(t[p] + ", " + p);
        if(this.updates > 0)
            StacksRenderer.getInstance().update(this/*this.get(this.params.wasView), this.constructor.name*/);
        this.updates++;
    })

    centered:HTMLElement = document.createElement("div");

    link(href:string) {
        this.isLink = true;
        let HREF = href;

        if(href.startsWith("page:")){
            let page = href.substring(5);
            HREF = `../${page}/${page}.html`
        }

        this.params["href"] = HREF;
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

    setStyleAttribute(name:string, value:string) {
        this.params.style[name] = value;
        return this;
    }

    setChildStyle(name:string, value:string) {
        this.params.childStyle[name] = value;
        return this;
    }

    setAttribute(name:string, value:string) {
        this.params.attributes[name] = value;
        return this;
    }

    onClick(click:Function) {
        this.params.events["click"] = click;
        return this;
    }

    stateful(value?:boolean) {
        this.params.stateful = value ? value : true;
        this.centered.id = this.constructor.name; 
        StacksRenderer.getInstance().ids.push(this.constructor.name);
        StacksRenderer.getInstance().stateful.push(this);
        return this;
    }

    center() {
        this.params.centered = true;
        this.params.mainStyle["margin"] = "auto";
        // this.params.mainStyle["alignSelf"] = "center";
        // this.params.mainStyle["justifySelf"] = "center";

        return this;
    }

    getParent() {
        const id:string = this.centered.id;
        const old =  document.getElementById(id);
        const parent = old ? old.parentElement : document.body;

        return parent;
        // const children = parent.childNodes;

        // children.forEach(child => {
        //     if(child === old){
        //         // console.log(parent.childNodes[0]);
        //         // console.log(block.body().get());
        //         child.childNodes.forEach(c => {
        //             const oldId = (<HTMLElement>c).id;

        //         });
        //     }
        // });
    }

    init() {
        // console.log("init block")
    }

    getChild():HTMLElement {
        let child:HTMLElement = (this.body ? this.body().get() : this.object);
        for(let style in this.params.childStyle) {
            child.style[style] = this.params.childStyle[style];
        }
        return child;
    }

    get(view?:boolean):HTMLElement{
        // this.init();
        this.params.wasView = view ? view : false;

        // console.log("STATES")
        // console.log(this.states)

        let main:HTMLElement;
        if(this.params["tag"] != "div")
            main = document.createElement(this.params["tag"]);

        let child:HTMLElement = (this.body ? this.body().get() : this.object);
        for(let style in this.params.childStyle) {
            child.style[style] = this.params.childStyle[style];
        }

        // console.log(child);

        if(this.params["tag"] != "div")
            main.appendChild(child)
        else
            main = child;

        if(this.isLink)
            main.setAttribute("href", this.params["href"]);

        for(let style in this.params.style) {
            main.style[style] = this.params.style[style];
        }

        for(let event in this.params.events) {
            main.addEventListener(event, this.params.events[event]);
        }

        if(this.params.text)
            this.centered = main;
        // let centered:HTMLElement;
        // centered = document.createElement("div");
        this.centered.style.display = "flex";
        
        
        if(this.params.selfAlign != "")
            this.centered.style.alignSelf = this.params.selfAlign;
        
        // if(this.params)
        this.centered.style.alignItems = "center";

        // if(view)
        //     this.centered.style.height = window.innerHeight + "px";
        
        
        if(this.id === undefined)
            this.id = StacksRenderer.getInstance().generateId(this.constructor.name);; 

        if(!this.params.text)
            this.centered.appendChild(main);
        
        // if(this.params.centered)
            // console.log(this.centered)
        // if(this.params.stateful){
        this.centered.id = this.id;
        //     StacksRenderer.getInstance().ids.push(this.constructor.name);
        //     StacksRenderer.getInstance().stateful.push(this);
        // }

        // if(this.params.stateful) {
        //     centered.id = id;
        //     StacksRenderer.getInstance().watching[id] = centered;
        // }

        if(this.params.centered)
            StacksRenderer.getInstance().centered.push(this.centered.id);

        this.params.attributes["stateful"] = this.params.stateful + "";
        this.params.attributes["centered"] = this.params.centered + "";

        for(let style in this.params.mainStyle) {
            this.centered.style[style] = this.params.mainStyle[style];
        }

        for(let attribute in this.params.attributes) {
            this.centered.setAttribute(attribute, this.params.attributes[attribute]);
        }

        this.object = this.centered;
        return this.centered;
    }
}
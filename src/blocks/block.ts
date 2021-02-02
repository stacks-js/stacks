import onChange from "../lib/external/onchange.js"
import StacksRenderer from "../renderer/renderer.js"

/**
 * Block base class. All other blocks will be subclasses of this type. 
 * Creating a block is easy:
 * 
 * ```javascript
 * // create a class extending Block
 * class MyBlock extends Block {
 *  // override the body attribute by specifying a body function 
 *  body = () => {
 *      return new Text("Hello!")
 *  }
 * }
 * ```
 */
export default class Block {
    /**
     * The body function is what defines the contents of a block.
     * This will be of type Block. Only other blocks can go into this. See the Getting Started Guide for information on creating blocks.
     */
    body: Function = null;
    
    /**
     * Not needed for Stacks users, but this is a key component to making the system blocks.
     */
    object: HTMLElement;

    /**
     * Determines whether or not the current block is acting as a hyperlink. [[link]]
     */
    isLink: boolean = false;

    /**
     * A list of the attributes attached to the current block, bound from other blocks. Not needed for Stacks users.
     */
    boundAttributes: any[] = [];

    /**
     * The DOM id of the block when rendered
     */
    id:string;

    /**
     * The params object controls the attributes involved with a block. An overview of the types:
     *  - tag: defines the DOM tag of the element when rendered
     *  - isLink: determines whether or not the current block is acting as a hyperlink. [[link]]
     *  - style: style attributes for the outer HTMLElement when rendered
     *  - mainStyle: style attributes for the main HTMLElement when rendered
     *  - attributes: attributes that need to be rendered onto the element
     *  - childStyle: style attributes for the child HTML Element
     *  - events: attached event listeners and their functions
     *  - id: the DOM id of the block when rendered
     *  - stateful: determines whether or not the block needs its states to be tracked
     */
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

    /**
     * @internal Internal
     */
    updates = 0;
    
    /**
     * @internal Internal states object. This checks for changes to the states object. 
     */
    states:ProxyConstructor = onChange({}, (t:Object, p:string) => {
        // console.warn(this.id)
        // console.log(t[p] + ", " + p);
        this.boundAttributes.forEach((bound) => {
            const boundBlock:Block = bound[0];
            const prop = bound[1];

            boundBlock.states[prop] = this.states[prop]; 
        });

        if(this.updates > 0)
            StacksRenderer.getInstance().update(this/*this.get(this.params.wasView), this.constructor.name*/);
        this.updates++;
    })

    centered:HTMLElement = document.createElement("div");

    /**
     * @internal Binds another block to this current block, given the key for state.
     */
    attachBoundAttribute(bound: any) {
        this.boundAttributes.push(bound);
    }

    /**
     * Makes a block a clickable hyperlink. For text, the link color will be visible. For any other non-text objects, it will appear as a regular link.
     * @param href The link that the block click should lead to.
     */
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

    /**
     * Applies a border to a block.
     * @param width The width of the border, in pixels.
     * @param color Optional: color string of border(ex: **red**) (default black)
     * @param radius Optional: the corner radius of the border, in pixels (default 0)
     * @param style Optional: the border style(ex: **dashed**) (defualt solid)
     */
    border(width:number, color?:string, radius?:number, style?:string){
        this.setChildStyle("border", width.toString() + "px " + (style ? style  + " ": "solid ") + (color ? color: "black"));
        if(radius) {
            this.setChildStyle("border-radius", radius.toString() + "px");
        }
        return this;
    }
    
    /**
     * Applies a padding around a block
     * @param size The size, in pixels of padding around the block
     */
    padding(size:number){
        this.setChildStyle("padding", size.toString() + "px");
        return this;
    }

    /**
     * Manually sets a style attribute of the block, it is recommended to use this over [[setChildStyle]] unless you know what you're doing (or just want to experiment)
     * @param name The name of the CSS style
     * @param value The string value of the style
     */
    setStyleAttribute(name:string, value:string) {
        this.params.style[name] = value;
        return this;
    }

    /**
     * Manually sets the child rendered element style. Use [[setStyleAttribute]] if confused by what this is changing.
     * @param name The name of the CSS style
     * @param value The string value of the style
     */
    setChildStyle(name:string, value:string) {
        this.params.childStyle[name] = value;
        return this;
    }

    /**
     * Sets the value of a certain HTML attribute.
     * @param name Name of attribute
     * @param value String value of attribute
     */
    setAttribute(name:string, value:string) {
        this.params.attributes[name] = value;
        return this;
    }

    /**
     * Adds an onclick event to the event queue and will run the passed calllback when object is clicked. 
     * @param click Callback function to be run when object is clicked
     */
    onClick(click:Function) {
        this.params.events["click"] = click;
        return this;
    }

    /**
     * @deprecated Function to set whether or not a block is stateful.
     * 
     * This is no longer needed as stacks now automatically determines statefulness. 
     * @param value 
     */
    stateful(value?:boolean) {
        this.params.stateful = value ? value : true;
        this.centered.id = this.constructor.name; 
        StacksRenderer.getInstance().ids.push(this.constructor.name);
        StacksRenderer.getInstance().stateful.push(this);
        return this;
    }

    /**
     * Center a block in it's parent container
     */
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

    /**
     * @internal
     * @deprecated
     */
    init() {
        // console.log("init block")
    }

    /**
     * @internal
     * Gets child HTML element from existing block.
     */
    getChild():HTMLElement {
        let child:HTMLElement = (this.body ? this.body().get() : this.object);
        for(let style in this.params.childStyle) {
            child.style[style] = this.params.childStyle[style];
        }
        return child;
    }

    /**
     * @internal
     * Used for renderer to get the HTML element contents of a specific block.  
     * @param view 
     */
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
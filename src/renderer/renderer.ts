import Block from "../blocks/block.js";
import { centerBlocks, getParentBlockElement } from "./render-utils.js";

/**
 * This is the main class that handles the rendering behind Stacks and its components. This, along with [[Block]] get function, put the blocks on the screen. 
 */
export default class StacksRenderer {
    /**
     * @internal
     */
    private static inst:StacksRenderer = null;

    /**
     * Singleton to get the instance of the Stacks Renderer. It is important that you use this and not create a new instance of the renderer or much of the updating based on states would fail. 
     */
    static getInstance():StacksRenderer {
        if(!StacksRenderer.inst)
            StacksRenderer.inst = new StacksRenderer();
        return StacksRenderer.inst;
    }

    /**
     * @internal
     */
    watching: Record<string, HTMLElement> = {};
    stateful: Block[] = [];
    ids: string[] = [];
    elemcount:number = -1;
    centered: string[] = [];

    /**
     * This is what you will call when you want to render a block through
     * ```javascript
     * StacksRenderer.getInstance().render(new MyBlock());
     * ```
     * The renderer will then recursively get the contents of and render each block you have created.
     * @param block The base block to render
     */
    render(block : Block): void{
        let body:HTMLElement = block.get(true);
    
        document.body.appendChild(body);
        
        if(block.params.centered)
            body.style.height = window.innerHeight + "px";
        // if(block.params.centered)
        // if(body.children[0].getAttribute("centered"))
        //     center(body);
        
        // console.log(this.watching)

        centerBlocks(this.centered);
        
        window.onresize = () => {
            // if(block.params.centered)
            //     body.style.height = window.innerHeight + "px";
            // for(let block in StacksRenderer.getInstance().centered) {
            //     let body = StacksRenderer.getInstance().centered[block];
            //     body.style.height = window.innerHeight.toString() + "px";
            //     console.log(body)
            // }
            centerBlocks(this.centered);
        }
    }

    /**
     * @internal
     * This is what gets called when states change and Stacks uses a recursive updating algorithm to fix only what is needed so as to preserve user input state.
     * @param block The base block to render
     */
    update(block : Block) {
        // console.trace("<h2>UPDATE</h2>")
        // let count:number = 0;
        // console.log("YEYYY")
        // console.log(StacksRenderer.getInstance().stateful)
        // StacksRenderer.getInstance().stateful.forEach(block => {
        

        // children.forEach(child => {
        //     if(child === old){
        getParentBlockElement(block.id, (parent) => {
            const New = block.body().get();
            const Old = <HTMLElement>parent.childNodes[0];

            // console.log(New);
            // console.log(Old);

            const oldId = Old.id; 

            New.id = oldId;
            // Old.replaceWith(New);
            this.replaceElement(New, Old);
        });

        
        //     }
        // });

        // parent.replaceChild(old, document.createElement("p"));

        // try {
        //     document.body.removeChild(document.getElementById(old));
        // } catch (e) {
        //     console.log({e: "ERRPR", id: old})        
        // }
        // this.render(block);

        // });
        // StacksRenderer.getInstance().stateful.forEach(block => {
        //     const id = StacksRenderer.getInstance().ids[count];
        //     const old:HTMLElement = document.getElementById(id);
        //     let something:HTMLElement = block.get();

        //     console.log(something)

        //     document.body.removeChild(old)
        //     document.body.appendChild(something);
        //     // console.log(something);
        //     count++;
        // });
        // let old = document.getElementById(id);
        // console.log(id + "yeyyey")
        // if(!old)
        //     return;

        // console.log({elem: elem, old:document.getElementById(id)})
        // document.body.replaceChild(document.getElementById(id).parentNode, elem)

        // console.log("HELLO")
    }

    /**
     * @internal
     * recursive function to replace html elements for updating states
     * @param New 
     * @param Old 
     */
    replaceElement(New:HTMLElement, Old:HTMLElement) {
        if(New.outerHTML === Old.outerHTML)
            return;
        
        let count = 0;
        New.childNodes.forEach(c => {
            let newChild:HTMLElement = <HTMLElement> c;
            let oldChild:HTMLElement = <HTMLElement> Old.childNodes[count];
            // console.log(newChild)
            if(!oldChild || oldChild.nodeType != 1){
                this.resetNodeValue(New, Old, Old.parentElement);
            }
            else {
                let inners = newChild.innerHTML != oldChild.innerHTML;
                let attrs = newChild.attributes.length != oldChild.attributes.length;
                // console.log(attrs);
                if(inners || (attrs && inners)) {
                    this.replaceElement(newChild, oldChild);
                }
            }

            count++;
        });
    }

    /**
     * @internal
     * @param New 
     * @param Old 
     * @param Parent 
     */
    resetNodeValue(New:HTMLElement, Old:HTMLElement, Parent:HTMLElement) {
        const id = Old.id;
        New.id = id;
        Parent.replaceChild(New, Old);
    }

    /**
     * @internal
     * @param block 
     */
    generateId(block?:string): string {
        return (block ? block : "sjsblock") + this.elemcount++;
    }
}